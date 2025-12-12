'use client'

import { useEffect, useState, useMemo } from 'react'

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Hero() {
  const [showScroll, setShowScroll] = useState(false)

  // Generate random particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useEffect(() => {
    // Fade in "scroll anywhere" after a short delay
    const timer = setTimeout(() => {
      setShowScroll(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center px-4" style={{ paddingTop: '50px' }}>
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center z-10">
        {/* Name using SVG to match splash screen exactly */}
        <div className="flex items-center justify-center">
          <svg
            height="70"
            viewBox="0 0 340 70"
            className="overflow-visible"
            style={{
              width: 'clamp(180px, 35vw, 340px)',
              height: 'auto',
            }}
          >
            <text
              x="0"
              y="50"
              fontSize="60"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="white"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              ANUSHA
            </text>
          </svg>
          
          <svg
            height="70"
            viewBox="0 0 580 70"
            className="overflow-visible"
            style={{
              width: 'clamp(220px, 50vw, 580px)',
              height: 'auto',
              marginLeft: '-45px',
            }}
          >
            <text
              x="0"
              y="50"
              fontSize="60"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="white"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              RAMACHANDRAN
            </text>
          </svg>
        </div>
        
        <p 
          className="mt-8 text-white/60 text-sm tracking-widest uppercase"
          style={{
            opacity: showScroll ? 1 : 0,
            transform: showScroll ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out',
          }}
        >
          Scroll Anywhere
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </section>
  )
}

