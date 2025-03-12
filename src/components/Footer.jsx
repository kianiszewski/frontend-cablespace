function Footer() {
  return (
    <footer style={{ 
      background: "#111", 
      color: "#fff", 
      textAlign: "center", 
      padding: "1rem",
      width: "100%",
      minHeight: "60px",
      position: "relative"
    }}>
      <p>&copy; {new Date().getFullYear()} CABLESPACE - Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
