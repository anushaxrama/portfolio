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
  const [showScroll, setShowScroll] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Generate shooting stars
  const shootingStars: ShootingStar[] = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 50,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 10 + i * 2,
      angle: Math.random() * 30 + 30, // 30-60 degrees
      length: Math.random() * 60 + 40,
    }));
  }, []);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    const scrollTimer = setTimeout(() => {
      setShowScroll(true)
    }, 1200)
    
    return () => {
      clearTimeout(loadTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute shooting-star"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: `${star.length}px`,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.6), transparent)',
              transform: `rotate(${star.angle}deg)`,
              animation: `shoot ${star.duration}s ease-out ${star.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center z-10 text-center w-full max-w-5xl mx-auto">
        {/* Name - Bold & Perfectly Centered */}
        <div 
          className="w-full"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight text-center w-full"
            style={{
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            ANUSHA
          </h1>
        </div>
        
        <div 
          className="w-full mt-1"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight text-center w-full"
            style={{
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            RAMACHANDRAN
          </h1>
        </div>

        {/* Subtitle */}
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
        @keyframes shoot {
          0% {
            opacity: 0;
            transform: rotate(var(--angle, 45deg)) translateX(0);
          }
          5% {
            opacity: 0.8;
          }
          30% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle, 45deg)) translateX(200px);
          }
        }
        .shooting-star {
          --angle: 45deg;
        }
      `}</style>
    </section>
  )
}
