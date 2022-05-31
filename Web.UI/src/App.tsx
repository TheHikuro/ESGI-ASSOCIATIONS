import './index.css'
import PublicRoute from './routes/public'
import PrivateRoute from './routes/private'
import React from 'react'
import { useAuthContext } from './utils/context/AuthContext'

function App() {

  const { isConnected } = useAuthContext()

  return (
    isConnected ? <PrivateRoute /> : <PublicRoute />
  )
}

export default App
