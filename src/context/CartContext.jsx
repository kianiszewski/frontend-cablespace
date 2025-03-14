import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = "https://backend-cablespace.onrender.com"; // ✅ URL corregida

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
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    };

    const removeFromCart = async (id_producto) => {
        if (!isAuthenticated || !user?.id_usuario || !token) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/cart/item`, {
                data: { id_usuario: user.id_usuario, id_producto },
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated || !user?.id_usuario || !token) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};
