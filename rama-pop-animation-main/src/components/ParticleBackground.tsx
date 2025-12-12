import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        style={{ background: '#000000' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
