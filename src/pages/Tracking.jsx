import React from 'react'
import { DEFAULT_PLAYER_TAG } from '../config/constants'

function Tracking() {
  return (
    <div className="container">
      <h1>Account Tracking</h1>
      <p>Track account progress and changes over time.</p>
      <p>Current player tag: {DEFAULT_PLAYER_TAG}</p>
      {/* TODO: Add tracking functionality when API is implemented */}
    </div>
  )
}

export default Tracking

