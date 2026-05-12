import {useEffect, useState} from "react";
import '../styles/loginPage.scss';
import {useNavigate} from 'react-router-dom';
import request from './request_wrap.js';
import UserStoreProvider from "../store/UserStoreProvider.js";
import MenuComponent from "./menuComponent.jsx";

function LoginPage({admin_login = false}) {
    const [form, setForm] = useState({
        phone: '',
        password: ''
    });
    const setUser = UserStoreProvider(state => state.setUser)
    const user = UserStoreProvider(state => state.user)
    const navigate = useNavigate();
    const [inputState, setInputState] = useState("password");

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

    function changeType() {
        if (inputState == 'password') {
            setInputState('text')
        } else {
            setInputState('password')
        }
    }

    async function submitData() {
        let user_obj = {
            "phone": form.phone,
            "password": form.password
        }
        let res = await request("/user/login", 'post', user_obj)
        if (res.success) {
            setUser(res.user)
        }
        navigate('/dishes')
    }

    async function submitAdmin() {
        let user_obj = {
            "phone": form.phone,
            "password": form.password
        }
        let res = await request("/admin/login", 'post', user_obj)
        if (res.success) {
            setUser(res.user)
        }
        navigate('/admin-dishes')
    }

    return (
        <div className="login-page">
            {!admin_login && <MenuComponent/>}
            <div className="login-data">
                <h3>Увійти</h3>
                {!admin_login &&
                    <p className='sub-h3'>Якщо ви не зареєстровані, <a href="/register">зареєструйтесь тут</a></p>
                }
                {admin_login && <p className='sub-h3'>Ви входите як адмін в систему</p>}
                <div className="row">
                    <p>Номер телефону</p>
                    <input type="tel" name="phone"
                           value={form.phone}
                           onChange={handleChange}/>
                </div>
                <div className="row">
                    <p>Пароль <small onClick={changeType}>Глянути пароль</small></p>
                    <input type={inputState} name='password' value={form.password}
                           onChange={handleChange}/>
                </div>
                <button className="btn-orange" onClick={admin_login ? submitData : submitAdmin}>Увійти</button>
            </div>
        </div>
    )
}

export default LoginPage;
