import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

function profileComponent() {
    return (
        <div className="profile-component">
            <FontAwesomeIcon icon={faUserCircle}/>
            <b>Профіль</b>
        </div>
    )
}

export default profileComponent;