import { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

interface Props {
  searchTerm: string
}

export default function Planet({ searchTerm }: Props) {
  const ref = useRef<THREE.Mesh>(null)
  const dayMap = useLoader(TextureLoader, "/2k_earth_daymap.jpg")
  const bumpMap = useLoader(TextureLoader, "/2k_earth_bump.jpg")
  const nightMap = useLoader(TextureLoader, "/2k_earth_nightmap.jpg")
  const cloudMap = useLoader(TextureLoader, "/earth_clouds_1024.png")

  const tint = useMemo(() => {
    if (/fire|volcano|sun/i.test(searchTerm)) return "#ff4500"
    if (/ice|snow|cold/i.test(searchTerm)) return "#00ffff"
    if (/nature|forest|green/i.test(searchTerm)) return "#00ff88"
    if (/tech|ai|cyber/i.test(searchTerm)) return "#8888ff"
    return "white"
  }, [searchTerm])

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0015
  })

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={dayMap}
          bumpMap={bumpMap}
          bumpScale={0.04}
          emissiveMap={nightMap}
          emissive={new THREE.Color(tint)}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh scale={1.01}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}