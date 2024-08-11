"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskCard({ task, onTaskDeleted, onTaskDone }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  // Handle task deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        console.log("Task deleted");
        if (onTaskDeleted) {
          onTaskDeleted(); // Notify parent component
        }
      }
    }
  };

  // Handle marking task as done or undone
  const handleTaskDone = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
      {
        method: "POST",
      }
    );
    if (res.status === 200) {
      console.log("Task marked as done/undone");
      if (onTaskDone) {
        onTaskDone(); // Notify parent component
      }
    }
  };

  // Handle task update
  const handleUpdate = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );
    if (res.status === 200) {
      console.log("Task updated");
      setEditing(false); // Exit editing mode
      if (onTaskDone) {
        onTaskDone(); // Notify parent component
      }
    }
  };

  return (
    <div className="bg-slate-200 p-4 mb-2 rounded-md flex justify-between items-center">
      <div className="w-full">
        {!editing ? (
          <>
            <h1 className="text-xl font-bold text-black">
              {title}
              {task.done && <span> ✅</span>}
            </h1>
            <p className="text-black">{description}</p>
          </>
        ) : (
          <>
            <input
              type="text"
              value={title}
              className="bg-slate-400 rounded-md p-2 w-full mb-2 block text-slate-900"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={description}
              className="bg-slate-400 rounded-md p-2 w-full mb-2 block text-slate-900"
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <button
              className="bg-green-500 text-white rounded-md p-2"
              onClick={() => handleUpdate(task.id)} // Save updates
            >
              Save
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col justify-between gap-y-2">
        <button
          className={`text-white rounded-md p-2 ${task.done ? "bg-gray-500" : "bg-green-500"}`}
          onClick={() => handleTaskDone(task.id)}
        >
          {task.done ? "Undone" : "Done"}
        </button>
        <button
          className="bg-red-500 text-white rounded-md p-2"
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-indigo-500 text-white rounded-md p-2"
          onClick={() => setEditing(!editing)} // Toggle edit mode
        >
          {editing ? "Cancel Edit" : "Edit"}
        </button>
      </div>
    </div>
  );
}
