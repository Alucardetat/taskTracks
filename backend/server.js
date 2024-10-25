const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
require("dotenv").config();
const { readDatabase, writeDatabase } = require("./db");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend
app.use(cors({ origin: "http://localhost:5173" }));

// Serve static files from the public directory
app.use("/public/", express.static(process.cwd() + "/public/"));

// Middleware to parse incoming JSON data
app.use(express.json());

// Test route for server connection verification
app.get("/test/", (req, res) => {
  console.log(req.rawHeaders);
  console.log("Test hit, res", req.ip);
  res.json({ message: "Test successful" });
});

// Route to get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading tasks" });
  }
});

// Route to add a new task
app.post("/tasks", async (req, res) => {
  try {
    const db = await readDatabase();
    const { title, description, dueDate, priority } = req.body;

    const newTask = {
      _id: uuidv4(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };

    db.tasks.push(newTask);
    await writeDatabase(db);

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding task" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readDatabase();

    // Find the task by its ID
    const taskIndex = db.tasks.findIndex((task) => task._id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the completion status of the task
    db.tasks[taskIndex].completed = true;

    // Write the updated data back to the database
    await writeDatabase(db);

    res.json({ message: "Task marked as complete", task: db.tasks[taskIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking task as complete" });
  }
});

app.patch("/tasks/:id/incomplete", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await readDatabase();

    // Find the task by ID
    const taskIndex = db.tasks.findIndex((task) => task._id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task's completed status to false
    db.tasks[taskIndex].completed = false;

    // Write the updated data back to the database
    await writeDatabase(db);

    res.json({
      message: "Task marked as incomplete",
      task: db.tasks[taskIndex],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error marking task as incomplete" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
