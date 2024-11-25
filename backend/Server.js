const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./database.js");
const Task = require("./models/Task"); // Task model

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test Route
app.get("/test", (req, res) => {
    console.log(req.rawHeaders);
    res.json({ message: "Test successful" });
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving tasks" });
    }
});

// Add a New Task
app.post("/tasks", async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
        });

        await newTask.save();
        res.status(201).json({ message: "Task added successfully", task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding task" });
    }
});

// Mark Task as Complete
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = true;
        await task.save();

        res.json({ message: "Task marked as complete", task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating task" });
    }
});

// Mark Task as Incomplete
app.patch("/tasks/:id/incomplete", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = false;
        await task.save();

        res.json({ message: "Task marked as incomplete", task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating task" });
    }
});

// Delete a Task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting task" });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});