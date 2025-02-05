import { userTypeDefs } from "./resolvers/user/typeDefs"
import { signup, login } from "./resolvers/user/mutations"
import { createTask } from "./resolvers/tasks/mutations"
import { getMe, userWithTasks } from "./resolvers/user/queries"
import { taskTypeDefs } from "./resolvers/tasks/typeDefs"
import {
  allTasks,
  singleTask,
  createdByMe,
  assignedToMe,
} from "./resolvers/tasks/queries"
import { GraphQLScalarType, Kind } from "graphql"

//Hanle DateTime type
const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    // Convert the Date object to a string (ISO format) when sending to the client
    if (value instanceof Date) {
      return value.toISOString()
    }
    throw new Error("GraphQL Date scalar can only serialize Date objects")
  },
  parseValue(value) {
    // Convert the incoming string (ISO format) to a Date object
    if (typeof value === "string") {
      return new Date(value)
    }
    throw new Error("GraphQL Date scalar can only parse string values")
  },
  parseLiteral(ast) {
    // Handle AST (Abstract Syntax Tree) for inline values in queries
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  },
})

// Define the typeDefs and resolvers
export const typeDefs = [userTypeDefs, taskTypeDefs]

export const resolvers = {
  Date: DateScalar,
  Query: {
    getMe,
    allTasks,
    singleTask,
    createdByMe,
    assignedToMe,
    userWithTasks,
  },
  Mutation: {
    signup,
    login,
    createTask,
  },
}
