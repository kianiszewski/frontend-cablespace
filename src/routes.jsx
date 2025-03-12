import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Monitores from "../pages/Monitores";
import Controladores from "../pages/Controladores";
import Microfonos from "../pages/Microfonos";
import Accesorios from "../pages/Accesorios";
import Usados from "../pages/Usados";
import Nuevos from "../pages/Nuevos";
import Todo from "../pages/Todo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound"; // Agregamos una página de error 404

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/monitores" element={<Layout><Monitores /></Layout>} />
        <Route path="/controladores" element={<Layout><Controladores /></Layout>} />
        <Route path="/microfonos" element={<Layout><Microfonos /></Layout>} />
        <Route path="/accesorios" element={<Layout><Accesorios /></Layout>} />
        <Route path="/usados" element={<Layout><Usados /></Layout>} />
        <Route path="/nuevos" element={<Layout><Nuevos /></Layout>} />
        <Route path="/todo" element={<Layout><Todo /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} /> {/* Manejamos rutas inexistentes */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
