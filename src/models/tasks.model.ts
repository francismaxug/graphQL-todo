import mongoose, { models } from "mongoose"
import { ITaskModel, ITaskSchema } from "../types/tasks"

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
)
const Task =  mongoose.model<ITaskSchema, ITaskModel>("Task", taskSchema)
export default Task
