import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.ts";
import type { IextendUserRequest } from "../types/extendedRequest.ts";



const validateJWT = (req: IextendUserRequest, res: Response, next: NextFunction) => {

    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
        res.status(403).send("Authorization header was not provided");
        return;
    }
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        res.status(403).send("bearer token not found");
        return;
    }

    jwt.verify(token, "qIGjDq6QUlk0PjeYDono6O7cJT28ZY9jiJBkAWOXXgI0p0wDguudFRTlkhInqDLS", async (err, payload) => {
        if (err) {
            res.status(403).send("Invalid token");
            return;
        }
        if (!payload) {
            res.status(403).send("Invalid token payload");
        }
        const userPayload = payload as { email: string; firstName: string; lastName: string };

        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;
        next();
    });

}

export default validateJWT;