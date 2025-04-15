import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { RiCloseLine, RiEdit2Line } from "react-icons/ri";

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
      className="bg-white/15 p-4 mb-1 rounded-md shadow-md cursor-grab relative"
    >
      {/* Delete Icon - Top Right */}
      <RiCloseLine
        onPointerDownCapture={(e) => e.stopPropagation()}
        onClick={() => deleteTask(task._id)}
        className="absolute top-2 right-2 text-red-800 hover:text-gray-600 cursor-pointer text-xl"
        title="Delete"
      />

      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className="border p-1 w-full mb-2"
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className="border p-1 w-full mb-2"
          />
          <input
            type="date"
            value={updatedTask.dueDate.split("T")[0]}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
            }
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
          <h4 className="text-xl font-bold capitalize">{task.title}</h4>
          <p className="text-sm italic text-gray-600 ">
            {task.description}
          </p>

          <div className="text-sm text-gray-500 mt-1">
            Due: {task.dueDate.split("T")[0]}
          </div>

          {/* Edit Icon - Bottom Right */}
          <div className="absolute bottom-2 right-2">
            <button
              onPointerDownCapture={(e) => e.stopPropagation()}
              onClick={() => setIsEditing(true)}
              className="p-1 border border-blue-900 rounded-full text-blue-900 hover:bg-blue-100"
              title="Edit"
            >
              <RiEdit2Line size={12} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
