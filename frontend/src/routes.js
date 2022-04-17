import React from "react";
import { Route, Routes, BrowserRouter,} from "react-router-dom";
import { Navigate} from "react-router";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import jwtDecode from "jwt-decode";

const PrivateRoute = () => {
    const user = jwtDecode(localStorage.getItem('user'));
    return user.role===1 ? <Admin /> : <Navigate to="/products" />;
  };

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} exact path="/" />
                <Route element={<MyProducts />} path="/products" />
                <Route element={<PrivateRoute />}  path="/admin" />
            </Routes>
        </BrowserRouter>
    )
}