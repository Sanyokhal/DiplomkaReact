import {NavLink, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faBagShopping, faHandHolding, faTruck} from "@fortawesome/free-solid-svg-icons";
import request from "../request_wrap.js";
import UserStoreProvider from "../../store/UserStoreProvider.js";

function AdminSideMenu() {
    const navigate = useNavigate();
    const logoutAdmin = UserStoreProvider(state => state.logoutAdmin);

    async function logout() {
        try {
            await request("/admin/logout", "post", {});
        } finally {
            logoutAdmin();
            navigate("/admin-login");
        }
    }

    return (
        <aside className="admin-side-menu">
            <nav className="menu-links">
                <NavLink to="/active-orders" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
                    <FontAwesomeIcon icon={faBagShopping} style={{"marginRight": "10px"}}/>
                    Замовлення
                </NavLink>
                <NavLink to="/delivery-orders"
                         className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
                    <FontAwesomeIcon icon={faTruck} style={{"marginRight": "10px"}}/>
                    Доставка
                </NavLink>
                <NavLink to="/pickup-orders"
                         className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
                    <FontAwesomeIcon icon={faHandHolding} style={{"marginRight": "10px"}}/>
                    Самовивіз
                </NavLink>
                <NavLink to="/archive-orders"
                         className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
                    <FontAwesomeIcon icon={faArchive} style={{"marginRight": "10px"}}/>
                    Архів
                </NavLink>
            </nav>
            <button className="logout-btn" type="button" onClick={logout}>
                Вийти
            </button>
        </aside>
    );
}

export default AdminSideMenu;
