import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard({ id_producto, imagenes, nombre, descripcion, precio, precio_anterior }) {
  const imagen = imagenes && imagenes.length > 0 ? imagenes[0] : "/placeholder.jpg";

  // Verifica si el precio es un número válido
  const precioActual = typeof precio === "number" || !isNaN(precio) ? Number(precio).toFixed(2) : "S/N";
  const precioAnt = typeof precio_anterior === "number" || !isNaN(precio_anterior) ? Number(precio_anterior).toFixed(2) : null;

  return (
    <div className="card product-card">
      <img src={imagen} className="card-img-top" alt={nombre} />
      <div className="card-body text-center">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text">{descripcion}</p>

        <div className="d-flex justify-content-center align-items-center">
          {/* 🔴 Si hay precio anterior, lo mostramos tachado */}
          {precioAnt && precioAnt !== precioActual && (
            <h6 className="text-danger text-decoration-line-through mb-0 me-2">
              ${precioAnt}
            </h6>
          )}
          <h6 className="text-warning fw-bold mb-0">${precioActual}</h6>
        </div>

        <Link to={`/producto/${id_producto}`} className="btn btn-outline-warning mt-2">
          Ver más
        </Link>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id_producto: PropTypes.number.isRequired,
  imagenes: PropTypes.array.isRequired,
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  precio_anterior: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProductCard;
