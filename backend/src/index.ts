import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.ts";
const app = express();
const PORT = 3001;
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.get("/", (req, res) => {
    res.send("Hello, E-commerce Backend!");
});


app.use('/user', userRoute);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});