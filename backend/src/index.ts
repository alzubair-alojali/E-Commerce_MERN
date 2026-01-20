import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.ts";
import productRoute from "./routes/productRoute.ts";
import cartRoute from "./routes/cartRoute.ts";
import { seedInitialProducts } from "./services/productService.ts";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());


const PORT = process.env.PORT;

mongoose
    .connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/ecommerce')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

seedInitialProducts();


app.get("/", (req, res) => {
    res.send("Hello, E-commerce Backend!");
});

app.use('/user', userRoute);
app.use('/product',productRoute)
app.use('/cart', cartRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});