// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Track connection state
let isConnected = false;

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    if (!isConnected) {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000, // Increase socket timeout
        maxPoolSize: 50, // Increase pool size
      });
      
      isConnected = true;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
      // Monitor the connection
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        isConnected = false;
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB error:', err);
        isConnected = false;
      });
    }

    // Set up routes only after confirming connection
    app.use('/api/tasks', taskRoutes);
    
    app.get('/', (req, res) => {
      res.json({ 
        message: 'Task Tracker API is running',
        dbStatus: isConnected ? 'Connected' : 'Disconnected'
      });
    });
    
    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(500).json({ 
        message: 'Something went wrong!', 
        error: err.message,
        dbStatus: isConnected ? 'Connected' : 'Disconnected'
      });
    });
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Middleware to check database connection before processing requests
app.use((req, res, next) => {
  if (!isConnected) {
    return res.status(503).json({ 
      message: 'Database connection not ready',
      dbStatus: 'Disconnected'
    });
  }
  next();
});

// Initialize connection
connectDB();

// Handle process termination
process.on('SIGINT', async () => {
  if (isConnected) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
  }
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  if (isConnected) {
    await mongoose.connection.close();
  }
  process.exit(1);
});
