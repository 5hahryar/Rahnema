import { Response, Router } from "express";
import { authorizeMiddleware } from "../middleware/middleware";
import { polls } from "../data";
import { isNonEmptyString } from "../utils/stringUtils";
import { HttpError } from "../utils/httpError";
import { handleHttpRequest } from "../utils/requestHandler";

export const pollsRoutes = Router();

pollsRoutes.post("/polls", authorizeMiddleware, (req, res) => {
    const { title, planingDeadline, votingDeadline } = req.body

    handleHttpRequest(res, () => {
        createPoll({
            title: title,
            planingDeadline: new Date(planingDeadline),
            votingDeadline: new Date(votingDeadline),
        })
    });
});

pollsRoutes.get("/polls", authorizeMiddleware, (req, res) => {
    handleHttpRequest(res, () => {
        res.send(polls);
    });
});

const createPoll = (dto: { title: string, planingDeadline: Date, votingDeadline: Date }) => {
    if(!isNonEmptyString(dto.title)) throw new HttpError(400, "Title is empty!")

    polls.push({
        id: polls.length.toString(),
        title: dto.title,
        planingDeadline: dto.planingDeadline,
        votingDeadline: dto.votingDeadline,
    });
}
