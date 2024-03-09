import mongoose from "mongoose";

// set rule
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// create table
export const TodoList = mongoose.model("TodoList", todoSchema);
