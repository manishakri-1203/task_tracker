import axios from "axios";

// Use the environment variable for the backend URL, fallback to localhost for local development
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const updateTask = async (id, updatedTask) => {
  const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
