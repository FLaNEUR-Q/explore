import { useState } from "react"

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value)
      setValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <input
        type="text"
        placeholder="개념을 입력하세요..."
        className="px-4 py-2 rounded bg-white/80 text-black w-72 focus:outline-none shadow"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}