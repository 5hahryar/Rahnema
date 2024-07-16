import express, { NextFunction, Request, Response } from "express";
import { users } from "../data";

export const authorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) return res.status(401).send("Not Authorized!");

    let [username, password] = req.headers.authorization.split(":");
    const user = users.find((u) => {
        return u.username === username && u.password === password
    });

    if(!user) return res.status(401).send("Not Authorized!");

    if(req.path === "/polls" && req.method == "POST" && user.role !== "Admin") return res.status(403).send("Not Authorized!");
    if(req.path.match("/polls/[0-9]+/plans") && req.method == "POST" && user.role !== "Deputy") return res.status(403).send("Not Authorized!");
    if(req.path.match("/polls/[0-9]+/plans/[0-9]+") && req.method == "POST" && user.role !== "Deputy") return res.status(403).send("Not Authorized!");

    return next();
};