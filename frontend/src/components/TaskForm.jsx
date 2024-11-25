import { useState, useRef } from "react"; // Import useRef
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./TaskForm.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");

  // Define dateInputRef
  const dateInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, priority };
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        setTitle("");
        setDescription("");
        setDueDate(null);
        setPriority("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />

      <div className="date-input-container">
        <Flatpickr
          ref={dateInputRef} // Attach ref to Flatpickr
          className="custom-date-input"
          value={dueDate}
          onChange={(selectedDates) => setDueDate(selectedDates[0])}
          options={{
            dateFormat: "m/d/Y",
            inline: false,
          }}
          placeholder="Select Date"
        />
        <span
          className="calendar-icon"
          onClick={() => dateInputRef.current?.flatpickr.open()} // Use the ref to call Flatpickr's open method
        ></span>
      </div>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;