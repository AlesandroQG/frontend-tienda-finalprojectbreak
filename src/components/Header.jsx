import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton.jsx";

const Header = () => {
    return (
        <header>
            <h1>Tienda</h1>
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/create">Crear Producto</Link>
                <ThemeButton />
            </nav>
        </header>
    );
};

export default Header;