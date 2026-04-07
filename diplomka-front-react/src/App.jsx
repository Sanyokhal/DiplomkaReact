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

function App() {
    const user = UserStoreProvider(state => state.user);
    const setUser = UserStoreProvider(state => state.setUser);
    useEffect(() => {
        setUser({
            'name': "Alex",
            "phone": '+3809957727643'
        })
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/dishes" element={<DishesPage/>}/>
                <Route path="/order-history" element={<OrderHistoryPage/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default App
