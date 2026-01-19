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
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedFirstName, setTypedFirstName] = useState('')
  const [typedLastName, setTypedLastName] = useState('')
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [animateStar, setAnimateStar] = useState(false)
  const [showScroll, setShowScroll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const firstName = 'ANUSHA'
  const lastName = 'RAMACHANDRAN'

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Generate floating white particles (star specs) - reduced on mobile
  const particles: Particle[] = useMemo(() => {
    const count = isMobile ? 20 : 60 // More vibrant stars
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1, // Slightly larger
      duration: Math.random() * 10 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2, // More visible
    }));
  }, [isMobile]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Start page load
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // If reduced motion, show everything immediately
    if (prefersReducedMotion) {
      setTypedFirstName(firstName)
      setTypedLastName(lastName)
      setShowSubtitle(true)
      setAnimateStar(true)
      setShowScroll(true)
      return () => clearTimeout(loadTimer)
    }

    return () => clearTimeout(loadTimer)
  }, [])

  // Type first name
  useEffect(() => {
    if (!isLoaded) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let currentIndex = 0
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= firstName.length) {
          setTypedFirstName(firstName.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
        }
      }, 80)

      return () => clearInterval(typingInterval)
    }, 300)

    return () => clearTimeout(startDelay)
  }, [isLoaded])

  // Type last name after first name completes
  useEffect(() => {
    if (typedFirstName !== firstName) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let currentIndex = 0
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex <= lastName.length) {
          setTypedLastName(lastName.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
        }
      }, 60)

      return () => clearInterval(typingInterval)
    }, 200)

    return () => clearTimeout(startDelay)
  }, [typedFirstName])

  // Show subtitle and star after last name completes
  useEffect(() => {
    if (typedLastName !== lastName) return

    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true)
    }, 400)

    const starTimer = setTimeout(() => {
      setAnimateStar(true)
    }, 600)

    const scrollTimer = setTimeout(() => {
      setShowScroll(true)
    }, 1800)

    return () => {
      clearTimeout(subtitleTimer)
      clearTimeout(starTimer)
      clearTimeout(scrollTimer)
    }
  }, [typedLastName])

  const isTypingComplete = typedLastName === lastName

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

      {/* Removed - background is now handled by RecentWork's fixed background */}

      {/* Main content - centered */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center px-4 text-center"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        {/* Two-line name with typing effect */}
        <div className="relative">
          {/* First name - larger */}
          <h1 
            className="text-white font-black uppercase tracking-tight leading-[0.9] select-none"
            style={{
              fontSize: 'clamp(4rem, 14vw, 9rem)',
              letterSpacing: '-0.02em',
              minHeight: 'clamp(4rem, 14vw, 9rem)',
            }}
          >
            {typedFirstName}
            {typedFirstName !== firstName && (
              <span 
                className="inline-block w-[4px] bg-white/80 ml-1 align-baseline"
                style={{
                  height: 'clamp(3rem, 10vw, 7rem)',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            )}
          </h1>
          
          {/* Last name - smaller */}
          <h1 
            className="text-white font-black uppercase tracking-tight leading-[0.9] select-none"
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 5rem)',
              letterSpacing: '0.01em',
              minHeight: 'clamp(2.2rem, 7vw, 5rem)',
            }}
          >
            {typedLastName}
            {typedFirstName === firstName && typedLastName !== lastName && (
              <span 
                className="inline-block w-[3px] bg-white/80 ml-1 align-baseline"
                style={{
                  height: 'clamp(1.8rem, 5vw, 4rem)',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            )}
          </h1>

          {/* Shooting star underline */}
          <div 
            className="relative mt-4 h-[2px] overflow-visible"
            style={{ 
              width: '100%',
              opacity: isTypingComplete ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {/* The underline trail */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/70 via-white/50 to-white/30"
              style={{
                width: animateStar ? '100%' : '0%',
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            
            {/* The shooting star */}
            <div 
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: animateStar ? '100%' : '0%',
                opacity: animateStar ? 0 : 1,
                transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out 0.8s',
              }}
            >
              {/* Star glow */}
              <div 
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
                  boxShadow: '0 0 12px 4px rgba(255,255,255,0.6), 0 0 24px 8px rgba(255,255,255,0.3)',
                }}
              />
              {/* Comet tail */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px]"
                style={{
                  width: '40px',
                  background: 'linear-gradient(to left, rgba(255,255,255,0.8), rgba(255,255,255,0))',
                  filter: 'blur(1px)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Subtitle - fades in */}
        <p 
          className="text-white/80 text-sm md:text-base font-medium tracking-[0.2em] uppercase mt-8"
          style={{
            opacity: showSubtitle ? 1 : 0,
            transform: showSubtitle ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          UX / Product Designer
        </p>

        {/* Tagline - fades in */}
        <p 
          className="text-white/40 text-sm md:text-base mt-3 tracking-wide"
          style={{
            opacity: showSubtitle ? 1 : 0,
            transform: showSubtitle ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s',
          }}
        >
          Designing thoughtful digital experiences
        </p>
      </div>

      {/* Selected Work with arrow - CENTERED at bottom */}
      <div 
        className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center"
        style={{
          opacity: showScroll ? 1 : 0,
          transform: showScroll ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <div className="flex items-center gap-3 text-white/40 hover:text-white/60 transition-colors cursor-pointer group">
          <svg 
            className="w-4 h-4 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <p className="text-xs tracking-[0.25em] uppercase">Selected Work</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          50% {
            transform: translateY(-8px) translateX(-8px);
          }
          75% {
            transform: translateY(-20px) translateX(4px);
          }
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
