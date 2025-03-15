import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function MisCompras() {
  const { user, token } = useAuth();
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) return;

    const fetchCompras = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/purchases/user/${user.id_usuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompras(response.data);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };

    fetchCompras();
  }, [user, token]);

  return (
    <div className="container text-white mt-5">
      <h2 className="text-center text-warning">Mis Compras 🛍️</h2>
      {compras.length === 0 ? (
        <p className="text-center mt-3">No has realizado compras aún.</p>
      ) : (
        <div className="row">
          {compras.map((compra) => (
            <div key={compra.id_compra} className="col-md-6">
              <div className="card bg-dark text-white mb-3">
                <div className="card-body">
                  <h5 className="card-title">Producto: {compra.producto}</h5>
                  <p className="card-text">
                    Cantidad: {compra.cantidad} <br />
                    Fecha: {new Date(compra.fecha_compra).toLocaleDateString()} <br />
                    Método de pago: {compra.metodo_pago}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-outline-light w-100 mt-3" onClick={() => navigate("/profile")}>
        🔙 Volver al Perfil
      </button>
    </div>
  );
}

export default MisCompras;
