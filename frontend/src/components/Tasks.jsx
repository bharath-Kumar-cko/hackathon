import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Task } from "./Task";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Tasks Overview
        </h2>

        <Link
          to="/tasks/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Task
        </Link>

        <div className="overflow-x-auto mt-7">
          <table className="w-full table-auto border-collapse rounded-lg shadow-sm">
            <thead className="bg-slate-500 text-white text-left">
              <tr>
                <th className="py-4 px-6 font-semibold">Title</th>
                <th className="py-4 px-6 font-semibold">Description</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Assignee</th>
                <th className="py-4 px-6 font-semibold">Priority</th>
                <th className="py-4 px-6 font-semibold">Story Points</th>
                <th className="py-4 px-6 font-semibold">Labels</th>
                <th className="py-4 px-6 font-semibold">Comments</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b last:border-none hover:bg-blue-50 transition duration-200"
                    onClick={() => {
                      window.location.href = `/tasks/${task._id}`;
                    }}
                  >
                    <td className="py-4 px-6">{task.title}</td>
                    <td className="py-4 px-6 truncate max-w-xs">
                      {task.description}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.status === "completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">{task.assignee}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.priority === "high"
                            ? "bg-red-200 text-red-800"
                            : task.priority === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">{task.storyPoints}</td>
                    <td className="py-4 px-6">{task.labels}</td>
                    <td className="py-4 px-6 text-center">
                      {task.comments.length}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
