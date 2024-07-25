import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ZodError, z } from "zod";
import { expenseService } from "../dependency";
import { HttpError } from "../../utils/httpError";

export const expensesRoutes = Router();

const ExpenseDTO = z.object({
    title: z.string().min(1),
    amount: z.number().min(1),
    payerUsername: z.string().min(1),
    groupName: z.string().min(1),
});

expensesRoutes.get("/", authMiddleware, (req, res) => {
    try {
        if(req.query.payerUsername) {
            const payerUsername = req.query.payerUsername.toString();
            return res.send(expenseService.getExpensesByPayer(payerUsername));
        }

        if(req.query.username) {
            const username = req.query.username as string;
            return res.send(expenseService.getExpensesForUser(username));
        }

        return res.send(expenseService.getAllExpenses());
    } catch(e) {
        if(e instanceof ZodError) {
            return res.status(400).send("Bad request!");
        } else if(e instanceof HttpError) {
            return res.status(e.statusCode).send(e.message);
        }
    }
});

expensesRoutes.post("/", authMiddleware, (req, res) => {
    try {
        //TODO: move dto class!
        const dto = ExpenseDTO.parse(req.body);
        expenseService.addExpense(dto);

        return res.send("Expense added!");
    } catch(e) {
        if(e instanceof ZodError) {
            return res.status(400).send("Bad request!");
        } else if(e instanceof HttpError) {
            return res.status(e.statusCode).send(e.message);
        }
    }
});

