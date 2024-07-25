import { UserRepository } from "../user/user.repository";
import { GroupDTO } from "./dto/group-dto"
import { GroupRepository } from "./group.repository"

export const createGroup = (group: GroupDTO, groupRepo: GroupRepository, userRepo: UserRepository) => {
    if(!group.usernames.every((username) => userRepo.getAllUsers().some((e) => e.username === username))) {
        throw new Error("Some of the users were not found!");
    }

    groupRepo.createGroup(group);
};