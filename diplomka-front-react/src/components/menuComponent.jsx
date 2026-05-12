import UserStoreProvider from "../store/UserStoreProvider.js";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faArrowRight, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";

function menuComponent() {
    const [dropdown, setDropdown] = useState(false)
    const [isLandingPage, setLandingPage] = useState(false)
    const [isProfile, setProfilePage] = useState(false)
    const [isCart, setIsCart] = useState(false)
    const cart = UserStoreProvider(state => state.cart)
    const navigate = useNavigate();
    const user = UserStoreProvider(state => state.user)
    const location = useLocation();

    function toggleDropdown() {
        if (cart.length === 0) {
            setDropdown(false)
            return;
        }
        setDropdown(prev => !prev)
    }

    useEffect(() => {
        if (location.pathname == '/') {
            setLandingPage(true)
        } else {
            setLandingPage(false)
        }
        if (location.pathname == '/profile') {
            setProfilePage(true)
        } else {
            setProfilePage(false)
        }
        if (location.pathname == '/check-order') {
            setIsCart(true)
        } else {
            setIsCart(false)
        }
    }, [location.pathname])

    function routeToOrder() {
        navigate('/dishes')
    }

    useEffect(() => {
        if (cart.length === 0) {
            setDropdown(false);
        }
    }, [cart]);


    function goToOrderingFinish() {
        navigate('/check-order')
    }

    function calculateTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += Math.round(item.price * item.quantity)
        })
        return total;
    }

    function routeToLanding() {
        navigate("/")
    }

    function routeToProfile() {
        navigate("/profile")
    }

    return (
        <div className="menu">
            <div className="logo-text" onClick={() => {
                routeToLanding()
            }}>
                <img
                    src="https://cdn-media.choiceqr.com/prod-eat-chilipizza/logo/thumbnail_TzCxaUc-tBVEIpQ-FbvLxi_W-C-r.png"
                    alt=""/>
                <div className="text">
                    <h4>Chilli pizza</h4>
                    <p>Завжди ок</p>
                </div>
            </div>
            {(user && !isLandingPage) && <div className="buttons">
                <button className={`cart-btn ${isCart ? 'active-btn' : ''}`} onClick={() => toggleDropdown()}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    {cart.length > 0 && <p className="cart-qty" onClick={() => toggleDropdown()}>
                        {cart.length}
                    </p>}
                </button>
                <button onClick={routeToProfile} className={`${isProfile ? 'active-btn' : ''}`}><FontAwesomeIcon
                    icon={faUserCircle}/></button>
            </div>}
            {(!user || isLandingPage) && <div className="buttons">
                <button className="order-btn" onClick={routeToOrder}>Замовити</button>
            </div>}
            {dropdown && <div className="dropdown-menu">
                {cart.map((item) => {
                    return <div className="drp-item" key={`drp_itm_${item.id}`}>
                        <h3>{item.name}</h3>
                        <b>{item.price * item.quantity}₴</b>
                    </div>

                })}
                <div className="lower-menu">
                    <h4>Всього: {calculateTotal()}₴</h4>
                    <button className="btn-orange" onClick={goToOrderingFinish}>Підтвердіть <FontAwesomeIcon
                        icon={faArrowRight}/></button>
                </div>
            </div>}
        </div>
    )
}

export default menuComponent;
