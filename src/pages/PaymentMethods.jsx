const PaymentMethods = () => {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-warning">Métodos de Pago</h2>
        <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>
          🔙 Volver
        </button>
      </div>
    );
  };
  
  export default PaymentMethods;
  