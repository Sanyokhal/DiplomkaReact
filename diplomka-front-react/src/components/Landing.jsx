import DishCard from "./dishCard.jsx";
import {useEffect, useState} from "react";
import request from "./request_wrap.js";
import MenuComponent from "./menuComponent.jsx";

function landing() {
    const [dishes, setDishes] = useState([])


    useEffect(() => {
        async function getPopular() {
            let res = await request('/dishes/popular', 'get', {})
            setDishes(res)
        }

        getPopular()
    }, []);
    return (
        <div className="landing">
            <MenuComponent/>

            <section className="landing-info-block landing-hero">
                <h1 className="landing-info-title">Онлайн-меню для ресторану</h1>
                <p className="landing-info-text">
                    Це онлайн-меню, де користувач може переглядати страви, знайомитися з описом і швидко зробити
                    замовлення.
                </p>
            </section>

            <div className="best-dishes">
                <h2>Популярні страви</h2>
                <div className="dishes-carousel">
                    {dishes.map((item, index) => (
                        <DishCard dish={item} key={`dsh_${index}`} display_order={false}/>
                    ))}
                </div>
            </div>

            <section className="landing-info-block">
                <h2 className="landing-info-title">Про ресторан</h2>
                <p className="landing-info-text">
                    Ресторан може показувати актуальне меню, ціни та опис страв, щоб клієнти завжди бачили реальну
                    пропозицію.
                </p>
            </section>

            <section className="landing-info-block">
                <h2 className="landing-info-title">Як це працює</h2>
                <p className="landing-info-text">
                    Користувач відкриває меню, переглядає страви та їхню вартість, додає позиції й оформлює замовлення
                    онлайн у кілька кліків.
                </p>
            </section>

            <section className="landing-info-block">
                <h2 className="landing-info-title">Переваги онлайн-меню</h2>
                <p className="landing-info-text">
                    Інтерфейс зроблено зручним для клієнтів: усе просто знайти, легко порівняти й швидко перейти до
                    оформлення.
                </p>
            </section>

            <section className="landing-info-block">
                <h2 className="landing-info-title">Зручне замовлення</h2>
                <p className="landing-info-text">
                    Після вибору страв клієнт може одразу оформити замовлення онлайн, а ресторан отримує замовлення у
                    зрозумілому форматі.
                </p>
            </section>

            <div className="agitate">
                <h2>Смачно пахне? Заходь та замовляй онлайн</h2>
                <a href='/login'>Увійти</a>
            </div>
        </div>
    )
}

export default landing;
