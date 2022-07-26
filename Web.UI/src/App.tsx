import './index.css'
import Loader from './components/Loader'
import MyRoutes from './routes/routes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import { EveryRoles } from './utils/helpers/enums'
import React from 'react'
import { getMyUser } from './api/users.axios.api'

function App() {

  const location = useLocation()
  const [user, setUser] = React.useState({
    id: 0,
    email: '',
    isAdmin: false,
    isAssosManager: false,
    isActivated: false,
  })
  React.useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      const response = async () => {
        setUser(await getMyUser().then(res => {
          return {
            id: res.id,
            email: res.email,
            isAdmin: res.roles.includes(EveryRoles[0].value),
            isAssosManager: res.roles.includes(EveryRoles[1].value),
            isActivated: res.isActivated,
          }
        }))
      }
      response()
    }
  }, [location.pathname])

  return (
    <>
      <Loader>
        <Navbar location={location}>
          <MyRoutes user={user} />
        </Navbar>
      </Loader>
    </>

  )
  //}
}

export default App
