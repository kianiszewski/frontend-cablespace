import { useCart } from "../context/CartContext";
import { useState } from "react";

function ConfirmarCompra() {
  const { handleCompra, setPaymentMethod } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("");

  const handlePaymentChange = (event) => {
    setSelectedMethod(event.target.value);
    setPaymentMethod(event.target.value); // Guardar método en el contexto
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Confirmar Pago</h2>

      <label>Selecciona un método de pago:</label>
      <select value={selectedMethod} onChange={handlePaymentChange}>
        <option value="">Seleccionar</option>
        <option value="1">Tarjeta de Crédito</option>
        <option value="2">PayPal</option>
      </select>

      <button
        style={{
          padding: "0.5rem",
          backgroundColor: "green",
          marginTop: "1rem",
          border: "none",
          cursor: "pointer",
          color: "#fff",
        }}
        onClick={handleCompra}
      >
        Confirmar Pago
      </button>
    </div>
  );
}

export default ConfirmarCompra;
