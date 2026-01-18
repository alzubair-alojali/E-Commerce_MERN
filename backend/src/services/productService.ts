import mongoose from "mongoose";
import productModel from "../models/productModel.ts";




export const getAllProducts = async () => {
    return await productModel.find();
}




export const seedInitialProducts = async () => {
    const products = [
        { title: "Dell XPS 15 Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", price: 1499, stock: 10 },
        { title: "iPhone 14 Pro Max", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", price: 1099, stock: 25 },
        { title: "Samsung Odyssey G9", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", price: 1299, stock: 5 },
    ];
    const existingProducts = await productModel.find();
    if (existingProducts.length === 0) {
        await productModel.insertMany(products);
    }

    try{

    }catch(error){
        console.error("Error seeding initial products:", error);
    }
};

