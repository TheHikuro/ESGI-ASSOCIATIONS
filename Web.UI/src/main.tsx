import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './utils/context/AuthContext'
import { StoreProvider } from './utils/context/StoreContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoreProvider>
    </Router>
  </React.StrictMode>
)
