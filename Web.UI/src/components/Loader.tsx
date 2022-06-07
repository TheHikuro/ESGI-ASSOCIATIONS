import React from "react"
import { useStoreContext } from "../utils/context/StoreContext"

const Loader = ({ children }: { children: any }) => {

    const { state: {
        loader: {
            isLoading
        }
    } } = useStoreContext()

    if (isLoading) {
        return (
            <div className="loader">
                <h1 className="text-xl font-bold">Loading...</h1>
            </div>
        )
    }
    return children
}

export default Loader