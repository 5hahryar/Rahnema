import express from "express";
import { pollsRoutes } from "./routes/polls.route";
import { plansRoutes } from "./routes/plans.route";
import { votesRoutes } from "./routes/votes.route";

export const app = express()

app.use(express.json());

app.use(pollsRoutes);
app.use(plansRoutes);
app.use(votesRoutes);