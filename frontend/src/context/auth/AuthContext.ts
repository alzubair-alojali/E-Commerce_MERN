import { createContext, useContext } from "react";
import type { IOrder } from "./AuthProvider";



interface IAuthContext {
    username: string | null;
    token: string | null;
    isAuthenticated: boolean;
    myOrders: IOrder[];
    login: (username: string, token: string) => void;
    logout: () => void;
    getMyOrders: () => void;
}

export const AuthContext = createContext<IAuthContext>({
    username: null,
    token: null,
    isAuthenticated: false,
    myOrders: [],
    login: () => { },
    logout: () => { },
    getMyOrders: () => { },
});

export const useAuth = () => useContext(AuthContext);