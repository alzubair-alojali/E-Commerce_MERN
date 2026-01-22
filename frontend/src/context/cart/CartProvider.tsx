import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import type { ICartItem } from "../../types/CartItem";
import { CartContext } from "./CartContext";
import { BASE_URL } from "../../constants/BaseUrl";
import { useAuth } from "../auth/AuthContext";



const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            return;
        }
        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`, {
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                setError("failed to fetch cart, please try again later");
                return;
            }
            const cart = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemMapping = cart.items.map(({ product, quantity }: { product: any, quantity: number }) => ({
                productId: product._id,
                title: product.title,
                unitPrice: product.price,
                image: product.image,
                quantity: quantity,
            }));

            setCartItems([...cartItemMapping]);
            setTotalAmount(cart.totalAmount);
        }
        fetchCart();
    }, [token])


    const addItemToCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1
                }),
            });
            if (!response.ok) {
                setError('Failed to add item to cart');
                return;
            }

            const cart = await response.json();

            if (!cart) {
                setError('No cart data received');
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemMapping = cart.items.map(({ product, quantity }: { product: any, quantity: number }) => ({
                productId: product._id,
                title: product.title,
                unitPrice: product.price,
                image: product.image,
                quantity: quantity,
            }));
            setCartItems([...cartItemMapping]);
            setTotalAmount(cart.totalAmount);

        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }
    console.log(error)
    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
            {children}
        </CartContext.Provider >
    )
}
export default CartProvider;