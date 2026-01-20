import { createContext, useContext } from "react";



interface IAuthContext {
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
}

export const AuthContext = createContext<IAuthContext >({
    username: "",
    token: "",
    login: () => { }
});

export const useAuth = () => useContext(AuthContext);