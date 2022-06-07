import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FirstConnectionPage from "../pages/FirstConnectionPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useStoreContext } from "../utils/context/StoreContext";

interface RequireAuthenticationProps {
    otherwise: string;
    condition: boolean;
    children: JSX.Element;
}

const OnlyWhen = ({ condition, otherwise, children }: RequireAuthenticationProps) => {
    return condition ? children : <Navigate to={otherwise} />;
};

const MyRoutes = () => {

    const { state: {
        auth: {
            isAuthenticated
        }
    } } = useStoreContext();


    return (
        <Routes>
            <Route path="/login" element={<OnlyWhen condition={!isAuthenticated} otherwise="/FirstPage"><LoginPage /></OnlyWhen>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
            <Route path="/FirstPage" element={<OnlyWhen condition={isAuthenticated} otherwise="/login"><FirstConnectionPage /></OnlyWhen>} />
        </Routes>
    )
}

export default MyRoutes