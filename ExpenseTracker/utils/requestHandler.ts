import { Response, Router } from "express";
import { HttpError } from "./httpError";
import { ZodError } from "zod";

export const handleHttpRequest = <A>(res: Response, fn: () => A) => {
    try {
        return res.send(fn());
    } catch(e) {
        if(e instanceof ZodError) {
            return res.status(400).send("Bad request!");
        } else if(e instanceof HttpError) {
            return res.status(e.statusCode).send(e.message);
        } else if(e instanceof Error) {
            return res.status(500).send(e.message);
        } else return res.status(500).send("Internal server error!");
    }
}