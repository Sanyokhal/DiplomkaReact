import './App.css';
import './styles/main.scss';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Landing from "./components/Landing.jsx";
import UserStoreProvider from "./store/UserStoreProvider.js";
import {useEffect} from "react";
import DishesPage from "./components/DishesPage.jsx";
import OrderHistoryPage from "./components/OrderHistoryPage.jsx";
import CheckOrderPage from "./components/CheckOrderPage.jsx";
import request from "./components/request_wrap.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import AdminOrdersPage from "./components/adminComponents/AdminOrdersPage.jsx";
import AdminPickupOrdersPage from "./components/adminComponents/AdminPickupOrdersPage.jsx";
import AdminDeliveriesOrdersPage from "./components/adminComponents/AdminDeliveriesOrdersPage.jsx";
import AdminArchiveOrders from "./components/adminComponents/adminArchiveOrders.jsx";

function App() {
    const user = UserStoreProvider(state => state.user);
    const admin = UserStoreProvider(state => state.admin);
    const setUser = UserStoreProvider(state => state.setUser);
    const setAdmin = UserStoreProvider(state => state.setAdmin);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await request("/user/", "get", {});
                setUser(data);
            } catch {
                setUser(null);
            }
        }

        async function loadAdmin() {
            try {
                const data = await request("/admin/", "get", {});
                setAdmin(data);
            } catch {
                setAdmin(null);
            }
        }

        loadUser();
        loadAdmin();
    }, []);
    if (user === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/dishes" element={
                    <ProtectedRoute user={user}>
                        <DishesPage/>
                    </ProtectedRoute>}/>
                <Route path="/profile"
                       element={<ProtectedRoute user={user}><OrderHistoryPage/></ProtectedRoute>}/>
                <Route path="/check-order" element={<ProtectedRoute user={user}><CheckOrderPage/></ProtectedRoute>}/>

                <Route path="/admin-login" element={<LoginPage admin_login={true}/>}/>
                <Route path="/active-orders" element={
                    <AdminProtectedRoute admin={admin} children={<AdminOrdersPage/>}/>
                }/>
                <Route path="/delivery-orders" element={
                    <AdminProtectedRoute admin={admin} children={<AdminDeliveriesOrdersPage/>}/>
                }/>
                <Route path="/pickup-orders" element={
                    <AdminProtectedRoute admin={admin} children={<AdminPickupOrdersPage/>}/>
                }/>
                <Route path="/archive-orders" element={
                    <AdminProtectedRoute admin={admin} children={<AdminArchiveOrders/>}/>
                }/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
