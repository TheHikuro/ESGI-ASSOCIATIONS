import { Dashboard } from "../../components/Dashboard";
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../utils/context/StoreContext";

const ManagerPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { state: { user: { associations } } } = useStoreContext()

    React.useEffect(() => {
        if (location.pathname === "/Gestion-Associations") {
            navigate(`/Gestion-Associations/${associations[0].id}`)
        }
    }, [location])
    return (
        <div className="h-screen flex w-full">
            <Dashboard />
        </div>
    );
}
export default ManagerPage;
