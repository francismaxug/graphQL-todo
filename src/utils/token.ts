import jwt from "jsonwebtoken"
import config from "../config/index"
import { Response } from "express"
import { Types } from "mongoose"
const secret = config.auth.secret()
export const generateToken = (
  payload: { id: Types.ObjectId; email: string },
  res: Response
) => {
  const token = jwt.sign(payload, secret as string, {
    expiresIn: "30d",
  })
  // console.log(token)
  res.cookie("token", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "none",
    // maxAge: 30 * 24 * 60 * 60 * 1000
  })
  return
}

// import jwt from "jsonwebtoken"
// const getToken = (user, res) => {
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRESIN
//   })
//   res.cookie("jwt", token, {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "development" ? false : true,
//     sameSite: "none"
//     // maxAge: 30 * 24 * 60 * 60 * 1000
//   })
//   return
// }

// export default getToken
