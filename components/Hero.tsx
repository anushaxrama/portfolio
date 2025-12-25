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
  const [isLoaded, setIsLoaded] = useState(false)

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
    // Trigger name animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    // Fade in "scroll anywhere" after name animation
    const scrollTimer = setTimeout(() => {
      setShowScroll(true)
    }, 1200)
    
    return () => {
      clearTimeout(loadTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center px-4">
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

      <div className="flex flex-col items-center justify-center z-10 text-center">
        {/* Name - Bold & Centered with exciting animation */}
        <div 
          className="overflow-hidden"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight text-center"
            style={{
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            ANUSHA
          </h1>
        </div>
        
        <div 
          className="overflow-hidden mt-1"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight text-center"
            style={{
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            RAMACHANDRAN
          </h1>
        </div>

        {/* Subtitle with staggered animation */}
        <p 
          className="mt-6 text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase"
          style={{
            opacity: showScroll ? 1 : 0,
            transform: showScroll ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          Scroll Anywhere
        </p>
        
        {/* Animated line */}
        <div 
          className="mt-4 w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          style={{
            opacity: showScroll ? 1 : 0,
            transform: showScroll ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
          }}
        />
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
