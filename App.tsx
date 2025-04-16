import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const planetRef = useRef()
  const cloudRef = useRef()
  const atmosphereRef = useRef()

  const texture = new THREE.TextureLoader().load("/2k_earth_daymap.jpg")
  const nightMap = new THREE.TextureLoader().load("/2k_earth_nightmap.jpg")
  const bumpMap = new THREE.TextureLoader().load("/2k_earth_bump.jpg")
  const cloudMap = new THREE.TextureLoader().load("/earth_clouds_1024.png")

  useFrame(() => {
    if (planetRef.current) planetRef.current.rotation.y += 0.0015
    if (cloudRef.current) cloudRef.current.rotation.y += 0.002
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += 0.001
  })

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          bumpMap={bumpMap}
          bumpScale={0.03}
          emissiveMap={nightMap}
          emissiveIntensity={1.0}
          metalness={0.3}
          roughness={1}
        />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshBasicMaterial
          color="#aadfff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 2, 5]} intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <Earth />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
