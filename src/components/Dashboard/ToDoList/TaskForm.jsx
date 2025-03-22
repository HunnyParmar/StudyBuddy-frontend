// TaskForm.jsx
import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Backlog",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      addTask(task);
      setTask({ title: "", description: "", dueDate: "", status: "Backlog" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Task Management</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Task Title"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Backlog">Backlog</option>
            <option value="ToDo">ToDo</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="col-span-3">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Task Description (optional)"
          />
        </div>

        <div className="flex gap-2 col-span-3">
          <button
            type="button"
            onClick={() =>
              setTask({ title: "", description: "", dueDate: "", status: "Backlog" })
            }
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Clear
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
