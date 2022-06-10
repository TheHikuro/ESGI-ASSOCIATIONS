import './index.css'
import Loader from './components/Loader'
import MyRoutes from './routes/routes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

function App() {

  const location = useLocation()

  return (
    <>
      <Loader>
        <Navbar location={location}>
          <MyRoutes />
        </Navbar>
      </Loader>
    </>

  )
}

export default App
