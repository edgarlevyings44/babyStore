import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductDetails from './pages/productDetails'
import LayoutAdmin from './Components/Admin/Shared/LayoutAdmin'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AdminOrder from './Components/Admin/AdminOrder'
function App() {
  
  return ( 
    <Routes>

    <Route path="/" element={<Homepage />} />
    <Route path='/login' element={<Login />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/cart' element={<Cart />}/>

    <Route path='/admin' element={<LayoutAdmin />}>
      <Route path='/admin/dashboard' element={<AdminDashboard />}/>
      <Route path='/admin/orders' element={<AdminOrder />}/>
    </Route>

    <Route path='/product/:id' element={<ProductDetails />}/>
  </Routes>
    
  )
}

export default App
