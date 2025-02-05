import { GraphQLError } from "graphql"

export class NotFoundError extends GraphQLError {
  constructor(message: string, statusCode?: number) {
    super(message, {
      extensions: {
        code: "faild",
        http: { status: statusCode || 404 },
      },
    })
  }
}
