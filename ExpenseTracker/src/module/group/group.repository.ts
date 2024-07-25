import { IDatabase } from "../database/IDatabase";
import { GroupDTO } from "./dto/group-dto";
import { Group } from "./model/group";

export class GroupRepository {

    constructor(private db: IDatabase) {}

    createGroup(group: GroupDTO) {
        this.db.insertGroup(group);
    }

    getAllGroups(): Group[] {
        return this.db.getAllGroups();
    }
}