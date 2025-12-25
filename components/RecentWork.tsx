'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * RecentWork - Full-page project showcase with premium 3D device mockups
 * 
 * Features:
 * - Scroll-reactive ombre gradient that shifts colors per project
 * - Premium MacBook-style 3D laptop mockups with keyboard facing user
 * - iPhone-style 3D phone mockups
 * - Alternating left/right layouts with mirrored laptop angles
 */

export default function RecentWork() {
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: number }>({})
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const [activeProject, setActiveProject] = useState(0)
  const projectRefs = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

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
      accentHue: 270,
      laptopAngle: 'right' as const, // Keyboard faces user, angled to show right side
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
      accentHue: 210,
      laptopAngle: 'left' as const, // Keyboard faces user, angled to show left side (mirrored)
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
      accentHue: 160,
      laptopAngle: 'right' as const,
    },
  ]

  // Track which project is most visible for background color
  useEffect(() => {
    const handleScroll = () => {
      projectRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
          setActiveProject(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Get current accent color based on active project
  const currentHue = projects[activeProject]?.accentHue || 270

  // Premium MacBook-style 3D Laptop Mockup - Compact & Clean
  const LaptopMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => {
    const isLeftAngle = project.laptopAngle === 'left'
    const rotateY = isLeftAngle ? 20 : -20
    const rotateX = 8
    
    return (
      <div 
        className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Scaled container for smaller laptop */}
        <div className="max-w-md mx-auto">
          {/* Floating container with 3D transform */}
          <div 
            className="relative transition-all duration-500 hover:translate-y-[-4px]"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
          >
            {/* Ambient glow */}
            <div 
              className="absolute -inset-12 rounded-full blur-[80px] opacity-20 transition-colors duration-1000"
              style={{ backgroundColor: `hsl(${project.accentHue}, 60%, 50%)` }}
            />

            {/* Main Laptop */}
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* SCREEN */}
              <div 
                className="relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(-3deg)',
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Screen frame */}
                <div 
                  className="relative rounded-t-[12px] p-[4px]"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a40 0%, #2a2a30 50%, #1a1a20 100%)',
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.06),
                      0 0 40px -15px hsla(${project.accentHue}, 60%, 50%, 0.3)
                    `,
                  }}
                >
                  {/* Inner bezel */}
                  <div className="relative rounded-t-[9px] bg-[#0a0a0a] p-[2px]">
                    {/* Camera */}
                    <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#1a1a1a]">
                      <div className="w-[2px] h-[2px] rounded-full bg-green-400/30 mx-auto mt-[1.5px]"></div>
                    </div>

                    {/* Screen */}
                    <div className="relative aspect-[16/10] rounded-[6px] overflow-hidden bg-black group mt-1">
                      {project.demoImages.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`absolute inset-0 transition-all duration-500 ${
                            (activeSlides[index] || 0) === imgIndex 
                              ? 'opacity-100' 
                              : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.label}
                            fill
                            className="object-cover object-top"
                            sizes="400px"
                            priority={index === 0 && imgIndex === 0}
                          />
                        </div>
                      ))}

                      {/* Screen glare */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isLeftAngle 
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 25%)'
                            : 'linear-gradient(225deg, rgba(255,255,255,0.08) 0%, transparent 25%)',
                        }}
                      />

                      {/* Navigation */}
                      <button
                        onClick={() => goToPrevSlide(index, project.demoImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white/70 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => goToNextSlide(index, project.demoImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white/70 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                        {project.demoImages.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => setActiveSlides(prev => ({ ...prev, [index]: dotIndex }))}
                            className={`h-1 rounded-full transition-all ${
                              (activeSlides[index] || 0) === dotIndex 
                                ? 'bg-white w-3' 
                                : 'bg-white/40 w-1 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HINGE */}
              <div 
                className="relative h-[5px] mx-2"
                style={{
                  background: 'linear-gradient(180deg, #1a1a20 0%, #2a2a30 50%, #3a3a40 100%)',
                  borderRadius: '0 0 3px 3px',
                }}
              />

              {/* KEYBOARD BASE */}
              <div 
                className="relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(75deg)',
                  transformOrigin: 'top center',
                }}
              >
                <div 
                  className="relative rounded-b-[12px] pt-2 pb-1.5 px-2"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a40 0%, #2a2a30 50%, #1f1f25 100%)',
                    boxShadow: '0 20px 30px -8px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Keyboard */}
                  <div className="bg-[#0c0c0e] rounded p-1.5">
                    {/* Key rows */}
                    {[12, 12, 11, 10].map((count, rowIndex) => (
                      <div key={rowIndex} className="flex gap-[1.5px] mb-[1.5px]">
                        {Array.from({ length: count }).map((_, i) => (
                          <div 
                            key={i} 
                            className="flex-1 h-2.5 rounded-[2px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c]"
                          />
                        ))}
                      </div>
                    ))}
                    {/* Spacebar row */}
                    <div className="flex gap-[1.5px]">
                      <div className="w-4 h-2.5 rounded-[2px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c]" />
                      <div className="w-4 h-2.5 rounded-[2px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c]" />
                      <div className="flex-1 h-2.5 rounded-[2px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c]" />
                      <div className="w-4 h-2.5 rounded-[2px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c]" />
                      <div className="w-4 h-2.5 rounded-[2px] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c]" />
                    </div>
                  </div>
                  {/* Trackpad */}
                  <div className="mx-auto mt-1.5 w-16 h-10 rounded-lg bg-gradient-to-b from-[#1a1a1c] to-[#0f0f10]" />
                </div>
              </div>
            </div>

            {/* Shadow */}
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 rounded-[50%] blur-xl opacity-40"
              style={{ backgroundColor: `hsl(${project.accentHue}, 20%, 8%)` }}
            />
          </div>
        </div>

        {/* Label */}
        <p className="text-center text-white/40 text-xs mt-6 font-medium">
          {project.demoImages[activeSlides[index] || 0]?.label}
        </p>
      </div>
    )
  }

  // Premium iPhone-style 3D Phone Mockup
  const PhoneMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => (
    <div 
      className={`relative flex justify-center transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ perspective: '2000px' }}
    >
      <div 
        className="relative transition-all duration-700 hover:translate-y-[-8px]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(5deg) rotateY(8deg) rotateZ(-1deg)',
        }}
      >
        {/* Ambient glow */}
        <div 
          className="absolute -inset-16 rounded-full blur-[80px] opacity-25 transition-colors duration-1000"
          style={{ backgroundColor: `hsl(${project.accentHue}, 60%, 50%)` }}
        />

        {/* Phone Frame - iPhone 15 Pro style */}
        <div 
          className="relative w-[300px] rounded-[50px] p-[10px] shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #3a3a3f 0%, #2a2a2f 50%, #1a1a1f 100%)',
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.1),
              inset 0 0 0 1px rgba(255,255,255,0.05),
              0 30px 60px -15px rgba(0,0,0,0.8),
              0 0 100px -30px hsla(${project.accentHue}, 60%, 50%, 0.4)
            `,
          }}
        >
          {/* Titanium edge highlights */}
          <div className="absolute inset-y-4 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-y-4 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Side buttons */}
          <div className="absolute -left-[3px] top-28 w-[3px] h-8 bg-gradient-to-r from-[#2a2a2f] to-[#3a3a3f] rounded-l-sm" />
          <div className="absolute -left-[3px] top-40 w-[3px] h-14 bg-gradient-to-r from-[#2a2a2f] to-[#3a3a3f] rounded-l-sm" />
          <div className="absolute -left-[3px] top-56 w-[3px] h-14 bg-gradient-to-r from-[#2a2a2f] to-[#3a3a3f] rounded-l-sm" />
          <div className="absolute -right-[3px] top-36 w-[3px] h-20 bg-gradient-to-l from-[#2a2a2f] to-[#3a3a3f] rounded-r-sm" />

          {/* Inner bezel */}
          <div className="relative rounded-[42px] bg-[#0a0a0a] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[125px] h-[35px] bg-black rounded-[20px] z-20 flex items-center justify-center gap-3">
              <div className="w-[10px] h-[10px] rounded-full bg-[#1a1a1c]" />
              <div className="w-[8px] h-[8px] rounded-full bg-[#1a1a1c]" />
            </div>

            {/* Screen */}
            <div className="relative aspect-[9/19.5] group">
              {project.demoImages.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`absolute inset-0 transition-all duration-700 ${
                    (activeSlides[index] || 0) === imgIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-[1.02]'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-cover object-top"
                    sizes="300px"
                  />
                </div>
              ))}

              {/* Screen glare */}
              <div 
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(130deg, rgba(255,255,255,0.12) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.05) 100%)',
                }}
              />

              {/* Navigation arrows */}
              <button
                onClick={() => goToPrevSlide(index, project.demoImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => goToNextSlide(index, project.demoImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-md rounded-full px-2.5 py-1 z-20">
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
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-20" />
            </div>
          </div>
        </div>

        {/* Ground shadow */}
        <div 
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-[50%] blur-xl opacity-40"
          style={{ backgroundColor: `hsl(${project.accentHue}, 30%, 10%)` }}
        />
      </div>

      {/* Image label */}
      <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium whitespace-nowrap">
        {project.demoImages[activeSlides[index] || 0]?.label}
      </p>
    </div>
  )

  return (
    <section id="work" ref={sectionRef} className="relative">
      {/* Dynamic ombre gradient background - colors shift as you scroll */}
      <div className="fixed inset-0 -z-10 pointer-events-none transition-all duration-1000">
        <div className="absolute inset-0 bg-[#050507]" />
        {/* Main color orb that changes with active project */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[200px] transition-all duration-1000 ease-out"
          style={{ 
            backgroundColor: `hsla(${currentHue}, 50%, 30%, 0.15)`,
          }}
        />
        {/* Secondary accent orb */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] transition-all duration-1000 ease-out"
          style={{ 
            backgroundColor: `hsla(${currentHue + 30}, 40%, 25%, 0.1)`,
          }}
        />
        {/* Subtle top gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-[50vh] transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, hsla(${currentHue}, 40%, 15%, 0.1) 0%, transparent 100%)`,
          }}
        />
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
            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}>
                
                {/* Content Side */}
                <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Project Number - Visible but aesthetic */}
                  <div 
                    className={`absolute -top-8 -left-2 transition-all duration-700 delay-100 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <span 
                      className="text-[8rem] md:text-[10rem] font-black leading-none select-none"
                      style={{ 
                        color: `hsla(${project.accentHue}, 40%, 50%, 0.08)`,
                        WebkitTextStroke: `2px hsla(${project.accentHue}, 50%, 60%, 0.25)`,
                        textShadow: `0 0 60px hsla(${project.accentHue}, 50%, 50%, 0.15)`,
                      }}
                    >
                      {project.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div 
                    className={`relative z-10 transition-all duration-700 delay-200 ${
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

