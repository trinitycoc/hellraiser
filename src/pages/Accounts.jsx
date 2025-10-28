import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAccounts } from '../services/api'
import Card from '../components/Card'

function Accounts() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoading(true)
        const data = await fetchAccounts()
        // For now, use the tags from Google Sheets
        // Player names will be loaded when viewing details
        setAccounts(data.accounts || [])
        setError(null)
      } catch (error) {
        console.error('Error loading accounts:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadAccounts()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <h2>Loading accounts...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error Loading Accounts</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="accounts-table-container">
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Tag</th>
              <th>Town Hall</th>
              <th>Clan</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td className="sr-no-cell">{account.srNo || '-'}</td>
                <td className="name-cell">{account.name}</td>
                <td className="tag-cell">{account.tag}</td>
                <td className="th-cell">{account.townHall || '-'}</td>
                <td className="clan-cell">{account.clanName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Accounts
