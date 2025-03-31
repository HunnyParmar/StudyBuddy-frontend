import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ id, title, tasks, updateTask, deleteTask  }) => {
  const { setNodeRef } = useDroppable({ id });

  const colorClasses = {
    Backlog: "bg-teal-500",
    ToDo: "bg-teal-500",
    InProgress: "bg-teal-600",
    Completed: "bg-teal-700",
  };

  return (
    <div className="ml-[220px]">
    <div ref={setNodeRef} className="p-4 border rounded-lg shadow-md w-80">
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
    </div>
  );
};

export default TaskColumn;
