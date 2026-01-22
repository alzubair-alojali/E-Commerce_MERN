import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";


const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

export interface IOrderItem {
    _id: string;
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
}

export interface IOrder {
    _id: string;
    userId: string;
    orderItems: IOrderItem[];
    total: number;
    address: string;
    __v: number;
}
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAME_KEY));
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
    const isAuthenticated = !!token;
    const [myOrders, setMyOrders] = useState<IOrder[]>([]);
    const login = (username: string, token: string) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(TOKEN_KEY, token);
    }
    const logout = () => {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUsername(null);
        setToken(null);
    }
    const getMyOrders = async () => {
        const response = await fetch(`${BASE_URL}/user/my-orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            return;
        }
        const orders: IOrder[] = await response.json();
        setMyOrders(orders);
    }
    return (
        <AuthContext.Provider value={{ username, token, isAuthenticated, login, logout, myOrders, getMyOrders }}>
            {children}
        </AuthContext.Provider >
    )
}
export default AuthProvider;