import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faSpoon, faTruck} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default function OrderComponent({order, orderExtended, onToggle}) {
    function getCreatedTime(unix) {
        let prev_day_start = moment().startOf('day').unix() - 1;
        if (unix < prev_day_start) {
            return moment.unix(unix).format("DD.MM.YYYY HH:mm")
        } else {
            return `о ${moment.unix(unix).format("HH:mm")}`
        }
    }

    const handleClick = () => {
        onToggle(orderExtended ? null : order.id);
    };

    function transfortState() {
        if (order.status == 0) return "Прийнято";
        if (order.status == 1) return "Готується";
        if (order.status == 2 && order.is_pickup == 1) return "Готове до видачі";
        if (order.status == 2 && order.is_pickup == 0) return "Доставляється";
        if (order.status == 3 && order.is_pickup == 1) return "Видано";
        if (order.status == 3 && order.is_pickup == 0) return "Доставлено";
        return 'Невідомо'
    }

    return (
        <div className="order-wrap">
            <div className="main-data">
                <h4>Замовлення <b>#{order.id}</b></h4>
                <h4>Створено {getCreatedTime(order.created)}</h4>
                <div className="delivery-status">
                    <FontAwesomeIcon icon={faSpoon}/>
                    <span>{transfortState()}</span>
                </div>
                {!orderExtended && <div className="unroll" onClick={() => {
                    handleClick()
                }}><FontAwesomeIcon icon={faChevronDown}/></div>}
                {orderExtended && <div className="unroll" onClick={() => {
                    handleClick()
                }}><FontAwesomeIcon icon={faChevronUp}/></div>}

            </div>
            {(orderExtended) &&
                <table className="order-table">
                    <tbody>
                    <tr>
                        <th colSpan={2}>Назва</th>
                        <th>Кількість</th>
                        <th>Ціна</th>
                        <th>Сума</th>
                    </tr>
                    </tbody>
                    <tbody className="table-items">
                    {order.items.map((dish) => (
                        <tr key={`dsh_id_${dish.data_id}`}>
                            <td className="dish-name" colSpan={2}>{dish.name}</td>
                            <td>{dish.qty}</td>
                            <td>{dish.price}₴</td>
                            <td>{parseFloat(dish.price * dish.qty).toFixed(2)}₴</td>
                        </tr>
                    ))}
                    <tr className="overall">
                        <td colSpan="4">Всього</td>
                        <td>{order.total}₴ {order.is_pickup == 0 &&
                            <span>+ ({order.delivery_fee}₴ <FontAwesomeIcon icon={faTruck}/>)</span>}</td>
                    </tr>
                    </tbody>
                </table>
            }
        </div>);
}