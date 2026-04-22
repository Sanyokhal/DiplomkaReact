import {useState} from "react";
import '../styles/loginPage.scss';
import UserStoreProvider from "../store/UserStoreProvider.js";
import {useNavigate} from 'react-router-dom';
import request from './request_wrap.js';

function LoginPage() {
    const [form, setForm] = useState({
        phone: '',
        password: ''
    });
    const navigate = useNavigate();
    const [inputState, setInputState] = useState("password");
    const setUser = UserStoreProvider(state => state.setUser);

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
       navigate('/dishes')
    }

    return (
        <div className="holder">
            <div className="login-data">
                <h3>Увійти</h3>
                <p className='sub-h3'>Якщо ви не зареєстровані, <a href="/register">зареєструйтесь тут</a></p>
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
                <button onClick={submitData}>Увійти</button>
            </div>
        </div>
    )
}

export default LoginPage;