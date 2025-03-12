import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🚀 Redirige si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        nombre,
        email,
        contraseña: password,
      });

      navigate("/login"); // Redirige al login tras registrarse
    } catch (err) {
      setError("Error al registrarse. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container text-white mt-5 d-flex justify-content-center">
      <div className="p-4 bg-dark rounded shadow-lg" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Registro</h2>
        <p className="text-center text-light">
          Crea una cuenta para publicar y comprar productos.
        </p>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-3">
          <input
            type="text"
            placeholder="Nombre"
            className="form-control mb-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-warning w-100" type="submit">
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
