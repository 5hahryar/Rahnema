import { User } from "../user/model/user";
import { ExpenseEntity, GroupEntity, IDatabase, UserEntity } from "./IDatabase";

export class InMemmoryDB implements IDatabase {

    private groups: GroupEntity[] = [];
    private expenses: ExpenseEntity[] = [];
    private users: UserEntity[] = [
        {
            username: "ali",
            password: "ali"
        },
        {
            username: "vali",
            password: "vali"
        },
        {
            username: "bali",
            password: "bali"
        },
    ]

    insertGroup(group: GroupEntity): GroupEntity {
        this.groups.push(group);
        return group;
    }

    getGroupByName(name: string): GroupEntity | undefined {
        return this.groups.find((e) => e.name === name)
    }

    getAllGroups(): GroupEntity[] {
        return this.groups;
    }

    insertExpense(expense: ExpenseEntity): ExpenseEntity {
        this.expenses.push(expense);
        return expense;
    }

    getAllExpenses(): ExpenseEntity[] {
        return this.expenses;
    }

    getAllUsers(): UserEntity[] {
        return this.users;
    }
}