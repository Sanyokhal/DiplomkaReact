import {Navigate} from "react-router-dom";

export default function ProtectedRoute({user, children}) {
    if (user === undefined) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}