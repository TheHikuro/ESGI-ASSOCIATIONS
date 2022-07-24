import { Dashboard } from "../../components/Dashboard";
import React, { Fragment } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../utils/context/StoreContext";

const ManagerPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { state: { user: { associations, id: userId } } } = useStoreContext()

    React.useEffect(() => {
        if (location.pathname === "/Gestion-Associations") {
            if (associations.length !== 0) {
                navigate(`/Gestion-Associations/${associations[0].id}`)
            } else {
                navigate("/Gestion-Associations")
            }
        }
    }, [location, associations.length])
    return (
        <div className="h-screen flex w-full">
            <Dashboard />
        </div>
    );
}
export default ManagerPage;
