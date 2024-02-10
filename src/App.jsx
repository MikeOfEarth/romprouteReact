import { Route, Routes } from 'react-router-dom'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import LandingPage from './pages/LandingPage'
import HomeLoginForm from './components/forms/LoginForm'





export default function App() {

  return (
    <div id="app">
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
        </Routes>
        <ToastContainer/>
    </div>
  )
}

