import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import ThemeButton from "./ThemeButton.jsx";
import styles from "./Header.module.css";

const Header = () => {
    const { user } = useAuth();
    return (
        <header className={styles.header}>
            <h1>Tienda</h1>
            <nav>
                <Link to="/">Inicio</Link>
                {user && (<Link to="/create">Crear Producto</Link>)}
                {user ? (<Link to="/logout">Cerrar Sesión</Link>) : (<Link to="/login">Iniciar Sesión</Link>)}
                <ThemeButton />
            </nav>
        </header>
    );
};

export default Header;