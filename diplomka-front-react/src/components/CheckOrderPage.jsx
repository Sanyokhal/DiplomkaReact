import {useEffect, useState} from "react";
import LocationPicker from "./LocationPicker.jsx";
import userStoreProvider from "../store/UserStoreProvider.js";
import {useNavigate} from 'react-router-dom';
import request from "./request_wrap.js";
import MenuComponent from "./menuComponent.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faHandHolding, faShippingFast} from "@fortawesome/free-solid-svg-icons";
import UserStoreProvider from "../store/UserStoreProvider.js";

function CheckOrderPage() {
    const [location, setLocation] = useState(null);
    const [isPickup, setPickup] = useState(false);
    const [deliveryFee, setDeliveryFee] = useState(75)
    const cart = userStoreProvider(state => state.cart);
    const clearCart = UserStoreProvider(state => state.clearCart)
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const restaurant = UserStoreProvider(state => state.restaurant)
    const setRestaurant = UserStoreProvider(state => state.setRestaurant)

    async function getRestaurants() {
        let restaurants = await request('/dishes/restaurants', 'get')
        setRestaurants(restaurants)
        if (restaurant == undefined) {
            if (restaurants.length > 0) {
                setRestaurant(restaurants[0].id)
            }
        }
    }

    function calculateTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += Math.round(item.price * item.quantity)
        })
        return total;
    }

    useEffect(() => {
        calculateFee()
    }, [location, isPickup]);

    async function calculateFee() {

        if (isPickup) {
            setDeliveryFee(0);
            return;
        } else {
            if (location == null) {
                setDeliveryFee(75);
                return;
            }
        }
        if (calculateTotal() > 1500) {
            setDeliveryFee(0);
            return;
        }
        let data_to_send = {
            restaurant: {
                lat: 48.62498400,
                lng: 22.30044100
            },
            customer: location
        }
        let res = await request("/orders/calculate-delivery-fee", 'post', data_to_send)
        setDeliveryFee(parseFloat(res.delivery_fee))
    }

    async function submitOrder() {
        if (cart.length == 0) {
            navigate('/dishes')
        } else {
            if (isPickup) {
                let data_to_send = {
                    restaurant_id: 1,
                    dishes: minimifyCart()
                }
                let res = await request("/orders/create-pickup", 'post', data_to_send)
            } else {
                if (location == null) {
                    alert("Оберіть самовивіз або точку доставки")
                    return false;
                }
                let data_to_send = {
                    restaurant_id: 1,
                    lat: location.lat,
                    lng: location.lng,
                    dishes: minimifyCart()
                }
                let res = await request("/orders/create-delivery", 'post', data_to_send)
            }
            clearCart()
            navigate('/profile')
        }
    }

    function minimifyCart() {
        let obj = {};
        cart.forEach((dish) => {
            if (dish.quantity > 0) {
                obj[`${dish.id}`] = dish.quantity;
            }
        })
        return obj;
    }

    useEffect(() => {
        getRestaurants()
    }, []);

    return (
        <div className="check-order-page">
            <MenuComponent/>
            <div className="content">
                <div className="tabs">
                    <div className={`tab ${!isPickup && "active-tab"}`} onClick={() => {
                        setPickup(false)
                    }}><FontAwesomeIcon icon={faShippingFast}/><span>Доставка</span></div>
                    <div className={`tab ${isPickup && "active-tab"}`} onClick={() => {
                        setPickup(true)
                    }}><FontAwesomeIcon icon={faHandHolding}/><span>Самовивіз</span></div>
                </div>
                <div className="select-restaurant">
                    <h2>Оберіть ресторан</h2>
                    <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                        {restaurants.map((rest) => {
                            return <option key={`rest-${rest.id}`} value={rest.id}>{rest.name}</option>
                        })}
                    </select>
                </div>
                {!isPickup && <div className="select-location">
                    <LocationPicker onChange={setLocation}/>
                </div>}
                <div className="overall-block">
                    <div className="cart-list">
                        <div className="cart-item cart-header">
                            <h3>Назва</h3>
                            <b>Ціна</b>
                            <b>К-сть</b>
                            <b>Сума</b>
                        </div>
                        {cart.map((item) => (
                            <div className="cart-item" key={`drp_itm_${item.id}`}>
                                <h3>{item.name}</h3>
                                <span>{item.price}₴</span>
                                <span>{item.quantity}</span>
                                <b>{item.price * item.quantity}₴</b>
                            </div>
                        ))}
                    </div>
                    <div className="total-block">
                        <div><p>Cтрави:</p> <b>{calculateTotal()}₴</b></div>
                        <div><p>Доставка:</p> <b>{deliveryFee}₴</b></div>
                        <div><p>Всього:</p> <b>{calculateTotal() + deliveryFee}₴</b></div>
                        <button className="btn-orange" onClick={submitOrder}>
                            Замовити <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOrderPage;