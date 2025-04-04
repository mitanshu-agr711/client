import React from 'react'


import {Route, Routes,Navigate} from 'react-router-dom'
import './App.css'
import Auth from './components/auth.jsx'
import Home from './components/header.jsx'
function App() {
 

  return (
  <>
     <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
   
      </Routes>
  </>
  )
}

export default App
