'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function RecentWork() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Generate random particles for the background
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const projects = [
    {
      title: 'Narbl',
      subtitle: 'AI Developer Platform',
      description: 'A modern, full-stack web application enabling developers to interact with AI models, compare responses across different LLMs, and build custom AI agents—all through a sleek, glassmorphism-styled interface.',
      demoImages: [
        { src: '/narbl-1.png', label: 'Build with Intelligence' },
        { src: '/narbl-2.png', label: 'Chat with Any Model' },
        { src: '/narbl-3.png', label: 'Compare Side by Side' },
      ],
      figmaLink: 'https://www.figma.com/design/NtgiV1MafNfjTq04FH44RB/ai-chat-prototype?node-id=0-1&t=dbfdUH3zr8fzKsfx-1',
    },
    {
      title: 'Project Two',
      subtitle: 'Coming Soon',
      description: '',
      demoImages: [],
      figmaLink: null,
    },
    {
      title: 'Project Three',
      subtitle: 'Coming Soon',
      description: '',
      demoImages: [],
      figmaLink: null,
    },
  ]

  // Slideshow state for each project
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlides((prev) => {
        const newSlides = { ...prev }
        projects.forEach((project, index) => {
          if (project.demoImages.length > 1) {
            const currentSlide = prev[index] || 0
            newSlides[index] = (currentSlide + 1) % project.demoImages.length
          }
        })
        return newSlides
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative px-6 md:px-8 py-20 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
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

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <h2 className="text-xl md:text-2xl font-light text-white/60 mb-16 tracking-widest uppercase">
          Recent Work
        </h2>
        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {/* Left side - Title and description */}
              <div className="flex flex-col justify-between h-full min-h-[300px]">
                <div>
                  <h3 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-lg md:text-xl mt-2 tracking-wide">
                    {project.subtitle}
                  </p>
                  {project.description && (
                    <p className="text-white/50 text-sm md:text-base mt-6 leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  )}
                </div>
                
                <div className="mt-auto pt-8">
                  {project.figmaLink && (
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-white/70 hover:text-white text-base transition-all group"
                    >
                      <span>View Figma Design</span>
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Right side - Demo slideshow */}
              <div className="relative aspect-video bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                {project.demoImages.length > 0 ? (
                  <>
                    {/* Slideshow images */}
                    {project.demoImages.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                          (activeSlides[index] || 0) === imgIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.label}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                    
                    {/* Slideshow dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.demoImages.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => setActiveSlides(prev => ({ ...prev, [index]: dotIndex }))}
                          className={`w-2 h-2 rounded-full transition-all ${
                            (activeSlides[index] || 0) === dotIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                    <span className="text-white/30 text-sm">Coming Soon</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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

