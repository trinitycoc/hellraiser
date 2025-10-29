import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Accounts from './pages/Accounts'
import AccountDetails from './pages/AccountDetails'
import Equipments from './pages/Equipments'
import Overview from './pages/Overview'
import Tracking from './pages/Tracking'
import Stats from './pages/Stats'
import Contact from './pages/Contact'
import './styles/main.scss'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="accounts/:accountTag" element={<AccountDetails />} />
          <Route path="equipments" element={<Equipments />} />
          <Route path="overview" element={<Overview />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="stats" element={<Stats />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App

