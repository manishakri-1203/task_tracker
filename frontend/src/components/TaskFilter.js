import React from "react";
import { TextField, MenuItem } from "@mui/material";

const TaskFilter = ({ statusFilter, setStatusFilter, searchQuery, setSearchQuery }) => {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />

      {/* Filter by Status */}
      <TextField
        select
        label="Filter by Status"
        variant="outlined"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        fullWidth
      >
        {["All", "Pending", "In Progress", "Completed"].map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default TaskFilter;
