import React from "react"
import { useCallback, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext({
    isConnected: false,
    //isAdmin: false,
    updateIsConnected: (newIsConnected: boolean) => { },
    logout: () => { },
})

const AuthProvider = ({ children }: any) => {
    const [isConnected, setIsConnected] = useState(localStorage.getItem("token") !== null)
    const navigate = useNavigate()
    //const [isAdmin, setIsAdmin] = useState(false)

    const updateIsConnected = useCallback((newIsConnected: boolean) => {
        localStorage.setItem("token", newIsConnected ? "true" : "")
        setIsConnected(newIsConnected)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem("token")
        setIsConnected(false)
        navigate("/login")
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isConnected: isConnected,
                //isAdmin: isAdmin,
                updateIsConnected: updateIsConnected,
                logout: logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export {
    AuthProvider,
    useAuthContext,
}