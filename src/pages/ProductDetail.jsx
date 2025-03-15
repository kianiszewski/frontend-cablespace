import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productResponse = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        setProduct(productResponse.data);
        if (productResponse.data.imagenes?.length > 0) {
          setSelectedImage(productResponse.data.imagenes[0]);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-white mt-5">Cargando producto...</p>;
  if (!product) return <p className="text-center text-danger mt-5">Producto no encontrado.</p>;

  return (
    <div className="container mt-5 text-white">
      <div className="row">
        {/* Miniaturas de imágenes */}
        <div className="col-md-2 d-flex flex-column align-items-center">
          {product.imagenes?.map((img, index) => (
            <img key={index} src={img} alt={`Imagen ${index + 1}`} className="img-thumbnail mb-2"
              style={{ cursor: "pointer", maxWidth: "100px" }} onClick={() => setSelectedImage(img)} />
          ))}
        </div>

        {/* Imagen principal */}
        <div className="col-md-5 d-flex justify-content-center">
          {selectedImage ? (
            <img src={selectedImage} className="img-fluid rounded shadow-lg"
              alt={product.nombre} style={{ maxHeight: "400px", objectFit: "contain" }} />
          ) : <p>Sin imagen</p>}
        </div>

        {/* Información del producto */}
        <div className="col-md-5">
          <h2 className="fw-bold">{product.nombre}</h2>
          <p className={`fw-bold ${product.estado === "NUEVO" ? "text-success" : "text-danger"}`}>
            Estado: {product.estado}
          </p>
          <h4 className="text-warning fw-bold">${Number(product.precio || 0).toFixed(2)}</h4>
          
          {/* Botón de añadir al carrito */}
          <button className="btn btn-warning mt-3 w-100 fw-bold" onClick={() => addToCart(product)}>
            🛒 Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
