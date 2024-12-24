import React from "react";
import TaskList from "../components/TaskList";

function Home() {
  return (
    <div>
      <TaskList /> {/* TaskList will handle the title */}
    </div>
  );
}

export default Home;
