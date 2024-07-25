import express from "express";
import { groupsRoutes } from "./routes/group.route";
import { expensesRoutes } from "./routes/expense.route";

export const api = express();

api.use(express.json());
api.use("/groups", groupsRoutes);
api.use("/expenses", expensesRoutes);