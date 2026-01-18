import mongoose, { Document, Schema, type ObjectId } from "mongoose";

export interface IorderItem{
    productTitle:string
    productImage:string
    unitPrice:number
    quantity:number
}

export interface IOrder extends Document{
    orderItems: IorderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;
}

const orderItemSchema: Schema = new Schema<IorderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const orderSchema: Schema = new Schema<IOrder>({
    orderItems: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const orederModel=mongoose.model<IOrder>("Order",orderSchema)