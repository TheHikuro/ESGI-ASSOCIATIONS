import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from './utils/context/StoreContext'
import { ModalProvider } from './components/modal'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Router>
    </StoreProvider>
  </React.StrictMode>
)
