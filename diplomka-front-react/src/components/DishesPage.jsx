import {useEffect, useState} from "react";
import MenuComponent from "./menuComponent.jsx";
import request from "./request_wrap.js";
import DishCard from "./dishCard.jsx";
import './../styles/dishesPage.scss';
import UserStoreProvider from "../store/UserStoreProvider.js";

function DishesPage() {
    const [dishes, setDishes] = useState({})
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
            <MenuComponent/>
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
                                <DishCard dish={item} key={`dish_${item.id}`}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DishesPage;