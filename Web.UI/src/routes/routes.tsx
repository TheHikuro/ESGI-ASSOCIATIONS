import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AssosAdminPage from "../pages/Admin/AssosAdminPage";
import EventsAdminPage from "../pages/Admin/EventsAdminPage";
import MailerAdminPage from "../pages/Admin/MailerAdminPage";
import SectionsAdminPage from "../pages/Admin/SectionsAdminPage";
import UserAdminPage from "../pages/Admin/UserAdminPage";
import AssosPage from "../pages/AssosPage";
import CalendarPage from "../pages/CalendarPage";
import FirstConnectionPage from "../pages/FirstConnectionPage";
import GestionPage from "../pages/GestionPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
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
            isAuthenticated,
            activated,
            associationsCount,
        }
    } } = useStoreContext();

    return (
        <Routes>
            <Route path="/login" element={<OnlyWhen condition={!isAuthenticated} otherwise="/Home"><LoginPage /></OnlyWhen>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
            <Route path="/FirstPage" element={<OnlyWhen condition={!activated} otherwise="/Home"><FirstConnectionPage /></OnlyWhen>} />
            <Route path="/Home" element={<OnlyWhen condition={isAuthenticated} otherwise="/login"><HomePage /></OnlyWhen>} />
            <Route path="/Profile" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><ProfilePage /></OnlyWhen>} />
            <Route path="/Associations" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><AssosPage /></OnlyWhen>} />
            <Route path="/Calendrier" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><CalendarPage /></OnlyWhen>} />
            <Route path="/Gestion-Associations" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><GestionPage /></OnlyWhen>} />
            <Route path="/Administration" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><AdminPage /></OnlyWhen>} />
            <Route path="/Administration/Users" element={<OnlyWhen condition={isAuthenticated} otherwise="/Administration"><UserAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Associations" element={<OnlyWhen condition={isAuthenticated} otherwise="/Administration"><AssosAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Sections" element={<OnlyWhen condition={isAuthenticated} otherwise="/Administration"><SectionsAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Evenements" element={<OnlyWhen condition={isAuthenticated} otherwise="/Administration"><EventsAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Mail" element={<OnlyWhen condition={isAuthenticated} otherwise="/Administration"><MailerAdminPage /></OnlyWhen>} />

        </Routes>
    )
}

export default MyRoutes