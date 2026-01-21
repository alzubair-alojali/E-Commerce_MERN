import { createContext, useContext } from "react";
import type { ICartItem } from "../../types/CartItem";



interface ICartContext {
    cartItems: ICartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext >({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {}
    
});

export const useCart = () => useContext(CartContext);