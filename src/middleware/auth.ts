import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { CustomJwtPayload } from "../types/user"
import User from "../models/user.model"

export const createContext = async ({
  req,
  res,
}: {
  req: Request
  res: Response
}) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  let user = null

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as CustomJwtPayload
      console.log(decoded)
      user = await User.findById(decoded.id)

      if (!user) throw new Error("User not found")
    } catch (error) {
      throw new Error("Invalid or expired token")
    }
  }
  return { req, res, user }
}
