import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider')
  }
  return context
}

export function UserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState('hellraiser')

  const users = [
    { id: 'hellraiser', name: 'Hell Raiser', apiEndpoint: '/hellraiser/accounts' },
    { id: 'thomas', name: 'Thomas', apiEndpoint: '/thomas/accounts' }
  ]

  const switchUser = (userId) => {
    setSelectedUser(userId)
  }

  const getCurrentUser = () => {
    return users.find(user => user.id === selectedUser) || users[0]
  }

  const value = {
    selectedUser,
    users,
    switchUser,
    getCurrentUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
