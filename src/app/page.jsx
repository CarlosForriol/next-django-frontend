"use client";

import { useState, useEffect } from "react";
import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskAdded = async () => {
    await loadTasks(); // Refresh tasks list
  };

  const handleTaskDeleted = async () => {
    await loadTasks(); // Refresh tasks list
  };

  const handleTaskDone = async () => {
    await loadTasks(); // Refresh tasks list
  };

  return (
    <div className="container mx-auto">
      <h1>Welcome to the home page</h1>
      <div className="flex gap-x-10">
        <FormTask onTaskAdded={handleTaskAdded} />
        <ListTask
          tasks={tasks}
          onTaskDeleted={handleTaskDeleted}
          onTaskDone={handleTaskDone}
        />
      </div>
    </div>
  );
}
