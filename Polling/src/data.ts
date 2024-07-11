import { Plan, Poll, User } from "./models"

const users: Array<User> = [
    {
        username: "admin",
        password: "admin",
        role: "Admin",

    },
    {
        username: "deputy",
        password: "deputy",
        role: "Deputy",
    },
    {
        username: "citizen",
        password: "citizen",
        role: "Citizen",
    }
]

let polls: Array<Poll> = [];
let plans: Array<Plan> = [];

export { users, polls, plans }