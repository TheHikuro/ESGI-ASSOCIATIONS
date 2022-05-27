import { Route, Routes } from 'react-router-dom'

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={'<Login />'} />
            <Route path="/register" element={'<Register />'} />
        </Routes>
    )
}

export default PrivateRoutes