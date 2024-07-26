import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { groupService } from "../dependency";
import { groupDTO } from "../module/group/dto/group-dto";
import { handleHttpRequest } from "../../utils/requestHandler";

export const groupsRoutes = Router();

groupsRoutes.get("/", authMiddleware, (req, res) => {
    handleHttpRequest(res, () => {
        return groupService.getAllGroups();
    });
});

groupsRoutes.post("/", authMiddleware, (req, res) => {
    handleHttpRequest(res, () => {
        groupService.createGroup(groupDTO.parse(req.body));
        return "Group added!";
    });
});

groupsRoutes.get("/:groupId/balance", authMiddleware, (req, res) => {
    handleHttpRequest(res, () => {
        return groupService.getGroupBalance(req.params.groupId)
    });
});