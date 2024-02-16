import { Route, Routes } from 'react-router-dom'

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import LandingPage from './pages/LandingPage'
import HomeLoginForm from './components/forms/LoginForm'
import HomePage from './pages/HomePage'
import Body from './components/Body'
import RouterPage from './pages/RouterPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import Register from './components/forms/RegisterForm'





export default function App() {

  return (
    <div id="app">
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/home' element={<HomePage>
            <Body></Body> 
          </HomePage>}></Route>
          <Route path='/register' element={<RegisterPage>
              <Register>
              </Register>
          </RegisterPage>}></Route>
          <Route path='/router' element={<RouterPage/>}>
          </Route>
          <Route path='/post' element={<PostPage/>}>
          </Route>
        </Routes>
        <ToastContainer theme='dark'/>
    </div>
  )
}

