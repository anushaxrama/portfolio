'use client'

import { useEffect, useState, useMemo } from 'react'

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
  angle: number;
  length: number;
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generate shooting stars (continuous on Hero page too)
  const shootingStars: ShootingStar[] = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 40,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 8 + i * 3,
      angle: Math.random() * 25 + 35,
      length: Math.random() * 50 + 30,
    }));
  }, []);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => {
      clearTimeout(loadTimer)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-blue-900/8" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Shooting stars (continuous, very subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: `${star.length}px`,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)',
              transform: `rotate(${star.angle}deg)`,
              animation: `shoot ${star.duration}s ease-out ${star.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Centered content - Name with same styling as splash */}
      <div className="flex flex-col items-center justify-center z-10 text-center w-full">
        {/* Name container */}
        <div 
          className="flex items-center justify-center"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <h1 
            className="text-white font-black tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            ANUSHA RAMACHANDRAN
          </h1>
        </div>

        {/* Scroll indicator */}
        <div 
          className="mt-12 flex flex-col items-center"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
          }}
        >
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3">
            Scroll Anywhere
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shoot {
          0% {
            opacity: 0;
            transform: rotate(var(--angle, 45deg)) translateX(0);
          }
          10% {
            opacity: 0.5;
          }
          40% {
            opacity: 0.2;
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle, 45deg)) translateX(150px);
          }
        }
      `}</style>
    </section>
  )
}
