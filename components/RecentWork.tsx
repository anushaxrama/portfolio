'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
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
 * - Auto-slideshow with manual navigation
 */

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
  const [activeSlides, setActiveSlides] = useState<{ [key: number]: number }>({})
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const [activeProject, setActiveProject] = useState(0)
  const [isPaused, setIsPaused] = useState<{ [key: number]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)
  const projectRefs = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const autoSlideTimers = useRef<{ [key: number]: NodeJS.Timeout | null }>({})
  
  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Generate floating particles - continues from hero
  const particles: Particle[] = useMemo(() => {
    const count = isMobile ? 15 : 40
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.1,
    }));
  }, [isMobile]);

  const projects = [
    {
      title: 'Narbl',
      subtitle: 'AI Developer Platform',
      description: 'Comparing AI models used to mean opening twelve browser tabs. Narbl puts them all in one place so developers can test prompts, compare responses side by side, and actually figure out which model works best. Clean interface, less chaos.',
      demoImages: [
        { src: '/narbl/narbl-1.png', label: 'Build with Intelligence' },
        { src: '/narbl/narbl-3.png', label: 'Compare Side by Side' },
        { src: '/narbl/narbl-4.png', label: 'Chat with Any Model' },
        { src: '/narbl/narbl-5.png', label: 'Build Custom AI Agents' },
        { src: '/narbl/narbl-6.png', label: 'Powerful AI Products' },
        { src: '/narbl/narbl-7.png', label: 'User Dashboard' },
      ],
      figmaLink: 'https://www.figma.com/design/NtgiV1MafNfjTq04FH44RB/ai-chat-prototype?node-id=0-1&t=dbfdUH3zr8fzKsfx-1',
      githubLink: null,
      caseStudyLink: '/case-study/narbl',
      deviceType: 'laptop' as const,
      number: '01',
      accentHue: 210,
      laptopAngle: 'right' as const, // Keyboard faces user, angled to show right side
    },
    {
      title: 'FlowOps',
      subtitle: 'Enterprise Request Management',
      description: 'End-to-end product design exploring how clear information hierarchy and role-appropriate interfaces can make enterprise workflow tools feel intuitive. Focused on multi-role permissions, SLA visibility, and decision clarity across 4 user personas.',
      demoImages: [
        { src: '/flowops1.png', label: 'Request Dashboard' },
        { src: '/flowops2.png', label: 'Request Detail View' },
        { src: '/flowops3.png', label: 'Agent Triage Queue' },
        { src: '/flowops4.png', label: 'Workflow Management' },
      ],
      figmaLink: null,
      githubLink: null,
      caseStudyLink: '/case-study/flowops',
      deviceType: 'laptop' as const,
      number: '02',
      accentHue: 355,
      laptopAngle: 'left' as const,
    },
    {
      title: 'NeuraNote',
      subtitle: 'AI-Powered Cognitive Note-Taking',
      description: 'What if your notes actually helped you remember things? NeuraNote uses AI to pull out key concepts, connect ideas visually, and remind you of what matters before you forget it. Built for students who are tired of re-reading the same page five times.',
      demoImages: [
        { src: '/neuranote/neuranote-1.png', label: 'Think Clearer, Learn Deeper' },
        { src: '/neuranote/neuranote-2.png', label: 'Designed to Help You' },
        { src: '/neuranote/neuranote-3.png', label: 'The Science Behind NeuraNote' },
        { src: '/neuranote/neuranote-4.png', label: 'Welcome Dashboard' },
        { src: '/neuranote/neuranote-5.png', label: 'Visual Concept Maps' },
        { src: '/neuranote/neuranote-6.png', label: 'Ready to Review' },
        { src: '/neuranote/neuranote-7.png', label: 'Learning Insights' },
      ],
      figmaLink: null,
      githubLink: 'https://github.com/anushaxrama/neuranote',
      caseStudyLink: '/case-study/neuranote',
      deviceType: 'laptop' as const,
      number: '03',
      accentHue: 270,
      laptopAngle: 'left' as const, // Keyboard faces user, angled to show left side (mirrored)
    },
    {
      title: 'Spotify',
      subtitle: 'Listening Threads — Intent-Based Discovery',
      description: 'A concept redesign exploring how Spotify could help users rediscover their relationship with music. Through user research and affinity mapping, I identified key pain points around passive listening and designed features like Listening Memory, Threads, and Emotional Clusters to bring intention back to music discovery.',
      demoImages: [
        { src: '/spotify/spotify-1.png', label: 'Your Threads - Home' },
        { src: '/spotify/spotify-2.png', label: 'Listening Memory Insights' },
        { src: '/spotify/spotify-3.png', label: 'Emotional Clusters' },
        { src: '/spotify/spotify-4.png', label: 'Thread Card with Tracks' },
        { src: '/spotify/spotify-5.png', label: 'Thread Detail View' },
        { src: '/spotify/spotify-6.png', label: 'Now Playing Memory' },
      ],
      figmaLink: null,
      githubLink: 'https://github.com/anushaxrama/your-music-journey',
      caseStudyLink: '/case-study/spotify',
      deviceType: 'phone' as const,
      number: '04',
      accentHue: 145,
      laptopAngle: 'right' as const,
    },
    {
      title: 'HABITat',
      subtitle: 'Gamified Habit Tracking for College Students',
      description: 'Most habit apps get abandoned in two weeks. HABITat changes that through gamification and social accountability: maintain streaks to unlock collectible animals, build your own habitat, and invite friends to keep you on track. Because staying consistent shouldn\'t feel like a chore.',
      demoImages: [
        { src: '/habitat/habitat-hero.png', label: 'HABITat Preview' },
      ],
      figmaLink: null,
      githubLink: null,
      caseStudyLink: '/case-study/habitat',
      deviceType: 'hero-image' as const,
      number: '05',
      accentHue: 30,
      laptopAngle: 'left' as const,
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

  const goToPrevSlide = useCallback((projectIndex: number, totalImages: number) => {
    setActiveSlides(prev => {
      const currentSlide = prev[projectIndex] || 0
      return { ...prev, [projectIndex]: (currentSlide - 1 + totalImages) % totalImages }
    })
    // Pause auto-slide briefly when manually navigating
    setIsPaused(prev => ({ ...prev, [projectIndex]: true }))
    setTimeout(() => setIsPaused(prev => ({ ...prev, [projectIndex]: false })), 5000)
  }, [])

  const goToNextSlide = useCallback((projectIndex: number, totalImages: number) => {
    setActiveSlides(prev => {
      const currentSlide = prev[projectIndex] || 0
      return { ...prev, [projectIndex]: (currentSlide + 1) % totalImages }
    })
    // Pause auto-slide briefly when manually navigating
    setIsPaused(prev => ({ ...prev, [projectIndex]: true }))
    setTimeout(() => setIsPaused(prev => ({ ...prev, [projectIndex]: false })), 5000)
  }, [])

  // Auto-slideshow effect - advances every 4 seconds
  useEffect(() => {
    projects.forEach((project, index) => {
      if (project.demoImages.length <= 1) return // Skip single-image projects
      if (isPaused[index]) return // Skip if manually paused
      
      // Clear existing timer
      if (autoSlideTimers.current[index]) {
        clearInterval(autoSlideTimers.current[index]!)
      }
      
      // Set new timer
      autoSlideTimers.current[index] = setInterval(() => {
        if (!isPaused[index]) {
          setActiveSlides(prev => {
            const currentSlide = prev[index] || 0
            return { ...prev, [index]: (currentSlide + 1) % project.demoImages.length }
          })
        }
      }, 4000) // 4 seconds per slide
    })

    // Cleanup on unmount
    return () => {
      Object.values(autoSlideTimers.current).forEach(timer => {
        if (timer) clearInterval(timer)
      })
    }
  }, [isPaused])

  const setProjectRef = (index: number) => (el: HTMLElement | null) => {
    projectRefs.current[index] = el
  }

  // Get current accent color based on active project (defaults to Narbl's blue)
  const currentHue = projects[activeProject]?.accentHue || 210

  // Clean MacBook Pro Mockup - Matches reference image exactly
  const LaptopMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => {
    const isLeftAngle = project.laptopAngle === 'left'

  return (
      <div 
        className={`relative flex justify-center items-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className={`w-full max-w-[500px] ${isLeftAngle ? 'mr-auto' : 'ml-auto'}`}>
          <div className="relative transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02]">
            
            {/* Subtle ambient glow */}
            <div 
              className="absolute -inset-20 rounded-full blur-[120px] opacity-20 transition-colors duration-1000"
              style={{ backgroundColor: `hsl(${project.accentHue}, 50%, 50%)` }}
            />

            {/* MacBook Pro Frame */}
            <div className="relative">
              
              {/* Screen housing - dark bezel */}
              <div 
                className="relative rounded-t-[18px] bg-[#1a1a1a] p-[10px] pb-[8px]"
                style={{
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.08),
                    0 -2px 40px -10px hsla(${project.accentHue}, 50%, 50%, 0.2),
                    0 25px 50px -15px rgba(0,0,0,0.5)
                  `,
                }}
              >
                {/* Camera notch - centered pill */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[80px] h-[18px] bg-[#0a0a0a] rounded-b-[10px] flex items-center justify-center z-10">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#1a1a1a] border border-[#2a2a2a]">
                    <div className="w-[3px] h-[3px] rounded-full bg-[#0d2818] mx-auto mt-[1px]"></div>
                  </div>
                </div>

                {/* Screen area with content */}
                <div 
                  className="relative rounded-[8px] overflow-hidden group" 
                  style={{ 
                    aspectRatio: '16/10',
                    backgroundColor: project.title === 'Narbl' ? '#000000' : '#faf8f6'
                  }}
                >
                  
                  {/* Slideshow images */}
                  {project.demoImages.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`absolute inset-0 flex items-center justify-center will-change-opacity ${
                        (activeSlides[index] || 0) === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                      style={{ 
                        transition: 'opacity 0.4s ease-out',
                        transform: 'translateZ(0)', // Hardware acceleration
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.label}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 90vw, 500px"
                        priority={index === 0 && imgIndex === 0}
                        loading={index === 0 && imgIndex === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}

                  {/* Navigation Arrows - Only show if multiple images */}
                  {project.demoImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          goToPrevSlide(index, project.demoImages.length)
                        }}
                        className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-11 h-11 md:w-9 md:h-9 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white active:bg-black active:scale-95 opacity-80 md:opacity-0 md:group-hover:opacity-100 cursor-pointer z-30 touch-manipulation select-none"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          goToNextSlide(index, project.demoImages.length)
                        }}
                        className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-11 h-11 md:w-9 md:h-9 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white active:bg-black active:scale-95 opacity-80 md:opacity-0 md:group-hover:opacity-100 cursor-pointer z-30 touch-manipulation select-none"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Slideshow dots - Only show if multiple images */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 rounded-full px-2.5 py-1.5 z-20">
                        {project.demoImages.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => {
                              setActiveSlides(prev => ({ ...prev, [index]: dotIndex }))
                              setIsPaused(prev => ({ ...prev, [index]: true }))
                              setTimeout(() => setIsPaused(prev => ({ ...prev, [index]: false })), 5000)
                            }}
                            className={`h-1.5 rounded-full cursor-pointer touch-manipulation ${
                              (activeSlides[index] || 0) === dotIndex 
                                ? 'bg-white w-4' 
                                : 'bg-white/40 w-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom chin / hinge area */}
              <div className="relative">
                {/* Hinge */}
                <div 
                  className="h-[4px] mx-[15%] rounded-b-sm"
                  style={{
                    background: 'linear-gradient(180deg, #2a2a2a 0%, #3a3a3a 100%)',
                  }}
                />
                
                {/* Base/keyboard deck - simplified, just visible edge */}
                <div 
                  className="h-[12px] mx-[5%] rounded-b-[8px]"
                  style={{
                    background: 'linear-gradient(180deg, #c4c4c6 0%, #a8a8aa 50%, #8a8a8c 100%)',
                    boxShadow: '0 4px 15px -5px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
            </div>

            {/* Ground shadow */}
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-[50%] blur-xl opacity-40 bg-black"
            />
          </div>
        </div>
      </div>
    )
  }

  // Premium iPhone-style 3D Phone Mockup
  const PhoneMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => (
    <div 
      className={`relative flex justify-center items-start pt-16 transition-all duration-1000 delay-300 ${
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

        {/* Phone Frame - Smaller like Rashi's */}
        <div 
          className="relative w-[220px] rounded-[40px] p-[8px] shadow-2xl"
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
                    className={`absolute inset-0 will-change-opacity ${
                      (activeSlides[index] || 0) === imgIndex 
                        ? 'opacity-100 z-10' 
                        : 'opacity-0 z-0'
                    }`}
                    style={{ 
                      transition: 'opacity 0.4s ease-out',
                      transform: 'translateZ(0)', // Hardware acceleration
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.label}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 70vw, 220px"
                    loading={imgIndex === 0 ? 'eager' : 'lazy'}
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

              {/* Navigation arrows - Only show if multiple images */}
              {project.demoImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      goToPrevSlide(index, project.demoImages.length)
                    }}
                    className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white active:bg-black active:scale-95 opacity-80 md:opacity-0 md:group-hover:opacity-100 cursor-pointer z-30 touch-manipulation select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      goToNextSlide(index, project.demoImages.length)
                    }}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white active:bg-black active:scale-95 opacity-80 md:opacity-0 md:group-hover:opacity-100 cursor-pointer z-30 touch-manipulation select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots - Only show if multiple images */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 rounded-full px-2.5 py-1 z-20">
                    {project.demoImages.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => {
                          setActiveSlides(prev => ({ ...prev, [index]: dotIndex }))
                          setIsPaused(prev => ({ ...prev, [index]: true }))
                          setTimeout(() => setIsPaused(prev => ({ ...prev, [index]: false })), 5000)
                        }}
                        className={`h-1 rounded-full cursor-pointer touch-manipulation ${
                          (activeSlides[index] || 0) === dotIndex 
                            ? 'bg-white w-4' 
                            : 'bg-white/40 w-1'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/20 rounded-full z-20" />
            </div>
          </div>
        </div>

        {/* Ground shadow */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-12 rounded-[50%] blur-xl opacity-40"
          style={{ backgroundColor: `hsl(${project.accentHue}, 30%, 10%)` }}
        />
      </div>
    </div>
  )

  // Hero Image Mockup for HABITat - Display the dual phone image
  const HeroImageMockup = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => (
    <div 
      className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="relative w-full max-w-[550px]">
        {/* Ambient glow */}
        <div 
          className="absolute -inset-16 rounded-full blur-[100px] opacity-30 transition-colors duration-1000"
          style={{ backgroundColor: `hsl(${project.accentHue}, 60%, 50%)` }}
        />

        {/* Hero Image - displayed normally */}
        <Image
          src={project.demoImages[0]?.src || '/habitat/habitat-hero.png'}
          alt={project.demoImages[0]?.label || 'HABITat Preview'}
          width={550}
          height={450}
          className="w-full h-auto"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
          }}
          sizes="550px"
        />
      </div>
    </div>
  )

  return (
    <section id="work" ref={sectionRef} className="relative">
      {/* Dynamic ombre gradient background - simpler on mobile */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Solid base */}
        <div className="absolute inset-0 bg-[#050507]" />
        {/* Main color orb - simplified blur on mobile */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] md:w-[1100px] h-[800px] md:h-[1100px] rounded-full blur-[100px] md:blur-[200px]"
          style={{ 
            backgroundColor: `hsla(${currentHue}, 70%, 35%, 0.3)`,
            transition: 'background-color 1s ease-out',
          }}
        />
        {/* Secondary accent orb - hidden on mobile for performance */}
        <div 
          className="hidden md:block absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ 
            backgroundColor: `hsla(${currentHue + 30}, 60%, 30%, 0.2)`,
            transition: 'background-color 1s ease-out',
          }}
        />
      </div>

      {/* Floating particles - hidden on mobile for performance */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              backgroundColor: particle.id % 4 === 0 ? `hsla(${currentHue}, 60%, 70%, 0.8)` : '#ffffff',
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
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
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}>
                
                {/* Content Side */}
                <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Project Number - Subtle but visible */}
                  <div 
                    className={`absolute -top-12 -left-4 transition-all duration-700 delay-100 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <span 
                      className="text-[5rem] md:text-[6rem] font-black leading-none select-none"
                      style={{ 
                        color: `hsla(${project.accentHue}, 50%, 65%, 0.3)`,
                        WebkitTextStroke: `2px hsla(${project.accentHue}, 55%, 70%, 0.5)`,
                        textShadow: `0 0 50px hsla(${project.accentHue}, 60%, 65%, 0.4)`,
                      }}
                    >
                      {project.number}
                    </span>
                  </div>

                  {/* Title - Bold but smaller */}
                  <div 
                    className={`relative z-10 transition-all duration-700 delay-200 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                {project.title}
              </h3>
                  </div>

                  {/* Subtitle */}
                  <div 
                    className={`mt-3 transition-all duration-700 delay-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <p className="text-base md:text-lg text-white/50 font-light">
                    {project.subtitle}
                  </p>
                  </div>

                  {/* Description */}
                  <div 
                    className={`mt-5 transition-all duration-700 delay-400 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-lg">
                {project.description}
              </p>
                </div>
                
                  {/* Links - Smaller like Rashi's */}
                  <div 
                    className={`mt-6 flex flex-wrap gap-3 transition-all duration-700 delay-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {project.caseStudyLink && (
                      <Link
                        href={project.caseStudyLink}
                        className="group relative z-30 inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 hover-lift transition-all touch-manipulation"
                      >
                        <span>View Case Study</span>
                        <svg 
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      </Link>
                  )}
                </div>
              </div>

                {/* Device Mockup Side */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {project.deviceType === 'phone' ? (
                    <PhoneMockup project={project} index={index} isVisible={isVisible} />
                  ) : project.deviceType === 'hero-image' ? (
                    <HeroImageMockup project={project} index={index} isVisible={isVisible} />
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

    </section>
  )
}

