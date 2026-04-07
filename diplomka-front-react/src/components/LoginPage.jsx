import {useState} from "react";
import '../styles/loginPage.scss';

function LoginPage() {
    const [form, setForm] = useState({
        phone: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function submitData() {
        console.log(form)
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
                    <p>Пароль</p>
                    <input type="password" name='password' value={form.password}
                           onChange={handleChange}/>
                </div>
                <button onClick={submitData}>Увійти</button>
            </div>
        </div>
    )
}

export default LoginPage;