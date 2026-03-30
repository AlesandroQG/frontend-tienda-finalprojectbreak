import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

function Logout() {
    const { logout } = useAuth();
    const navigation = useNavigate();
    useEffect(() => {
        logout();
        navigation("/");
    }, []);
    return null;
}

export default Logout;