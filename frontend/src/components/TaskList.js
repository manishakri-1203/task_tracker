import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/taskApi";
import TaskModal from "./TaskModal";
import DeleteDialog from "./DeleteDialog";
import TaskFilter from "./TaskFilter";
import TaskTable from "./TaskTable";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tasks from API on initial load
  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      console.log("Fetched tasks:", tasksData); // Log the fetched data to check structure
      setTasks(tasksData);
      setFilteredTasks(tasksData);
    };
    getTasks();
  }, []);

  // Apply filters and search query
  useEffect(() => {
    const filtered = tasks.filter((task) =>
      (statusFilter === "All" || task.status === statusFilter) &&
      (task.name && task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredTasks(filtered);
  }, [statusFilter, searchQuery, tasks]);

  // Handle add or edit task
  const handleAddOrEditTask = async (taskData) => {
    if (taskData._id) {
      const updatedTask = await updateTask(taskData._id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    } else {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
    }
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Handle delete task
  const handleDeleteTask = async () => {
    await deleteTask(deleteTaskId);
    setTasks((prev) => prev.filter((task) => task._id !== deleteTaskId));
    setIsDeleteDialogOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f8ff, #e0f7fa)",
        padding: "20px 0",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ background: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Tracker
          </Typography>
          <Button color="inherit" onClick={() => setIsModalOpen(true)}>
            Add Task
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Grid container spacing={2} alignItems="center">
          {/* Filters */}
          <Grid item xs={12}>
            <TaskFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </Grid>

          {/* Task Table */}
          <Grid item xs={12}>
            <TaskTable
              tasks={filteredTasks}
              onEdit={(task) => {
                setSelectedTask(task);
                setIsModalOpen(true);
              }}
              onDelete={(id) => {
                setDeleteTaskId(id);
                setIsDeleteDialogOpen(true);
              }}
              onMarkCompleted={(id) =>
                handleAddOrEditTask({ _id: id, status: "Completed" })
              }
            />
          </Grid>
        </Grid>
      </Container>

      {/* Modals */}
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOrEditTask}
        task={selectedTask}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </Box>
  );
};

export default TaskList;
