import { Types, Document, Model } from "mongoose"

export interface IUser {
  name: string
  email: string
  password: string
}

export interface IUserScema extends IUser, Document {
  _id: Types.ObjectId
  comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IUserModel extends Model<IUserScema> {}

export interface CustomJwtPayload {
  id: string
  email: string
}

export interface authUser {
  _id: string
  email: string
  name: string
  createdAt: string
}
