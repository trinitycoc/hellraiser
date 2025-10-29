import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAccounts, fetchAccountDetails } from '../services/api'

// Epic equipment names
const EPIC_EQUIPMENT = [
  'Giant Gauntlet',
  'Spiky Ball',
  'Snake Bracelet',
  'Frozen Arrow',
  'Magic Mirror',
  'Action Figure',
  'Fireball',
  'Lavaloon Puppet',
  'Heroic Torch',
  'Rocket Spear',
  'Electro Boots',
  'Dark Crown',
  'Meteor Staff'
]

function Equipments() {
  const [accountsData, setAccountsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAllAccountsEquipment = async () => {
      try {
        setLoading(true)
        console.log('Fetching all accounts equipment...')
        
        // Get list of accounts
        const accountsResponse = await fetchAccounts()
        const accounts = accountsResponse.accounts || []
        
        // Fetch details for each account to get equipment
        const accountsWithEquipment = await Promise.all(
          accounts.map(async (account) => {
            try {
              const tag = account.tag.replace('#', '')
              const details = await fetchAccountDetails(tag)
              
              // Filter for epic equipment (any level)
              const epicEquipment = details.heroEquipment?.filter(eq => 
                EPIC_EQUIPMENT.includes(eq.name)
              ) || []
              
              // Create a map of equipment by name for easy lookup
              const equipmentMap = {}
              epicEquipment.forEach(eq => {
                equipmentMap[eq.name] = eq
              })
              
              return {
                ...account,
                epicEquipment,
                epicCount: epicEquipment.length,
                equipmentMap
              }
            } catch (err) {
              console.error(`Error fetching details for ${account.tag}:`, err)
              return {
                ...account,
                epicEquipment: [],
                epicCount: 0,
                equipmentMap: {}
              }
            }
          })
        )
        
        // Sort by serial number (srNo) ascending
        const sortedAccounts = accountsWithEquipment.sort((a, b) => {
          const srNoA = parseInt(a.srNo) || 0
          const srNoB = parseInt(b.srNo) || 0
          return srNoA - srNoB
        })
        
        setAccountsData(sortedAccounts)
        setError(null)
      } catch (error) {
        console.error('Error loading equipment data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadAllAccountsEquipment()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <h2>Loading Epic Equipment...</h2>
          <p>Fetching equipment data for all accounts</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error Loading Equipment</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container equipments-container">
      <div className="equipments-page-header">
        <h1>Epic Equipment Tracker</h1>
        <p className="page-subtitle">Tracking epic equipment across all accounts</p>
      </div>

      {/* Epic Equipment Table */}
      <div className="epic-equipment-table-container">
        <table className="epic-equipment-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Tag</th>
              <th>Epic Equipment Count</th>
              <th>Giant Gauntlet</th>
              <th>Spiky Ball</th>
              <th>Snake Bracelet</th>
              <th>Frozen Arrow</th>
              <th>Magic Mirror</th>
              <th>Action Figure</th>
              <th>Fireball</th>
              <th>Lavaloon Puppet</th>
              <th>Heroic Torch</th>
              <th>Rocket Spear</th>
              <th>Electro Boots</th>
              <th>Dark Crown</th>
              <th>Meteor Staff</th>
            </tr>
          </thead>
          <tbody>
            {accountsData.map((account, index) => (
              <tr key={index}>
                <td className="sr-no-cell">{account.srNo || (index + 1)}</td>
                <td className="account-name-cell">
                  <Link to={`/accounts/${account.tag.replace('#', '')}`}>
                    {account.name}
                  </Link>
                </td>
                <td className="account-tag-cell">{account.tag}</td>
                <td className="epic-count-cell">
                  <span className="epic-count-badge">{account.epicCount}</span>
                </td>
                {EPIC_EQUIPMENT.map((eqName) => {
                  const equipment = account.equipmentMap?.[eqName]
                  return (
                    <td key={eqName} className="equipment-cell">
                      {equipment ? (
                        <span className="has-equipment">Yes</span>
                      ) : (
                        <span className="no-equipment">No</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Equipments
