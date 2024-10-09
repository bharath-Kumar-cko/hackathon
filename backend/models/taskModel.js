import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  storyPoints: {
    type: Number,
    required: true,
  },
  labels: {
    type: [String],
    required: true,
  },
  comments: {
    type: [commentSchema],
    required: true,
  },
});

export const Task = mongoose.model("Task", taskSchema);
