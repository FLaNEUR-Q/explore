import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import Planet from "./components/Planet"
import SearchBar from "./components/SearchBar"
import Satellite from "./components/Satellite"
import useGPT from "./hooks/useGPT"
import Summary from "./components/Summary"
import History from "./components/History"

export default function App() {
  const [concepts, setConcepts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("Earth")
  const [summary, setSummary] = useState<string>("")
  const [history, setHistory] = useState<string[]>([])

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    const results = await useGPT(term)
    setConcepts(results.concepts)
    setSummary(results.summary)
    setHistory(prev => [...prev, term])
  }

  const handleSatelliteClick = (concept: string) => {
    handleSearch(concept)
  }

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 3, 5]} intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Planet searchTerm={searchTerm} />
        {concepts.map((concept, index) => (
          <Satellite
            key={concept}
            label={concept}
            angle={index * ((2 * Math.PI) / concepts.length)}
            radius={2.5}
            onClick={() => handleSatelliteClick(concept)}
          />
        ))}
        <OrbitControls enableZoom={true} />
      </Canvas>
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <Summary text={summary} keywords={concepts} />
        <History logs={history} />
      </div>
      <SearchBar onSearch={handleSearch} />
    </div>
  )
}
