import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSection === "notificaciones") {
      navigate("/notifications");
    } else if (selectedSection === "misPublicaciones") {
      navigate("/profile/mis-publicaciones");
    } else if (selectedSection === "misCompras") {
      navigate("/profile/mis-compras"); // ✅ Nueva ruta para ver compras
    }
  }, [selectedSection, navigate]);

  if (!user) {
    return <h2 className="text-center text-danger">Cargando perfil...</h2>;
  }

  const renderContent = () => {
    switch (selectedSection) {
      case "personal":
        return (
          <div>
            <h3 className="text-warning">Información Personal</h3>
            <p>Nombre: {user.nombre}</p>
            <p>Email: {user.email}</p>
          </div>
        );
      case "metodosPago":
        return (
          <div>
            <h3 className="text-warning">Métodos de Pago</h3>
            <p>Aquí puedes gestionar tus métodos de pago.</p>
          </div>
        );
      case "direcciones":
        return (
          <div>
            <h3 className="text-warning">Direcciones</h3>
            <p>Aquí puedes gestionar tus direcciones guardadas.</p>
          </div>
        );
      default:
        return (
          <div>
            <button className="btn btn-warning w-100 mb-2" onClick={() => setSelectedSection("personal")}>
              Información Personal
            </button>
            <button className="btn btn-outline-warning w-100 mb-2" onClick={() => setSelectedSection("metodosPago")}>
              Métodos de Pago
            </button>
            <button className="btn btn-outline-warning w-100 mb-2" onClick={() => setSelectedSection("direcciones")}>
              Direcciones
            </button>
            <button className="btn btn-outline-warning w-100 mb-2" onClick={() => setSelectedSection("notificaciones")}>
              Notificaciones
            </button>
            <button className="btn btn-outline-warning w-100 mb-2" onClick={() => setSelectedSection("misPublicaciones")}>
              Mis Publicaciones
            </button>
            <button className="btn btn-outline-warning w-100 mb-2" onClick={() => setSelectedSection("misCompras")}>
              Mis Compras 🛒
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container text-white mt-5">
      <h2 className="text-center">
        Bienvenido, <span className="text-warning">{user.nombre}</span>
      </h2>
      <div className="d-flex justify-content-center mt-4">
        <div className="bg-dark p-4 rounded w-50 text-center">
          {selectedSection ? (
            <>
              {renderContent()}
              <button className="btn btn-outline-light w-100 mt-3" onClick={() => setSelectedSection(null)}>
                🔙 Volver
              </button>
            </>
          ) : (
            renderContent()
          )}
          <button className="btn btn-danger w-100 mt-3" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
