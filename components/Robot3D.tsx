'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const RobotModel = () => {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={meshRef}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.2, 1, 1]} />
        <meshStandardMaterial color="#18181B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.3, 1.6, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={5} />
      </mesh>
      <mesh position={[0.3, 1.6, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={5} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2.5, 1.5]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Chest Core */}
      <mesh position={[0, 0.2, 0.8]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={3} />
      </mesh>
    </group>
  )
}

export default function Robot3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple/20 rounded-full blur-[120px] animate-glow-pulse"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange/10 rounded-full blur-[80px] animate-glow-pulse"></div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={5} />
        <pointLight position={[5, 5, 5]} color="#FF6B00" intensity={2} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <RobotModel />
        </Float>
        
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
