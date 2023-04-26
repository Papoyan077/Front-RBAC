import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'
export default function Layout() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}
