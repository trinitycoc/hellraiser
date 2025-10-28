import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// TODO: Import context providers when implemented
// import { AccountProvider } from './contexts/AccountContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TODO: Add context providers */}
    <App />
  </React.StrictMode>,
)

