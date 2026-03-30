import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

function CreateProduct({urlApi, setUpdate}) {
    const { user } = useAuth();
    const createProduct = async (data) => {
        const payload = data;
        try {
            const response = await fetch(`${urlApi}/products/create`, {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
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
    const [nombre, setNombre] = useState("");
    const nombreInputRef = useRef(null);
    const [descripcion, setDescripcion] = useState("");
    const descripcionInputRef = useRef(null);
    const [imagen, setImagen] = useState("");
    const imagenInputRef = useRef(null);
    const [precio, setPrecio] = useState(1);
    const precioInputRef = useRef(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre && descripcion && imagen && precio) {
            const data = {nombre, descripcion, imagen, precio, user};
            if (createProduct(data)) {
                setNombre("");
                setDescripcion("");
                setImagen("");
                setPrecio(1);
                setSuccess("Producto creado correctamente");
                setError("");
            } else {
                setSuccess("");
                setError("No se ha podido crear el producto.")
            }
        } else {
            setSuccess("");
            setError("Los campos nombre, descripción, imagen y precio no pueden estar vacíos.");
        }
    };
    return (
        <>
            <h2>Crear Producto</h2>
            <p className="success">{success}</p>
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
                <button type="submit">Crear</button>
            </form>
            <div className="product-image-preview-container">
                <p>Imagen:</p>
                <img className="product-imagen-preview" src={imagen || null} alt="Image preview" />
            </div>
        </>
    );
}

export default CreateProduct;