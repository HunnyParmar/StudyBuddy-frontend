import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const TaskColumn = ({ id, title, tasks, updateTask, deleteTask  }) => {
  const { setNodeRef } = useDroppable({ id });

  const colorClasses = {
    Backlog: "bg-teal-700",
    ToDo: "bg-teal-700",
    InProgress: "bg-teal-700",
    Completed: "bg-teal-700",
  };

  return (
    
    <div
  ref={setNodeRef}
  className="flex flex-col border border-gray-300 rounded-sm shadow-md w-50 h-100"
>
  <h3
    className={`text-lg font-bold ${colorClasses[title]} text-white p-2 rounded-t-sm`}
  >
    {title}
  </h3>

  <div className="overflow-y-auto p-2 flex-1">
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
