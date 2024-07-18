import { Response, Router } from "express";
import { HttpError } from "./httpError";

export const handleHttpRequest = <A>(res: Response, fn: () => A) => {
    try {
        return res.send(fn());
    } catch(e) {
        if(e instanceof HttpError) {
            return res.status(e.statusCode).send(e.message);
        }
    }
}