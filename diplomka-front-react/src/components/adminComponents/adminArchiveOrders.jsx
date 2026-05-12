import {useEffect, useState} from "react";
import request from "../request_wrap.js";
import AdminSideMenu from "./AdminSideMenu.jsx";
import AdminOrderComponent from "./AdminOrderComponent.jsx";
import {io} from "socket.io-client";

function adminArchiveOrders() {
    const [archiveOrders, setArchiveOrders] = useState([]);
    const [extendedOrderId, setExtendedOrderId] = useState(null);

    async function fetchDeliveries() {
        const res = await request("/admin/archive-orders", "get", {});
        setArchiveOrders(res || []);
    }

    useEffect(() => {
        const socket = io('http://localhost:8080', {withCredentials: true});
        socket.on('connect', () => {
            socket.emit('subscribe', 'archive');
        });
        socket.on('orders_updated', (data) => {
            setArchiveOrders(data);
        })
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleToggle = (id) => {
        setExtendedOrderId(prev => prev === id ? null : id);
    };

    useEffect(() => {
        fetchDeliveries();
    }, []);

    return (
        <div className="admin-orders-page">
            <AdminSideMenu/>
            <div className="admin-dishes-content">
                <div className="column">
                    <h1>Архівні замовлення</h1>
                    <div className="active-orders">
                        {archiveOrders.map((order) => (
                            <AdminOrderComponent
                                key={order.id}
                                order={order}
                                orderExtended={extendedOrderId == order.id}
                                onToggle={handleToggle}
                            />
                        ))}
                        {archiveOrders.length === 0 && <p className="empty-orders">Наразі немає активних замовлень.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default adminArchiveOrders;
