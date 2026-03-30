import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Todo from "./src/models/todo.model.js";
import connectDB from "./src/db.js";
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// CREATE
app.post("/todos", async (req, res) => {
  const { title, content, isDone } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "all inputs required" });

  const todo = await Todo.create({ title, content, isDone: isDone || false });
  if (!todo)
    return res
      .status(400)
      .json({ message: "Todo not created! Something went wrong" });

  res.status(201).json({ data: todo, message: "Todo created successfully" });
});

// GET ALL
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({ data: todos, message: "Todos fetched successfully" });
});

// GET ONE
app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json({ data: todo, message: "Todo fetched successfully" });
});

// UPDATE
app.patch("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json({ data: todo, message: "Todo updated successfully" });
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json({ message: "Todo deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
