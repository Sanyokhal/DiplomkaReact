import {useEffect, useState} from "react";
import "../styles/loginPage.scss";
import {useNavigate} from "react-router-dom";
import request from "./request_wrap.js";
import UserStoreProvider from "../store/UserStoreProvider.js";
import MenuComponent from "./menuComponent.jsx";

function LoginPage({admin_login = false}) {
    const [form, setForm] = useState({
        phone: "",
        password: ""
    });
    const [error, setError] = useState("");
    const setUser = UserStoreProvider((state) => state.setUser);
    const user = UserStoreProvider((state) => state.user);
    const navigate = useNavigate();
    const [inputState, setInputState] = useState("password");

    useEffect(() => {
        if (user) {
            navigate("/dishes");
        }
    }, [user]);

    function handleChange(e) {
        const {name, value} = e.target;
        setError("");

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function validateForm() {
        const phone = form.phone.trim();
        const password = form.password.trim();
        const phoneRegex = /^\d{10,12}$/;

        if (!phone || !password) {
            setError("Заповніть усі обов'язкові поля");
            return false;
        }

        if (!phoneRegex.test(phone)) {
            setError("Вкажіть коректний номер телефону");
            return false;
        }

        if (password.length < 6) {
            setError("Пароль має містити щонайменше 6 символів");
            return false;
        }

        return true;
    }

    function changeType() {
        if (inputState === "password") {
            setInputState("text");
        } else {
            setInputState("password");
        }
    }

    async function submitData() {
        if (!validateForm()) {
            return;
        }

        const user_obj = {
            phone: form.phone.trim(),
            password: form.password.trim()
        };
        const res = await request("/user/login", "post", user_obj);
        if (res.success) {
            setUser(res.user);
            navigate("/dishes");
            return;
        }
        setError("Не вдалося увійти. Перевірте введені дані");
    }

    async function submitAdmin() {
        if (!validateForm()) {
            return;
        }

        const user_obj = {
            phone: form.phone.trim(),
            password: form.password.trim()
        };
        const res = await request("/admin/login", "post", user_obj);
        if (res.success) {
            setUser(res.user);
            navigate("/admin-dishes");
            return;
        }
        setError("Не вдалося увійти. Перевірте введені дані");
    }

    return (
        <div className="login-page">
            {!admin_login && <MenuComponent/>}
            <div className="login-data">
                <h3>Увійти</h3>
                {!admin_login && (
                    <p className="sub-h3">
                        Якщо ви не зареєстровані, <a href="/register">зареєструйтесь тут</a>
                    </p>
                )}
                {admin_login && <p className="sub-h3">Ви входите як адмін в систему</p>}
                <div className="row">
                    <p>Номер телефону</p>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>
                        Пароль <small onClick={changeType}>Глянути пароль</small>
                    </p>
                    <input type={inputState} name="password" value={form.password} onChange={handleChange}/>
                </div>
                {error && <p className="sub-h3">{error}</p>}
                <button className="btn-orange" onClick={admin_login ? submitAdmin : submitData}>
                    Увійти
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
