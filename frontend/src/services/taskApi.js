import axios from "axios";

// Replace with your actual backend URL
const API_BASE_URL = "https://task-tracker-nxfl.onrender.com/api/tasks";

// Function to get the token from localStorage (or sessionStorage/cookies if needed)
const getAuthToken = () => {
  return localStorage.getItem("token"); // Or sessionStorage, or cookies
};

// Function to handle the response and ensure it's an array
const handleResponse = (response) => {
  // Ensure that the response data is an array
  if (Array.isArray(response.data)) {
    return response.data;
  } else {
    // If it's not an array, return an empty array (or handle the error as needed)
    console.error("Expected an array, but got:", response.data);
    return [];
  }
};

export const fetchTasks = async () => {
  try {
    const token = getAuthToken(); // Get the token from storage
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      : {};

    const response = await axios.get(API_BASE_URL, config);
    return handleResponse(response); // Ensure it's an array
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []; // Return an empty array in case of error
  }
};

export const createTask = async (task) => {
  try {
    const token = getAuthToken(); // Get the token from storage
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      : {};

    const response = await axios.post(API_BASE_URL, task, config);
    return handleResponse(response); // Ensure it's an array
  } catch (error) {
    console.error("Error creating task:", error);
    return {}; // Return empty object in case of error
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const token = getAuthToken(); // Get the token from storage
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      : {};

    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedTask, config);
    return handleResponse(response); // Ensure it's an array
  } catch (error) {
    console.error("Error updating task:", error);
    return {}; // Return empty object in case of error
  }
};

export const deleteTask = async (id) => {
  try {
    const token = getAuthToken(); // Get the token from storage
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      : {};

    const response = await axios.delete(`${API_BASE_URL}/${id}`, config);
    return handleResponse(response); // Ensure it's an array
  } catch (error) {
    console.error("Error deleting task:", error);
    return {}; // Return empty object in case of error
  }
};
