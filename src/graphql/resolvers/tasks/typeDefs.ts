export const taskTypeDefs = `#graphql
 scalar Date
input TaskInput {
    title: String!
    description: String
    startDate: String!
    dueDate: String!
    status: Status!
    assignedTo: ID!
    priority: Priority!
}
enum Status {
    In Progress
    Completed
    Open
}
enum Priority {
   High
   Low
   Medium
}
input TaskInputEdits {
    title: String
    description: String
    startDate: String
    dueDate: String
    status: String
    assignedTo: ID
    priority: String
}

type MoreDetails {
    _id:ID
    name:String
    email:String
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
}

type UserWithTask{
    _id: ID!
    name: String!
    email: String!
   tasks: [Task]

}
type Query{
    allTasks: [Task]
    myTasks: [Task]
    singleTask(id: ID!): Task
    createdByMe: [Task]
    assignedToMe: [Task]
}

type Mutation{
    createTask(input: TaskInput): Task
    updateTask(id: ID!, edits: TaskInputEdits): Boolean
    deleteTask(id: ID!): Boolean
}
`
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTI3OWE3MzZlMDg4M2I3MzRhYjNiYiIsImVtYWlsIjoiakBnbWFpbC5jb20iLCJpYXQiOjE3Mzg3MDEyMjMsImV4cCI6MTc0MTI5MzIyM30.a0N49CBiVN7RSEmmsliPE91xEGIZUuOhe9PStvhpk_8
