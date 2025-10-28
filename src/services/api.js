// API client for making requests to the HellRaiser backend server

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/**
 * Check if backend server is running
 */
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    
    if (!response.ok) {
      return false
    }
    
    const data = await response.json()
    return data.status === 'ok'
  } catch (error) {
    return false
  }
}

/**
 * Fetch all tracked accounts
 */
export const fetchAccounts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch accounts: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching accounts:', error)
    throw error
  }
}

/**
 * Fetch account details by tag
 */
export const fetchAccountDetails = async (accountTag) => {
  try {
    const encodedTag = encodeURIComponent(accountTag.replace('#', ''))
    const response = await fetch(`${API_BASE_URL}/accounts/${encodedTag}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch account details: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching account details:', error)
    throw error
  }
}

/**
 * Fetch tracking data for an account
 */
export const fetchTrackingData = async (accountTag) => {
  try {
    const encodedTag = encodeURIComponent(accountTag.replace('#', ''))
    const response = await fetch(`${API_BASE_URL}/tracking/${encodedTag}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tracking data: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching tracking data:', error)
    throw error
  }
}

/**
 * Get aggregated statistics
 */
export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching stats:', error)
    throw error
  }
}

