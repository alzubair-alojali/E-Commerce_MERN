import express from "express";
import { addItemToCart, checkout, clearCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from "../services/cartService.ts";
import validateJWT from "../middlewares/validateJWT.ts";
import type { IextendUserRequest } from "../types/extendedRequest.ts";



const router = express.Router();

router.get("/", validateJWT, async (req: IextendUserRequest, res) => {

    try {
        const userId = req.user._id;
        const cart = await getActiveCartForUser({ userId , populateProducts: true});
        return res.status(200).send(cart);
    } catch {
        return res.status(500).send("Internal Server Error");
    }
}
);

router.post('/items', validateJWT, async (req: IextendUserRequest, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const response = await addItemToCart({ userId, productId, quantity });
        return res.status(response.statusCode).send(response.data);
    } catch {
        return res.status(500).send("Internal Server Error");
    }
});

router.put('/items', validateJWT, async (req: IextendUserRequest, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const response = await updateItemInCart({ userId, productId, quantity });
        return res.status(response.statusCode).send(response.data);
    } catch {
        return res.status(500).send("Internal Server Error");
    }
});


router.delete('/', validateJWT, async (req: IextendUserRequest, res) => {
    try {
        const userId = req.user._id;
        const response = await clearCart({ userId });
        return res.status(response.statusCode).send(response.data);
    } catch {
        return res.status(500).send("Internal Server Error");
    }
});


router.delete('/items/:productId', validateJWT, async (req: IextendUserRequest, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const response = await deleteItemInCart({ userId, productId });
        return res.status(response.statusCode).send(response.data);
    } catch {
        return res.status(500).send("Internal Server Error");
    }
});


router.post('/checkout', validateJWT, async (req: IextendUserRequest, res) => {
    try {
        const userId = req.user._id;
        const { address } = req.body;
        const response = await checkout({ userId, address });
        return res.status(response.statusCode).send(response.data);
    } catch {
        return res.status(500).send("Internal Server Error");
    }
});


export default router;