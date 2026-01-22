import express from 'express';
import { register, login, getMyOrders } from '../services/userService.ts';
import validateJWT from '../middlewares/validateJWT.ts';
import type { IextendUserRequest } from '../types/extendedRequest.ts';


const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;
        const { data, statusCode } = await register({ firstName, lastName, email, password });
        response.status(statusCode).json(data);
    } catch {
        return response.status(500).json("Internal Server Error");
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        const { data, statusCode } = await login({ email, password });
        response.status(statusCode).json(data);
    } catch {
        return response.status(500).json("Internal Server Error");
    }
});

router.get("/my-orders", validateJWT, async (request: IextendUserRequest, response) => {
    try {
        const userId = request.user._id;
        const { data, statusCode } = await getMyOrders(userId);
        response.status(statusCode).send(data);
    } catch {
        return response.status(500).send("Internal Server Error");
    }
});

export default router;