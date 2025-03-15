import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // ✅ URL del backend dinámico

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user, token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated && user?.id_usuario) {
            fetchCart();
        }
    }, [isAuthenticated, user]);

    // 🔹 Cargar carrito del usuario
    const fetchCart = async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(response.data || []);
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar producto al carrito
    const addToCart = async (product) => {
        if (!isAuthenticated || !user?.id_usuario || !token) return;

        try {
            await axios.post(
                `${API_BASE_URL}/api/cart`,
                {
                    id_usuario: user.id_usuario,
                    id_producto: product.id_producto,
                    cantidad: 1,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchCart();
            toast.success("Producto agregado al carrito 🛒");
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            toast.error("❌ No se pudo agregar al carrito.");
        }
    };

    // 🔹 Eliminar un producto del carrito
    const removeFromCart = async (id_producto) => {
        if (!isAuthenticated || !user?.id_usuario || !token) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/cart/item`, {
                data: { id_usuario: user.id_usuario, id_producto },
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchCart();
            toast.info("Producto eliminado del carrito 🗑");
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            toast.error("❌ No se pudo eliminar el producto.");
        }
    };

    // 🔹 Vaciar el carrito completo
    const clearCart = async () => {
        if (!isAuthenticated || !user?.id_usuario || !token) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchCart();
            toast.success("Carrito vaciado correctamente 🛒");
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            toast.error("❌ No se pudo vaciar el carrito.");
        }
    };

    // 🔹 Realizar la compra
    const handleCompra = async () => {
        if (!isAuthenticated || !user?.id_usuario || !token) {
            toast.error("⚠ Debes iniciar sesión para comprar.");
            return;
        }

        if (cart.length === 0) {
            toast.warning("🛒 No hay productos en el carrito.");
            return;
        }

        console.log("Ejecutando handleCompra..."); // 🔍 Verificación en consola

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/purchases`,
                { cart },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("✅ Compra realizada con éxito.");
            setCart([]); // 🛒 Vaciar carrito tras la compra
            navigate("/profile/mis-compras");
        } catch (error) {
            console.error("❌ Error al realizar la compra:", error);
            toast.error("No se pudo completar la compra.");
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleCompra, loading }}>
            {children}
        </CartContext.Provider>
    );
};
