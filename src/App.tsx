import { BrowserRouter as Router, Route, Routes,Link} from 'react-router'
import './App.css'
import Equipo from './Equipo'
import Favoritos from './Favoritos'
import Home from './Home'
import Informativa from './Informativa'
import Original from './Original'
import Usuarios from './Usuarios'

function App() {

  return (
    <>
      <Router>
        <nav className='c-menu'>
          <Link to ="/">Home</Link>
          <Link to ="/favoritos">Favoritos</Link>
          <Link to ="/informativa">Informativa</Link>
          <Link to ="/original">Original</Link>
          <Link to ="/usuarios">Usuarios</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/equipo/:equipo' element={<Equipo/>}/>
          <Route path='/favoritos' element={<Favoritos/>}/>
          <Route path='/informativa' element={<Informativa/>}/>
          <Route path='/original' element={<Original/>}/>
          <Route path='/usuarios' element={<Usuarios/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
