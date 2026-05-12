import {useEffect, useState} from "react";
import request from "../request_wrap.js";
import AdminSideMenu from "./AdminSideMenu.jsx";
import AdminOrderComponent from "./AdminOrderComponent.jsx";
import {io} from 'socket.io-client';


function AdminPickupOrdersPage() {
    const [pickupOrders, setPickupOrders] = useState([]);
    const [extendedOrderId, setExtendedOrderId] = useState(null);

    async function fetchDeliveries() {
        const res = await request("/admin/pickup-orders", "get", {});
        setPickupOrders(res || []);
    }

    useEffect(() => {
        const socket = io('http://localhost:8080', {withCredentials: true});
        socket.on('connect', () => {
            socket.emit('subscribe', 'pickup');
        });
        socket.on('orders_updated', (data) => {
            setPickupOrders(data);
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
                    <h1>Самовивіз</h1>
                    <div className="active-orders">
                        {pickupOrders.map((order) => (
                            <AdminOrderComponent
                                key={order.id}
                                order={order}
                                orderExtended={extendedOrderId == order.id}
                                onToggle={handleToggle}
                            />
                        ))}
                        {pickupOrders.length === 0 && <p className="empty-orders">Наразі немає активних замовлень.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPickupOrdersPage;
