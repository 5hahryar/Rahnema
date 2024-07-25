import { UserRepository } from "../user/user.repository";
import { ExpenseRepository } from "./expense.repository";
import { Expense } from "./model/expense";

export const getExpensesByPayer = (username: string, userRepository: UserRepository, expenseRepository: ExpenseRepository): Expense[] => {
    if(!userRepository.getAllUsers().some((u) => u.username === username)) {
        throw new Error("User not found!");
    }

    return expenseRepository.getExpensesByPayerUsername(username);
}