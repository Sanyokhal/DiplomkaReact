import {useEffect, useState} from "react";
import LocationPicker from "./LocationPicker.jsx";
import ProfileComponent from "./profileComponent.jsx";
import userStoreProvider from "../store/UserStoreProvider.js";
import {useNavigate} from 'react-router-dom';
import request from "./request_wrap.js";

function CheckOrderPage() {
    const [location, setLocation] = useState(null);
    const cart = userStoreProvider(state => state.cart);
    const navigate = useNavigate();

    function calculateTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += Math.round(item.price * item.quantity)
        })
        return total;
    }

    useEffect(() => {
        submitOrder()
    }, [location]);

    async function submitOrder() {
        let data_to_send = {
            restaurant: {
                lat: 48.62498400,
                lng: 22.30044100
            },
            customer: location
        }
        console.log(data_to_send)
        let res = await request("/orders/calculate-delivery-fee", 'post', data_to_send)
    }

    return (
        <div className="check-order-page">
            <div className="upper-part">
                <div className="logo-text">
                    <img
                        src="https://cdn-media.choiceqr.com/prod-eat-chilipizza/logo/thumbnail_TzCxaUc-tBVEIpQ-FbvLxi_W-C-r.png"
                        alt=""/>
                    <div className="text">
                        <h4>Chilli pizza</h4>
                        <p>Завжди ок</p>
                    </div>
                </div>
                <div className="menu">
                    <ProfileComponent/>
                </div>
            </div>
            <div className="page-content">
                <div className="cart-list">

                </div>
                <div className="select-location">
                    <h2>Вибери адресу доставки</h2>

                    <LocationPicker onChange={setLocation}/>

                    <pre>{JSON.stringify(location, null, 2)}</pre>
                    <input type="checkbox" id="pick-up"/>
                    <label htmlFor="pick-up">Самовивіз</label>
                </div>
                <div className="total-block">
                    <h4>Cтрави: <span>{calculateTotal()}</span></h4>
                    <h4>Доставка: <span>100</span></h4>
                    <h4>Всього: 400</h4>
                    <button className="finish-order" onClick={submitOrder}>
                        Замовити
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckOrderPage;