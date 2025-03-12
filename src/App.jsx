import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import CategoryPage from "./pages/CategoryPage";

// ✅ Páginas individuales para Usados y Nuevos
import Usados from "./pages/Usados";
import Nuevos from "./pages/Nuevos";

import PaymentMethods from "./pages/PaymentMethods";
import Addresses from "./pages/Addresses";
import MisPublicaciones from "./pages/MisPublicaciones";
import CrearPublicacion from "./pages/CrearPublicacion";
import EditarPublicacion from "./pages/EditarPublicacion";
import MisCompras from "./pages/MisCompras"; // ✅ Nueva página agregada

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* 🔒 Rutas protegidas */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/metodos-pago" element={<PaymentMethods />} />
                <Route path="/profile/direcciones" element={<Addresses />} />
                <Route path="/profile/mis-publicaciones" element={<MisPublicaciones />} />
                <Route path="/crear-publicacion" element={<CrearPublicacion />} />
                <Route path="/editar-publicacion/:id" element={<EditarPublicacion />} />
                <Route path="/profile/mis-compras" element={<MisCompras />} /> {/* ✅ Nueva ruta agregada */}
              </Route>

              {/* 🔓 Rutas públicas */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* ✅ Rutas para las categorías */}
              <Route path="/categoria/:categoria" element={<CategoryPage />} />

              {/* ✅ Manteniendo Usados y Nuevos como estaban */}
              <Route path="/usados" element={<Usados />} />
              <Route path="/nuevos" element={<Nuevos />} />

              {/* Página 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
