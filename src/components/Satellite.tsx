import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Html } from "@react-three/drei"

interface Props {
  label: string
  angle: number
  radius: number
  onClick?: () => void
}

export default function Satellite({ label, angle, radius, onClick }: Props) {
  const ref = useRef<THREE.Mesh>(null)
  const theta = angle

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2
    const x = radius * Math.cos(t + theta)
    const z = radius * Math.sin(t + theta)
    if (ref.current) {
      ref.current.position.set(x, 0, z)
    }
  })

  return (
    <mesh ref={ref} onClick={onClick} className="cursor-pointer">
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="orange" />
      <Html distanceFactor={10} position={[0, 0.3, 0]}>
        <div className="text-xs text-white bg-black/60 px-2 py-0.5 rounded shadow">{label}</div>
      </Html>
    </mesh>
  )
}