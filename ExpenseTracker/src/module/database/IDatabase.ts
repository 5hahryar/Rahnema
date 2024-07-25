export type GroupEntity = {
    readonly name: string,
    readonly usernames: string[],
}

export type ExpenseEntity = {
    readonly id: string,
    readonly title: string,
    readonly desc: string,
    readonly amount: number,
    readonly payerUsername: string,
    readonly groupName: string,
}

export type UserEntity = {
    readonly username: string,
    readonly password: string,
}

export interface IDatabase {
    insertGroup(group: GroupEntity): GroupEntity
    getGroupByName(name: string): GroupEntity | undefined;
    getAllGroups(): GroupEntity[];

    insertExpense(expense: ExpenseEntity): ExpenseEntity;
    getAllExpenses(): ExpenseEntity[];

    getAllUsers(): UserEntity[]
}