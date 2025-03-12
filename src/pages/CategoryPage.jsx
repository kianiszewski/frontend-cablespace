import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState(""); 

  useEffect(() => {
    let url = "http://localhost:5000/api/products";

    if (categoria.toUpperCase() === "USADOS" || categoria.toUpperCase() === "NUEVOS") {
      url += `?estado=${categoria.toUpperCase()}`;
    } else if (categoria.toUpperCase() !== "TODO") {
      url += `?categoria=${categoria.toUpperCase()}`;
    }

    axios
      .get(url)
      .then((response) => setProductos(response.data))
      .catch((error) => console.error(`Error al obtener productos de ${categoria}:`, error));
  }, [categoria]);

  const ordenarProductos = (productos) => {
    if (orden === "asc") {
      return [...productos].sort((a, b) => a.precio - b.precio);
    } else if (orden === "desc") {
      return [...productos].sort((a, b) => b.precio - a.precio);
    }
    return productos;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white text-center">
        {categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()}
      </h2>

      <div className="row">
        <div className="col-md-3">
          <label className="text-white">Ordenar por precio:</label>
          <select className="form-select mt-2" onChange={(e) => setOrden(e.target.value)} value={orden}>
            <option value="">Seleccionar</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>

        <div className="col-md-9">
          <div className="row mt-4">
            {productos.length === 0 ? (
              <p className="text-white text-center">No hay productos en esta categoría.</p>
            ) : (
              ordenarProductos(productos).map((producto) => (
                <div className="col-md-3 mb-4" key={producto.id_producto}>
                  <ProductCard {...producto} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
