import { plans, polls } from "../data";
import { authorizeMiddleware } from "../middleware/middleware";
import { Request, Response, Router } from "express";

export const plansRoutes = Router();

plansRoutes.get("/polls/:id/plans", authorizeMiddleware, (req, res) => {
    res.send(plans.filter((p) => p.pollId === req.params.id));
});

plansRoutes.post("/polls/:id/plans", authorizeMiddleware, (req, res) => {
    const poll = polls.find((poll) => poll.id == req.params.id);
    if(!poll) throw Error("Poll not available!")

    if(new Date() > poll.planingDeadline) throw Error("Planning deadline has passed!")

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
plansRoutes.get("/polls/:id/plans/:planId", authorizeMiddleware, (req, res) => {
    const poll = polls.find((poll) => poll.id == req.params.id);
    if(!poll) throw Error("Poll not found!")

    const plan = plans.find((p) => p.id == req.params.planId);
    if(!plan) throw Error("Plan not found!")
    res.send(plan);
});

plansRoutes.post("/polls/:id/plans/:planId", authorizeMiddleware, (req, res) => {
    const poll = polls.find((poll) => poll.id == req.params.id);
    if(!poll) throw Error("Poll not found!")

    if(new Date() > poll.planingDeadline) throw Error("Planning deadline has passed!")

    const plan = plans.find((p) => p.id == req.params.planId);
    if(!plan) throw Error("Plan not found!")

    plan.title = req.body.title;
    plan.desc = req.body.desc;

    res.send("Plan updated!");
});