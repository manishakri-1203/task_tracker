
# Task Tracker Backend

This is the backend for the Task Tracker application. It provides RESTful APIs for managing tasks, including creating, reading, updating, and deleting tasks.

---

## Features

- Create a new task
- Retrieve all tasks
- Update an existing task
- Delete a task
- MongoDB as the database

---

## Prerequisites

Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud instance)

---

## Setup Instructions

### 1. Clone the Repository
- Clone the repository to your local machine using the following command:
  ```bash
  git clone <repository-url>
  cd backend
  ```

### 2. Install Dependencies
- Install all required dependencies by running:
  ```bash
  npm install
  ```

### 3. Set Up Environment Variables
- Create a `.env` file to store environment variables.
- Use the provided `.env.example` file as a template:
  ```bash
  cp .env.example .env
  ```
- Update the `.env` file with your specific configuration:
  ```plaintext
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/tasktracker
  ```

---

## Usage

### 1. Start the Server
- Start the development server using the following command:
  ```bash
  npm run dev
  ```
- The server will run at `http://localhost:5000` (or the port you specify in the `.env` file).

### 2. API Endpoints
The available API endpoints are as follows:

| **Method** | **Endpoint**        | **Description**          |
|------------|---------------------|--------------------------|
| GET        | `/api/tasks`        | Retrieve all tasks       |
| POST       | `/api/tasks`        | Create a new task        |
| PUT        | `/api/tasks/:id`    | Update a task by ID      |
| DELETE     | `/api/tasks/:id`    | Delete a task by ID      |

---

## Project Structure

The project structure is organized as follows:

```plaintext
backend/
│
├── src/
│   ├── controllers/
│   │   └── taskController.js  # Handles business logic
│   ├── models/
│   │   └── task.js            # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js      # API route definitions
│   └── server.js              # Entry point
│
├── .env                        # Environment variables (excluded in Git)
├── .env.example                # Sample environment variables
├── package.json                # Node.js dependencies and scripts
└── README.md                   # Project documentation
```

---

## Sample .env File

The `.env.example` file contains the following:

```plaintext
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/tasktracker
```

---

## Testing

### Test APIs
- Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints. 
- For example, to retrieve all tasks using `cURL`:
  ```bash
  curl -X GET http://localhost:5000/api/tasks
  ```

---

## Contributions

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
