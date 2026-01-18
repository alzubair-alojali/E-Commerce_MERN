import express from "express";
import { getAllProducts } from "../services/productService.ts";


const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const products = await getAllProducts();
        response.status(200).send(products);
    } catch {
        return response.status(500).send("Internal Server Error");
    }
});

export default router;