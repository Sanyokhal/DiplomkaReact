import DishCard from "./dishCard.jsx";

function landing() {
    const items = [{
        "id": 1,
        "name": "Каша вівсяна",
        "description": "З молоком і цукром",
        "price": 90,
        "is_favorite": false,
        "img": null,
        "likes": 12,
        "weight_in_grams": 300,
        "ingredients": [
            "вівсянка",
            "молоко",
            "цукор",
            "вода"
        ]
    },
        {
            "id": 2,
            "name": "Омлет",
            "description": "Класичний омлет",
            "price": 110,
            "is_favorite": true,
            "img": null,
            "likes": 30,
            "weight_in_grams": 250,
            "ingredients": [
                "яйця",
                "молоко",
                "сіль"
            ]
        },
        {
            "id": 3,
            "name": "Сирники",
            "description": "Зі сметаною",
            "price": 130,
            "is_favorite": false,
            "img": null,
            "likes": 25,
            "weight_in_grams": 200,
            "ingredients": [
                "сир",
                "яйця",
                "борошно",
                "цукор"
            ]
        },
        {
            "id": 4,
            "name": "Тости з авокадо",
            "description": "З хрустким хлібом",
            "price": 150,
            "is_favorite": true,
            "img": null,
            "likes": 40,
            "weight_in_grams": 220,
            "ingredients": [
                "хліб",
                "авокадо",
                "сіль"
            ]
        },
        {
            "id": 5,
            "name": "Панкейки",
            "description": "З сиропом",
            "price": 140,
            "is_favorite": false,
            "img": null,
            "likes": 18,
            "weight_in_grams": 280,
            "ingredients": [
                "борошно",
                "яйця",
                "молоко",
                "сироп"
            ]
        }];
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
                <button className="order-btn">Замовити</button>
            </div>
            <div className="best-dishes">
                <h2>Популярні страви</h2>
                <div className="dishes-carousel">
                    {items.map((item, index) => (
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