import React from 'react'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
