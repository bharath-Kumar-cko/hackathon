import express from "express";
import { Task } from "../models/taskModel.js";

export const tasksRouter = express.Router();

tasksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.send(task).status(200);
});

tasksRouter.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks).status(200);
});

tasksRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      assignee,
      priority,
      storyPoints,
      labels,
      comments,
    } = req.body;

    // Validation
    if (!title || !description || !assignee || !priority || !storyPoints) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create and save a new task
    const newTask = new Task({
      title,
      description,
      status,
      assignee,
      priority,
      storyPoints,
      labels,
      comments,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

tasksRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.send(task).status(200);
});
