import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'

function App() {
  
  return ( 
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/cart' element={<Cart />}/>
    </Routes>
    
  )
}

export default App
