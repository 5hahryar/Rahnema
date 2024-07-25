import { InMemmoryDB } from "./module/database/InMemmoryDB";
import { ExpenseRepository } from "./module/expense/expense.repository";
import { ExpenseService } from "./module/expense/expense.service";
import { GroupRepository } from "./module/group/group.repository";
import { GroupService } from "./module/group/group.service";
import { UserRepository } from "./module/user/user.repository";

const inMemmoryDB = new InMemmoryDB();

//TODO: Fix!
export const userRepository = new UserRepository(inMemmoryDB);
const expenseRepository = new ExpenseRepository(inMemmoryDB);
const groupRepository = new GroupRepository(inMemmoryDB);

export const groupService = new GroupService(groupRepository, expenseRepository, userRepository);
export const expenseService = new ExpenseService(groupRepository, expenseRepository, userRepository);