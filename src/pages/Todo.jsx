import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Todo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al obtener todos los productos:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-white text-center">Todos los Productos</h2>
      <div className="row mt-4">
        {productos.length === 0 ? (
          <p className="text-white text-center">No hay productos en esta categoría.</p>
        ) : (
          productos.map((producto) => (
            <div className="col-md-3 mb-4" key={producto.id_producto}>
              <ProductCard {...producto} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;
