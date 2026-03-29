import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login({urlApi}) {
    const { login } = useAuth();
    const verifyLogin = async (username, password) => {
        const payload = {username, password};
        try {
            const response = await fetch(`${urlApi}/admin/login`, {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
            });
            const result = await response.json();
            console.log(result);
            if (result.access) {
                login(username);
            }
            return result.access;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const navigation = useNavigate();
    const [username, setUsername] = useState("");
    const usernameInputRef = useRef(null);
    const [password, setPassword] = useState("");
    const passwordInputRef = useRef(null);
    const [error, setError] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            if (verifyLogin(username, password)) {
                setError("");
                navigation("/");
            } else {
                setError("Login incorrecto");
            }
        } else {
            setError("Los campos usuario y contraseña tienen que estar rellenos");
        }
    };
    return (
        <>
            <h2>Iniciar sesión</h2>
            <p className="error">{error}</p>
            <form onSubmit={onSubmit} className="product-form">
                <div>
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" value={username} ref={usernameInputRef} onChange={() => setUsername(usernameInputRef.current.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" value={password} ref={passwordInputRef} onChange={() => setPassword(passwordInputRef.current.value)} required />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    );
}

export default Login;