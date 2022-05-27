import './index.css'
import PublicRoute from './routes/public'
import PrivateRoute from './routes/private'

function App() {
  const isConnected = localStorage.getItem('token')
  return (
    isConnected ? <PrivateRoute /> : <PublicRoute />
  )
}

export default App
