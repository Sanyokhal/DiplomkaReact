import {useState} from "react";
import '../styles/loginPage.scss';

function RegisterPage() {
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
                <h3>Реєстрація</h3>
                <p className='sub-h3'>Якщо ви зареєстровані, <a href="/login">увійдіть тут</a></p>
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
                <button onClick={submitData}>Зареєструватись</button>
            </div>
        </div>
    )
}

export default RegisterPage;