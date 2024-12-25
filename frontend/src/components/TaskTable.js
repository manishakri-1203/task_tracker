import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { CheckCircle, Edit, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";

const TaskTable = ({ tasks, onEdit, onDelete, onMarkCompleted }) => {
  // Ensure tasks is an array before trying to map over it
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TableContainer style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", padding: "1rem" }}>
        <Typography variant="h4" style={{ marginBottom: "1rem" }}>
          Task List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Task Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Due Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Priority</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safeTasks.map((task) => (
              <TableRow
                key={task._id}
                style={{
                  backgroundColor: task.isOverdue ? "#ffe6e6" : "inherit",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <Tooltip title="Mark as Complete">
                    <IconButton onClick={() => onMarkCompleted(task._id)} color="success">
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Task">
                    <IconButton onClick={() => onEdit(task)} color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton onClick={() => onDelete(task._id)} color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default TaskTable;
