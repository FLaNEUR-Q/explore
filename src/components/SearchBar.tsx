import { useState } from "react"
import { createPortal } from "react-dom"

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value)
      setValue("")
    }
  }

  const form = (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
      }}
    >
      <input
        type="text"
        placeholder="개념을 입력하세요..."
        style={{
          padding: "8px 16px",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#000",
          width: "280px",
          fontSize: "16px",
          border: "none",
          outline: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )

  return typeof window !== "undefined" ? createPortal(form, document.body) : null
}
