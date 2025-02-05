export const userTypeDefs = `#graphql
scalar Date
input UserInput {
    name: String!
    email: String!
    password: String!
}
type Task{
    _id: ID!
    title: String!
    description: String
    startDate: Date!
    dueDate: Date!
    status: Status
    assignedTo: MoreDetails
    createdBy: MoreDetails
    priority: Priority
    createdAt: Date!
}

type User{
    _id: ID!
    name: String!
    email: String!
    password: String
}
type UserWithTask{
    _id: ID!
    name: String!
    email: String!
   tasks: [Task]

}

type Query{
    users: [User]
    getMe: User
    userWithTasks: UserWithTask
}

type Mutation{
    signup(input: UserInput): User
    login(email: String!, password: String!): User
   
}
`
