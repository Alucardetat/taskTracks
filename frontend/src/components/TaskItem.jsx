// TaskItem.jsx
import React from "react";
import "./TaskItem.css"; // Make sure you have the TaskItem CSS file

const TaskItem = ({ task, onComplete, onIncomplete }) => {
  return (
    <div
      className="task-item"
      style={{ textDecoration: task.completed ? "line-through" : "none" }}
    >
      <div className="task-main">
        <h3 className="task-title">{task.title}</h3>
        <p>Due Date: {task.dueDate}</p>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
        <button
          onClick={() =>
            task.completed ? onIncomplete(task._id) : onComplete(task._id)
          }
        >
          {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
      </div>
      <p className="task-description">{task.description}</p>
    </div>
  );
};

export default TaskItem;
