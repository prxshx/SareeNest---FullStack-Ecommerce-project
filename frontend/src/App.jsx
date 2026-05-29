import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Home from './pages/Home'
import Footer from './components/Footer'
import SearchedProducts from './pages/SearchedProducts'
import AddProducts from './pages/AddProducts'
import Contact from './components/Contact'
import About from './components/About'
import UpdateOrDeleteProducts from './pages/UpdateOrDeleteProducts'
import Products from './components/Products'
import ProductDetails from './pages/ProductDetails'
import UserDashboard from './pages/UserDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'  
import AddAddress from './pages/AddAddress';
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import ProductSearch from './pages/ProductSearch';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
const App = () => {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hero' element={<Hero/>}/>
        <Route path='/add-address' element={<AddAddress />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='update/delete' element={<UpdateOrDeleteProducts/>}/>
         <Route path='updateProduct/:id' element={<AddProducts/>}/>
         <Route path='/productDetails/:id' element={<ProductDetails/>}/>
         <Route
    path="/productSearch"
    element={<ProductSearch />}
/>
    <Route path='/cart' element={<Cart/>}/>
    <Route
    path="/categories"
    element={<Categories />}
/>

<Route
    path="/category/:category"
    element={<CategoryProducts />}
/>

<Route path='my-orders' element={<Orders/>}/>
            <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER DASHBOARD */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute userOnly={true}>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/addProduct"
          element={
            <PrivateRoute adminOnly={true}>
              <AddProducts />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>

  )
}

export default App
