import {useEffect, useState} from "react";
import request from "../request_wrap.js";
import AdminSideMenu from "./AdminSideMenu.jsx";
import AdminOrderComponent from "./AdminOrderComponent.jsx";
import {io} from "socket.io-client";

function AdminOrdersPage() {
    const [activeOrders, setActiveOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [extendedOrderId, setExtendedOrderId] = useState(null);

    async function fetchActiveOrders() {
        const res = await request("/admin/active-orders", "get", {});
        setActiveOrders(res || []);
    }

    async function fetchPendingOrders() {
        const res = await request("/admin/pending-orders", "get", {});
        setPendingOrders(res || []);
    }

    useEffect(() => {
        const socket = io('http://localhost:8080', {withCredentials: true});
        socket.on('connect', () => {
            socket.emit('subscribe', 'pending');
            socket.emit('subscribe', 'active');
        });
        socket.on('orders_updated_pen', (data) => {
            setPendingOrders(data);
        })
        socket.on('orders_updated_act', (data) => {
            setActiveOrders(data);
        })
        return () => {
            socket.disconnect();
        };
    }, []);


    const handleToggle = (id) => {
        setExtendedOrderId(prev => prev === id ? null : id);
    };

    useEffect(() => {
        fetchActiveOrders();
        fetchPendingOrders();
    }, []);

    return (
        <div className="admin-orders-page">
            <AdminSideMenu/>
            <div className="admin-dishes-content">
                <div className="column">
                    <h1>Нові замовлення</h1>
                    <div className="active-orders">
                        {pendingOrders.map((order) => (
                            <AdminOrderComponent
                                key={order.id}
                                order={order}
                                orderExtended={extendedOrderId == order.id}
                                onToggle={handleToggle}
                            />
                        ))}
                        {pendingOrders.length === 0 && <p className="empty-orders">Наразі немає активних замовлень.</p>}
                    </div>
                </div>
                <div className="column">
                    <h1>Замовлення що готуються</h1>
                    <div className="active-orders">
                        {activeOrders.map((order) => (
                            <AdminOrderComponent
                                key={order.id}
                                order={order}
                                orderExtended={extendedOrderId == order.id}
                                onToggle={handleToggle}
                            />
                        ))}
                        {activeOrders.length === 0 && <p className="empty-orders">Наразі немає активних замовлень.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrdersPage;
