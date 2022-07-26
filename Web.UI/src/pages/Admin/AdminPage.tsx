import { Dashboard } from "../../components/Dashboard";
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    React.useEffect(() => {
        if (location.pathname === "/Administration") {
            navigate("/Administration/Users")
        }
    }, [location])
    return (
        <div className="h-screen flex w-full">
            <Dashboard />
        </div>
    );
}
export default AdminPage;