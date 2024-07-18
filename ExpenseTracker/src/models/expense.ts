export type Expense = {
    readonly id: string,
    readonly title: string,
    readonly desc: string | undefined,
    readonly amount: number,
    readonly payerUsername: string,
    readonly groupName: string,
}