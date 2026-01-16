import express from "express";
import { getActiveCartForUser } from "../services/cartService.ts";
import validateJWT, { type IextendUserRequest } from "../middlewares/validateJWT.ts";
const router = express.Router();

router.get("/", validateJWT, async (req:IextendUserRequest, res) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    return res.status(200).send(cart);
}
);

export default router;