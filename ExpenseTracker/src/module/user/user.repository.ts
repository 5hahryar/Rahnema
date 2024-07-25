import { IDatabase } from "../database/IDatabase";
import { User } from "./model/user";

export class UserRepository {

    constructor(private db: IDatabase) {}

    public getAllUsers(): User[] {
        return this.db.getAllUsers();
    }
}