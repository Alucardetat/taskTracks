import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onIncomplete }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onIncomplete={onIncomplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
