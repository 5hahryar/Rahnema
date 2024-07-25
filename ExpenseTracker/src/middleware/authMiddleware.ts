import { Request, Response, NextFunction } from "express"
import { isNonEmptyString } from "../../utils/stringUtils";
import { userRepository } from "../dependency";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        res.status(401).send("Authorization not provided!");
        return next();
    }

    let [ username, password ] = req.headers.authorization.split(":");
    if(
        !isNonEmptyString(username) || 
        !isNonEmptyString(password) || 
        !userRepository.getAllUsers().some((u) => u.username === username && u.password === password)
    ) {
        res.status(401).send("Username or password not found!");
        return next(); 
    }

    

    return next();
}