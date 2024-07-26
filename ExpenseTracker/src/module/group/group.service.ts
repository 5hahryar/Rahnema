import { HttpError } from "../../../utils/httpError";
import { InMemmoryDB } from "../database/InMemmoryDB";
import { ExpenseRepository } from "../expense/expense.repository";
import { UserRepository } from "../user/user.repository";
import { GroupDTO } from "./dto/group-dto";
import { GroupRepository } from "./group.repository";
import { Group } from "./model/group";

export class GroupService {

    constructor(
        private groupRepo: GroupRepository,
        private expenseRepo: ExpenseRepository,
        private userRepo: UserRepository,
    ) {}

    getAllGroups(): GroupDTO[] {
        return this.groupRepo.getAllGroups();
    }

    createGroup(groupDTO: GroupDTO) {
        if(!groupDTO.usernames.every((username) => this.userRepo.getAllUsers().some((e) => e.username === username))) {
            throw new HttpError(400, "Some of the users were not found!");
        }
    
        this.groupRepo.createGroup(groupDTO);
    }

    getGroupBalance(groupId: string): string[] {
        const group = this.groupRepo.getAllGroups().find((g) => g.name === groupId);

        if(!group) {
            throw new HttpError(400, "Group not found!");
        }
    
        const groupExpenses = this.expenseRepo.getExpensesByGroup(group.name);
        const total = groupExpenses
            .map((e) => e.amount)
            .reduce((prev, curr) => {
                return prev += curr;
            }, 0);
            console.log("usernames: ", group.usernames)
        const share = total / group.usernames.length;
    
        const totalExpenseByEach = groupExpenses.reduce((prev, curr) => {
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
    
        // console.log(totalExpenseByEach);
        // console.log("bal: ", balance);
        // console.log("total: ", total);
        // console.log("share: ", share);
    
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
    
        return owingTable;
    }
}