import {useEffect, useState} from "react";
import '../styles/loginPage.scss';
import {useNavigate} from "react-router-dom";
import request from "./request_wrap.js";
import MenuComponent from "./menuComponent.jsx";
import UserStoreProvider from "../store/UserStoreProvider.js";

function RegisterPage() {
    const [form, setForm] = useState({
        phone: '',
        password: '',
        l_name: '',
        f_name: '',
    });
    const user = UserStoreProvider(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dishes');
        }
    }, [user]);

    function handleChange(e) {
        const {name, value} = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function submitData() {
        let resp = await request("/user/register", 'post', form);
    }

    return (
        <div className="register">
            <MenuComponent/>
            <div className="login-data">
                <h3>Реєстрація</h3>
                <p className='sub-h3'>Якщо ви зареєстровані, <a href="/login">увійдіть тут</a></p>
                <div className="row">
                    <p>Ім'я</p>
                    <input type="tel" name="f_name"
                           value={form.f_name}
                           onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>Прізвище</p>
                    <input type="tel" name="l_name"
                           value={form.l_name}
                           onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>Номер телефону (у форматі 380xxxxxxxxx)</p>
                    <input type="tel" name="phone" placeholder="380xxxxxxxxx" maxLength="12"
                           value={form.phone}
                           onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>Пароль</p>
                    <input type="password" name='password' value={form.password} minLength="6"
                           onChange={handleChange}/>
                </div>
                <button className="btn-orange" onClick={submitData}>Зареєструватись</button>
            </div>
        </div>
    )
}

export default RegisterPage;
