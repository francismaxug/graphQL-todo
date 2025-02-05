import { Request, Response } from "express"
import catchAsyncErrors from "../../../middleware/catchAsyncErrors"
import { authUser, IUser } from "../../../types/user"
import { NotFoundError } from "../../../utils/errorHandler"
import { generateToken } from "../../../utils/token"
import { ITask, ITasks } from "../../../types/tasks"
import Task from "../../../models/tasks.model"

const createTask = catchAsyncErrors(
  async (
    _: any,
    { input }: { input: ITask },
    { req, res, user }: { req: Request; res: Response; user: authUser }
  ) => {
    if (!user) throw new NotFoundError("Unauthorized", 401)

    const newTask = new Task({ ...input, createdBy: user._id })
    await newTask.save()
    return newTask
  }
)

export { createTask }
