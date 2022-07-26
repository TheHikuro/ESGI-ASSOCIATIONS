import { Dashboard } from "../../components/Dashboard";
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../utils/context/StoreContext";
import { getOwnerByAssos } from "../../api/assos.axios";

const ManagerPage = ({ assos, userId }: any) => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(assos)
    React.useEffect(() => {
        if (location.pathname === "/Gestion-Associations") {
            if (assos.length !== 0) {
                navigate(`/Gestion-Associations/${assos[0].id}`)
            } else {
                navigate("/Gestion-Associations")
            }
        }
    }, [location, assos.length, userId])

    return (
        <div className="h-screen flex w-full">
            <Dashboard />
        </div>
    );
}
export default ManagerPage;
