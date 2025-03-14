const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://backend-cablespace.onrender.com"; // Ajustar según tu backend

export async function fetchNotifications() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/notifications`);
        if (!response.ok) throw new Error("Error al obtener notificaciones");
        return await response.json();
    } catch (error) {
        console.error("Error en fetchNotifications:", error);
        return [];
    }
}

export async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    } catch (error) {
        console.error("Error en fetchProducts:", error);
        return [];
    }
}
