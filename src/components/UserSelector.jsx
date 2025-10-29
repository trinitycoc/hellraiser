import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

function UserSelector() {
  const location = useLocation()
  const { selectedUser, users, switchUser } = useUserContext()
  
  // Hide user selector on home page
  if (location.pathname === '/') {
    return null
  }

  return (
    <div className="user-selector">
      <div className="user-selector-container">
        <h3 className="user-selector-title">Select User</h3>
        <div className="user-buttons">
          {users.map((user) => (
            <button
              key={user.id}
              className={`user-button ${selectedUser === user.id ? 'active' : ''}`}
              onClick={() => switchUser(user.id)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserSelector
