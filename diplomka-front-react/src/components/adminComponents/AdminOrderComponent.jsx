import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import request from "../request_wrap.js";

export default function AdminOrderComponent({order, orderExtended, onToggle}) {
    function getCreatedTime(unix) {
        const prevDayStart = moment().startOf("day").unix() - 1;
        if (unix < prevDayStart) {
            return moment.unix(unix).format("DD.MM.YYYY HH:mm");
        }
        return `о ${moment.unix(unix).format("HH:mm")}`;
    }

    function transportState(status, isPickup) {
        if (status == 0) return "Прийнято";
        if (status == 1) return "Готується";
        if (status == 2 && isPickup == 1) return "Готове до видачі";
        if (status == 2 && isPickup == 0) return "Доставляється";
        if (status == 3 && isPickup == 1) return "Видано";
        if (status == 3 && isPickup == 0) return "Доставлено";
        return "Невідомо";
    }

    async function setNextStatus() {
        let res = await request("/admin/set-status", 'post', {order_id: order.id, status: order.status + 1});
    }

    const userData = order.user;
    const isPickup = Number(order.is_pickup) === 1;
    const hasCoords = order.lat_dest !== undefined && order.lng_dest !== undefined && order.lat_dest !== null && order.lng_dest !== null;
    const mapsUrl = hasCoords ? `https://www.google.com/maps?q=${order.lat_dest},${order.lng_dest}` : null;

    return (
        <div className="order-wrap admin-order-wrap">
            <div className="main-data">
                <h4>Замовлення <b>#{order.id}</b></h4>
                <h4>Створено {getCreatedTime(order.created)}</h4>
                <div className="delivery-status">
                    <span>{transportState(order.status, order.is_pickup)}</span>
                </div>
                <button className="unroll" type="button" onClick={() => onToggle(orderExtended ? null : order.id)}>
                    <FontAwesomeIcon icon={orderExtended ? faChevronUp : faChevronDown}/>
                </button>
            </div>
            {orderExtended &&
                <div className="admin-order-details">
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
                        {(order.items || []).map((dish) => (
                            <tr key={`dsh_id_${dish.data_id || dish.id}_${order.id}`}>
                                <td className="dish-name" colSpan={2}>{dish.name}</td>
                                <td>{dish.qty}</td>
                                <td>{dish.price}₴</td>
                                <td>{parseFloat(dish.price * dish.qty).toFixed(2)}₴</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="admin-delivery-block">
                        <h4>Загальна сума</h4>
                        <p>{order.delivery_fee + order.total}₴</p>
                        {!isPickup && (
                            <>
                                <h4>Доставка</h4>
                                <p><b>Ціна доставки:</b> {String(order.delivery_fee)}₴</p>
                                {mapsUrl &&
                                    <a href={mapsUrl} target="_blank" rel="noreferrer">Відкрити на Google Maps</a>}
                                {!mapsUrl && <p>Координати доставки відсутні</p>}
                            </>
                        )}
                        {isPickup && (
                            <>
                                <h4>Самовивіз</h4>
                                <p>Замовлення буде видане в ресторані.</p>
                            </>
                        )}
                    </div>

                    <div className="admin-user-block">
                        <h4>Користувач</h4>
                        <p>Ім'я: {userData.l_name} {userData.f_name}</p>
                        <p>Номер телефону: +{userData.phone}</p>
                    </div>

                    <div className="admin-status-actions">
                        <h4>Позначити як :</h4>
                        <button className="btn-orange" onClick={() => {
                            setNextStatus()
                        }}>
                            {transportState(order.status + 1, order.is_pickup)}
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
