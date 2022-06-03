import './index.css'
import PublicRoute from './routes/public'
import PrivateRoute from './routes/private'
import React from 'react'
import { useStoreContext } from './utils/context/StoreContext'

function App() {

  const { state: {
    auth: {
      isAuthenticated
    }
  } } = useStoreContext()

  return (
    isAuthenticated ? <PrivateRoute /> : <PublicRoute />
  )
}

export default App
