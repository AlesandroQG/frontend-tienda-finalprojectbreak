import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home({products}) {
    return (
        <>
            <h2>Productos</h2>
            <ul className={styles.list}>
                {products.map((product) => (
                    <li key={product._id}>
                        <h3>{product.nombre}</h3>
                        <img src={product.imagen} alt={product.nombre} />
                        <p>{`${product.precio}`.replace(".", ",")} €</p>
                        <Link to={`/${product._id}`}>Más información</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;