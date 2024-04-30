import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Homepage from './pages/homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductDetails from './pages/productDetails'
import LayoutAdmin from './Components/Admin/Shared/LayoutAdmin'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AdminOrder from './Components/Admin/AdminOrder'
import AdminProducts from './Components/Admin/AdminProducts'
import AdminCustomers from './Components/Admin/AdminCustomers'
import UserDetails from './Components/Admin/UserDetails'
import { useState } from 'react'
import AddProduct from './Components/Admin/AddProduct'

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
  category: string;
  created_at: string | null;
  updated_at: string | null;
}

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };
  
  return ( 
    <Routes>

    <Route path="/" element={<Homepage addToCart={addToCart}  cartItems={cartItems} />} />
    <Route path='/login' element={<Login />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/cart' element={<Cart />}/>

    <Route path='/admin' element={<LayoutAdmin />}>
      <Route index element={<AdminDashboard />}/>
      <Route path='/admin/orders' element={<AdminOrder />}/>
      <Route path='/admin/products' element={<AdminProducts />}/>
      <Route path='/admin/customers' element={<AdminCustomers />}/>
      <Route path='/admin/userdetails/:id' element={<UserDetails />}/>
      <Route path='/admin/addproduct' element={<AddProduct />}/>
    </Route>

    <Route path='/product/:id' element={<ProductDetails />}/>
  </Routes>
    
  )
}

export default App
