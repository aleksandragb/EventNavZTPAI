import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const isLoggedIn = !!sessionStorage.getItem('authToken');
    return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
