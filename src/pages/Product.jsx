import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import styles from "./Product.module.css";

function Product({product}) {
    const { user } = useAuth();
    return (
        <div className={styles.product}>
            <h2>{product.nombre}</h2>
            <img className={styles.imagen} src={product.imagen} alt={product.nombre} />
            <p>{`${product.precio}`.replace(".", ",")} €</p>
            <p>{product.descripcion}</p>
            {user && (<Link className="btn" to={`/edit/${product._id}`}>Editar</Link>)}
        </div>
    );
}

export default Product;