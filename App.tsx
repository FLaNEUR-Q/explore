import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

const keywords = ['AI', 'Universe', 'Exploration', 'Knowledge', 'Imagination']

function Satellite({ angle, radius, text }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const x = radius * Math.cos(angle + t * 0.2)
    const z = radius * Math.sin(angle + t * 0.2)
    if (ref.current) {
      ref.current.position.set(x, 0.8, z)
    }
  })

  return (
    <Text ref={ref} fontSize={0.3} color="white">
      {text}
    </Text>
  )
}

function Earth() {
  const planetRef = useRef()
  const cloudRef = useRef()
  const atmosphereRef = useRef()

  const texture = new THREE.TextureLoader().load("/2k_earth_daymap.jpg")
  const nightMap = new THREE.TextureLoader().load("/2k_earth_nightmap.jpg")
  const bumpMap = new THREE.TextureLoader().load("/2k_earth_bump.jpg")
  const cloudMap = new THREE.TextureLoader().load("/earth_clouds_1024.png")

  useFrame(() => {
    if (planetRef.current) planetRef.current.rotation.y += 0.001
    if (cloudRef.current) cloudRef.current.rotation.y += 0.0015
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += 0.0008
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
      {keywords.map((k, i) => (
        <Satellite key={k} text={k} angle={(i / keywords.length) * Math.PI * 2} radius={3.5} />
      ))}
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 2, 5]} intensity={2} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <Earth />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
