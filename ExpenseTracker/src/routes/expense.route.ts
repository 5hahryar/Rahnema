import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { groups } from "../data/groups";
import { ZodError, string, z } from "zod";
import { users } from "../data/users";
import { expenses } from "../data/expenses";
import { Expense } from "../models/expense";

export const expenseRoutes = Router();

const ExpenseDTO = z.object({
    title: z.string().min(1),
    amount: z.number().min(1),
    payerUsername: z.string().min(1),
    groupName: z.string().min(1),
});

expenseRoutes.get("/expenses", authMiddleware, (req, res) => {
    if(req.query.payerUsername) {
        const payerUsername = req.query.payerUsername;
        return res.send(expenses.filter((e) => e.payerUsername === payerUsername));
    }

    if(req.query.username) {
        const username = req.query.username as string
        const joinedGroupsNames = groups.filter((g) => g.usernames.includes(username)).map((g) => g.name);

        let userExpenses: Expense[] = [];
        joinedGroupsNames.forEach((groupName) => {
            userExpenses = [...userExpenses , ...expenses.filter((e) => e.groupName === groupName)]
        });

        return res.send(userExpenses);
    }

    return res.send(expenses);
});

expenseRoutes.post("/expenses", authMiddleware, (req, res) => {
    try {
        const dto = ExpenseDTO.parse(req.body);

        if(!users.some((u) => u.username === dto.payerUsername)) {
            return res.status(400).send("Payer username not found!");
        }

        if(!groups.some((g) => g.name === dto.groupName)) {
            return res.status(400).send("Group not found!");
        }

        expenses.push(dto as Expense);

        return res.send("Expense added!");
    } catch(e) {
        if(e instanceof ZodError) {
            return res.status(400).send("Bad request!");
        }
    }
});

