import mongoose, { Document, Types, Model } from "mongoose"
export interface ITasks {
  _id: string
  title: string
  description: string
  startDate: string
  dueDate: string
  status: string
  assignedTo: { _id: string; name: string }
  priority: string
  createdBy: { _id: string; name: string }
}
export interface ITask {
  title: string
  description: string
  startDate: string
  dueDate: string
  status: string
  assignedTo: string
  priority: string
  createdBy: string
}
export interface ITaskSchema
  extends Omit<
      ITasks,
      "assinedTo" | "createdBy" | "_id" | "startDate" | "dueDate"
    >,
    Document {
  startDate: Date
  dueDate: Date
  assinedTo: Types.ObjectId
  createdBy: Types.ObjectId
  createdAt: Date
}

export interface ITaskModel extends Model<ITaskSchema> {}
