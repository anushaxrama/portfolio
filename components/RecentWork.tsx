'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * RecentWork - Full-page project showcase with 3D device mockups
 * 
 * Features:
 * - Smooth ombre gradient background that flows between sections
 * - 3D perspective device mockups for each project
 * - Alternating left/right layouts
 * - Scroll-triggered animations
 */

export default function RecentWork() {
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: number }>({})
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const projectRefs = useRef<(HTMLElement | null)[]>([])

  const projects = [
    {
      title: 'Narbl',
      subtitle: 'AI Developer Platform',
      description: 'A modern, full-stack web application enabling developers to interact with AI models, compare responses across different LLMs, and build custom AI agents—all through a sleek, glassmorphism-styled interface.',
      demoImages: [
        { src: '/narbl-1.png', label: 'Build with Intelligence' },
        { src: '/narbl-3.png', label: 'Compare Side by Side' },
        { src: '/narbl-4.png', label: 'Chat with Any Model' },
        { src: '/narbl-5.png', label: 'Build Custom AI Agents' },
        { src: '/narbl-6.png', label: 'Powerful AI Products' },
        { src: '/narbl-7.png', label: 'User Dashboard' },
      ],
      figmaLink: 'https://www.figma.com/design/NtgiV1MafNfjTq04FH44RB/ai-chat-prototype?node-id=0-1&t=dbfdUH3zr8fzKsfx-1',
      githubLink: null,
      caseStudyLink: null,
      deviceType: 'laptop' as const,
      number: '01',
    },
    {
      title: 'NeuraNote',
      subtitle: 'AI-Powered Cognitive Note-Taking',
      description: 'A modern learning companion that transforms how students and lifelong learners capture, connect, and retain knowledge. Features smart notes with AI concept extraction, visual concept maps, and spaced repetition review.',
      demoImages: [
        { src: '/neuranote-1.png', label: 'Think Clearer, Learn Deeper' },
        { src: '/neuranote-2.png', label: 'Designed to Help You' },
        { src: '/neuranote-3.png', label: 'The Science Behind NeuraNote' },
        { src: '/neuranote-4.png', label: 'Welcome Dashboard' },
        { src: '/neuranote-5.png', label: 'Visual Concept Maps' },
        { src: '/neuranote-6.png', label: 'Ready to Review' },
        { src: '/neuranote-7.png', label: 'Learning Insights' },
      ],
      figmaLink: null,
      githubLink: 'https://github.com/anushaxrama/neuranote',
      caseStudyLink: '/case-study/neuranote',
      deviceType: 'laptop' as const,
      number: '02',
    },
    {
      title: 'Spotify',
      subtitle: 'Listening Threads — Intent-Based Discovery',
      description: 'A UX redesign reimagining Spotify\'s discovery experience around listening intent and memory. Replaces endless carousels with curated "Listening Threads" — finite, intentional collections that explain why each song matters.',
      demoImages: [
        { src: '/spotify-1.png', label: 'Your Threads - Home' },
        { src: '/spotify-2.png', label: 'Listening Memory Insights' },
        { src: '/spotify-3.png', label: 'Emotional Clusters' },
        { src: '/spotify-4.png', label: 'Thread Card with Tracks' },
        { src: '/spotify-5.png', label: 'Thread Detail View' },
        { src: '/spotify-6.png', label: 'Now Playing Memory' },
      ],
      figmaLink: null,
      githubLink: 'https://github.com/anushaxrama/your-music-journey',
      caseStudyLink: '/case-study/spotify',
      deviceType: 'phone' as const,
      number: '03',
    },
  ]

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects(prev => new Set([...prev, index]))
          }
        },
        { threshold: 0.2 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && projectRefs.current[index]) {
          observer.unobserve(projectRefs.current[index]!)
        }
      })
    }
  }, [])

  const goToPrevSlide = (projectIndex: number, totalImages: number) => {
    setActiveSlides(prev => {
      const currentSlide = prev[projectIndex] || 0
      return { ...prev, [projectIndex]: (currentSlide - 1 + totalImages) % totalImages }
    })
  }

  const goToNextSlide = (projectIndex: number, totalImages: number) => {
    setActiveSlides(prev => {
      const currentSlide = prev[projectIndex] || 0
      return { ...prev, [projectIndex]: (currentSlide + 1) % totalImages }
    })
  }

  const setProjectRef = (index: number) => (el: HTMLElement | null) => {
    projectRefs.current[index] = el
  }

  // 3D Laptop Mockup Component
  const LaptopMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => (
    <div 
      className={`relative transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ perspective: '1500px' }}
    >
      <div 
        className="relative transition-transform duration-500 hover:scale-[1.02]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(2deg) rotateY(-3deg)',
        }}
      >
        {/* Laptop Frame */}
        <div className="relative">
          {/* Screen bezel */}
          <div className="relative bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] rounded-t-2xl p-2 shadow-2xl">
            {/* Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-green-500/30"></div>
              </div>
            </div>
            
            {/* Screen */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black group">
              {project.demoImages.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`absolute inset-0 transition-all duration-700 ${
                    (activeSlides[index] || 0) === imgIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0 && imgIndex === 0}
                  />
                </div>
              ))}

              {/* Screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

              {/* Navigation arrows */}
              <button
                onClick={() => goToPrevSlide(index, project.demoImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goToNextSlide(index, project.demoImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.demoImages.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setActiveSlides(prev => ({ ...prev, [index]: dotIndex }))}
                    className={`h-1.5 rounded-full transition-all ${
                      (activeSlides[index] || 0) === dotIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/40 w-1.5 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Laptop hinge */}
          <div className="relative h-3 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] rounded-b-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Laptop base/keyboard */}
          <div 
            className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-2xl pt-1 pb-3 px-4"
            style={{ transform: 'rotateX(-5deg)', transformOrigin: 'top' }}
          >
            {/* Keyboard area */}
            <div className="bg-[#0f0f0f] rounded-lg h-6 flex items-center justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
            </div>
            {/* Trackpad */}
            <div className="mt-1 mx-auto w-24 h-4 bg-[#0f0f0f] rounded-md border border-white/5" />
          </div>
        </div>

        {/* Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/30 blur-xl rounded-full" />
      </div>

      {/* Image label */}
      <p className="text-center text-white/50 text-sm mt-6 font-medium">
        {project.demoImages[activeSlides[index] || 0]?.label}
      </p>
    </div>
  )

  // 3D Phone Mockup Component
  const PhoneMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => (
    <div 
      className={`relative flex justify-center transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ perspective: '1500px' }}
    >
      <div 
        className="relative transition-transform duration-500 hover:scale-[1.02]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(2deg) rotateY(5deg)',
        }}
      >
        {/* Phone Frame */}
        <div className="relative w-[280px] bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-2 shadow-2xl">
          {/* Side buttons */}
          <div className="absolute -left-1 top-24 w-1 h-8 bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -left-1 top-36 w-1 h-12 bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -left-1 top-52 w-1 h-12 bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute -right-1 top-32 w-1 h-16 bg-[#2a2a2a] rounded-r-sm" />

          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-10 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
          </div>

          {/* Screen */}
          <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black group">
            {project.demoImages.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className={`absolute inset-0 transition-all duration-700 ${
                  (activeSlides[index] || 0) === imgIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.label}
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>
            ))}

            {/* Screen reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* Navigation arrows */}
            <button
              onClick={() => goToPrevSlide(index, project.demoImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goToNextSlide(index, project.demoImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.demoImages.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setActiveSlides(prev => ({ ...prev, [index]: dotIndex }))}
                  className={`h-1 rounded-full transition-all ${
                    (activeSlides[index] || 0) === dotIndex 
                      ? 'bg-white w-4' 
                      : 'bg-white/40 w-1 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-black/30 blur-xl rounded-full" />
      </div>

      {/* Image label */}
      <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium whitespace-nowrap">
        {project.demoImages[activeSlides[index] || 0]?.label}
      </p>
    </div>
  )

  return (
    <section id="work" className="relative">
      {/* Smooth ombre gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] via-[#0f0a1a] via-[#0a0f1a] to-[#050a0f]" />
        {/* Subtle color orbs for smooth transitions */}
        <div className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[50%] right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[80%] left-1/3 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Section Header */}
      <div className="min-h-[50vh] flex items-center justify-center px-8 relative">
        <div className="text-center">
          <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">Selected Work</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
            Projects
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-px h-20 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Full-page project sections */}
      {projects.map((project, index) => {
        const isEven = index % 2 === 0
        const isVisible = visibleProjects.has(index)
        
        return (
          <section
            key={index}
            ref={setProjectRef(index)}
            className="relative min-h-screen flex items-center py-20 lg:py-0"
          >
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}>
                
                {/* Content Side */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Project Number */}
                  <div 
                    className={`transition-all duration-700 delay-100 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <span className="text-8xl md:text-9xl font-black text-white/5 absolute -top-10 -left-4">
                      {project.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div 
                    className={`transition-all duration-700 delay-200 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-[0.85]">
                      {project.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <div 
                    className={`mt-4 transition-all duration-700 delay-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <div 
                    className={`mt-8 transition-all duration-700 delay-400 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <p className="text-lg md:text-xl text-white/40 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Links */}
                  <div 
                    className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {project.caseStudyLink && (
                      <Link
                        href={project.caseStudyLink}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
                      >
                        <span>View Case Study</span>
                        <svg 
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                    {project.figmaLink && (
                      <a
                        href={project.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
                          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
                          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/>
                          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>
                          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
                        </svg>
                        <span>View Figma</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Device Mockup Side */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {project.deviceType === 'phone' ? (
                    <PhoneMockup project={project} index={index} isVisible={isVisible} />
                  ) : (
                    <LaptopMockup project={project} index={index} isVisible={isVisible} />
                  )}
                </div>
              </div>
            </div>

            {/* Scroll indicator between projects */}
            {index < projects.length - 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
              </div>
            )}
          </section>
        )
      })}

      {/* End indicator */}
      <div className="py-32 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 text-sm tracking-widest uppercase">End of Projects</p>
        </div>
      </div>
    </section>
  )
}
