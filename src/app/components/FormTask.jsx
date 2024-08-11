"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (onTaskAdded) {
      onTaskAdded(); // Llama al manejador después de agregar la tarea
    }
    setTitle(""); // Limpia el formulario
    setDescription(""); // Limpia el formulario
    router.refresh(); // Opcional, si estás usando enrutamiento basado en Next.js
  };

  return (
    <div className="bg-slate-200 p-7 h-fit">
      <h1 className="text-2xl font-bold mb-4 text-black">Add Task</h1>
      <label htmlFor="title" className="text-black">
        Title:
      </label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          className="bg-slate-400 rounded-md p-2 w-full mb-2 block text-slate-900"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="text-black">
          Description:
        </label>
        <textarea
          name="description"
          value={description}
          className="bg-slate-400 rounded-md p-2 w-full mb-2 block text-slate-900"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-md p-2 block w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
