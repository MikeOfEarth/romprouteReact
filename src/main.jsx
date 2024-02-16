import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './contexts/UserContext.jsx';
import QueryProvider from './contexts/QueryContext.jsx'
import APIProvider from './contexts/APIContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserProvider>
        <QueryProvider>
          <APIProvider>
            <App />
          </APIProvider>
        </QueryProvider>
      </UserProvider>
    </BrowserRouter>
)
