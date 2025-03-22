import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, updateTask, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-2 mb-2 rounded-md shadow-md cursor-grab"
    >
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>

      <button 
        onClick={() => updateTask(task._id, { title: "Updated Title", status: "InProgress" })}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      <button 
        onClick={() => deleteTask(task._id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
