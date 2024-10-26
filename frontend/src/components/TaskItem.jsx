import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, onComplete, onIncomplete, onDelete }) => {
  return (
    <div
      className="task-item"
      style={{ textDecoration: task.completed ? "line-through" : "none" }}
    >
      <div className="task-content">
        <div className="task-details">
          <h3 className="task-title">{task.title}</h3>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
        </div>

        <div className="task-description">
          <p>{task.description}</p>
        </div>
      </div>

      <div className="task-buttons">
        <button
          onClick={() =>
            task.completed ? onIncomplete(task._id) : onComplete(task._id)
          }
        >
          {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
