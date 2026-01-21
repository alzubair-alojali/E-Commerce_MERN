import { useState, type FC, type PropsWithChildren } from "react";
import type { ICartItem } from "../../types/CartItem";
import { CartContext } from "./CartContext";



const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const addItemToCart = (productId: string) => {
        console.log(`Adding product ${productId} to cart`);
    }


    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
            {children}
        </CartContext.Provider >
    )
}
export default CartProvider;