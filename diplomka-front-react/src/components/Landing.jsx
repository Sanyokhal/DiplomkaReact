import DishCard from "./dishCard.jsx";
import {useEffect, useState} from "react";
import request from "./request_wrap.js";
import {useNavigate} from "react-router-dom";

function landing() {
    const [dishes, setDishes] = useState([])
    const navigate = useNavigate();

    function routeToOrder() {
        navigate('/dishes')
    }

    useEffect(() => {
        async function getPopular() {
            let res = await request('/dishes/popular', 'get', {})
            console.log(res)
            setDishes(res)
        }

        getPopular()
    }, []);
    return (
        <div className="landing">
            <div className="menu">
                <div className="logo-text">
                    <img
                        src="https://cdn-media.choiceqr.com/prod-eat-chilipizza/logo/thumbnail_TzCxaUc-tBVEIpQ-FbvLxi_W-C-r.png"
                        alt=""/>
                    <div className="text">
                        <h4>Chilli pizza</h4>
                        <p>Завжди ок</p>
                    </div>
                </div>
                <button className="order-btn" onClick={routeToOrder}>Замовити</button>
            </div>
            <div className="best-dishes">
                <h2>Популярні страви</h2>
                <div className="dishes-carousel">
                    {dishes.map((item, index) => (
                        <DishCard dish={item} key={`dsh_${index}`} max_width={350}/>
                    ))}
                </div>
            </div>
            <div className="agitate">
                <h2>Харе щолкати носом паця, хавка жде, заходи і замовляй</h2>
                <a href='/login'>Уввійти</a>
            </div>
        </div>
    )
}

export default landing;