import { createContext, useContext } from "react";



interface IAuthContext {
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext >({
    username: "",
    token: "",
    login: () => {},
    isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);