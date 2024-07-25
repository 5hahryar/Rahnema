import { HttpError } from "../../../utils/httpError";
import { GroupRepository } from "../group/group.repository";
import { UserRepository } from "../user/user.repository";
import { ExpenseDTO } from "./dto/expense-dto";
import { ExpenseRepository } from "./expense.repository";
import { Expense } from "./model/expense";

export class ExpenseService {

    constructor(
        private groupRepo: GroupRepository,
        private expenseRepo: ExpenseRepository,
        private userRepo: UserRepository,
    ) {}

    getExpensesByPayer(username: string): ExpenseDTO[] {
        if(!this.userRepo.getAllUsers().some((u) => u.username === username)) {
            throw new HttpError(401, "User not found!");
        }
    
        return this.expenseRepo.getExpensesByPayerUsername(username);
    }

    getExpensesForUser(username: string): ExpenseDTO[] {
        const joinedGroupsNames = this.groupRepo.getAllGroups().filter((g) => g.usernames.includes(username)).map((g) => g.name);

        let userExpenses: Expense[] = [];
        joinedGroupsNames.forEach((groupName) => {
            userExpenses = [...userExpenses , ...this.expenseRepo.getExpensesByGroup(groupName)];
        });

        return userExpenses;
    }

    getAllExpenses(): ExpenseDTO[] {
        return this.expenseRepo.getAllExpenses();
    }

    addExpense(expense: ExpenseDTO) {
        if(!this.userRepo.getAllUsers().some((u) => u.username === expense.payerUsername)) {
            throw new HttpError(400, "Payer username not found!");
        }

        if(!this.groupRepo.getAllGroups().some((g) => g.name === expense.groupName)) {
            throw new HttpError(400, "Group not found!");
        }

        //TODO: Fix!
        this.expenseRepo.addExpense(expense as Expense);
    }
}
