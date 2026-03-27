import { useState, useRef } from "react";

function CreateProduct({urlApi, setUpdate}) {
    const createProduct = async (data) => {
        const payload = data;
        try {
            const response = await fetch(`${urlApi}/create`, {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                },
                body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
            });
            const result = await response.json();
            console.log(result);
            setUpdate(value => !value);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
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
            const data = {nombre, descripcion, imagen, precio};
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
            <div>
                <img className="product-imagen-preview" src={imagen} alt={nombre} />
            </div>
        </>
    );
}

export default CreateProduct;