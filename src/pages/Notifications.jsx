import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../services/api"; // ✅ Se corrige la importación

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

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
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;
