import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, requiredRole }) => {
    const { token, role } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
    