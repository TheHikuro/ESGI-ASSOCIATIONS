import { Dashboard } from "../../components/Dashboard";
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const ManagerPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    React.useEffect(() => {
        if (location.pathname === "/Gestion-Associations") {
            navigate("/Gestion-Associations/Associations")
        }
    }, [location])
    return (
        <div className="h-screen flex w-full">
            <Dashboard />
        </div>
    );
}
export default ManagerPage;
