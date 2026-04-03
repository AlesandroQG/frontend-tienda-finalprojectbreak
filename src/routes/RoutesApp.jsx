import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../themes/ThemeContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Logout from "../components/Logout.jsx";
import CreateProduct from "../pages/CreateProduct.jsx";
import Product from "../pages/Product.jsx";
import EditProduct from "../pages/EditProduct.jsx";

const RoutesApp = () => {
    const { theme } = useContext(ThemeContext);
    const [products, setProducts] = useState([]);
    const [update, setUpdate] = useState(false);
    const urlApi = import.meta.env.VITE_APP_API_URL || "http://localhost:3000";
    const getProducts = async () => {
        try {
            const response = await fetch(`${urlApi}/products`);
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getProducts();
    }, [update]);
    return (
        <Router>
            <section className={`App ${theme}`}>
                <div className="container">
                    <Header />
                    {products === null ? (<p>Cargando...</p>) : (
                        <Routes>
                            <Route path="/" element={<Home products={products} />} />
                            <Route path="/login" element={<Login urlApi={urlApi} />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<CreateProduct urlApi={urlApi} setUpdate={setUpdate} />} />
                            <Route path={`/:id`} element={<Product urlApi={urlApi} />} />
                            {products.map((product) => (
                                <>
                                    {/* <Route key={`product-${product._id}`} path={`/${product._id}`} element={<Product urlApi={urlApi} />} /> */}
                                    <Route key={`edit-${product._id}`} path={`/edit/${product._id}`} element={<EditProduct urlApi={urlApi} product={product} setUpdate={setUpdate} />} />
                                </>
                            ))}
                        </Routes>
                    )}
                    <Footer />
                </div>
            </section>
        </Router>
    );
};

export default RoutesApp;