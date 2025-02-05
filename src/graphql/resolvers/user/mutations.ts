import { Request, Response } from "express"
import catchAsyncErrors from "../../../middleware/catchAsyncErrors"
import { IUser } from "../../../types/user"
import User from "../../../models/user.model"
import { NotFoundError } from "../../../utils/errorHandler"
import { generateToken } from "../../../utils/token"

const signup = catchAsyncErrors(
  async (
    _: any,
    { input }: { input: IUser },
    { req, res }: { req: Request; res: Response }
  ) => {
    const exist = await User.findOne({ email: input.email })
    console.log(input)
    console.log(req)

    if (exist) {
      throw new NotFoundError("User already exist", 400)
    }

    const user = new User(input)

    await user.save()

    generateToken({ id: user._id, email: user.email }, res)

    return user
  }
)

const login = catchAsyncErrors(
  async (
    _: any,
    { email, password }: { email: string; password: string },
    { req, res }: { req: Request; res: Response }
  ) => {
    const user = await User.findOne({ email })
    // console.log(email)
    // console.log(req)

    if (!user) {
      throw new NotFoundError("Invalid Credentials", 400)
    }

    const checkPassword = await user.comparePassword(password)

    if (!checkPassword) throw new NotFoundError("Invalid Credentials", 400)
    generateToken({ id: user._id, email: user.email }, res)

    return user
  }
)

export { signup, login }
