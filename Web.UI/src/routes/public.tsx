import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

const PublicRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    )
}

export default PublicRoute