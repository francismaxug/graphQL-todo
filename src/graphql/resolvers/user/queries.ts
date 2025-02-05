import { Request, Response } from "express"
import catchAsyncErrors from "../../../middleware/catchAsyncErrors"
import { NotFoundError } from "../../../utils/errorHandler"
import Task from "../../../models/tasks.model"

const getMe = catchAsyncErrors(
  async (
    _: any,
    __: any,
    { req, res, user }: { req: Request; res: Response; user: any }
  ) => {
    if (!user) throw new NotFoundError("User not found", 404)
    console.log(user)
    return user
  }
)
const userWithTasks = catchAsyncErrors(
  async (
    _: any,
    __: any,
    { req, res, user }: { req: Request; res: Response; user: any }
  ) => {
    if (!user) throw new NotFoundError("User not found", 404)

    const tasks = await Task.find({ createdBy: user._id })
      .populate("assignedTo", "_id name email")
      .populate("createdBy", "_id name email")
    return { ...user.toObject(), tasks }
  }
)
export { getMe, userWithTasks }
