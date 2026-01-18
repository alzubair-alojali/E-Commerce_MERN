import { cartModel, type ICartItem } from "../models/cartModel.ts";
import productModel from "../models/productModel.ts";


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


interface IClearCart {
    userId: string
}

export const clearCart = async ({ userId }: IClearCart) => {
    const cart = await getActiveCartForUser({ userId });
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}


interface IAddItemToCart {
    userId: string,
    productId: string,
    quantity: number
}

export const addItemToCart = async ({ userId, productId, quantity }: IAddItemToCart) => {

    const cart = await getActiveCartForUser({ userId });
    const existsInCart = cart.items.find((item) => item.product.toString() === productId);
    if (existsInCart) {
        return { data: "Item already exists in cart", statusCode: 400 };
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found", statusCode: 404 };
    }
    if (product.stock < quantity) {
        return { data: "low stock for item", statusCode: 400 };
    }

    cart.items.push({
        product: productId as any,
        quantity,
        unitPrice: product.price
    });

    cart.totalAmount += product.price * quantity;

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };

}

interface IUpdateItemInCart {
    userId: string,
    productId: string,
    quantity: number
}

export const updateItemInCart = async ({ userId, productId, quantity }: IUpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existsInCart = cart.items.find((item) => item.product.toString() === productId);

    if (!existsInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }

    const product = await productModel.findById(productId);

    if (!product) {
        return { data: "Product not found", statusCode: 404 };
    }
    if (product.stock < quantity) {
        return { data: "low stock for item", statusCode: 400 };
    }

    const otherItemInCart = cart.items.filter((item) => item.product.toString() !== productId);

    let total = calculateCartTotalItem({ cartItems: otherItemInCart });

    existsInCart.quantity = quantity;
    total += existsInCart.quantity * existsInCart.unitPrice;

    cart.totalAmount = total;

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };

};

interface IDeleteItemInCart {
    userId: string,
    productId: any
}
export const deleteItemInCart = async ({ userId, productId }: IDeleteItemInCart) => {

    const cart = await getActiveCartForUser({ userId });

    const existsInCart = cart.items.find((item) => item.product.toString() === productId);
    if (!existsInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }

    const otherItemInCart = cart.items.filter((item) => item.product.toString() !== productId);

    let total = calculateCartTotalItem({ cartItems: otherItemInCart });

    cart.totalAmount = total;
    cart.items = otherItemInCart;

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}

const calculateCartTotalItem = ({ cartItems }: { cartItems: ICartItem[] }) => {

    let total = cartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);

    return total;
}