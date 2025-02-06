import { Request, Response } from "express"
import catchAsyncErrors from "../../../middleware/catchAsyncErrors"
import { authUser } from "../../../types/user"
import { NotFoundError } from "../../../utils/errorHandler"
import { ITask } from "../../../types/tasks"
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

const updateTask = catchAsyncErrors(
  async (
    _: any,
    { id, edits }: { id: string; edits: ITask },
    { req, res, user }: { req: Request; res: Response; user: authUser }
  ) => {
  
  

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      edits
    )

    if (!updatedTask)
      throw new NotFoundError("This task  cannot be updated by you", 400)

    // console.log(updatedTask)
    return true
  }
)

const deleteTask = catchAsyncErrors(
  async (_: any, { id }: { id: string }, { user }: { user: authUser }) => {
   

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      createdBy: user._id,
    })

    if (!deletedTask)
      throw new NotFoundError("This task  cannot be deleted by you", 400)

    return true
  }
)

export { createTask, updateTask, deleteTask }
