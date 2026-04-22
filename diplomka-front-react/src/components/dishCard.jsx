import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from "@fortawesome/free-regular-svg-icons";

function dishCard({dish, max_width = '300px'}) {
    function getMaxWidth() {
        return `max-width: ${max_width}px;`
    }

    return (
        <div className="dish-card" style={{maxWidth: max_width}}>
            {dish.img == null ? <img src="./images/default_dish.jpg" alt=""/> : <img src={dish.img}/>}
            <b className="name">{dish.name}</b>
            <div className="price-weight">
                <b>{dish.price} ₴</b>
                <span>{dish.weight_in_grams}г.</span>
            </div>
            <div className="likes-qty">
                <FontAwesomeIcon icon={faHeart}/>
                <span>{dish.likes}</span>
            </div>
        </div>
    )
}

export default dishCard;