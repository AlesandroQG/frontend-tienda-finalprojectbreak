import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";

function Product({product}) {
    return (
        <div className={styles.product}>
            <h2>{product.nombre}</h2>
            <img className={styles.imagen} src={product.imagen} alt={product.nombre} />
            <p>{`${product.precio}`.replace(".", ",")} €</p>
            <p>{product.descripcion}</p>
            <Link className="btn" to={`/edit/${product._id}`}>Editar</Link>
        </div>
    );
}

export default Product;