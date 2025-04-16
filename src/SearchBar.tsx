import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10
    }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search a concept..."
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          width: '240px'
        }}
      />
      <button type="submit" style={{
        marginLeft: '8px',
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: '#00bfff',
        color: 'white',
        border: 'none',
        fontWeight: 'bold'
      }}>Go</button>
    </form>
  )
}
