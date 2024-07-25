import { IDatabase } from "../database/IDatabase";
import { ExpenseDTO } from "./dto/expense-dto";
import { Expense } from "./model/expense";

export class ExpenseRepository {

    constructor(private db: IDatabase) {}

    addExpense(expense: Expense) {
        return this.db.insertExpense({ ...expense, desc: expense.desc === undefined ? "" : expense.desc });
    }

    getExpensesByPayerUsername(username: string): Expense[] {
        return this.db.getAllExpenses().filter((e) => e.payerUsername === username);
    }

    getExpensesByGroup(name: string): Expense[] {
        return this.db.getAllExpenses().filter((e) => e.groupName === name);
    }

    getAllExpenses(): Expense[] {
        return this.db.getAllExpenses();
    }
}