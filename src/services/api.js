const API_BASE_URL = "https://backend-cablespace.onrender.com/api"; // URL del backend en Render

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Error al obtener los productos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchOffers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/offers`);
        if (!response.ok) throw new Error("Error al obtener las ofertas");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const fetchLatestProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/latest`);
        if (!response.ok) throw new Error("Error al obtener los últimos productos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};
