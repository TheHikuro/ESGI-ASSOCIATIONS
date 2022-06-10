import React from "react"
import GooeyLoader1 from "react-loaders-kit/lib/gooey1/GooeyLoader1"
import { useStoreContext } from "../utils/context/StoreContext"

const Loader = ({ children }: { children: any }) => {

    const { state: {
        loader: {
            isLoading
        }
    } } = useStoreContext()

    // make loader visible only when loading with background transparent using tailwindcss
    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-gray-50">
                <GooeyLoader1 loading={isLoading} size={100} />
            </div>
        )
    }
    return children
}

export default Loader