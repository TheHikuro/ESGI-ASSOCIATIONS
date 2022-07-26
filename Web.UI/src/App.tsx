import './index.css'
import Loader from './components/Loader'
import MyRoutes from './routes/routes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import { useStoreContext } from './utils/context/StoreContext'
import { EveryRoles } from './utils/helpers/enums'
import React from 'react'

function App() {

  const location = useLocation()
  const { state: { user: { id, roles, email } } } = useStoreContext()
  const isAdmin = roles.includes(EveryRoles[0].value)
  const isAssosManager = roles.includes(EveryRoles[1].value)
  const [user, setUser] = React.useState({
    id: 0,
    email: '',
    isAdmin: false,
    isAssosManager: false,
  })
  React.useEffect(() => {
    if (user.email === '') {
      setUser({
        id,
        email,
        isAdmin,
        isAssosManager,
      })
    }
  }, [user.email, email])

  //if (user.email !== '') {
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
