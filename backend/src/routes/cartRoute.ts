import express from "express";
import { addItemToCart, getActiveCartForUser, updateItemInCart } from "../services/cartService.ts";
import validateJWT from "../middlewares/validateJWT.ts";
import type { IextendUserRequest } from "../types/extendedRequest.ts";
const router = express.Router();

router.get("/", validateJWT, async (req: IextendUserRequest, res) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    return res.status(200).send(cart);
}
);

router.post('/items', validateJWT, async (req: IextendUserRequest, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId ,quantity });
    return res.status(response.statusCode).send(response.data);
});

router.put('/items', validateJWT, async (req: IextendUserRequest, res) => {
    const userId = req.user._id;
    const {productId, quantity} = req.body;
    const response = await updateItemInCart({ userId, productId ,quantity });
    return res.status(response.statusCode).send(response.data);
});

export default router;