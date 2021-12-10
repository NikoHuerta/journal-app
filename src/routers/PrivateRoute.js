import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, logged }) => {

    return logged 
                ? children 
                : <Navigate to="/auth/login" />
}
