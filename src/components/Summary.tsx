import React, { useState, useMemo } from "react"

interface Props {
  text: string
}

export default function Summary({ text }: Props) {
  const [expanded, setExpanded] = useState(false)
  const lines = text.split("\n").filter(Boolean)
  const title = lines[0] || "요약 정보가 없습니다."
  const bullets = lines.slice(1)
  const mainKeyword = useMemo(() => title.split(" ")[0], [title])
  const toggleExpanded = () => setExpanded(!expanded)
  const imageUrl = `https://source.unsplash.com/600x300/?${encodeURIComponent(mainKeyword)}`

  return (
    <div className="bg-black/60 text-white p-4 rounded-lg mb-2 max-h-72 overflow-auto backdrop-blur-sm">
      <h2 className="text-base font-bold mb-2 text-blue-300">📘 핵심 요약</h2>
      <img src={imageUrl} alt={mainKeyword} className="rounded mb-3 w-full h-40 object-cover border border-white/10" />
      <p className="text-sm mb-2 leading-relaxed">
        {title.split(" ").map((word, i) => (
          <span key={i} className={`px-0.5 ${word.length > 6 ? "text-yellow-300 font-semibold" : ""}`}>
            {word + " "}
          </span>
        ))}
      </p>
      {bullets.length > 0 && (
        <>
          <h3 className="text-sm font-semibold mb-1 text-blue-200">🛰️ 관련 개념</h3>
          <ul className={`text-sm list-disc list-inside space-y-1 transition-all duration-300 ease-in-out ${expanded ? "max-h-60" : "max-h-20 overflow-hidden"}`}>
            {bullets.map((line, i) => (
              <li key={i} className="text-white/90">{line}</li>
            ))}
          </ul>
          <button className="mt-1 text-xs text-blue-400 hover:underline" onClick={toggleExpanded}>
            {expanded ? "간략히 보기 ▲" : "전체 보기 ▼"}
          </button>
        </>
      )}
    </div>
  )
}