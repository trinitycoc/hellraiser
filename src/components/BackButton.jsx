import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/components/back-button.scss'

function BackButton() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <button className="back-button" onClick={handleBack}>
      <span className="back-arrow">←</span>
      <span className="back-text">Back</span>
    </button>
  )
}

export default BackButton

