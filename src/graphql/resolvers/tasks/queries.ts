import { Request, Response } from "express"
import catchAsyncErrors from "../../../middleware/catchAsyncErrors"
import { NotFoundError } from "../../../utils/errorHandler"
import Task from "../../../models/tasks.model"
import User from "../../../models/user.model"
import { authUser } from "../../../types/user"

const allTasks = catchAsyncErrors(
  async (
    _: any,
    __: any,
    { req, res, user }: { req: Request; res: Response; user: authUser }
  ) => {
    // console.log("Hello Ghana")
    if (!user) throw new NotFoundError("Unauthorized", 401)
    const allTasks = await Task.find({})
      .populate("assignedTo", "_id name email") // Add fields you want
      .populate("createdBy", "_id name email")
      .sort({ createdAt: -1 })
      .limit(10)
    // console.log(allTasks)
    return allTasks
  }
)
const singleTask = catchAsyncErrors(
  async (
    _: any,
    { id }: { id: string },
    { req, res, user }: { req: Request; res: Response; user: authUser }
  ) => {
    // console.log(id)
    if (!user) throw new NotFoundError("Unauthorized", 401)
    const task = await Task.findById(id)
      .populate("assignedTo", "_id name email") // Add fields you want
      .populate("createdBy", "_id name email")

    if (!task) throw new NotFoundError("Task not found", 404)

    return task
  }
)
const createdByMe = catchAsyncErrors(
  async (
    _: any,
    { id }: { id: string },
    { req, res, user }: { req: Request; res: Response; user: authUser }
  ) => {
    // console.log(id)
    if (!user) throw new NotFoundError("Unauthorized", 401)
    const task = await Task.find({ createdBy: user._id }).populate(
      "assignedTo",
      "_id name email"
    )

    if (!task) throw new NotFoundError("Task not found", 404)

    return task
  }
)
const assignedToMe = catchAsyncErrors(
  async (
    _: any,
    { id }: { id: string },
    { req, res, user }: { req: Request; res: Response; user: authUser }
  ) => {
    // console.log(id)
    if (!user) throw new NotFoundError("Unauthorized", 401)
    const task = await Task.find({ assignedTo: user._id }).populate(
      "createdBy",
      "_id name email"
    )

    if (!task) throw new NotFoundError("Task not found", 404)

    return task
  }
)
export { allTasks, singleTask, createdByMe, assignedToMe }
