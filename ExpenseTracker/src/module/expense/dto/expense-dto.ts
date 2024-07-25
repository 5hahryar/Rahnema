import { z } from "zod";

const expenseDTO = z.object({
    title: z.string().min(1),
    amount: z.number().min(1),
    payerUsername: z.string().min(1),
    groupName: z.string().min(1),
});

export type ExpenseDTO = z.infer<typeof expenseDTO>;