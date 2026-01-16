import { cartModel } from "../models/cartModel.ts";


interface IcreateCartForUser {
    userId: string
}
interface IGetActiveCartForUser {
    userId: string
}

const createCartForUser = async ({ userId }: IcreateCartForUser) => {
    const cart = await cartModel.create({ userId });
    await cart.save();
    return cart;
}

export const getActiveCartForUser = async ({ userId }: IGetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
}

