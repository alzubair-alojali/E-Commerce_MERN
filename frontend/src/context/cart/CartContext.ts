import { createContext, useContext } from "react";
import type { ICartItem } from "../../types/CartItem";



interface ICartContext {
    cartItems: ICartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
    updateItemQuantity: (productId: string, quantity: number) => void;
    removeItemInCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext >({
    cartItems: [],
    totalAmount: 0,
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    removeItemInCart: () => {}
    
});

export const useCart = () => useContext(CartContext);