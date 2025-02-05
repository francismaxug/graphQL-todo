import { ApolloServer } from "@apollo/server"

import { expressMiddleware } from "@apollo/server/express4"
import jwt from "jsonwebtoken"

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from "cors"
import http from "http"
import express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import config from "./config/index"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { typeDefs, resolvers } from "./graphql"
import { connectDb } from "./config/db"
import User from "./models/user.model"
import { CustomJwtPayload } from "./types/user"
import { createContext } from "./middleware/auth"
const PORT = config.server.port()
const url = config.mongoDb.uri()
const secret = config.auth.secret()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const httpServer = http.createServer(app)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    //@ts-ignore
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
})

async function startServer() {
  await server.start()

  connectDb(url)

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: "*", // Allow frontend origin
      credentials: true, // Allow sending cookies with requests
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const token =
          req.cookies?.token || req.headers.authorization?.split(" ")[1]
        let user = null
        // console.log(token)
        // console.log(req.cookies)

        if (token) {
          try {
            const decoded = jwt.verify(token, secret!) as CustomJwtPayload
            // console.log(decoded)
            user = await User.findById(decoded.id).select(
              "-password -updatedAt"
            )

            if (!user) throw new Error("User not found")
          } catch (error) {
            throw new Error("Invalid or expired token")
          }
        }

        return { req, res, user }
      },
    })
  )

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
}

app.post("/token", (req: Request, res: Response) => {
  console.log(req.body)
  res.end()
})

startServer().catch((err) => {
  console.error("Error starting server:", err)
})
