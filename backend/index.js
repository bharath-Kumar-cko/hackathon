import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { tasksRouter } from "./router/tasksRouter.js";

const app = express();

app.get("/health-check", (req, res) => {
  res.send("I am OK").status(200);
});
app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(5000, async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017")
      .then(() => console.log("MongoDB connected..."))
      .catch((err) => console.log(err));
  } catch (Err) {
    console.log(Err);
    console.log("Error connecting to MongoDB");
  }

  console.log("Server is running on port 5000");
});
