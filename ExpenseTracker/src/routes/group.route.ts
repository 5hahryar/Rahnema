import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { groups } from "../data/groups";
import { ZodError, z } from "zod";
import { users } from "../data/users";
import { Group } from "../models/group";
import { expenses } from "../data/expenses";

export const groupRoutes = Router();

const GroupDTO = z.object({
    name: z.string().min(1),
    usernames: z.array(z.string()),
});

groupRoutes.get("/groups", authMiddleware, (req, res) => {
    return res.send(groups);
});

groupRoutes.post("/groups", authMiddleware, (req, res) => {
    try {
        const dto = GroupDTO.parse(req.body);

        if(!dto.usernames.every((username) => users.some((e) => e.username === username))) {
            return res.status(400).send("Some of the users were not found!");
        }

        groups.push(dto as Group);

        return res.send("Group added!");
    } catch(e) {
        if(e instanceof ZodError) {
            return res.status(400).send("Bad request!");
        }
    }
});

groupRoutes.get("/groups/:groupId/balance", authMiddleware, (req, res) => {
    const group = groups.find((g) => g.name === req.params.groupId);

    if(!group) {
        return res.status(400).send("Group not found!");
    }

    const total = expenses
        .filter((e) => e.groupName === req.params.groupId)
        .map((e) => e.amount)
        .reduce((prev, curr) => {
            return prev += curr;
        }, 0);
        console.log("usernames: ", group.usernames)
    const share = total / group.usernames.length;

    const totalExpenseByEach = expenses.reduce((prev, curr) => {
        const group = curr.payerUsername;
        if(!prev[group]) prev[group] = 0;
        prev[group] += curr.amount;
        return prev;
    }, {} as Record<string, number>);

    const balance = Object.entries(totalExpenseByEach).map((e => {
        return {
            username: e[0],
            balance: e[1] - share,
        }
    }));

    let positives = balance.filter((b) => b.balance > 0);
    let negatives = balance.filter((b) => b.balance < 0);

    console.log(totalExpenseByEach);
    console.log("bal: ", balance);
    console.log("total: ", total);
    console.log("share: ", share);

    const owingTable: string[] = [];
    while(negatives.length > 0) {
        const positive = positives[0];
        const negative = negatives[0];

        const amount = Math.min(positive.balance, -negative.balance)
        owingTable.push(`${negative.username} owes ${positive.username} -> ${amount}`)

        negative.balance += amount;
        positive.balance -= amount;

        if(negative.balance <= 0) negatives.shift();
        if(positive.balance <= 0) positives.shift();
    }

    
    return res.send(owingTable);
});