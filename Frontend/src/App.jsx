import React from 'react'
import {Routes , Route }from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Placeorder from './pages/Placeorder';
import Orders from './pages/Order';
import Login from './pages/Login';

import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading';
const App = () => {
  return (
    <>
    <div className='px-4 sm:px-4 md:px-7Vw lg:px-[9vw]'>
    <Navbar/>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:productId' element={<Product/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/place-order' element={<Placeorder/>} />
      <Route path='/orders' element={<Orders/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/loader' element={<Loading/>} />
    </Routes>
    </div>
     <Footer/>
    </>
    
  )
}

export default App