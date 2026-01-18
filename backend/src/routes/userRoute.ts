import express from 'express';
import { register, login } from '../services/userService.ts';


const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;
        const { data, statusCode } = await register({ firstName, lastName, email, password });
        response.status(statusCode).send(data);
    } catch {
        return response.status(500).send("Internal Server Error");
    }
});

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        const { data, statusCode } = await login({ email, password });
        response.status(statusCode).send(data);
    } catch {
        return response.status(500).send("Internal Server Error");
    }
});

export default router;