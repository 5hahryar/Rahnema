import express, { NextFunction, Request, Response } from "express";
import { plans, polls, users } from "./data";
import { Poll } from "./models";

const app = express();
app.use(express.json());

const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) throw new Error("No Auth provided!");

    let [username, password] = req.headers.authorization.split(":");
    const user = users.find((u) => {
        return u.username === username && u.password === password
    });

    if(!user) throw new Error("Username or password didn't match!");

    if(req.path === "/polls" && req.method == "POST" && user.role !== "Admin") throw new Error("Not authorized");
    if(req.path.match("/polls/[0-9]+/plans") && req.method == "POST" && user.role !== "Deputy") throw new Error("Not authorized");
    if(req.path.match("/polls/[0-9]+/plans/[0-9]+") && req.method == "POST" && user.role !== "Deputy") throw new Error("Not authorized");

    return next();
};

app.post("/polls", authorizeMiddleware, (req, res) => {
    polls.push({
        id: polls.length.toString(),
        title: req.body.title,
    });
    res.send("Poll added!");
});

app.get("/polls", authorizeMiddleware, (req, res) => {
    console.log(polls);
    res.send(polls);
});

app.get("/polls/:id/plans", authorizeMiddleware, (req, res) => {
    res.send(plans.filter((p) => p.pollId === req.params.id));
});

app.post("/polls/:id/plans", authorizeMiddleware, (req, res) => {
    const isPollAvailable = polls.some((poll) => poll.id == req.params.id);
    if(!isPollAvailable) throw Error("Poll not available!")

    plans.push({
        id: plans.length.toString(),
        pollId: req.params.id,
        title: req.body.title,
        desc: req.body.desc,
        party: req.body.party,
        votes: 0,
    })
    res.send(`Plan added for poll #${req.params.id}`);
});

//QUESTION: "/polls/:id/plans/:planId" or "/plans/:id"?
app.get("/polls/:id/plans/:planId", authorizeMiddleware, (req, res) => {
    const poll = polls.find((poll) => poll.id == req.params.id);
    if(!poll) throw Error("Poll not found!")

    const plan = plans.find((p) => p.id == req.params.planId);
    if(!plan) throw Error("Plan not found!")
    res.send(plan);
});

app.post("/polls/:id/plans/:planId", authorizeMiddleware, (req, res) => {
    const poll = polls.find((poll) => poll.id == req.params.id);
    if(!poll) throw Error("Poll not found!")

    const plan = plans.find((p) => p.id == req.params.planId);
    if(!plan) throw Error("Plan not found!")

    plan.title = req.body.title;
    plan.desc = req.body.desc;

    res.send("Plan updated!");
});

const fn = () => () => {}

//TODO: fix single vote per user
app.post("/votes/:planId", authorizeMiddleware, (req, res) => {
    const plan = plans.find((p) => p.id == req.params.planId);
    if(!plan) throw Error("Plan not found!")

    plan.votes++;

    res.send("Vote added!");
});

app.get("/votes", authorizeMiddleware, (req, res) => {
    res.send(plans.map((p) => `Plan id:${p.id} - ${p.votes} votes`));
});

//TODO: deadline

app.listen(3000, () => {
    console.log("Listening on 3000")
});

/** QUESTION: when to use document and structured data in database.
we can use routes based on the relationship between data like poll>plans
should our route represent the relationship between the data? **/