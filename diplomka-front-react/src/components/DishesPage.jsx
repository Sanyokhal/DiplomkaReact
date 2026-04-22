import {useEffect, useState} from "react";
import UserStoreProvider from "./../store/UserStoreProvider.js";
import MenuComponent from "./menuComponent.jsx";
import ProfileComponent from "./profileComponent.jsx";
import request from "./request_wrap.js";

function DishesPage() {
    const [dishes, setDishes] = useState({})
    const [restaurant, setRestaurant] = useState(undefined)
    const [restaurants, setRestaurants] = useState([]);
    const addToCart = UserStoreProvider(state => state.addToCart);

    async function getRestaurants() {
        let restaurants = await request('/dishes/restaurants', 'get')
        setRestaurants(restaurants)
        if (restaurants.length > 0) {
            setRestaurant(restaurants[0].id)
        }
    }

    const [search, setSearch] = useState("");
    const [debounced, setDebounced] = useState("");

    async function getDishes(search = '') {
        let dishes = await request('/dishes/get', 'post', {search: search})
        setDishes(dishes)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(search);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        getDishes(debounced);
    }, [debounced]);


    useEffect(() => {
        getRestaurants();
        getDishes();
    }, []);

    return (
        <div className="dishes-page">
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
                    <MenuComponent/>
                    <ProfileComponent/>
                </div>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Пошук" value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                    {restaurants.map((rest) => {
                        return <option key={`rest-${rest.id}`} value={rest.id}>{rest.name}</option>
                    })}
                </select>
            </div>
            <div className="groups-holder">
                {Object.values(dishes).map((group, index) => (
                    <div key={`gr_${index}`} className="group">
                        <h2>{group.group_name}</h2>
                        <p>{group.group_description}</p>
                        <div className="dishes-list">
                            {group.items.map((item, i) => (
                                <div key={item.id} className="dish">
                                    <img src="./images/default_dish.jpg" alt=""/>
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                    <span>{item.price} грн</span>
                                    <button onClick={() => addToCart(item)}>Додати
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DishesPage;