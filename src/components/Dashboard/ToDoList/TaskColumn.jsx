import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ id, title, tasks, updateTask, deleteTask  }) => {
  const { setNodeRef } = useDroppable({ id });

  const colorClasses = {
    Backlog: "bg-gray-400",
    ToDo: "bg-red-500",
    InProgress: "bg-blue-500",
    Completed: "bg-green-500",
  };

  return (
    <div ref={setNodeRef} className="p-4 border rounded-lg shadow-md">
      <h3 className={`text-lg font-bold mb-2 ${colorClasses[title]} text-white p-2 rounded-md`}>
        {title}
      </h3>
      {tasks.map((task) => (
        <TaskCard 
          key={task._id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
    
  );
};

export default TaskColumn;
