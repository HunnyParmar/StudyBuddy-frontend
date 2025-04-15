import { useState } from "react";
import Dashboard from "../Dashboard";

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
    <div className="flex h-screen bg-gray-100">
      <Dashboard />

      {/* Added margin to push the form to the right */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="pr-1 pl-4 pt-4 w-full ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-black">Task Management</h2>
            
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-lg font-medium text-black mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                placeholder="Task Title"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-black text-lg mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                required
              />
            </div>

            <div className="">
              <label className="block text-lg mb-1 font-medium text-black">Status</label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                
                <option value="Backlog">Backlog</option>
                <option value="ToDo">ToDo</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block font-medium text-black text-lg mb-1">Description</label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                placeholder="Task Description (optional)"
              />
            </div>

            <div className="flex gap-4 md:col-span-3 justify-end">
              <button
                type="button"
                onClick={() =>
                  setTask({ title: "", description: "", dueDate: "", status: "Backlog" })
                }
                className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500"
              >
                Clear
              </button>

              <button
                type="submit"
                className="bg-teal-700 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-800"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;