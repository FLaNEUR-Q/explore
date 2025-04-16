export default function History({ logs }: { logs: string[] }) {
  return (
    <div className="bg-white/5 text-white p-3 rounded-lg overflow-auto max-h-32">
      <h2 className="text-sm font-bold mb-1">탐험 기록</h2>
      <ul className="text-xs space-y-1">
        {logs.length === 0 ? (
          <li className="text-white/50">기록 없음</li>
        ) : (
          logs.map((log, idx) => <li key={idx}>🌍 {log}</li>)
        )}
      </ul>
    </div>
  )
}