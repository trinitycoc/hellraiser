import React from 'react'

function Card({ icon, title, description, children, onClick, variant = 'default' }) {
  return (
    <div className={`card card-${variant}`} onClick={onClick}>
      {icon && <div className="card-icon">{icon}</div>}
      {title && <h4 className="card-title">{title}</h4>}
      {description && <p className="card-description">{description}</p>}
      {children}
    </div>
  )
}

export default Card

