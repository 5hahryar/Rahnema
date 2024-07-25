import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ZodError } from "zod";
import { groupService } from "../dependency";
import { groupDTO } from "../module/group/dto/group-dto";
import { HttpError } from "../../utils/httpError";

export const groupsRoutes = Router();

groupsRoutes.get("/", authMiddleware, (req, res) => {
    return res.send(groupService.getAllGroups());
});

groupsRoutes.post("/", authMiddleware, (req, res) => {
    try {
        groupService.createGroup(groupDTO.parse(req.body));
        return res.send("Group added!");
    } catch(e) {
        if(e instanceof ZodError) {
            return res.status(400).send("Bad request!");
        } else if(e instanceof HttpError) {
            return res.status(e.statusCode).send(e.message);
        }
    }
});

groupsRoutes.get("/:groupId/balance", authMiddleware, (req, res) => {
    try {
        res.send(groupService.getGroupBalance(req.params.groupId));
    } catch(e) {
        if(e instanceof HttpError) {
            return res.status(e.statusCode).send(e.message);
        }
    }
});