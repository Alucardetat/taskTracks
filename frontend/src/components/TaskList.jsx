import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onComplete, onIncomplete, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onIncomplete={onIncomplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;