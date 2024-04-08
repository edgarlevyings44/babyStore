import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  
  return ( 
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </Routes>
    
  )
}

export default App
