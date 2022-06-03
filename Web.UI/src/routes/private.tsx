import { Route, Routes } from 'react-router-dom'
import FirstConnectionPage from '../pages/FirstConnectionPage'

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/FirstPage" element={<FirstConnectionPage />} />
        </Routes>
    )
}

export default PrivateRoutes