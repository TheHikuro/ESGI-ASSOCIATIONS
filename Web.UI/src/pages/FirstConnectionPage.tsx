import { Button } from "@mui/material"
import React from "react"
import VerticalLinearStepper from "../components/Stepper"
import { getUsersActions } from "../utils/context/actions/user"
import { useAuthContext } from "../utils/context/AuthContext"
import { useStoreContext } from "../utils/context/StoreContext"

const FirstConnectionPage = () => {
    const { logout, isConnected } = useAuthContext()
    const { dispatch } = useStoreContext()

    React.useEffect(() => {
        if (isConnected) {
            console.log("isConnected")
            getUsersActions(dispatch)
        }
    }, [isConnected])

    React.useEffect(() => {
        if (!isConnected) {
            logout()
        }
    }, [isConnected])

    return (
        <>
            <div className="h-screen w-full bg-gray-700 flex flex-col">
                <Button
                    onClick={logout}
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