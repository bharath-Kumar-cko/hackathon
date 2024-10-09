import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Determines if we're in edit mode
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    assignee: "",
    priority: "",
    storyPoints: "",
    labels: "",
  });

  useEffect(() => {
    // Fetch task data by taskId
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${taskId}`);
        const data = await response.json();
        setTask(data);
        setFormData({
          title: data.title,
          description: data.description,
          status: data.status,
          assignee: data.assignee,
          priority: data.priority,
          storyPoints: data.storyPoints,
          labels: data.labels,
        });
      } catch (error) {
        console.error("Failed to fetch task", error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTask(updatedTask);
        setIsEditing(false); // Exit edit mode after saving
      } else {
        console.error("Failed to save task");
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Details</h2>
        <div className="space-y-4">
          {/* Unified form layout for view and edit modes */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`border rounded px-2 py-1 w-1/2 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`border rounded px-2 py-1 w-1/2 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`border rounded px-2 py-1 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              disabled={!isEditing}
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
              className={`border rounded px-2 py-1 w-1/2 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Priority:</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`border rounded px-2 py-1 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              disabled={!isEditing}
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
              className={`border rounded px-2 py-1 w-1/2 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Labels:</label>
            <input
              type="text"
              name="labels"
              value={formData.labels}
              onChange={handleChange}
              className={`border rounded px-2 py-1 w-1/2 ${
                isEditing ? "" : "bg-gray-100"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            {isEditing ? (
              <>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEditToggle}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
