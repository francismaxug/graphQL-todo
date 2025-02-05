import { Schema, model } from "mongoose"
import { IUserModel, IUserScema } from "../types/user"
import argon2 from "argon2"

const UserSchema = new Schema<IUserScema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  try {
    this.password = await argon2.hash(this.password)
    next()
  } catch (error) {
    throw error
  }
})

UserSchema.methods.comparePassword = async function (password: string) {
  try {
    return await argon2.verify(this.password, password)
  } catch (error) {
    throw error
  }
}

const User = model<IUserScema, IUserModel>("User", UserSchema)
export default User