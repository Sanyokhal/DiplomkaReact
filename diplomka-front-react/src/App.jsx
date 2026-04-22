import './App.css';
import './styles/main.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
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

function App() {
    const user = UserStoreProvider(state => state.user);
    const setUser = UserStoreProvider(state => state.setUser);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await request("/user/", "get", {});
                setUser(data);
            } catch {
                setUser(null);
            }
        }

        loadUser();
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
                <Route path="/order-history"
                       element={<ProtectedRoute user={user}><OrderHistoryPage/></ProtectedRoute>}/>
                <Route path="/check-order" element={<ProtectedRoute user={user}><CheckOrderPage/></ProtectedRoute>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default App
