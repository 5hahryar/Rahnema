import express from "express";
import { pollsRoutes } from "./routes/polls.route";
import { plansRoutes } from "./routes/plans.route";
import { votesRoutes } from "./routes/votes.route";

export const api = express()

api.use(express.json());

api.use(pollsRoutes);
api.use(plansRoutes);
api.use(votesRoutes);