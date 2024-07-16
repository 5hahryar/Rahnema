import { plans, polls } from "../data";
import { authorizeMiddleware } from "../middleware/middleware";
import { Request, Response, Router } from "express";

export const votesRoutes = Router();

//TODO: fix single vote per user
votesRoutes.post("/votes/:planId", authorizeMiddleware, (req, res) => {
    const plan = plans.find((p) => p.id == req.params.planId);
    if(!plan) throw Error("Plan not found!")

    let poll = polls.find((poll) => poll.id === plan.pollId);
    if(!poll) throw Error("Poll not found!")
    if(new Date() > poll.votingDeadline) throw Error("Planning deadline has passed!")

    plan.votes++;

    res.send("Vote added!");
});

votesRoutes.get("/votes", authorizeMiddleware, (req, res) => {
    res.send(plans.map((p) => `Plan id:${p.id} - ${p.votes} votes`));
});