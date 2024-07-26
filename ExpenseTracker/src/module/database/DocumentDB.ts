import { ExpenseEntity, GroupEntity, IDatabase, UserEntity } from "./IDatabase";
import * as fs from 'fs';
import { users } from "./InMemmoryDB";

export class DocumentDB implements IDatabase {

    //TODO: Use env
    private readonly basePath = __dirname + "/file-db";
    private readonly groupFileName = "/group.txt";
    private readonly expenseFileName = "/expense.txt";
    private readonly userFileName = "/user.txt";

    constructor() {
        // fs.rmSync(this.basePath, { recursive: true });

        if(!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath);
            fs.writeFileSync(this.basePath + this.groupFileName, "");
            fs.writeFileSync(this.basePath + this.userFileName, "");
            fs.writeFileSync(this.basePath + this.expenseFileName, "");
            fs.writeFileSync(this.basePath + this.userFileName, JSON.stringify(users));
        }
    }

    insertGroup(group: GroupEntity): GroupEntity {
        const txt = fs.readFileSync(this.basePath + this.groupFileName, "utf-8");
        let jsonArray: GroupEntity[] = txt.length === 0 ? [] : JSON.parse(txt);

        jsonArray.push(group);
        fs.writeFileSync(this.basePath + this.groupFileName, JSON.stringify(jsonArray), 'utf-8');
        
        return group;
    }

    getGroupByName(name: string): GroupEntity | undefined {
        const txt = fs.readFileSync(this.basePath + this.groupFileName, "utf-8");
        if(txt.length === 0) return undefined;
        
        let jsonArray: GroupEntity[] = JSON.parse(txt);

        return jsonArray.find((g) => g.name === name);
    }

    getAllGroups(): GroupEntity[] {
        const txt = fs.readFileSync(this.basePath + this.groupFileName, "utf-8");
        if(txt.length === 0) return [];

        let jsonArray: GroupEntity[] = JSON.parse(txt);

        return jsonArray;
    }

    insertExpense(expense: ExpenseEntity): ExpenseEntity {
        const txt = fs.readFileSync(this.basePath + this.expenseFileName, "utf-8");
        let jsonArray: ExpenseEntity[] = txt.length === 0 ? [] : JSON.parse(txt);

        jsonArray.push(expense);
        fs.writeFileSync(this.basePath + this.expenseFileName, JSON.stringify(jsonArray), 'utf-8');
        
        return expense;
    }

    getAllExpenses(): ExpenseEntity[] {
        const txt = fs.readFileSync(this.basePath + this.expenseFileName, "utf-8");
        if(txt.length === 0) return [];

        let jsonArray: ExpenseEntity[] = JSON.parse(txt);

        return jsonArray;
    }

    getAllUsers(): UserEntity[] {
        const txt = fs.readFileSync(this.basePath + this.userFileName, "utf-8");
        let jsonArray: UserEntity[] = JSON.parse(txt);

        return jsonArray;
    }
    
}