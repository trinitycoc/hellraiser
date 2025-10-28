import React, { createContext, useState, useContext } from 'react'

const AccountContext = createContext()

export function useAccountContext() {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAccountContext must be used within AccountProvider')
  }
  return context
}

export function AccountProvider({ children }) {
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [loading, setLoading] = useState(false)

  // TODO: Add functions to manage accounts when API is implemented
  
  const value = {
    accounts,
    setAccounts,
    selectedAccount,
    setSelectedAccount,
    loading,
    setLoading
  }

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  )
}

