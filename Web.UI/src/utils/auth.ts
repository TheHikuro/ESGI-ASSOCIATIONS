import { useCallback, useState } from "react"

const useAuth = () => {
    // get token from local storage
    const [token, setToken] = useState(localStorage.getItem("token"))

    const isConnected = useCallback(() => {
        return token !== null
    }, [token])

    const updateToken = (newToken: string) => {
        setToken(newToken)
        localStorage.setItem("token", newToken)
    }

    return { isConnected, updateToken }
}

export default useAuth