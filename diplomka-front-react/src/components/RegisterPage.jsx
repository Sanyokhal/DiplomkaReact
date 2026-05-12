import {useEffect, useState} from "react";
import "../styles/loginPage.scss";
import {useNavigate} from "react-router-dom";
import request from "./request_wrap.js";
import MenuComponent from "./menuComponent.jsx";
import UserStoreProvider from "../store/UserStoreProvider.js";

function RegisterPage() {
    const [form, setForm] = useState({
        phone: "",
        password: "",
        l_name: "",
        f_name: ""
    });
    const [error, setError] = useState("");
    const user = UserStoreProvider((state) => state.user);
    const navigate = useNavigate();

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
        const fName = form.f_name.trim();
        const lName = form.l_name.trim();
        const phone = form.phone.trim();
        const password = form.password.trim();
        const phoneRegex = /^380\d{9}$/;

        if (!fName || !lName || !phone || !password) {
            setError("Заповніть усі обов'язкові поля");
            return false;
        }

        if (!phoneRegex.test(phone)) {
            setError("Номер телефону має бути у форматі 380xxxxxxxxx");
            return false;
        }

        if (password.length < 6) {
            setError("Пароль має містити щонайменше 6 символів");
            return false;
        }

        return true;
    }

    async function submitData() {
        if (!validateForm()) {
            return;
        }

        const payload = {
            ...form,
            f_name: form.f_name.trim(),
            l_name: form.l_name.trim(),
            phone: form.phone.trim(),
            password: form.password.trim()
        };

        const resp = await request("/user/register", "post", payload);
        if (resp.success) {
            navigate("/login");
            return;
        }
        setError("Не вдалося зареєструватися. Перевірте введені дані");
    }

    return (
        <div className="register">
            <MenuComponent/>
            <div className="login-data">
                <h3>Реєстрація</h3>
                <p className="sub-h3">
                    Якщо ви зареєстровані, <a href="/login">увійдіть тут</a>
                </p>
                <div className="row">
                    <p>Ім'я</p>
                    <input type="text" name="f_name" value={form.f_name} onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>Прізвище</p>
                    <input type="text" name="l_name" value={form.l_name} onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>Номер телефону (у форматі 380xxxxxxxxx)</p>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="380xxxxxxxxx"
                        maxLength="12"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <p>Пароль</p>
                    <input type="password" name="password" value={form.password} minLength="6" onChange={handleChange}/>
                </div>
                {error && <p className="sub-h3">{error}</p>}
                <button className="btn-orange" onClick={submitData}>
                    Зареєструватись
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;
