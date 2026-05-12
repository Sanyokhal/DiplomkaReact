import {useEffect, useState} from "react";
import request from "../request_wrap.js";
import AdminSideMenu from "./AdminSideMenu.jsx";
import AdminOrderComponent from "./AdminOrderComponent.jsx";
import {io} from "socket.io-client";

function AdminDeliveriesOrdersPage() {
    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [extendedOrderId, setExtendedOrderId] = useState(null);

    async function fetchDeliveries() {
        const res = await request("/admin/delivery-orders", "get", {});
        setDeliveryOrders(res || []);
    }


    const handleToggle = (id) => {
        setExtendedOrderId(prev => prev === id ? null : id);
    };

    useEffect(() => {
        const socket = io('http://localhost:8080', {withCredentials: true});
        socket.on('connect', () => {
            socket.emit('subscribe', 'deliveries');
        });
        socket.on('orders_updated', (data) => {
            setDeliveryOrders(data);
        })
        return () => {
            socket.disconnect();
        };
    }, []);


    useEffect(() => {
        fetchDeliveries();
    }, []);

    return (
        <div className="admin-orders-page">
            <AdminSideMenu/>
            <div className="admin-dishes-content">
                <div className="column">
                    <h1>На доставку</h1>
                    <div className="active-orders">
                        {deliveryOrders.map((order) => (
                            <AdminOrderComponent
                                key={order.id}
                                order={order}
                                orderExtended={extendedOrderId == order.id}
                                onToggle={handleToggle}
                            />
                        ))}
                        {deliveryOrders.length === 0 && <p className="empty-orders">Наразі немає активних замовлень.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDeliveriesOrdersPage;
