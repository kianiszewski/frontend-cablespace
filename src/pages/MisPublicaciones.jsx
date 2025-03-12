import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function MisPublicaciones() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.id_usuario) return; // ⚠️ Verificación extra para evitar peticiones innecesarias

    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?usuarioId=${user.id_usuario}`);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        setError("❌ No se pudieron cargar tus publicaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, [user?.id_usuario]); // ✅ Dependencia específica para evitar renders innecesarios

  if (!user) {
    return <p className="text-center text-danger mt-5">Debes iniciar sesión para ver tus publicaciones.</p>;
  }

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-center">Mis Publicaciones</h2>

      {loading ? (
        <p className="text-center text-warning">Cargando publicaciones...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-muted">No tienes publicaciones aún.</p>
      ) : (
        <div className="row mt-4">
          {productos.map((producto) => (
            <div key={producto.id_producto} className="col-md-3 mb-4">
              <ProductCard 
                id_producto={producto.id_producto} 
                imagenes={producto.imagenes} 
                nombre={producto.nombre} 
                descripcion={producto.descripcion} 
                precio={producto.precio} 
              />
              <Link to={`/editar-publicacion/${producto.id_producto}`} className="btn btn-primary btn-sm mt-2 w-100">
                ✏ Editar Publicación
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/profile" className="btn btn-outline-warning">⬅ Volver al Perfil</Link>
      </div>
    </div>
  );
}

export default MisPublicaciones;
