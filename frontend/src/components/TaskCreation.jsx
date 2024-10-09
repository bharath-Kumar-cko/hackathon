import React, { useState } from "react";

export const TaskCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending", // Default value for status
    assignee: "",
    priority: "medium", // Default value for priority
    storyPoints: 0,
    labels: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const createdTask = await response.json();
        window.location.href = `/tasks/${createdTask._id}`;
        setFormData({
          title: "",
          description: "",
          status: "pending",
          assignee: "",
          priority: "medium",
          storyPoints: 0,
          labels: "",
        }); // Reset form after successful creation
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-1/2"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-1/2"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Assignee:</label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-1/2"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Story Points:</label>
            <input
              type="number"
              name="storyPoints"
              value={formData.storyPoints}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-1/2"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Labels:</label>
            <input
              type="text"
              name="labels"
              value={formData.labels}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-1/2"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
