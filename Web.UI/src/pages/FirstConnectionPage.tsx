import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import VerticalLinearStepper from "../components/Stepper"

const FirstConnectionPage = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
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