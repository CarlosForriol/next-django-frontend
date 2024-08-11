"use client";

import TaskCard from "./TaskCard";

export default function ListTask({ tasks, onTaskDeleted, onTaskDone }) {
  return (
    <div className="bg-slate-700 p-4 w-full">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onTaskDeleted={onTaskDeleted}
          onTaskDone={onTaskDone}
        />
      ))}
    </div>
  );
}
