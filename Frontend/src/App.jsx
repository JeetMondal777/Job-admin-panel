import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/login-Signup/Signup';
import Login from './pages/login-Signup/Login';
import Logout from './pages/login-Signup/LogOut';


const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </div>
  )
}

export default App