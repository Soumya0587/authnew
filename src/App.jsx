import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar'
import Admin from './Pages/Admin'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp';
function App() {

     return (
          <div className="App">
               <Navbar />
               <Routes>
                    <Route path='/' element={<Home />} />
               </Routes>
               <Routes>
                    <Route path='/signup' element={<SignUp />} />
               </Routes>
               <Routes>
                    <Route path='/login' element={<Login />} />
               </Routes>
               <Routes>
                    <Route path='/admin' element={<Admin />} />
               </Routes>
          </div>
     )
}

export default App
