import { useState, useEffect } from "react";
import axios from "../../../App/axios"; // ✅ Using custom Axios instance
import { DndContext, closestCenter } from "@dnd-kit/core";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/user/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("/user/tasks/", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks([...tasks, response.data.task]);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  const updateTask = async (id, updatedTaskData) => {
    try {
      console.log("Updating Task ID:", id, "with data:", updatedTaskData);

      const response = await axios.put(`/user/tasks/${id}`, updatedTaskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Task Updated Successfully:", response.data);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("Deleting Task ID:", id);

      await axios.delete(`/user/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      console.log("Task Deleted Successfully");
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id;
    const targetColumn = over.id;

    const updatedTask = tasks.find((task) => task._id === activeTaskId);

    if (updatedTask && updatedTask.status !== targetColumn) {
      updateTask(activeTaskId, { ...updatedTask, status: targetColumn });
    }
  };

  const categories = ["Backlog", "ToDo", "InProgress", "Completed"];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <TaskForm addTask={addTask} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="ml-[230px] p-2 border border-gray-300 rounded-lg">
          <div className="grid grid-cols-4">
            {categories.map((category) => (
              <TaskColumn
                key={category}
                id={category}
                title={category}
                tasks={tasks.filter((task) => task.status === category)}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default ToDoList;
