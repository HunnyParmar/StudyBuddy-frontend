import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, updateTask, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const handleUpdate = () => {
    updateTask(task._id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-2 mb-2 rounded-md shadow-md cursor-grab"
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            className="border p-1 w-full mb-2"
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            className="border p-1 w-full mb-2"
          />
          <input
            type="date"
            value={updatedTask.dueDate.split("T")[0]}
            onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
            className="border p-1 w-full mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h4 className="font-medium">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">Due: {task.dueDate.split("T")[0]}</p>

<button
  onPointerDownCapture={(e) => e.stopPropagation()} // ✅ Prevent drag blocking
  onClick={() => setIsEditing(true)}
  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>

<button
  onPointerDownCapture={(e) => e.stopPropagation()} // ✅ Prevent drag blocking
  onClick={() => deleteTask(task._id)}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Delete
</button>

        </>
      )}
    </div>
  );
};

export default TaskCard;
