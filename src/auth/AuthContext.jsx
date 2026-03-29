import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => Cookies.get("user") ?? null);
    const login = (userData) => {
        Cookies.set("user", userData);
        setUser(userData);
    };
    const logout = () => {
        Cookies.remove("user");
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};