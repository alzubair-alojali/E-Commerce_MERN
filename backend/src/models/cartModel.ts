import mongoose, { Document, Schema, type ObjectId } from "mongoose";
import type { IProduct } from "./productModel.ts";
const cartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
    product: IProduct[];
    unitPrice: number;
    quantity: number;
}

export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItem[];
    totalAmount: number;
    status: "active" | "completed";
}


const cartItemSchema: Schema = new Schema<ICartItem>({
    product: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },
});

const cartSchema: Schema = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: cartStatusEnum, default: "active" },
    items: { type: [cartItemSchema], default: [] },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);