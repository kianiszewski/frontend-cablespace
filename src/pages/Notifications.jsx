import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/api"; // ✅ Importación corregida

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Error al obtener las notificaciones:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Notificaciones</h1>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <li key={index}>{notification.message}</li>
                    ))
                ) : (
                    <p>No hay notificaciones disponibles.</p>
                )}
            </ul>
        </div>
    );
}

export default Notifications;
