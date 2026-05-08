import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeBackground.css';

/* ─── Floating Particle Field ─── */
function ParticleField({ count = 600 }) {
  const mesh = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#ec4899'),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  const handlePointerMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Attach mouse listener
  const { gl } = useThree();
  useMemo(() => {
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.03;
    mesh.current.rotation.x += delta * 0.01;

    // Subtle mouse follow
    mesh.current.rotation.y += (mouse.current.x * 0.05 - mesh.current.rotation.y) * 0.01;
    mesh.current.rotation.x += (mouse.current.y * 0.05 - mesh.current.rotation.x) * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Animated Glowing Orb ─── */
function GlowOrb({ position, color, scale = 1, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.scale.setScalar(
      scale + Math.sin(state.clock.elapsedTime * speed) * 0.15
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ─── Wireframe Torus Knot ─── */
function FloatingTorus() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[5, 2, -6]}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

/* ─── Wireframe Icosahedron ─── */
function FloatingIcosahedron() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.z += delta * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1.8}>
      <mesh ref={meshRef} position={[-5, -1, -5]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
}

/* ─── Connection Lines Grid ─── */
function ConnectionGrid() {
  const meshRef = useRef();
  const lines = useMemo(() => {
    const points = [];
    const gridSize = 8;
    const spacing = 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing;
        const z = (j - gridSize / 2) * spacing;
        points.push(new THREE.Vector3(x, -5, z));
      }
    }

    const linePoints = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < spacing * 1.5) {
          linePoints.push(points[i], points[j]);
        }
      }
    }
    return linePoints;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(lines);
    return geo;
  }, [lines]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.02;
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.04} />
    </lineSegments>
  );
}

/* ─── Main Background Component ─── */
export default function ThreeBackground() {
  return (
    <div className="three-background" id="three-background">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#7c3aed" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#3b82f6" />

        <ParticleField count={500} />

        <GlowOrb position={[-4, 3, -4]} color="#7c3aed" scale={1.2} speed={0.8} />
        <GlowOrb position={[4, -2, -3]} color="#3b82f6" scale={0.9} speed={1.2} />
        <GlowOrb position={[0, 4, -5]} color="#ec4899" scale={0.7} speed={1} />

        <FloatingTorus />
        <FloatingIcosahedron />
        <ConnectionGrid />

        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}
