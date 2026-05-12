import {Navigate} from "react-router-dom";

export default function AdminProtectedRoute({admin, children}) {
    if (admin === undefined) {
        return <div>Loading...</div>;
    }
    if (!admin) {
        return <Navigate to="/login-admin" replace/>;
    }

    return children;
}