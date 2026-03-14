'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
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

const demoImages = [
  { src: '/narbl/narbl-1.png', label: 'Everything You Need. One Nexus.' },
  { src: '/narbl/narbl-2.png', label: 'Scanning for Better Answers' },
  { src: '/narbl/narbl-3.png', label: 'Smarter Homework, Faster Results' },
  { src: '/narbl/narbl-4.png', label: 'Homework Intelligence' },
  { src: '/narbl/narbl-5.png', label: 'Success Stories' },
  { src: '/narbl/narbl-9.png', label: 'Final Platform' },
  { src: '/narbl/narbl-6.png', label: 'Trusted by Top Students' },
  { src: '/narbl/narbl-7.png', label: 'Seamless Integrations' },
  { src: '/narbl/narbl-8.png', label: 'Why Choose Nexus' },
]

export default function NexusCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showBackButton, setShowBackButton] = useState(true)
  const footerRef = useRef<HTMLElement>(null)

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Hide back button when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackButton(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    
    if (footerRef.current) {
      observer.observe(footerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  const particles: Particle[] = useMemo(() => {
    const count = isMobile ? 15 : 60 // Reduce particles on mobile
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [isMobile]);

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % demoImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % demoImages.length)
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
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

      {/* Back button */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-8 transition-opacity duration-300 ${showBackButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm tracking-wide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Back</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Title and info */}
            <div>
              <p className={`text-[#60a5fa] text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Case Study
              </p>
              
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Nexus
              </h1>
              
              <p className={`text-lg md:text-xl text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Everything you need. One Nexus. One question, one answer powered by multiple AI models.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-white/80">Product Designer</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-white/80">10 weeks</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Tools</p>
                  <p className="text-white/80">Figma, Cursor, Lovable</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Team</p>
                  <p className="text-white/80">Internship Project</p>
                </div>
              </div>
            </div>

            {/* Right side - Laptop Mockup */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative group">
                {/* Laptop Frame */}
                <div className="relative">
                  {/* Screen lid - dark frame to blend with images */}
                  <div className="relative bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] rounded-t-2xl p-[3px] shadow-lg">
                    {/* Inner black bezel */}
                    <div className="relative bg-[#0a0a0a] rounded-t-xl p-2.5 pb-2">
                      {/* Camera */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#050505] ring-1 ring-[#1a1a1a]">
                        <div className="absolute inset-0.5 rounded-full bg-[#0a1a0a]"></div>
                      </div>
                      
                      {/* Screen */}
                      <div className="relative aspect-[16/10] rounded overflow-hidden bg-[#0a0a0f] shadow-inner">
                        {/* Slideshow images */}
                        {demoImages.map((image, index) => (
                          <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ${
                              activeSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <Image
                              src={image.src}
                              alt={image.label}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 500px"
                            />
                          </div>
                        ))}

                        {/* Navigation arrows */}
                        <button
                          onClick={goToPrevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Slide dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {demoImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveSlide(index)}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                activeSlide === index 
                                  ? 'bg-white w-4' 
                                  : 'bg-white/40 hover:bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Laptop bottom/keyboard area */}
                  <div className="relative">
                    {/* Hinge */}
                    <div className="h-1.5 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-sm shadow-md"></div>
                    
                    {/* Bottom case */}
                    <div className="h-4 bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#0a0a0a] rounded-b-2xl shadow-lg">
                      {/* Trackpad notch */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-b from-[#252525] to-[#1a1a1a] rounded-t-lg"></div>
                    </div>
                  </div>
                  
                  {/* Shadow underneath */}
                  <div className="absolute -bottom-4 left-[10%] right-[10%] h-4 bg-black/20 blur-xl rounded-full"></div>
                </div>

                {/* Ambient reflection */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 rounded-3xl -z-10"></div>
              </div>

              {/* Current slide label */}
              <p className="text-center text-white/40 text-sm mt-6">{demoImages[activeSlide].label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <SectionLabel>01</SectionLabel>
        <SectionTitle>Overview</SectionTitle>
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8">
            Fact-checking across sources shouldn't be expensive or slow. Nexus saves students time and money.
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            During my <strong className="text-white/70">internship</strong>, I helped design Nexus as a <strong className="text-white/70">unified AI research platform for students</strong>. The goal: one question, one place, and answers backed by <strong className="text-white/70">multiple AIs</strong>. Models compete against each other so the strongest answer always wins, with weak or incorrect answers filtered out automatically. No more tab hopping between ChatGPT, Claude, and Gemini.
          </p>
          
          {/* Problem Statement Box */}
          <div 
            className="relative rounded-3xl p-10 md:p-14"
            style={{
              background: 'linear-gradient(145deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)',
              boxShadow: `
                0 4px 24px -4px rgba(0,0,0,0.4),
                0 12px 48px -8px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.2)
              `,
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            {/* Label */}
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Problem Statement</p>
            
            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might we design an AI platform that{' '}
              <span className="text-[#60a5fa]">aggregates</span> and{' '}
              <span className="text-[#60a5fa]">compares</span>{' '}
              responses from multiple AI models to surface only the most{' '}
              <span className="text-[#60a5fa]">accurate</span>,{' '}
              <span className="text-[#60a5fa]">agreed-upon</span> information for students?
            </p>
          </div>
        </div>
      </Section>

      {/* Design Process Timeline */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Design Process</SectionTitle>
        <p className="text-white/40 text-sm mb-12">10-Week Timeline</p>
        
        <div className="relative max-w-5xl">
          {/* Week labels */}
          <div className="grid grid-cols-10 mb-8">
            {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'].map((week, i) => (
              <div key={i} className="text-center">
                <span className="text-white/50 text-xs">{week}</span>
              </div>
            ))}
          </div>
        
          {/* Timeline with dotted lines */}
          <div className="relative">
            {/* Vertical dotted lines */}
            <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="flex justify-center">
                  <div 
                    className="w-px h-full"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, rgba(59,130,246,0.3) 50%, transparent 50%)',
                      backgroundSize: '1px 8px',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Timeline bars */}
            <div className="relative space-y-4 py-4">
              {/* User Research - Week 1-2 */}
              <div className="grid grid-cols-10">
                <div className="col-span-2 pr-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    User Research
                  </div>
                </div>
              </div>

              {/* Lo-Fi Wireframes - Week 2-4 */}
              <div className="grid grid-cols-10">
                <div className="col-start-2 col-span-3 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Lo-Fi Wireframes
                  </div>
                </div>
              </div>

              {/* Mid-Fi Design - Week 4-6 */}
              <div className="grid grid-cols-10">
                <div className="col-start-4 col-span-3 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Mid-Fi Design
                  </div>
                </div>
              </div>

              {/* Hi-Fi Prototypes - Week 5-8 */}
              <div className="grid grid-cols-10">
                <div className="col-start-5 col-span-4 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Hi-Fi Prototypes
                  </div>
                </div>
              </div>

              {/* Testing & Iteration - Week 7-9 */}
              <div className="grid grid-cols-10">
                <div className="col-start-7 col-span-3 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Testing & Iteration
                  </div>
                </div>
              </div>

              {/* Final Polish - Week 9-10 */}
              <div className="grid grid-cols-10">
                <div className="col-start-9 col-span-2 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Final Polish
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Research */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Research</SectionTitle>
        
        <div className="max-w-3xl mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-6">Research Goals</h3>
          <p className="text-lg text-white/60 leading-relaxed">
            We started with a <strong className="text-white/80">hypothesis</strong>: students are using multiple AI tools for homework and research, but switching between them wastes time and leads to inconsistent answers. I wanted to understand <strong className="text-white/80">how students actually use AI for studying</strong>, where they hit walls, and what would make research and fact-checking feel{' '}
            <span className="text-white font-medium">faster</span> and{' '}
            <span className="text-white font-medium">more reliable</span>.
          </p>
        </div>

        {/* User Surveys */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-8">User Surveys</h3>
          <p className="text-white/40 text-sm mb-12">Survey sample: n = 48 college students</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* AI Tools Students Use for Studying */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">AI Tools Students Use for Studying</h4>
            <div className="space-y-4">
              {[
                { label: 'ChatGPT', value: 82, color: '#3b82f6' },
                { label: 'Claude', value: 45, color: '#3b82f6' },
                { label: 'Gemini', value: 38, color: '#60a5fa' },
                { label: 'Copilot', value: 29, color: '#93c5fd' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-28 shrink-0">{item.label}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-white/50 text-xs w-10 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              Most students use multiple AI tools but waste time switching between them.
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Top Pain Points</h4>
            <div className="space-y-3">
              {[
                { label: 'Conflicting answers', value: 72, color: '#2563eb' },
                { label: 'Fact-checking AI answers', value: 65, color: '#3b82f6' },
                { label: 'Tab hopping', value: 58, color: '#3b82f6' },
                { label: 'Slow research', value: 45, color: '#60a5fa' },
                { label: 'Wrong model choice', value: 38, color: '#93c5fd' },
                { label: 'Cost concerns', value: 24, color: '#bfdbfe' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-28 shrink-0">{item.label}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-white/50 text-xs w-8 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              Conflicting answers and manual comparison are the biggest friction points.
            </p>
          </div>

          {/* Use Cases - Pie Chart */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Primary Use Cases</h4>
            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Homework help 38% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="20"
                    strokeDasharray="95.5 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Research & fact-checking 30% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="75.4 251.2"
                    strokeDashoffset="-95.5"
                  />
                  {/* Studying & explanations 20% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#93c5fd"
                    strokeWidth="20"
                    strokeDasharray="50.2 251.2"
                    strokeDashoffset="-170.9"
                  />
                  {/* Writing support 12% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#bfdbfe"
                    strokeWidth="20"
                    strokeDasharray="30.1 251.2"
                    strokeDashoffset="-221.1"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {[
                  { label: 'Homework help', value: '38%', color: '#2563eb' },
                  { label: 'Research', value: '30%', color: '#3b82f6' },
                  { label: 'Studying', value: '20%', color: '#93c5fd' },
                  { label: 'Writing', value: '12%', color: '#bfdbfe' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white/50 text-xs">{item.label}</span>
                    <span className="text-white/40 text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              Students use AI across their academic workflow, from homework to writing.
            </p>
          </div>
        </div>

        {/* Key Insight */}
        <div className="mt-12 p-6 rounded-xl bg-[#60a5fa]/5 border border-[#60a5fa]/20 max-w-3xl">
          <p className="text-[#60a5fa] text-xs font-semibold uppercase tracking-widest mb-3">Key Insight</p>
          <p className="text-white/70 leading-relaxed">
            Students rely heavily on AI for learning, but inconsistent answers across models create uncertainty and force them to manually verify information.
          </p>
        </div>

        {/* Survey Summary */}
        <div className="max-w-3xl mt-16 pt-12 border-t border-white/10">
          <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Key Takeaways</h4>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              <span className="text-white/70 font-medium">Tool fatigue is real.</span>{' '}
              82% use ChatGPT, but over half also check Claude or Gemini when they need to verify answers. Students waste time hopping between tools just to feel confident in their research.
            </p>
            <p>
              <span className="text-white/70 font-medium">Conflicting answers cause confusion.</span>{' '}
              72% cited conflicting AI answers as a major pain point. Students don't know which response to trust when different models give different information.
            </p>
            <p>
              <span className="text-white/70 font-medium">Comparison is manual and slow.</span>{' '}
              Students end up copying prompts between tabs, reading multiple responses, and trying to figure out what's actually correct on their own.
            </p>
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Competitive Analysis</h3>
          <p className="text-white/40 text-sm mb-10">Evaluating existing AI platforms</p>

          <div className="max-w-5xl">
            {/* Comparison Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="text-white/40 text-xs uppercase tracking-wider">Platform</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Multi-Model</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Multi-Model</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Answer Output</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Gap</div>
            </div>

            {/* ChatGPT */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">ChatGPT</p>
                <p className="text-white/30 text-xs mt-1">OpenAI</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Single model</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Self-reported</span>
              </div>
              <p className="text-white/40 text-sm">Locked ecosystem</p>
            </div>

            {/* Claude */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">Claude</p>
                <p className="text-white/30 text-xs mt-1">Anthropic</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Single model</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Self-reported</span>
              </div>
              <p className="text-white/40 text-sm">Single model only</p>
            </div>

            {/* Poe */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">Poe</p>
                <p className="text-white/30 text-xs mt-1">Quora</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Multiple</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Separate model outputs</span>
              </div>
              <p className="text-white/40 text-sm">User must compare responses manually</p>
            </div>

            {/* OpenRouter */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">OpenRouter</p>
                <p className="text-white/30 text-xs mt-1">API Gateway</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">All models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Raw output</span>
              </div>
              <p className="text-white/40 text-sm">Infrastructure only, no answer synthesis</p>
            </div>

            {/* Nexus (The Solution) */}
            <div className="grid grid-cols-5 gap-4 py-5 bg-[#3b82f6]/5 rounded-xl px-4 mt-4 items-start">
              <div>
                <p className="text-[#60a5fa] font-medium">Nexus</p>
                <p className="text-[#60a5fa]/50 text-xs mt-1">All-in-one</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">All models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Aggregated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Consensus-backed</span>
              </div>
              <p className="text-[#60a5fa]/70 text-sm font-medium">Nexus closes this gap</p>
            </div>
          </div>

          {/* Key Finding */}
          <div className="max-w-3xl mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <p className="text-white/50 leading-relaxed mb-4">
              A clear pattern emerged: platforms either offer <strong className="text-white/70">polished UX for one model</strong> (ChatGPT, Claude) or <strong className="text-white/70">multi-model access with separate outputs</strong> (Poe, OpenRouter). None actually <strong className="text-white/70">aggregate responses across models</strong> to give users one consolidated answer.
            </p>
            <p className="text-white/50 leading-relaxed">
              This <strong className="text-white/70">validated our hypothesis</strong>: there's room for a platform that runs multiple AIs behind the scenes and surfaces only what they <strong className="text-white/70">agree on</strong>.
            </p>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Affinity Mapping</h3>
          <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            We synthesized survey and interview data through affinity mapping. Three themes emerged:
          </p>
          
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Confidence:</span> Students don't trust a single AI's answer. They want more confidence before using AI-generated information.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Comparison:</span> Comparing answers manually across tools is exhausting. Students need a tool that does this automatically.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Simplicity:</span> One clear answer is better than multiple conflicting responses. Students want a single best answer, not more choices.
            </p>
          </div>

          {/* Affinity Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Confidence Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#60a5fa] mb-8 text-center">Confidence</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#bfdbfe',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Uses ChatGPT for homework but second-guesses answers before submitting assignments.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants to use AI for studying but needs to trust the answers are actually correct.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"ChatGPT gave me a wrong formula for my physics exam. Never trusting one AI again."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"Every answer sounds confident. How am I supposed to know which ones are actually right?"</p>
                </div>
                {/* UX Principle - Blue */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#93c5fd',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Confidence comes from consensus. If multiple AIs agree, the answer is more likely correct.</p>
                </div>
                {/* Opportunity - Orange */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Show which models contributed. Surface the strongest consensus-based answer.</p>
                </div>
              </div>
            </div>

            {/* Comparison Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#60a5fa] mb-8 text-center">Comparison</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#bfdbfe',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Asks the same question to multiple AIs, then tries to figure out which answer is actually correct.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants confidence that answers are accurate, not just fast. Needs reliable information for schoolwork.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"Claude said one thing, ChatGPT said another. I just picked randomly."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I spend 20 minutes comparing answers across tools. That's longer than just Googling it."</p>
                </div>
                {/* UX Principle - Blue */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#93c5fd',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Comparison should happen automatically. Users want one clear answer, not multiple options to sort through.</p>
                </div>
                {/* Opportunity - Orange */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fdba74',
                    boxShadow: '4px 4px 12px rgba(253,186,116,0.4)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Run multiple AIs behind the scenes, compare responses, surface the strongest consensus answer.</p>
                </div>
              </div>
            </div>

            {/* Simplicity Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#60a5fa] mb-8 text-center">Simplicity</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#bfdbfe',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Opens multiple browser tabs for ChatGPT, Claude, and Google. Homework takes twice as long.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants one place to get accurate answers. No tab hopping, no mental overhead.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I have 6 tabs open just to do homework. It's exhausting."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"By the time I read 3 different AI answers, I forgot what I was even asking."</p>
                </div>
                {/* UX Principle - Blue */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#93c5fd',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Complexity should happen behind the scenes. Users just want the answer.</p>
                </div>
                {/* Opportunity - Orange */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">One input, one consolidated output. All the multi-model processing happens invisibly in the background.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-10 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#bfdbfe' }}></div>
              <span className="text-white/40 text-xs">User Behavior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#a7d89c' }}></div>
              <span className="text-white/40 text-xs">Needs / Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fef08a' }}></div>
              <span className="text-white/40 text-xs">Pain Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#93c5fd' }}></div>
              <span className="text-white/40 text-xs">UX Principle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fdba74' }}></div>
              <span className="text-white/40 text-xs">Opportunity</span>
            </div>
          </div>

          {/* Synthesis */}
          <div className="max-w-3xl mt-12">
            <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Key Insight</h4>
            <p className="text-white/50 leading-relaxed mb-4">
              A clear pattern emerged: students <strong className="text-white/70">don't want to choose between AI models</strong>. They want <strong className="text-white/70">one clear answer</strong> they can feel confident about. The work of comparing responses should happen automatically.
            </p>
            <p className="text-white/50 leading-relaxed">
              This shaped our solution: <span className="text-white/70">a platform that runs multiple AIs behind the scenes</span>, finds where they agree, and surfaces only the most accurate, consensus-backed answer.
            </p>
          </div>
        </div>

        {/* User Flows */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Core Product Flow</h3>
          <p className="text-white/40 text-sm mb-10">Two core journeys mapped from research insights</p>

          {/* Condensed User Flows Grid */}
          <div className="space-y-4">
            
            {/* Onboarding Flow */}
            <div 
              className="rounded-2xl p-6 border border-white/[0.06]"
              style={{
                background: 'linear-gradient(145deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)',
              }}
            >
              <p className="text-[#60a5fa] text-sm font-medium mb-5 tracking-wide">Onboarding</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">Landing Page</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Sign Up</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Choose Plan</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Dashboard</span>
              </div>
            </div>

            {/* Ask & Compare Flow */}
            <div 
              className="rounded-2xl p-6 border border-white/[0.06]"
              style={{
                background: 'linear-gradient(145deg, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 100%)',
              }}
            >
              <p className="text-[#60a5fa] text-sm font-medium mb-5 tracking-wide">Ask & Compare</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#3b82f6] text-white">Dashboard</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Enter Question</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#8b5cf6] text-white">Run AI Models</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#8b5cf6] text-white">Compare Responses</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Final Answer</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#3b82f6]"></span>
              <span className="text-white/50">Start</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#06b6d4]"></span>
              <span className="text-white/50">User Action</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#8b5cf6]"></span>
              <span className="text-white/50">AI Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#22c55e]"></span>
              <span className="text-white/50">Final Answer</span>
            </div>
          </div>

          {/* User Flows Summary */}
          <div className="max-w-3xl mt-12">
            <p className="text-white/50 leading-relaxed">
              I mapped research insights to two core journeys: onboarding and the main product flow. Each flow hides the complexity of multi-model processing behind a simple, one-input interface.
            </p>
          </div>
        </div>

        {/* Low Fidelity Designs */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Low Fidelity Designs</h3>
          <p className="text-white/40 text-sm mb-6">Early Explorations</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            I started sketching user flows around the core experience: <span className="text-white/70">ask a question, get one consolidated answer</span>. The key challenge was hiding multi-model complexity while giving users confidence in the result.
          </p>

          {/* Lo-Fi Wireframe Flows - Hand-drawn iPad Sketches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Onboarding Lo-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Onboarding Flow</p>
              <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-6 border border-[#e8e4dc]">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <defs>
                    <filter id="pencilSketch" x="-5%" y="-5%" width="110%" height="110%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                    </filter>
                  </defs>
                  
                  {/* Label */}
                  <text x="15" y="18" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">landing page</text>
                  <text x="220" y="18" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">sign up</text>
                  
                  {/* Screen 1: Landing Page */}
                  <g transform="translate(10, 28)">
                    <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    
                    {/* Nav bar */}
                    <path d="M 12 15 Q 30 13, 45 17" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    <path d="M 140 14 Q 155 12, 165 18 Q 168 24, 155 26 Q 142 24, 140 14" fill="none" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    
                    {/* Hero headline */}
                    <path d="M 30 42 Q 88 38, 145 45" stroke="#444" strokeWidth="2.2" filter="url(#pencilSketch)"/>
                    <path d="M 45 55 Q 88 51, 130 58" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    
                    {/* Subtitle */}
                    <path d="M 35 68 Q 88 64, 140 70" stroke="#bbb" strokeWidth="1" filter="url(#pencilSketch)"/>
                    
                    {/* User avatars */}
                    <circle cx="72" cy="82" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="82" cy="82" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="92" cy="82" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 100 80 Q 115 78, 130 82" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    
                    {/* Input field */}
                    <path d="M 22 95 Q 25 90, 152 92 Q 158 96, 155 108 Q 150 114, 28 112 Q 22 108, 22 95" fill="none" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    <path d="M 35 102 Q 70 99, 100 104" stroke="#ccc" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="142" cy="102" r="6" fill="none" stroke="#444" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                    
                    <text x="55" y="135" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"one nexus"</text>
                  </g>
                  
                  {/* Arrow */}
                  <path d="M 195 85 Q 205 82, 215 88" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch)"/>
                  <path d="M 212 82 L 218 88 L 210 92" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#pencilSketch)"/>
                  
                  {/* Screen 2: Sign Up */}
                  <g transform="translate(215, 28)">
                    <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    
                    {/* Modal box */}
                    <path d="M 25 25 Q 28 20, 150 22 Q 156 28, 154 105 Q 150 112, 30 108 Q 25 102, 25 25" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                    
                    {/* Title */}
                    <path d="M 55 38 Q 88 34, 120 40" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    
                    {/* Form fields */}
                    <path d="M 38 52 Q 42 48, 138 50 Q 142 54, 140 62 Q 136 66, 42 64 Q 38 60, 38 52" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 38 70 Q 42 66, 138 68 Q 142 72, 140 80 Q 136 84, 42 82 Q 38 78, 38 70" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    
                    {/* Submit button */}
                    <path d="M 55 90 Q 58 85, 122 87 Q 128 92, 125 100 Q 120 105, 60 102 Q 55 98, 55 90" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    
                    <text x="60" y="135" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"create acct"</text>
                  </g>
                  
                  {/* Row 2 */}
                  <text x="15" y="175" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">pricing</text>
                  
{/* Screen 3: Pricing */}
                  <g transform="translate(10, 185)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Pricing cards */}
                    <path d="M 15 15 Q 18 11, 55 13 Q 60 17, 58 55 Q 54 61, 20 58 Q 15 53, 15 15" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 22 22 Q 40 19, 50 24" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 25 34 Q 35 32, 48 36" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <path d="M 25 44 Q 35 42, 48 46" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>

                    <path d="M 68 15 Q 72 11, 108 13 Q 114 17, 112 55 Q 108 61, 74 58 Q 68 53, 68 15" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    <path d="M 75 22 Q 92 19, 105 24" stroke="#444" strokeWidth="1.5" filter="url(#pencilSketch)"/>

                    <path d="M 122 15 Q 126 11, 162 13 Q 168 17, 166 55 Q 162 61, 128 58 Q 122 53, 122 15" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>

                    <text x="65" y="78" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"pick plan"</text>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Product Experience Lo-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Product Experience</p>
              <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-6 border border-[#e8e4dc]">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <defs>
                    <filter id="pencilSketch2" x="-5%" y="-5%" width="110%" height="110%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                    </filter>
                  </defs>
                  
                  {/* Label */}
                  <text x="15" y="18" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">chat interface</text>
                  <text x="220" y="18" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">model selector</text>
                  
                  {/* Screen 1: Chat Interface */}
                  <g transform="translate(10, 28)">
                    <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch2)"/>
                    
                    {/* Sidebar */}
                    <path d="M 8 8 Q 10 5, 45 7 Q 48 10, 46 115 Q 43 118, 10 116 Q 8 112, 8 8" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 15 18 Q 25 16, 38 20" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <path d="M 15 28 Q 28 26, 40 30" stroke="#bbb" strokeWidth="0.6" filter="url(#pencilSketch2)"/>
                    <path d="M 15 38 Q 28 36, 40 40" stroke="#bbb" strokeWidth="0.6" filter="url(#pencilSketch2)"/>
                    
                    {/* Top bar */}
                    <path d="M 55 12 Q 70 10, 95 14 Q 100 18, 95 22 Q 85 24, 58 20" fill="none" stroke="#666" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 105 12 Q 118 10, 128 14 Q 132 18, 128 22 Q 120 24, 108 20" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    
                    {/* Greeting */}
                    <path d="M 70 55 Q 110 52, 150 58" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch2)"/>
                    <path d="M 85 68 Q 110 65, 135 70" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch2)"/>
                    
                    {/* Message input */}
                    <path d="M 55 90 Q 58 85, 165 87 Q 172 92, 168 105 Q 162 112, 62 108 Q 55 102, 55 90" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch2)"/>
                    <path d="M 68 98 Q 95 95, 120 100" stroke="#ccc" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <circle cx="158" cy="98" r="5" fill="none" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>
                    
                    {/* Model indicator */}
                    <path d="M 85 115 Q 88 112, 135 114 Q 140 118, 135 122 Q 128 124, 90 122 Q 85 118, 85 115" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <circle cx="95" cy="118" r="3" fill="none" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <circle cx="105" cy="118" r="3" fill="none" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    
                    <text x="50" y="138" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"good afternoon"</text>
                  </g>
                  
                  {/* Arrow */}
                  <path d="M 195 85 Q 205 82, 215 88" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch2)"/>
                  <path d="M 212 82 L 218 88 L 210 92" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#pencilSketch2)"/>
                  
{/* Screen 2: Model Selector */}
                  <g transform="translate(215, 28)">
                    <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch2)"/>

                    {/* Dropdown panel */}
                    <path d="M 25 30 Q 28 25, 150 27 Q 156 32, 154 110 Q 150 116, 30 113 Q 25 108, 25 30" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch2)"/>

                    {/* Title */}
                    <path d="M 35 40 Q 88 36, 140 42" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>

                    {/* Model options - simple circles with text */}
                    <circle cx="45" cy="55" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 52 Q 85 49, 110 55" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    <circle cx="45" cy="72" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 69 Q 85 66, 105 72" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    <circle cx="45" cy="89" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 86 Q 75 83, 90 89" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    {/* Fourth model option */}
                    <circle cx="45" cy="103" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 100 Q 95 97, 130 103" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    <text x="45" y="135" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"5 models"</text>
                  </g>
                  
                  {/* Row 2 */}
                  <text x="15" y="175" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">response</text>
                  
                  {/* Screen 3: Response View */}
                  <g transform="translate(10, 185)">
                    <path d="M 3 2 Q 1 5, 2 78 Q 4 83, 172 81 Q 177 78, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch2)"/>
                    
                    {/* Sidebar hint */}
                    <path d="M 8 8 Q 10 5, 45 7 Q 48 10, 46 75" fill="none" stroke="#ccc" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    
                    {/* Response bubble */}
                    <path d="M 55 15 Q 58 10, 165 12 Q 172 18, 168 58 Q 162 65, 62 62 Q 55 56, 55 15" fill="none" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>
                    <path d="M 65 25 Q 110 22, 155 28" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 65 35 Q 120 32, 158 38" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <path d="M 65 45 Q 100 42, 130 48" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    
                    {/* Model badges */}
                    <circle cx="72" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <circle cx="85" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <circle cx="98" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    
                    <text x="55" y="95" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"consolidated answer"</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Lo-Fi Description */}
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl mt-6">
            These rough sketches helped me explore layout options and user flows before committing to any specific design direction. I focused on mapping out the core interactions: entering a question, seeing which models are running, and receiving a consolidated answer. Quick iPad sketches let me test ideas fast and validate the one-input concept early.
          </p>
        </div>

        {/* Mid-Fidelity Prototypes */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Mid-Fidelity Prototypes</h3>
          <p className="text-white/40 text-sm mb-6">Refining the Experience</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            I built mid-fi wireframes to nail down layout, hierarchy, and interactions before jumping into high-fidelity designs. These grayscale website mockups helped test core functionality and get early feedback from the development team.
          </p>

          {/* Mid-Fi Wireframes - Clean Digital Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Onboarding Mid-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Onboarding Flow</p>
              <div className="rounded-xl overflow-hidden bg-[#1e1e1e] p-6 border border-[#333]">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  <defs>
                    <marker id="cleanArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <path d="M 0 0 L 8 3 L 0 6 Z" fill="#666"/>
                    </marker>
                  </defs>
                  
                  {/* Figma-style background grid */}
                  <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="400" height="300" fill="url(#grid1)"/>
                  
                  {/* Frame labels */}
                  <text x="15" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Landing Page</text>
                  <text x="215" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Sign Up Modal</text>
                  
                  {/* Screen 1: Landing */}
                  <g transform="translate(10, 25)">
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                    
                    {/* Nav */}
                    <rect x="8" y="8" width="35" height="5" rx="1" fill="#fff"/>
                    <rect x="130" y="7" width="18" height="7" rx="1" fill="#333"/>
                    <rect x="152" y="7" width="18" height="7" rx="3.5" fill="#fff"/>
                    
                    {/* Hero content */}
                    <rect x="35" y="32" width="105" height="8" rx="1" fill="#fff"/>
                    <rect x="50" y="45" width="75" height="6" rx="1" fill="#666"/>
                    
                    {/* Subtitle */}
                    <rect x="40" y="58" width="95" height="4" rx="1" fill="#444"/>
                    
                    {/* Avatars */}
                    <circle cx="70" cy="72" r="4" fill="#333"/>
                    <circle cx="80" cy="72" r="4" fill="#444"/>
                    <circle cx="90" cy="72" r="4" fill="#555"/>
                    <rect x="98" y="70" width="30" height="4" rx="1" fill="#444"/>
                    
                    {/* Input */}
                    <rect x="25" y="85" width="125" height="18" rx="9" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                    <rect x="35" y="92" width="60" height="4" rx="1" fill="#555"/>
                    <circle cx="138" cy="94" r="5" fill="#fff"/>
                    
                    {/* Model badge */}
                    <rect x="55" y="108" width="65" height="8" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <circle cx="68" cy="112" r="2" fill="#4ade80"/>
                    <circle cx="78" cy="112" r="2" fill="#60a5fa"/>
                    <circle cx="88" cy="112" r="2" fill="#f472b6"/>
                  </g>
                  
                  {/* Arrow */}
                  <path d="M 195 85 L 205 85" stroke="#666" strokeWidth="1" markerEnd="url(#cleanArrow)"/>
                  
                  {/* Screen 2: Sign Up */}
                  <g transform="translate(210, 25)">
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                    
                    {/* Dimmed background */}
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="rgba(0,0,0,0.6)"/>
                    
                    {/* Modal */}
                    <rect x="20" y="15" width="135" height="90" rx="6" fill="#141414" stroke="#333" strokeWidth="1"/>
                    
                    {/* Modal title */}
                    <rect x="55" y="25" width="65" height="6" rx="1" fill="#fff"/>
                    
                    {/* Form fields */}
                    <rect x="32" y="40" width="111" height="12" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <rect x="38" y="44" width="40" height="4" rx="1" fill="#555"/>
                    
                    <rect x="32" y="58" width="111" height="12" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <rect x="38" y="62" width="50" height="4" rx="1" fill="#555"/>
                    
                    {/* Button */}
                    <rect x="45" y="78" width="85" height="14" rx="7" fill="#fff"/>
                    <rect x="65" y="83" width="45" height="4" rx="1" fill="#000"/>
                  </g>
                  
                  {/* Row 2 */}
                  <text x="15" y="168" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Pricing Plans</text>
                  
                  {/* Screen 3: Pricing */}
                  <g transform="translate(10, 175)">
                    <rect x="0" y="0" width="175" height="110" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                    
                    {/* Header */}
                    <rect x="50" y="10" width="75" height="6" rx="1" fill="#fff"/>
                    
                    {/* Pricing cards */}
                    <rect x="10" y="25" width="48" height="75" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="18" y="32" width="30" height="5" rx="1" fill="#666"/>
                    <rect x="18" y="42" width="25" height="4" rx="1" fill="#444"/>
                    <rect x="15" y="52" width="35" height="3" rx="1" fill="#333"/>
                    <rect x="15" y="58" width="35" height="3" rx="1" fill="#333"/>
                    <rect x="15" y="64" width="35" height="3" rx="1" fill="#333"/>
                    <rect x="15" y="85" width="38" height="10" rx="5" fill="#333"/>
                    
                    <rect x="64" y="22" width="48" height="81" rx="4" fill="#141414" stroke="#60a5fa" strokeWidth="1"/>
                    <rect x="72" y="30" width="30" height="5" rx="1" fill="#fff"/>
                    <rect x="72" y="40" width="25" height="4" rx="1" fill="#60a5fa"/>
                    <rect x="69" y="50" width="35" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="56" width="35" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="62" width="35" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="68" width="35" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="87" width="38" height="12" rx="6" fill="#fff"/>
                    
                    <rect x="118" y="25" width="48" height="75" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="126" y="32" width="30" height="5" rx="1" fill="#666"/>
                    <rect x="126" y="42" width="25" height="4" rx="1" fill="#444"/>
                    <rect x="123" y="52" width="35" height="3" rx="1" fill="#333"/>
                    <rect x="123" y="58" width="35" height="3" rx="1" fill="#333"/>
                    <rect x="123" y="85" width="38" height="10" rx="5" fill="#333"/>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Product Experience Mid-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Product Experience</p>
              <div className="rounded-xl overflow-hidden bg-[#1e1e1e] p-6 border border-[#333]">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Figma-style background grid */}
                  <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="400" height="300" fill="url(#grid2)"/>
                  
                  {/* Frame labels */}
                  <text x="15" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Chat Interface</text>
                  <text x="215" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Model Selector</text>
                  
                  {/* Screen 1: Chat Interface */}
                  <g transform="translate(10, 25)">
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                    
                    {/* Sidebar */}
                    <rect x="0" y="0" width="40" height="120" rx="3" fill="#0d0d0d"/>
                    <rect x="6" y="8" width="28" height="6" rx="1" fill="#1a1a1a"/>
                    <rect x="8" y="20" width="24" height="3" rx="1" fill="#333"/>
                    <rect x="8" y="28" width="26" height="3" rx="1" fill="#333"/>
                    <rect x="8" y="36" width="22" height="3" rx="1" fill="#333"/>
                    
                    {/* Top bar */}
                    <rect x="48" y="6" width="50" height="8" rx="2" fill="#1a1a1a"/>
                    <rect x="52" y="9" width="25" height="3" rx="1" fill="#666"/>
                    <rect x="105" y="6" width="28" height="8" rx="2" fill="#1a1a1a"/>
                    <rect x="140" y="6" width="28" height="8" rx="4" fill="#333"/>
                    
                    {/* Greeting */}
                    <rect x="70" y="45" width="80" height="6" rx="1" fill="#666"/>
                    <rect x="85" y="55" width="50" height="5" rx="1" fill="#fff"/>
                    
                    {/* Input field */}
                    <rect x="48" y="78" width="120" height="22" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="56" y="87" width="55" height="4" rx="1" fill="#444"/>
                    <circle cx="156" cy="89" r="6" fill="#60a5fa"/>
                    
                    {/* Model indicator */}
                    <rect x="68" y="105" width="60" height="10" rx="5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <circle cx="82" cy="110" r="3" fill="#4ade80"/>
                    <circle cx="92" cy="110" r="3" fill="#60a5fa"/>
                    <rect x="100" y="108" width="20" height="4" rx="1" fill="#555"/>
                  </g>
                  
                  {/* Arrow */}
                  <path d="M 195 85 L 205 85" stroke="#666" strokeWidth="1" markerEnd="url(#cleanArrow)"/>
                  
                  {/* Screen 2: Model Selector */}
                  <g transform="translate(210, 25)">
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                    
                    {/* Sidebar hint */}
                    <rect x="0" y="0" width="40" height="120" rx="3" fill="#0d0d0d"/>
                    
                    {/* Dropdown panel */}
                    <rect x="50" y="25" width="115" height="90" rx="4" fill="#141414" stroke="#333" strokeWidth="1"/>
                    
                    {/* Header */}
                    <rect x="58" y="32" width="80" height="4" rx="1" fill="#666"/>
                    
                    {/* Model options */}
                    <g transform="translate(58, 42)">
                      <circle cx="6" cy="6" r="5" fill="#ef4444"/>
                      <rect x="16" y="3" width="45" height="4" rx="1" fill="#fff"/>
                      <rect x="68" y="2" width="30" height="8" rx="4" fill="#ef4444" fillOpacity="0.2"/>
                      <rect x="72" y="4" width="22" height="4" rx="1" fill="#ef4444"/>
                    </g>
                    
                    <g transform="translate(58, 58)">
                      <circle cx="6" cy="6" r="5" fill="#60a5fa"/>
                      <rect x="16" y="3" width="50" height="4" rx="1" fill="#fff"/>
                      <rect x="68" y="2" width="30" height="8" rx="4" fill="#60a5fa" fillOpacity="0.2"/>
                    </g>
                    
                    <g transform="translate(58, 74)">
                      <circle cx="6" cy="6" r="5" fill="#4ade80"/>
                      <rect x="16" y="3" width="25" height="4" rx="1" fill="#fff"/>
                      <rect x="48" y="2" width="30" height="8" rx="4" fill="#4ade80" fillOpacity="0.2"/>
                    </g>
                    
                    {/* Selected option */}
                    <g transform="translate(58, 90)">
                      <path d="M 3 6 L 6 9 L 12 3" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
                      <circle cx="22" cy="6" r="5" fill="#4ade80"/>
                      <rect x="32" y="3" width="65" height="4" rx="1" fill="#fff"/>
                      <rect x="32" y="10" width="55" height="3" rx="1" fill="#555"/>
                    </g>
                  </g>
                  
                  {/* Row 2 */}
                  <text x="15" y="168" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Response View</text>
                  
                  {/* Screen 3: Response */}
                  <g transform="translate(10, 175)">
                    <rect x="0" y="0" width="175" height="110" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                    
                    {/* Sidebar */}
                    <rect x="0" y="0" width="40" height="110" rx="3" fill="#0d0d0d"/>
                    
                    {/* Response content */}
                    <rect x="48" y="12" width="118" height="65" rx="4" fill="#141414"/>
                    <rect x="56" y="20" width="100" height="4" rx="1" fill="#fff"/>
                    <rect x="56" y="28" width="95" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="35" width="100" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="42" width="85" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="49" width="90" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="56" width="70" height="3" rx="1" fill="#666"/>
                    
                    {/* Model badges */}
                    <rect x="56" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                    <rect x="80" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                    <rect x="104" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                    
                    {/* Input at bottom */}
                    <rect x="48" y="88" width="120" height="16" rx="8" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="56" y="94" width="45" height="4" rx="1" fill="#444"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Mid-Fi Summary */}
          <div className="max-w-3xl mt-12">
            <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Key Refinements</h4>
            <div className="space-y-3 text-white/50 leading-relaxed">
              <p><span className="text-white/70 font-medium">Model visibility:</span> Show which AI models are being used so users understand where the answer is coming from.</p>
              <p><span className="text-white/70 font-medium">Simple interface:</span> Users only enter one question while the system runs multiple AI models behind the scenes.</p>
              <p><span className="text-white/70 font-medium">Multi-model comparison:</span> The platform runs several models in parallel and compares responses before returning the final answer.</p>
            </div>
          </div>

          {/* Figma Design */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">High-Fidelity Design</h3>
            <p className="text-white/40 text-sm mb-6">Iteration & Final Design</p>
            
            <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
              The path to the final design involved extensive iteration. I explored multiple layout variations, tested different visual hierarchies, and refined the user flows based on feedback. Below are snapshots from my Figma workspace showing the evolution of ideas, from early lo-fi explorations and flow diagrams to polished component libraries and final screens.
            </p>

            {/* All Figma Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 items-center">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center">
                <Image 
                  src="/narbl/figma-iteration-1.png" 
                  alt="Figma user flows and navigation maps"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center">
                <Image 
                  src="/narbl/narbl-figma.png" 
                  alt="Nexus Figma Design Overview"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center">
                <Image 
                  src="/narbl/figma-iteration-3.png" 
                  alt="Figma profile and dashboard iterations"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center">
                <Image 
                  src="/narbl/figma-iteration-2.png" 
                  alt="Figma onboarding and group creation flows"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Key Learnings from Iteration */}
            <div className="max-w-3xl">
              <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Iteration Insights</h4>
              <div className="space-y-3 text-white/50 leading-relaxed">
                <p><span className="text-white/70 font-medium">Flow simplification:</span> Early versions had too many steps. I streamlined onboarding to get users to their first answer faster.</p>
                <p><span className="text-white/70 font-medium">Visual hierarchy:</span> Tested multiple ways to present AI sources before landing on the badge system that shows which models contributed.</p>
                <p><span className="text-white/70 font-medium">Model transparency:</span> Added indicators showing which AI models were used, so students understand where the answer comes from.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Features */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Core Features</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Four integrated features that give students clear, consolidated answers without the complexity of managing multiple AI tools.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {/* Feature 1: One Question, Best Answer */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">One Question, Best Answer</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Ask anything. Nexus runs multiple AI models in parallel, compares their responses, and surfaces the strongest answer.
            </p>
          </div>

          {/* Feature 2: Multi-Model Comparison */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Multi-Model Comparison</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              No more second-guessing AI answers. The system compares responses across models and surfaces where they agree.
            </p>
          </div>

          {/* Feature 3: Model Transparency */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-pink-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Model Transparency</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              See which AI models contributed to your answer. Full transparency into which models were used in the process.
            </p>
          </div>

          {/* Feature 4: Homework Intelligence */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Homework Intelligence</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Built for students. Get clear answers for research, essays, and problem sets. Study smarter, not harder.
            </p>
          </div>
        </div>

        {/* Features Summary */}
        <div className="max-w-3xl mt-12">
          <p className="text-white/50 leading-relaxed">
            Each feature works together to simplify AI research. Ask one question, get one consolidated answer powered by multiple AI models. No tab hopping, no conflicting information.
          </p>
        </div>
      </Section>

      {/* Design System */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Design System</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          I designed a <strong className="text-white/70">minimal, monochromatic system</strong> that feels both sophisticated and focused. The near-black theme <strong className="text-white/70">reduces eye strain</strong> during long study sessions while the clean white typography and subtle blue accents create a <strong className="text-white/70">professional, clear experience</strong> that lets the content shine.
        </p>

        {/* Design System */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {/* Colors */}
          <div 
            className="rounded-2xl p-8 border border-white/10"
            style={{
              background: 'linear-gradient(145deg, #0a0a0a 0%, #141414 100%)',
            }}
          >
            <h5 className="text-white text-lg font-semibold mb-8">Colors</h5>
            
            {/* Background */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Background</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#000000] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#000000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0a0a0a] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#0A0A0A</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#141414] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#141414</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#1A1A1A</span>
                </div>
              </div>
            </div>

            {/* Primary - White/Gray */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Primary · Neutrals</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#ffffff] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#FFFFFF</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#e5e5e5] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#E5E5E5</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#a3a3a3] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#A3A3A3</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#525252] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#525252</span>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Accent · Subtle Blue</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#3b82f6] shadow-lg shadow-blue-500/30"></div>
                  <span className="text-white/50 text-[10px] font-mono">#3B82F6</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#60a5fa] shadow-lg shadow-blue-400/30"></div>
                  <span className="text-white/50 text-[10px] font-mono">#60A5FA</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg" style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)' }}></div>
                  <span className="text-white/50 text-[10px] font-mono">Blue/20%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}></div>
                  <span className="text-white/50 text-[10px] font-mono">Blue/10%</span>
                </div>
              </div>
            </div>

            {/* UI Elements */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">UI Elements</p>
              <div className="space-y-3">
                <div 
                  className="h-12 rounded-full flex items-center justify-between px-4 text-xs"
                  style={{
                    background: '#ffffff',
                  }}
                >
                  <span className="text-black/70">Primary Button</span>
                  <span className="text-black text-[10px] font-medium">Try Now →</span>
                </div>
                <div 
                  className="h-12 rounded-lg flex items-center justify-between px-4 text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="text-white/50">Input Field</span>
                  <span className="text-white/30 text-[10px]">Ready when you are.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div 
            className="rounded-2xl p-8 border border-white/10"
            style={{
              background: 'linear-gradient(145deg, #0a0a0a 0%, #141414 100%)',
            }}
          >
            <h5 className="text-white text-lg font-semibold mb-8">Typography</h5>
            
            <div className="space-y-0">
              {/* Display */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Display</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Bold · 48px</p>
                </div>
                <p className="text-white text-3xl font-bold">Nexus</p>
              </div>

              {/* Heading */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Heading</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter SemiBold · 24px</p>
                </div>
                <p className="text-white text-2xl font-semibold">Heading</p>
              </div>

              {/* Subheading - Italic style like "One Nexus" */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Accent</p>
                  <p className="text-white/30 text-xs mt-0.5">Serif Italic · 24px</p>
                </div>
                <p className="text-white/90 text-2xl italic" style={{ fontFamily: 'Georgia, serif' }}>One Nexus.</p>
              </div>

              {/* Body */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Body</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Regular · 14px</p>
                </div>
                <p className="text-white/70 text-sm">Body text</p>
              </div>

              {/* Secondary */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Secondary</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Regular · 14px</p>
                </div>
                <p className="text-white/40 text-sm">Muted text</p>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white/90 text-sm font-medium">Caption</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Medium · 11px</p>
                </div>
                <p className="text-white/50 text-[11px] uppercase tracking-wider">MOST ACCURATE AI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Design Decision */}
        <div className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10 max-w-3xl">
          <p className="text-[#60a5fa] text-xs font-semibold uppercase tracking-widest mb-4">Key Design Decision</p>
          <p className="text-white/70 text-lg leading-relaxed">
            I designed a <strong className="text-white font-semibold">single-answer interface instead of showing multiple AI responses</strong> because student research showed they just want one clear answer, not more choices to sort through. All the multi-model comparison happens behind the scenes, so users just see what matters: one consolidated result.
          </p>
        </div>
      </Section>

      {/* Impact & Results */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Impact & Results</SectionTitle>
        
        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">40%</p>
              <p className="text-white/70 text-sm">Increase in user sign-ups within 3 months of launch</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">2x</p>
              <p className="text-white/70 text-sm">Faster onboarding completion after flow redesign</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">85%</p>
              <p className="text-white/70 text-sm">Positive feedback from user testing sessions</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">500+</p>
              <p className="text-white/70 text-sm">Active users on designs shipped to production</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Reflection</SectionTitle>
        
        <div className="max-w-3xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">What I Learned</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Collaborating daily with engineers on constraints</li>
                <li>Building design systems from scratch</li>
                <li>Designing for students who want answers fast</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">Challenges</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Communicating model transparency through UI</li>
                <li>Handling unpredictable AI response times</li>
                <li>Balancing input from multiple stakeholders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">Next Time</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Test with diverse student populations earlier</li>
                <li>Design mobile flows sooner</li>
                <li>Explore study group collaboration features</li>
              </ul>
            </div>
          </div>

          <div className="p-5 bg-white/[0.03] rounded-xl border border-white/10">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-medium">Key Insight:</span> This internship taught me to ship production-quality work in a fast-paced startup. I gained confidence collaborating with senior engineers and learned to design complex tools that respect user expertise.
            </p>
          </div>
        </div>
      </Section>

      {/* Final Product Showcase - Looping Slideshow */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Product Walkthrough</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Browse through the final high-fidelity designs showcasing Nexus's core features and glassmorphism aesthetic.
        </p>

        {/* Big Looping Slideshow */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            {/* Slideshow Container */}
            <div className="relative aspect-[16/10]">
              {demoImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                    activeSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Slide indicator dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {demoImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSlide === index 
                        ? 'bg-white w-6' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Current slide label */}
          <p className="text-center text-white/50 text-sm mt-6 font-medium">
            {demoImages[activeSlide].label}
          </p>
        </div>
      </Section>

      {/* Back to Portfolio */}
      <section ref={footerRef} className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="relative z-30 inline-flex items-center gap-3 px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full transition-all touch-manipulation"
          >
            Back to Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

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
    </main>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.05, rootMargin: '0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section 
      ref={ref}
      className={`relative z-10 py-24 px-8 border-t border-white/5 transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#60a5fa]/60 text-sm font-mono mb-4">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
  )
}
