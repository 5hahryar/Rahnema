import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ZodError, z } from "zod";
import { expenseService } from "../dependency";
import { HttpError } from "../../utils/httpError";
import { handleHttpRequest } from "../../utils/requestHandler";

export const expensesRoutes = Router();

const ExpenseDTO = z.object({
    title: z.string().min(1),
    amount: z.number().min(1),
    payerUsername: z.string().min(1),
    groupName: z.string().min(1),
});

expensesRoutes.get("/", authMiddleware, (req, res) => {
    handleHttpRequest(res, () => {
        if(req.query.payerUsername) {
            const payerUsername = req.query.payerUsername.toString();
            return res.send(expenseService.getExpensesByPayer(payerUsername));
        }

        if(req.query.username) {
            const username = req.query.username as string;
            return res.send(expenseService.getExpensesForUser(username));
        }

        return expenseService.getAllExpenses();
    });
});

expensesRoutes.post("/", authMiddleware, (req, res) => {
    handleHttpRequest(res, () => {
        const dto = ExpenseDTO.parse(req.body);
        expenseService.addExpense(dto);
        return "Expense added!";
    });
});

