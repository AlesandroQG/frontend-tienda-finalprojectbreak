import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

function EditProduct({urlApi, product, setUpdate}) {
    const { user } = useAuth();
    const editProduct = async (id, data) => {
        const payload = data;
        try {
            const response = await fetch(`${urlApi}/products/update/${id}`, {
                method: 'PUT', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
            });
            const result = await response.json();
            setUpdate(value => !value);
            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${urlApi}/products/delete/${id}/${user}`, {
                method: 'DELETE', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                }
            });
            const result = await response.json();
            setUpdate(value => !value);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const navigation = useNavigate();
    useEffect(() => {
        if (!user) {
            navigation("/");
        }
    }, []);
    const [nombre, setNombre] = useState(product.nombre);
    const nombreInputRef = useRef(null);
    const [descripcion, setDescripcion] = useState(product.descripcion);
    const descripcionInputRef = useRef(null);
    const [imagen, setImagen] = useState(product.imagen);
    const imagenInputRef = useRef(null);
    const [precio, setPrecio] = useState(product.precio);
    const precioInputRef = useRef(null);
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre && descripcion && imagen && precio) {
            const data = {nombre, descripcion, imagen, precio, user};
            const result = await editProduct(product._id, data);
            if (result) {
                setError("");
                navigation(`/${product._id}`);
            } else {
                setError("No se ha podido actualizar el producto.")
            }
        } else {
            setError("Los campos nombre, descripción, imagen y precio no pueden estar vacíos.");
        }
    };
    const handleDelete = (e) => {
        if (window.confirm("¿Estás seguro que quieres eliminar este producto?")) {
            if (deleteProduct(product._id)) {
                navigation("/");
            } else {
                setError("No se ha podido eliminar el producto.")
            }
        }
    };
    return (
        <>
            <h2>Editar Producto</h2>
            <Link className="btn" to={`/${product._id}`}>Atras</Link>
            <h2>{nombre}</h2>
            <p className="error">{error}</p>
            <form onSubmit={handleSubmit} className="product-form">
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" value={nombre} ref={nombreInputRef} onChange={() => setNombre(nombreInputRef.current.value)} required />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" id="descripcion" value={descripcion} ref={descripcionInputRef} onChange={() => setDescripcion(descripcionInputRef.current.value)} required />
                </div>
                <div>
                    <label htmlFor="imagen">Imagen:</label>
                    <input type="url" id="imagen" value={imagen} ref={imagenInputRef} onChange={() => setImagen(imagenInputRef.current.value)} required />
                </div>
                <div>
                    <label htmlFor="precio">Precio (€):</label>
                    <input type="number" id="precio" value={precio} ref={precioInputRef} onChange={() => setPrecio(precioInputRef.current.value)} required />
                </div>
                <button type="submit">Actualizar</button>
            </form>
            <button className="btn delete" onClick={handleDelete}>Eliminar</button>
            <div className="product-image-preview-container">
                <p>Imagen:</p>
                <img className="product-imagen-preview" src={imagen || null} alt="Image preview" />
            </div>
        </>
    );
}

export default EditProduct;