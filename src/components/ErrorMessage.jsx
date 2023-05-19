import React from 'react'

export default function ErrorMessage ({ children, tipo }) {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}
