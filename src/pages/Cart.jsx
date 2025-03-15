import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, clearCart, handleCompra } = useCart();

  // 🔹 Calcular el total del carrito con useMemo para optimización
  const totalCarrito = useMemo(() => {
    return cart.reduce((total, item) => total + (item.precio || 0) * item.cantidad, 0);
  }, [cart]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>
          Tu carrito está vacío. <Link to="/categoria/todo">Ver productos</Link>
        </p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id_producto}
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  margin: "1rem auto",
                  maxWidth: "400px",
                  backgroundColor: "#222",
                  color: "#fff",
                }}
              >
                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>
                  <strong>Precio:</strong> ${Number(item.precio || 0).toFixed(2)}
                </p>
                <button
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "red",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={() => removeFromCart(item.id_producto)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* 🔹 MOSTRAR TOTAL DEL CARRITO */}
          <h3 style={{ color: "#fff", marginTop: "1rem" }}>
            Total: <span style={{ color: "#FFD700" }}>${totalCarrito.toFixed(2)}</span>
          </h3>

          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "red",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              marginTop: "1rem",
            }}
            onClick={clearCart}
          >
            Vaciar carrito
          </button>

          <button
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "green",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              marginTop: "1rem",
              marginLeft: "10px",
            }}
            onClick={() => {
              console.log("🛒 Botón de comprar presionado"); // 🔍 Debugging
              handleCompra();
            }}
          >
            Comprar
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
