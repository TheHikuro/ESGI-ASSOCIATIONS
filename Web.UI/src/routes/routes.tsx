import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AssosAdminPage from "../pages/Admin/AssosAdminPage";
import MailerAdminPage from "../pages/Admin/MailerAdminPage";
import SectionsAdminPage from "../pages/Admin/SectionsAdminPage";
import ManagerPage from "../pages/Manager/ManagerPage";
import AssosManagerPage from "../pages/Manager/AssosManagerPage";
import UserAdminPage from "../pages/Admin/UserAdminPage";
import AssosPage from "../pages/AssosPage";
import CalendarPage from "../pages/CalendarPage";
import FirstConnectionPage from "../pages/FirstConnectionPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import { useStoreContext } from "../utils/context/StoreContext";
import { EveryRoles } from "../utils/helpers/enums";
import { getOwnerByAssos } from "../api/assos.axios";
import { getMyUserActions } from "../utils/context/actions/user";

interface RequireAuthenticationProps {
    otherwise: string;
    condition: boolean;
    children: JSX.Element;
}

const OnlyWhen = ({ condition, otherwise, children }: RequireAuthenticationProps) => {
    return condition ? children : <Navigate to={otherwise} />;
};

const MyRoutes = ({ user }: any) => {

    const { state: {
        auth: {
            isAuthenticated,
        },
        user: { id },
    } } = useStoreContext();
    const [assos, setAssos]: any[] = React.useState([])
    const location = useLocation();

    React.useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register') {
            getOwnerByAssos(id).then(res => {
                setAssos(res.map((association: any) => {
                    return {
                        id: association.id,
                        owner: association.owner.id,
                    }
                }))
            })
        }
    }, [id, location.pathname, assos.length])

    return (
        <Routes>
            <Route path="/login" element={<OnlyWhen condition={!isAuthenticated} otherwise="/FirstPage"><LoginPage /></OnlyWhen>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
            <Route path="/FirstPage" element={<OnlyWhen condition={!user.isActivated} otherwise="/Home"><FirstConnectionPage /></OnlyWhen>} />
            <Route path="/Home" element={<OnlyWhen condition={isAuthenticated && user.isActivated} otherwise="/login"><HomePage /></OnlyWhen>} />
            <Route path="/Profile" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><ProfilePage /></OnlyWhen>} />
            <Route path="/Associations" element={<OnlyWhen condition={isAuthenticated} otherwise="/Home"><AssosPage /></OnlyWhen>} />
            <Route path="/Calendrier" element={<OnlyWhen condition={isAuthenticated && user.isActivated} otherwise="/Home"><CalendarPage /></OnlyWhen>} />
            <Route path="/Administration" element={<OnlyWhen condition={user.isAdmin && user.isActivated} otherwise="/Home"><AdminPage /></OnlyWhen>} />
            <Route path="/Administration/Users" element={<OnlyWhen condition={user.isAdmin && user.isActivated} otherwise="/Administration"><UserAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Associations" element={<OnlyWhen condition={user.isAdmin && user.isActivated} otherwise="/Administration"><AssosAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Sections" element={<OnlyWhen condition={user.isAdmin && user.isActivated} otherwise="/Administration"><SectionsAdminPage /></OnlyWhen>} />
            <Route path="/Administration/Mail" element={<OnlyWhen condition={user.isAdmin && user.isActivated} otherwise="/Administration"><MailerAdminPage /></OnlyWhen>} />
            <Route path="/Gestion-Associations" element={<OnlyWhen condition={user.isAssosManager && user.isActivated} otherwise="/Home"><ManagerPage assos={assos} userId={user.id} /></OnlyWhen>} />
            <Route path="/Gestion-Associations/:id" element={<OnlyWhen condition={user.isAssosManager && user.isActivated} otherwise="/Gestion-Associations"><AssosManagerPage /></OnlyWhen>} />
        </Routes>
    )
}

export default MyRoutes