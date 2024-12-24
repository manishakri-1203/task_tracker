import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const TaskModal = ({ open, onClose, onSubmit, task }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        name: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
      setFormData({ name: "", description: "", dueDate: "", priority: "Medium", status: "Pending" });
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting the task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Task Name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter task name"
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          name="dueDate"
          type="date"
          label="Due Date"
          fullWidth
          value={formData.dueDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="priority"
          select
          label="Priority"
          fullWidth
          value={formData.priority}
          onChange={handleChange}
          margin="normal"
        >
          {["Low", "Medium", "High"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="status"
          select
          label="Status"
          fullWidth
          value={formData.status}
          onChange={handleChange}
          margin="normal"
        >
          {["Pending", "In Progress", "Completed"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
