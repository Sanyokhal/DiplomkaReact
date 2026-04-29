import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faChevronLeft, faChevronRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import UserStoreProvider from "../store/UserStoreProvider.js";

function dishCard({dish, max_width = '300px'}) {
    const addToCart = UserStoreProvider(state => state.addToCart);
    const decreaseQuantity = UserStoreProvider(state => state.decreaseQuantity);
    const removeFromCart = UserStoreProvider(state => state.removeFromCart);
    const user = UserStoreProvider(state => state.user);
    const cart = UserStoreProvider(state => state.cart);
    const item_f = cart.find(item => item.id === dish.id);

    return (
        <div className="dish-card" style={{maxWidth: max_width}}>
            {dish.img == null || dish.img == '' ? <img src="./images/default_dish.jpg" alt=""/> : <img src={dish.img}/>}
            <div className="name"><b>{dish.name}</b><small>{dish.weight}г.</small></div>
            {user && <div className="price-weight">
                <b>{dish.price} ₴</b>
                {item_f === undefined ? <button className="btn-orange" onClick={() => {
                    addToCart(dish)
                }}><FontAwesomeIcon icon={faPlus}/> Додати
                </button> : <div className="edit-cart-qty">
                    <button className="rm" onClick={item_f.quantity > 1 ? () => {
                        decreaseQuantity(dish.id)
                    } : () => {
                        removeFromCart(dish.id)
                    }}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>
                    <b>{item_f.quantity}</b>
                    <button className="add" onClick={() => {
                        addToCart(dish)
                    }}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </button>
                </div>}
            </div>}
            {
                !user && <div className="price-weight">
                    <b>{dish.price} ₴</b>
                </div>
            }
            <div className="likes-qty">
                <FontAwesomeIcon icon={faHeart}/>
                <span>{dish.likes_qty}</span>
            </div>
        </div>
    )
}

export default dishCard;