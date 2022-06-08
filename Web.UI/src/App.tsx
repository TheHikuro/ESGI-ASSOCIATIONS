import './index.css'
import Loader from './components/Loader'
import MyRoutes from './routes/routes'

function App() {

  return (
    <>
      <Loader>
        <MyRoutes />
      </Loader>
    </>

  )
}

export default App
