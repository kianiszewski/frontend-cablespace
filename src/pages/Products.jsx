import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="text-white">Productos Disponibles</h2>
      {loading ? (
        <p className="text-white">Cargando productos...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          padding: "2rem"
        }}>
          {products.map((product) => (
            <div key={product.id_producto} style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "5px",
              background: "#222",
              color: "#fff"
            }}>
              {/* Imagen Principal */}
              {product.imagenes?.length > 0 ? (
                <img src={product.imagenes[0]} alt={product.nombre} style={{ width: "100%", borderRadius: "5px" }} />
              ) : (
                <p className="text-muted">Sin imagen</p>
              )}

              {/* Nombre del Producto */}
              <h3 className="mt-2">{product.nombre}</h3>

              {/* Descripción del Producto */}
              <p>{product.descripcion}</p>

              {/* Estado del Producto */}
              <p className={`fw-bold ${product.estado === "NUEVO" ? "text-success" : "text-danger"}`}>
                Estado: {product.estado}
              </p>

              {/* Precio */}
              <p>
                {product.precio_anterior && Number(product.precio_anterior) > 0 ? (
                  <>
                    <span style={{ textDecoration: "line-through", color: "red", marginRight: "8px" }}>
                      ${Number(product.precio_anterior).toFixed(2)}
                    </span>
                    <span className="fw-bold text-warning">
                      ${Number(product.precio).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="fw-bold text-warning">
                    ${Number(product.precio).toFixed(2)}
                  </span>
                )}
              </p>

              {/* Botón para ver detalles */}
              <Link to={`/producto/${product.id_producto}`} style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.5rem",
                backgroundColor: "#FFD700",
                color: "#000",
                textDecoration: "none",
                fontWeight: "bold",
                borderRadius: "5px"
              }}>
                Ver más
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
