import express from "express";
import { groupRoutes } from "./routes/group.route";
import { expenseRoutes } from "./routes/expense.route";

export const api = express();

api.use(express.json());
api.use(groupRoutes);
api.use(expenseRoutes);