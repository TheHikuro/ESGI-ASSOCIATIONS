import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
            associationsCount,
        },
        user: { roles, id, isActivated, email },
    } } = useStoreContext();
    const isAdmin = roles.includes(EveryRoles[0].value)
    const isAssosManager = roles.includes(EveryRoles[1].value)
    const [assos, setAssos]: any[] = React.useState([])

    React.useEffect(() => {
        getOwnerByAssos(id).then(res => {
            setAssos(res.map((association: any) => {
                return {
                    id: association.id,
                    owner: association.owner.id,
                }
            }))
        })
    }, [id])
    
    if (email){
        console.log(useStoreContext(), roles)
        return (
            <Routes>
                <Route path="/login" element={<OnlyWhen condition={!isAuthenticated} otherwise="/FirstPage"><LoginPage /></OnlyWhen>} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='*' element={<Navigate to='/login' />} />
                <Route path="/FirstPage" element={<OnlyWhen condition={!isActivated} otherwise="/Home"><FirstConnectionPage /></OnlyWhen>} />
                <Route path="/Home" element={<OnlyWhen condition={isAuthenticated && isActivated} otherwise="/login"><HomePage /></OnlyWhen>} />
                <Route path="/Profile" element={<OnlyWhen condition={isAuthenticated && isActivated} otherwise="/Home"><ProfilePage /></OnlyWhen>} />
                <Route path="/Associations" element={<OnlyWhen condition={isAuthenticated && isActivated} otherwise="/Home"><AssosPage /></OnlyWhen>} />
                <Route path="/Calendrier" element={<OnlyWhen condition={isAuthenticated && isActivated} otherwise="/Home"><CalendarPage /></OnlyWhen>} />
                <Route path="/Administration" element={<OnlyWhen condition={isAdmin && isActivated} otherwise="/Home"><AdminPage /></OnlyWhen>} />
                <Route path="/Administration/Users" element={<OnlyWhen condition={isAdmin && isActivated} otherwise="/Administration"><UserAdminPage /></OnlyWhen>} />
                <Route path="/Administration/Associations" element={<OnlyWhen condition={isAdmin && isActivated} otherwise="/Administration"><AssosAdminPage /></OnlyWhen>} />
                <Route path="/Administration/Sections" element={<OnlyWhen condition={isAdmin && isActivated} otherwise="/Administration"><SectionsAdminPage /></OnlyWhen>} />
                <Route path="/Administration/Mail" element={<OnlyWhen condition={isAdmin && isActivated} otherwise="/Administration"><MailerAdminPage /></OnlyWhen>} />
                <Route path="/Gestion-Associations" element={<OnlyWhen condition={isAssosManager && isActivated} otherwise="/Home"><ManagerPage assos={assos} /></OnlyWhen>} />
                <Route path="/Gestion-Associations/:id" element={<OnlyWhen condition={isAssosManager && isActivated} otherwise="/Gestion-Associations"><AssosManagerPage /></OnlyWhen>} />
            </Routes>
        )
    }
}

export default MyRoutes