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
  const [showLastName, setShowLastName] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Generate floating white particles (star specs)
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useEffect(() => {
    // Start animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Show last name after Anusha animation
    const lastNameTimer = setTimeout(() => {
      setShowLastName(true)
    }, 2200)

    // Show scroll text after last name appears
    const scrollTimer = setTimeout(() => {
      setShowScroll(true)
    }, 3200)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(lastNameTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Floating white particles (star specs) */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />
      </div>

      {/* Name animation - centered */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="flex items-center justify-center">
          {/* ANUSHA with SVG stroke animation */}
          <svg
            height="70"
            viewBox="0 0 340 70"
            className="overflow-visible"
            style={{
              width: 'clamp(180px, 35vw, 340px)',
              height: 'auto',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            <text
              x="0"
              y="50"
              fontSize="60"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              fillOpacity="0"
              style={{
                paintOrder: "stroke",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              ANUSHA
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="1.8s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
              <animate
                attributeName="fill-opacity"
                from="0"
                to="1"
                dur="0.5s"
                begin="1.6s"
                fill="freeze"
              />
            </text>
          </svg>
          
          {/* RAMACHANDRAN - slides out from right of ANUSHA */}
          <div
            className="overflow-hidden"
            style={{
              maxWidth: showLastName ? '600px' : '0',
              opacity: showLastName ? 1 : 0,
              transition: 'max-width 1s ease-out, opacity 0.6s ease-out',
              marginLeft: '-45px',
            }}
          >
            <svg
              height="70"
              viewBox="0 0 580 70"
              className="overflow-visible"
              style={{
                width: 'clamp(220px, 50vw, 580px)',
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
                RAMACHANDRAN
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Selected Work with arrow - CENTERED at bottom */}
      <div 
        className="absolute bottom-20 left-0 right-0 flex flex-col items-center justify-center"
        style={{
          opacity: showScroll ? 1 : 0,
          transform: showScroll ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <div className="flex items-center gap-3 text-white/50">
          <svg 
            className="w-4 h-4 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <p className="text-sm tracking-[0.2em] uppercase">Selected Work</p>
        </div>
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
