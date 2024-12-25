import axios from "axios";

// Replace with your actual backend URL
const API_BASE_URL = "https://task-tracker-nxfl.onrender.com/api/tasks";

// Function to get the token from localStorage (or sessionStorage/cookies if needed)
const getAuthToken = () => {
  return localStorage.getItem("token"); // Or sessionStorage, or cookies
};

export const fetchTasks = async () => {
  const token = getAuthToken(); // Get the token from storage
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      }
    : {};

  const response = await axios.get(API_BASE_URL, config);
  return response.data;
};

export const createTask = async (task) => {
  const token = getAuthToken(); // Get the token from storage
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      }
    : {};

  const response = await axios.post(API_BASE_URL, task, config);
  return response.data;
};

export const updateTask = async (id, updatedTask) => {
  const token = getAuthToken(); // Get the token from storage
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      }
    : {};

  const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedTask, config);
  return response.data;
};

export const deleteTask = async (id) => {
  const token = getAuthToken(); // Get the token from storage
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      }
    : {};

  const response = await axios.delete(`${API_BASE_URL}/${id}`, config);
  return response.data;
};
