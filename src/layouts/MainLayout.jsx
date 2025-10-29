import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import UserSelector from '../components/UserSelector'

function MainLayout() {
  return (
    <div className="app">
      <Header />
      <UserSelector />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

