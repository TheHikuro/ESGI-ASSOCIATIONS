import { Dashboard } from "../../components/Dashboard";
import React, { Fragment, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../utils/context/StoreContext";
import { getOwnerByAssos } from "../../api/assos.axios";
import { MyAssosState } from "../../utils/context/reducers/user";

const ManagerPage = ({ assos }: any) => {
    const { state: { user: { id: userId } } } = useStoreContext()
    const navigate = useNavigate()
    const location = useLocation()

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
