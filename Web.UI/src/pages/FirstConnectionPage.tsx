import { Button } from "@mui/material"
import React, { useCallback } from "react"
import VerticalLinearStepper from "../components/Stepper"
import { getUsersActions } from "../utils/context/actions/user"
import { useStoreContext } from "../utils/context/StoreContext"
import { authLogoutRequest } from "../utils/context/actions/auth"
import { useNavigate } from "react-router-dom"

const FirstConnectionPage = () => {
    const navigate = useNavigate()
    const { dispatch, state: {
        auth: {
            isAuthenticated
        }
    } } = useStoreContext()

    React.useEffect(() => {
        if (isAuthenticated) {
            getUsersActions(dispatch)
        }
    }, [isAuthenticated])

    const handleLogout = useCallback(() => {
        authLogoutRequest(dispatch, navigate)
    }, [dispatch, navigate])

    return (
        <>
            <div className="h-screen w-full bg-gray-700 flex flex-col">
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20"
                    variant="contained"
                >
                    Logout
                </Button>
                <div className="h-full w-full flex justify-center items-center">
                    <div className="w-7/12 h-5/6 bg-white rounded-md shadow-md p-5">
                        <div className="h-full w-full">
                            <VerticalLinearStepper />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FirstConnectionPage