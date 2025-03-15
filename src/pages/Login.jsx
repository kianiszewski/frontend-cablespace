import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        contraseña: password, // 🔥 La clave debe ser "contraseña" para coincidir con el backend
      });

      const { token, user } = response.data;

      if (!token) {
        setError("No se recibió el token de autenticación.");
        return;
      }

      login({ token, user });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/profile"); // Redirige al perfil
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="container text-white mt-5 d-flex justify-content-center">
      <div className="p-4 bg-dark rounded shadow-lg" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Iniciar Sesión</h2>
        <p className="text-center text-light">
          Accede a tu cuenta para realizar compras y gestionar tus pedidos.
        </p>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-3">
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
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
