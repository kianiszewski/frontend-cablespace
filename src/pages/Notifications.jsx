import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/mark-read");
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, leido: true }))
      );
    } catch (error) {
      console.error("Error al marcar como leídas:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#fff", textAlign: "center" }}>
      <h2 className="text-warning">Notificaciones</h2>

      {notifications.length === 0 ? (
        <p>No tienes notificaciones nuevas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((notif) => (
            <li
              key={notif.id}
              style={{
                background: notif.leido ? "#444" : "#222",
                padding: "1rem",
                margin: "0.5rem 0",
                borderRadius: "5px",
              }}
            >
              <p>{notif.mensaje}</p>
              <small>{new Date(notif.fecha_notificacion).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      {notifications.length > 0 && (
        <button
          onClick={markAllAsRead}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#FFD700",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Marcar todas como leídas
        </button>
      )}

      <button
        onClick={() => navigate("/profile")}
        style={{
          display: "block",
          margin: "1rem auto",
          padding: "0.5rem 1rem",
          background: "#777",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🔙 Volver
      </button>
    </div>
  );
}

export default Notifications;
