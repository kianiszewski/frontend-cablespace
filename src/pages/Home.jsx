import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Navigation, EffectCoverflow } from "swiper/modules";
import axios from "axios";

// Importación de imágenes de respaldo
import banner1 from "/src/assets/images/banner1.png";
import banner2 from "/src/assets/images/banner2.png";
import banner3 from "/src/assets/images/banner3.png";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState({
    destacado1: null,
    destacado2: null,
    destacado3: null,
  });

  const [ultimosProductos, setUltimosProductos] = useState({
    producto1: null,
    producto2: null,
    producto3: null,
  });

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Obtener productos destacados y últimos agregados
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res1 = await axios.get(`${API_BASE_URL}/api/products/19`);
        const res2 = await axios.get(`${API_BASE_URL}/api/products/20`);
        const res3 = await axios.get(`${API_BASE_URL}/api/products/17`);

        const ult1 = await axios.get(`${API_BASE_URL}/api/products/18`);
        const ult2 = await axios.get(`${API_BASE_URL}/api/products/22`);
        const ult3 = await axios.get(`${API_BASE_URL}/api/products/24`);

        setProductos({
          destacado1: res1.data,
          destacado2: res2.data,
          destacado3: res3.data,
        });

        setUltimosProductos({
          producto1: ult1.data,
          producto2: ult2.data,
          producto3: ult3.data,
        });
      } catch (err) {
        console.error("❌ Error al obtener los productos:", err);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container fluid className="home-container" style={{ maxWidth: "1200px", padding: "2rem", minHeight: "100vh" }}>
      {/* Sección 1: Banner */}
      <Row>
        <Col className="text-center">
          <img src={banner1} alt="Banner" className="img-fluid" style={{ width: "100%", height: "auto" }} />
          <h2 className="mt-3 text-white">¡Bienvenido a CABLESPACE!</h2>
        </Col>
      </Row>

      {/* Sección 2: Carrusel con fondo oscuro y efecto Coverflow */}
      <div className="container mt-5 p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: "10px" }}>
        <h2 className="text-center text-white">Productos en Oferta</h2>
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          navigation
          pagination={false}
          slidesPerView={3}
          spaceBetween={30}
          effect="coverflow"
          centeredSlides={true}
          loop={false}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          className="mt-4"
        >
          {[productos.destacado1, productos.destacado2, productos.destacado3].map((producto, index) => (
            <SwiperSlide key={index}>
              <div className="product-card text-center">
                <img
                  src={producto?.imagenes?.[0] || banner1}
                  alt={producto?.nombre}
                  className="w-100 mb-3"
                />
                <h5 className="text-white">{producto?.nombre}</h5>
                <p className="text-white">${Number(producto?.precio).toFixed(2)}</p>
                <Button
                  variant="warning"
                  className="w-100 mt-2"
                  onClick={() => navigate(`/producto/${producto?.id_producto}`)}
                >
                  VER
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sección 3: Grid de los 3 últimos productos */}
      <h2 className="text-center text-white mt-5">Mira los Últimos Productos Agregados</h2>
      <Row className="mt-4">
        {[ultimosProductos.producto1, ultimosProductos.producto2, ultimosProductos.producto3].map((producto, index) => (
          <Col key={index} md={4} className="text-center">
            {cargando ? (
              <p className="text-white">Cargando...</p>
            ) : error ? (
              <p className="text-danger">Error al cargar</p>
            ) : (
              <>
                <img src={producto?.imagenes?.[0] || banner1} alt={producto?.nombre} className="img-fluid" />
                <p className="text-white">{producto?.nombre}</p>
              </>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
