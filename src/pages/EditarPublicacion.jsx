import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function EditarPublicacion() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [estado, setEstado] = useState("NUEVO"); // Estado del producto
  const [categorias, setCategorias] = useState([]);
  const [imagenes, setImagenes] = useState(["", "", "", ""]); // Hasta 4 URLs
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Obtener categorías
    axios.get(`${API_BASE_URL}/api/categorias`)
      .then((response) => setCategorias(response.data))
      .catch(() => setCategorias([])); // Evitar error si no hay categorías

    // Obtener datos del producto
    axios.get(`${API_BASE_URL}/api/products/${id}`)
      .then((response) => {
        const producto = response.data;
        setNombre(producto.nombre || "");
        setDescripcion(producto.descripcion || "");
        setPrecio(producto.precio || "");
        setStock(producto.stock || "");
        setIdCategoria(producto.id_categoria || "");
        setEstado(producto.estado || "NUEVO"); // Cargar estado del producto
        setImagenes([...producto.imagenes, "", "", "", ""].slice(0, 4)); // Rellenar hasta 4 espacios
      })
      .catch(() => setMensaje("❌ No se pudo cargar el producto."));
  }, [id]);

  // 📌 Función para asegurarse de que la URL de la imagen termine en ".jpg"
  const formatImageUrl = (url) => {
    if (url.trim() !== "" && !url.endsWith(".jpg")) {
      return `${url}.jpg`;
    }
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !stock || !idCategoria || !estado) {
      setMensaje("⚠️ Todos los campos son obligatorios.");
      return;
    }

    // Aplicamos la función de formato a las imágenes ingresadas
    const imagenesValidas = imagenes
      .map(formatImageUrl) // Formatear URLs
      .filter((url) => url.trim() !== ""); // Filtrar URLs vacías

    try {
      const productoData = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        id_categoria: parseInt(idCategoria),
        id_vendedor: user.id_usuario,
        estado,
        imagenes: imagenesValidas, // Enviar URLs de imágenes formateadas
      };

      await axios.put(`${API_BASE_URL}/api/products/${id}`, productoData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMensaje("✅ Publicación actualizada exitosamente.");
      setTimeout(() => navigate("/profile/mis-publicaciones"), 2000);
    } catch (error) {
      setMensaje("❌ Error al actualizar la publicación.");
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-center">Editar Publicación</h2>

      {mensaje && <p className="text-center mt-3">{mensaje}</p>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Producto</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Precio (USD)</label>
          <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select className="form-select" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Estado del Producto</label>
          <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)} required>
            <option value="NUEVO">Nuevo</option>
            <option value="USADO">Usado</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Imágenes del Producto (hasta 4)</label>
          {imagenes.map((imagen, index) => (
            <input 
              key={index}
              type="text" 
              className="form-control mb-2"
              placeholder={`URL de imagen ${index + 1}`}
              value={imagen}
              onChange={(e) => {
                const nuevasImagenes = [...imagenes];
                nuevasImagenes[index] = e.target.value;
                setImagenes(nuevasImagenes);
              }}
            />
          ))}
        </div>

        <button type="submit" className="btn btn-warning w-100">💾 Guardar Cambios</button>
      </form>

      <button className="btn btn-outline-light w-100 mt-3" onClick={() => navigate("/profile/mis-publicaciones")}>🔙 Volver</button>
    </div>
  );
}

export default EditarPublicacion;
