type Role = "Admin" | "Deputy" | "Citizen"
type Party = "Left" | "Right"

type User = {
    username: string,
    password: string,
    role: Role,
}

type Plan = {
    id: string,
    pollId: string,
    title: string,
    desc: string,
    party: Party,
    votes: number,
}

type Poll = {
    id: string,
    title: string,
}

export { Role, User, Poll, Plan, Party }