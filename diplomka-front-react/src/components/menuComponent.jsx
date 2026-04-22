import UserStoreProvider from "../store/UserStoreProvider.js";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

function menuComponent() {
    const [dropdown, setDropdown] = useState(false)
    const cart = UserStoreProvider(state => state.cart)
    const navigate = useNavigate();

    function toggleDropdown() {
        if (cart.length === 0) {
            setDropdown(false)
            return;
        }
        setDropdown(prev => !prev)
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

    return (
        <div className="menu-component" onClick={() => toggleDropdown()}>
            <FontAwesomeIcon icon={faShoppingCart}/>
            <div className="overlay-btn">
                {cart.length}
            </div>
            {dropdown && <div className="dropdown-menu">
                {cart.map((item) => {
                    return <div className="drp-item" key={`drp_itm_${item.id}`}>
                        <h2>{item.name}</h2>
                        <b>{item.price * item.quantity}</b>
                    </div>

                })}
                <div className="lower-menu">
                    <button onClick={goToOrderingFinish}>Підтвердіть <FontAwesomeIcon icon={faArrowRight}/></button>
                    <h4>Всього: {calculateTotal()}</h4>
                </div>
            </div>}
        </div>
    )
}

export default menuComponent;