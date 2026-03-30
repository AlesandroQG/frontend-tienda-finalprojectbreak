import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import styles from "./Product.module.css";

function Product({urlApi}) {
    const { user } = useAuth();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const getProduct = async () => {
        try {
            const response = await fetch(`${urlApi}/products/${id}`);
            const result = await response.json();
            setProduct(result);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getProduct();
    }, [id]);
    return (
        <div className={styles.product}>
            {product ? (
                <>
                    <h2>{product?.nombre}</h2>
                    <img className={styles.imagen} src={product.imagen} alt={product.nombre} />
                    <p>{`${product.precio}`.replace(".", ",")} €</p>
                    <p>{product.descripcion}</p>
                    {user && (<Link className="btn" to={`/edit/${product._id}`}>Editar</Link>)}
                </>
            ) : <p>Error</p>}
        </div>
    );
}

export default Product;