import {use, useEffect, useState} from "react";
import request from "./request_wrap.js";
import OrderComponent from "./OrderComponent.jsx";
import MenuComponent from "./menuComponent.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import UserStoreProvider from "../store/UserStoreProvider.js";

function OrderHistoryPage() {
    const [archiveOrders, setArchiveOrders] = useState([])
    const [activeOrders, setActiveOrders] = useState([])
    const [extendedOrderId, setExtendedOrderId] = useState(null);
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate();
    const logout = UserStoreProvider(state => state.logout)
    const setCart = UserStoreProvider(state => state.setCart)

    async function fetchActive() {
        let res = await request('/orders/active', 'get', {});
        setActiveOrders(res)
    }

    async function getProfileData() {
        let res = await request('/user/', 'get', {})
        setUserData(res)
    }

    const handleToggle = (id) => {
        setExtendedOrderId(prev => prev === id ? null : id);
    };

    async function fetchArchive() {
        let res = await request('/orders/archive', 'get', {});
        setArchiveOrders(res)
    }

    async function logoutFunc() {
        let res = await request('/user/logout', 'post', {});
        setCart([])
        logout()
        navigate('/')
    }

    useEffect(() => {
        fetchActive();
        getProfileData();
        fetchArchive();
    }, []);

    return (
        <div className="profile-page">
            <MenuComponent/>
            <div className="profile-part">
                <div className="profile-icon">
                    <FontAwesomeIcon icon={faUser}/>
                </div>
                {userData != null &&
                    <div className="text">
                        <h1>{userData.f_name} {userData.l_name}</h1>
                        <h3>+{userData.phone}</h3>
                        <h3>Дата приєднання : {moment.unix(userData.created).format("DD.MM.YYYY")}</h3>
                        <button className="btn-orange" onClick={logoutFunc}>Вийти</button>
                    </div>
                }

            </div>
            <h2>Активні замовлення</h2>
            <div className="active-orders">

                {activeOrders.map((order, index) => (
                    <OrderComponent orderExtended={extendedOrderId == order.id} order={order} key={order.id}
                                    onToggle={handleToggle}/>
                ))}

            </div>
            <h2>Архівні замовлення</h2>
            <div className="archive-orders">
                {archiveOrders.map((arch_order, index) => (
                    <OrderComponent orderExtended={extendedOrderId == arch_order.id} order={arch_order}
                                    key={arch_order.id}
                                    onToggle={handleToggle}/>
                ))}
            </div>
        </div>
    )
}

export default OrderHistoryPage;