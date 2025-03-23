
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placed from './pages/Placed'
import Ordered from './pages/Ordered'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from './pages/Verify'

function App() {


  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
     <ToastContainer/>
         <Navbar/>
         <Searchbar/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/collection" element={<Collection/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/product/:id" element={<Product/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/place-order" element={<Placed/>}/>
         <Route path="/order" element={<Ordered/>}/>
         <Route path="/verify" element={<Verify/>}/>
       </Routes>

       <Footer/>
    </div>
  )
}

export default App
