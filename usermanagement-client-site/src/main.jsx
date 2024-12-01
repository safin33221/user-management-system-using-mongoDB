import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Componentes/Root.jsx'
import AddUser from './Componentes/AddUser.jsx'
import User from './Componentes/User.jsx'
import UserEdit from './Componentes/UserEdit.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/adduser',
        element: <AddUser></AddUser>
      },
      {
        path: '/',
        element: <User></User>,
        loader:()=>fetch('http://localhost:5000/users/')
      },
      {
        path: '/userEdit/:id',
        element: <UserEdit></UserEdit>,
        loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`)
      },
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
