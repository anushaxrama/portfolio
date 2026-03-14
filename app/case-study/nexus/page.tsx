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

          {/* Lo-Fi Wireframe Flows - Hand-drawn Sketches */}
          <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-6 md:p-8 mb-12 border border-[#e8e4dc]">
            <svg viewBox="0 0 880 460" className="w-full h-auto">
              <defs>
                <filter id="pencilSketch" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <marker id="sketchArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                  <path d="M 0 1 Q 4 3.5, 0 6 L 9 3.5 Z" fill="#666" filter="url(#pencilSketch)"/>
                </marker>
              </defs>
              
              {/* Hand-written labels */}
              <text x="110" y="18" fill="#777" fontSize="12" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">hero</text>
              <text x="400" y="18" fill="#777" fontSize="12" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">features</text>
              <text x="700" y="18" fill="#777" fontSize="12" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">AI sources</text>
              
              {/* Screen 1: Hero - Hand drawn */}
              <g transform="translate(15, 28)">
                {/* Sketchy browser frame */}
                <path d="M 3 2 Q 1 5, 2 178 Q 4 183, 257 181 Q 262 178, 260 5 Q 257 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                {/* Wobbly browser dots */}
                <circle cx="16" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="30" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="44" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                
                {/* Sketchy nav */}
                <path d="M 12 28 Q 35 26, 52 30" stroke="#555" strokeWidth="2" filter="url(#pencilSketch)"/>
                <path d="M 200 27 Q 218 25, 230 29" stroke="#aaa" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 235 26 Q 250 24, 254 35 Q 252 40, 238 39 Q 233 35, 235 26" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch)"/>
                
                {/* Sketchy center icon */}
                <circle cx="130" cy="58" r="12" fill="none" stroke="#777" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                <path d="M 130 50 L 130 66" stroke="#777" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 122 58 L 138 58" stroke="#777" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                
                {/* Sketchy headlines */}
                <path d="M 48 82 Q 130 78, 212 85" stroke="#444" strokeWidth="2.5" filter="url(#pencilSketch)"/>
                <path d="M 72 98 Q 130 94, 188 100" stroke="#555" strokeWidth="2" filter="url(#pencilSketch)"/>
                
                {/* Subtitle squiggle */}
                <path d="M 58 115 Q 130 110, 202 118" stroke="#bbb" strokeWidth="1" filter="url(#pencilSketch)"/>
                
                {/* Wobbly avatars */}
                <circle cx="102" cy="135" r="6" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <circle cx="118" cy="134" r="6" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <circle cx="134" cy="135" r="6" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 148 133 Q 175 130, 195 136" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                
                {/* Sketchy input */}
                <path d="M 32 155 Q 35 150, 228 152 Q 235 158, 230 172 Q 225 178, 38 175 Q 32 170, 32 155" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                <path d="M 50 163 Q 95 160, 140 166" stroke="#ccc" strokeWidth="1" filter="url(#pencilSketch)"/>
                <circle cx="215" cy="163" r="8" fill="none" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>
              </g>
              
              {/* Sketchy Arrow 1 */}
              <path d="M 285 115 Q 300 112, 315 118" stroke="#666" strokeWidth="1.8" fill="none" markerEnd="url(#sketchArrow)" filter="url(#pencilSketch)"/>
              
              {/* Screen 2: Features */}
              <g transform="translate(325, 28)">
                <path d="M 4 3 Q 1 6, 2 176 Q 5 181, 232 179 Q 238 175, 236 6 Q 233 2, 6 4 Z" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                <circle cx="14" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="28" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="42" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                
                {/* Header squiggles */}
                <path d="M 62 35 Q 118 30, 175 38" stroke="#444" strokeWidth="2.2" filter="url(#pencilSketch)"/>
                <path d="M 78 50 Q 118 46, 158 52" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                
                {/* Three sketchy cards */}
                <path d="M 18 70 Q 22 66, 72 68 Q 78 72, 76 122 Q 72 128, 22 125 Q 18 120, 18 70" fill="none" stroke="#888" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <rect x="28" y="82" width="8" height="22" fill="none" stroke="#aaa" strokeWidth="1" filter="url(#pencilSketch)"/>
                <rect x="40" y="88" width="8" height="16" fill="none" stroke="#aaa" strokeWidth="1" filter="url(#pencilSketch)"/>
                <rect x="52" y="85" width="8" height="19" fill="none" stroke="#aaa" strokeWidth="1" filter="url(#pencilSketch)"/>
                <path d="M 25 115 Q 48 112, 68 118" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                
                <path d="M 88 70 Q 92 66, 152 68 Q 158 72, 156 122 Q 152 128, 95 125 Q 88 120, 88 70" fill="none" stroke="#888" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 102 98 Q 122 80, 142 98" fill="none" stroke="#aaa" strokeWidth="2" filter="url(#pencilSketch)"/>
                <path d="M 122 98 L 132 86" stroke="#888" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 95 115 Q 122 112, 148 118" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                
                <path d="M 165 70 Q 168 66, 220 68 Q 226 72, 224 122 Q 220 128, 170 125 Q 165 120, 165 70" fill="none" stroke="#888" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="195" cy="90" r="8" fill="none" stroke="#aaa" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <circle cx="180" cy="100" r="4" fill="none" stroke="#aaa" strokeWidth="1" filter="url(#pencilSketch)"/>
                <circle cx="210" cy="100" r="4" fill="none" stroke="#aaa" strokeWidth="1" filter="url(#pencilSketch)"/>
                <path d="M 172 115 Q 195 112, 218 118" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                
                {/* Bottom squiggles */}
                <path d="M 45 145 Q 70 142, 92 148" stroke="#999" strokeWidth="1" filter="url(#pencilSketch)"/>
                <path d="M 100 145 Q 125 142, 150 148" stroke="#999" strokeWidth="1" filter="url(#pencilSketch)"/>
                
                <text x="75" y="170" fill="#888" fontSize="9" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"3 cards"</text>
              </g>
              
              {/* Sketchy Arrow 2 */}
              <path d="M 572 115 Q 590 110, 608 118" stroke="#666" strokeWidth="1.8" fill="none" markerEnd="url(#sketchArrow)" filter="url(#pencilSketch)"/>
              
              {/* Screen 3: AI Sources */}
              <g transform="translate(618, 28)">
                <path d="M 3 2 Q 0 6, 2 176 Q 5 182, 247 179 Q 253 175, 250 6 Q 247 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                <circle cx="15" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="29" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="43" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                
                {/* Two cards */}
                <path d="M 12 30 Q 16 26, 110 28 Q 116 32, 114 102 Q 110 108, 18 105 Q 12 100, 12 30" fill="none" stroke="#777" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 22 42 Q 55 38, 85 45" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 22 56 Q 50 52, 95 58" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                {/* Stacked pill badges */}
                <path d="M 25 68 Q 28 64, 65 66 Q 70 70, 68 80 Q 64 84, 28 82 Q 25 78, 25 68" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 32 85 Q 35 81, 72 83 Q 77 87, 75 97 Q 71 101, 35 99 Q 32 95, 32 85" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                
                <path d="M 125 30 Q 128 26, 238 28 Q 244 32, 242 102 Q 238 108, 130 105 Q 125 100, 125 30" fill="none" stroke="#777" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 135 42 Q 175 38, 220 45" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                {/* Sketchy grid icons */}
                <rect x="140" y="58" width="16" height="16" fill="none" stroke="#aaa" strokeWidth="1" rx="2" filter="url(#pencilSketch)"/>
                <rect x="165" y="58" width="16" height="16" fill="none" stroke="#aaa" strokeWidth="1" rx="2" filter="url(#pencilSketch)"/>
                <rect x="190" y="58" width="16" height="16" fill="none" stroke="#aaa" strokeWidth="1" rx="2" filter="url(#pencilSketch)"/>
                <circle cx="178" cy="88" r="10" fill="none" stroke="#999" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                
                {/* Bottom */}
                <path d="M 50 125 Q 125 120, 200 128" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                <path d="M 30 145 Q 125 140, 220 148" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                {/* Tag pills */}
                <path d="M 55 160 Q 58 156, 100 158 Q 105 162, 102 170 Q 98 174, 58 172 Q 55 168, 55 160" fill="none" stroke="#999" strokeWidth="1" filter="url(#pencilSketch)"/>
                <path d="M 115 160 Q 118 156, 160 158 Q 165 162, 162 170 Q 158 174, 118 172 Q 115 168, 115 160" fill="none" stroke="#999" strokeWidth="1" filter="url(#pencilSketch)"/>
              </g>
              
              {/* Row 2 labels */}
              <text x="110" y="242" fill="#777" fontSize="12" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">quote</text>
              <text x="400" y="242" fill="#777" fontSize="12" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">stories</text>
              <text x="700" y="242" fill="#777" fontSize="12" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">input</text>
              
              {/* Screen 4: Testimonial */}
              <g transform="translate(15, 255)">
                <path d="M 4 2 Q 1 6, 2 158 Q 5 164, 257 161 Q 263 156, 260 6 Q 256 1, 6 3 Z" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                <circle cx="15" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="29" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="43" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                
                {/* Big quote mark */}
                <text x="35" y="52" fill="#ddd" fontSize="36" fontFamily="Georgia, serif">"</text>
                
                {/* Quote lines */}
                <path d="M 62 45 Q 140 40, 230 48" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 55 62 Q 145 56, 238 65" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 60 79 Q 140 74, 215 82" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                
                {/* Author */}
                <circle cx="130" cy="110" r="16" fill="none" stroke="#888" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 95 135 Q 130 130, 165 138" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 85 150 Q 130 145, 175 152" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
              </g>
              
              {/* Arrow 3 */}
              <path d="M 285 335 Q 302 330, 320 338" stroke="#666" strokeWidth="1.8" fill="none" markerEnd="url(#sketchArrow)" filter="url(#pencilSketch)"/>
              
              {/* Screen 5: Success Stories */}
              <g transform="translate(325, 255)">
                <path d="M 3 3 Q 0 7, 2 156 Q 6 162, 232 159 Q 238 154, 235 7 Q 231 2, 5 4 Z" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                <circle cx="14" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="28" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="42" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                
                {/* Header */}
                <path d="M 58 32 Q 118 27, 178 35" stroke="#444" strokeWidth="2" filter="url(#pencilSketch)"/>
                
                {/* Stacked cards */}
                <path d="M 42 52 Q 45 48, 195 50 Q 200 54, 198 62 Q 195 66, 45 64 Q 42 60, 42 52" fill="none" stroke="#ccc" strokeWidth="1" filter="url(#pencilSketch)"/>
                <path d="M 35 60 Q 38 56, 200 58 Q 206 62, 204 72 Q 200 76, 40 74 Q 35 70, 35 60" fill="none" stroke="#bbb" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 28 70 Q 32 65, 208 68 Q 215 74, 212 142 Q 208 148, 35 145 Q 28 140, 28 70" fill="none" stroke="#777" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                
                {/* Card content */}
                <circle cx="178" cy="100" r="18" fill="none" stroke="#aaa" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 45 90 Q 85 86, 120 93" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <path d="M 45 105 Q 95 100, 140 108" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                <path d="M 45 118 Q 90 114, 130 121" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                
                {/* Stats boxes */}
                <path d="M 50 130 Q 53 126, 95 128 Q 100 132, 98 142 Q 94 146, 53 144 Q 50 140, 50 130" fill="none" stroke="#999" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 108 130 Q 111 126, 153 128 Q 158 132, 156 142 Q 152 146, 111 144 Q 108 140, 108 130" fill="none" stroke="#999" strokeWidth="1.2" filter="url(#pencilSketch)"/>
              </g>
              
              {/* Arrow 4 */}
              <path d="M 572 335 Q 590 330, 608 338" stroke="#666" strokeWidth="1.8" fill="none" markerEnd="url(#sketchArrow)" filter="url(#pencilSketch)"/>
              
              {/* Screen 6: Input State */}
              <g transform="translate(618, 255)">
                <path d="M 2 3 Q -1 7, 1 156 Q 4 162, 248 159 Q 254 154, 251 7 Q 247 2, 4 4 Z" fill="none" stroke="#666" strokeWidth="2" filter="url(#pencilSketch)"/>
                <circle cx="14" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="28" cy="12" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                <circle cx="42" cy="11" r="4" fill="none" stroke="#999" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                
                {/* Logo */}
                <path d="M 15 32 Q 45 28, 65 35" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                
                {/* Active input - emphasized */}
                <path d="M 22 55 Q 26 48, 228 52 Q 236 58, 232 78 Q 226 85, 28 82 Q 22 76, 22 55" fill="none" stroke="#444" strokeWidth="2.5" filter="url(#pencilSketch)"/>
                <path d="M 38 65 Q 85 62, 130 68" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                <path d="M 138 58 L 138 76" stroke="#333" strokeWidth="2" filter="url(#pencilSketch)"/>
                
                {/* Spinner */}
                <circle cx="125" cy="115" r="14" fill="none" stroke="#aaa" strokeWidth="2" strokeDasharray="10,6" filter="url(#pencilSketch)"/>
                
                <path d="M 65 140 Q 125 135, 185 143" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                
                <text x="70" y="158" fill="#888" fontSize="9" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"scanning..."</text>
              </g>
              
              {/* Hand-drawn annotation */}
              <path d="M 295 45 Q 308 28, 335 35" stroke="#aaa" strokeWidth="1" strokeDasharray="4,3" fill="none" filter="url(#pencilSketch)"/>
              <text x="340" y="38" fill="#999" fontSize="9" fontFamily="Comic Sans MS, cursive">scroll →</text>
            </svg>
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
          <div className="rounded-xl overflow-hidden bg-[#faf9f7] p-6 md:p-8 mb-12 border border-[#e5e3df]">
            <svg viewBox="0 0 880 460" className="w-full h-auto">
              <defs>
                <marker id="cleanArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <path d="M 0 0 L 8 3 L 0 6 Z" fill="#888"/>
                </marker>
              </defs>
              
              {/* Row 1 - Three screens */}
              {/* Screen 1: Hero/Landing */}
              <g transform="translate(15, 25)">
                <text x="0" y="-8" fill="#666" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">Hero Section</text>
                <rect x="0" y="0" width="260" height="180" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                {/* Browser dots */}
                <circle cx="12" cy="10" r="3" fill="#ddd"/>
                <circle cx="22" cy="10" r="3" fill="#ddd"/>
                <circle cx="32" cy="10" r="3" fill="#ddd"/>
                {/* URL bar */}
                <rect x="45" y="6" width="120" height="8" rx="4" fill="#f0f0f0"/>
                
                {/* Nav */}
                <rect x="10" y="25" width="40" height="6" rx="1" fill="#444"/>
                <rect x="200" y="25" width="25" height="6" rx="1" fill="#ccc"/>
                <rect x="230" y="24" width="22" height="10" rx="5" fill="#555"/>
                
                {/* Center icon */}
                <circle cx="130" cy="55" r="10" fill="none" stroke="#888" strokeWidth="1.5"/>
                
                {/* Headlines */}
                <rect x="50" y="75" width="160" height="10" rx="1" fill="#333"/>
                <rect x="70" y="92" width="120" height="8" rx="1" fill="#555"/>
                
                {/* Subtitle */}
                <rect x="60" y="108" width="140" height="5" rx="1" fill="#bbb"/>
                
                {/* Avatars */}
                <circle cx="105" cy="128" r="5" fill="#e0e0e0"/>
                <circle cx="117" cy="128" r="5" fill="#d5d5d5"/>
                <circle cx="129" cy="128" r="5" fill="#ccc"/>
                <rect x="140" y="125" width="45" height="5" rx="1" fill="#ccc"/>
                
                {/* Input */}
                <rect x="30" y="148" width="200" height="22" rx="11" fill="none" stroke="#888" strokeWidth="1.5"/>
                <rect x="45" y="156" width="80" height="5" rx="1" fill="#ddd"/>
                <circle cx="210" cy="159" r="7" fill="#666"/>
              </g>
              
              {/* Arrow 1 */}
              <path d="M 285 115 L 310 115" stroke="#888" strokeWidth="1.5" markerEnd="url(#cleanArrow)"/>
              
              {/* Screen 2: Features */}
              <g transform="translate(320, 25)">
                <text x="0" y="-8" fill="#666" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">Features</text>
                <rect x="0" y="0" width="240" height="180" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                <circle cx="12" cy="10" r="3" fill="#ddd"/>
                <circle cx="22" cy="10" r="3" fill="#ddd"/>
                <circle cx="32" cy="10" r="3" fill="#ddd"/>
                
                {/* Section header */}
                <rect x="60" y="30" width="120" height="8" rx="1" fill="#333"/>
                <rect x="70" y="44" width="100" height="6" rx="1" fill="#666"/>
                
                {/* Three cards */}
                <rect x="15" y="62" width="65" height="55" rx="4" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
                <rect x="25" y="72" width="6" height="20" rx="1" fill="#ccc"/>
                <rect x="34" y="78" width="6" height="14" rx="1" fill="#ccc"/>
                <rect x="43" y="75" width="6" height="17" rx="1" fill="#ccc"/>
                <rect x="22" y="100" width="50" height="5" rx="1" fill="#888"/>
                <rect x="22" y="108" width="45" height="4" rx="1" fill="#bbb"/>
                
                <rect x="88" y="62" width="65" height="55" rx="4" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
                <path d="M 102 82 Q 120 68, 138 82" fill="none" stroke="#ccc" strokeWidth="4" strokeLinecap="round"/>
                <path d="M 120 82 L 128 72" stroke="#999" strokeWidth="2"/>
                <rect x="95" y="100" width="50" height="5" rx="1" fill="#888"/>
                <rect x="95" y="108" width="45" height="4" rx="1" fill="#bbb"/>
                
                <rect x="160" y="62" width="65" height="55" rx="4" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
                <circle cx="192" cy="78" r="6" fill="#ddd"/>
                <circle cx="180" cy="86" r="3" fill="#ccc"/>
                <circle cx="204" cy="86" r="3" fill="#ccc"/>
                <rect x="167" y="100" width="50" height="5" rx="1" fill="#888"/>
                <rect x="167" y="108" width="45" height="4" rx="1" fill="#bbb"/>
                
                {/* Bottom tabs */}
                <rect x="40" y="135" width="40" height="5" rx="1" fill="#aaa"/>
                <rect x="90" y="135" width="40" height="5" rx="1" fill="#aaa"/>
                <rect x="140" y="135" width="40" height="5" rx="1" fill="#aaa"/>
                
                <text x="85" y="165" fill="#888" fontSize="8" fontFamily="system-ui, sans-serif" fontStyle="italic">3 value props</text>
              </g>
              
              {/* Arrow 2 */}
              <path d="M 570 115 L 595 115" stroke="#888" strokeWidth="1.5" markerEnd="url(#cleanArrow)"/>
              
              {/* Screen 3: AI Sources */}
              <g transform="translate(605, 25)">
                <text x="0" y="-8" fill="#666" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">AI Sources</text>
                <rect x="0" y="0" width="260" height="180" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                <circle cx="12" cy="10" r="3" fill="#ddd"/>
                <circle cx="22" cy="10" r="3" fill="#ddd"/>
                <circle cx="32" cy="10" r="3" fill="#ddd"/>
                
                {/* Two cards side by side */}
                <rect x="10" y="28" width="115" height="80" rx="4" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="1"/>
                <rect x="20" y="38" width="60" height="6" rx="1" fill="#444"/>
                <rect x="20" y="50" width="90" height="4" rx="1" fill="#bbb"/>
                {/* Stacked badges */}
                <rect x="22" y="62" width="50" height="14" rx="7" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                <rect x="30" y="80" width="50" height="14" rx="7" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                <rect x="38" y="98" width="50" height="14" rx="7" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                
                <rect x="135" y="28" width="115" height="80" rx="4" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="1"/>
                <rect x="145" y="38" width="70" height="6" rx="1" fill="#444"/>
                {/* Grid icons */}
                <rect x="148" y="52" width="18" height="18" rx="3" fill="#eee"/>
                <rect x="172" y="52" width="18" height="18" rx="3" fill="#eee"/>
                <rect x="196" y="52" width="18" height="18" rx="3" fill="#eee"/>
                <rect x="148" y="76" width="18" height="18" rx="3" fill="#eee"/>
                <circle cx="181" cy="85" r="10" fill="#e5e5e5" stroke="#ddd" strokeWidth="1"/>
                <rect x="196" y="76" width="18" height="18" rx="3" fill="#eee"/>
                
                {/* Bottom section */}
                <rect x="50" y="120" width="160" height="8" rx="1" fill="#333"/>
                <rect x="30" y="138" width="200" height="5" rx="1" fill="#bbb"/>
                {/* Tags */}
                <rect x="50" y="155" width="45" height="12" rx="6" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                <rect x="105" y="155" width="45" height="12" rx="6" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
                <rect x="160" y="155" width="45" height="12" rx="6" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
              </g>
              
              {/* Row 2 - Three more screens */}
              {/* Screen 4: Testimonial */}
              <g transform="translate(15, 250)">
                <text x="0" y="-8" fill="#666" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">Testimonial</text>
                <rect x="0" y="0" width="260" height="160" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                <circle cx="12" cy="10" r="3" fill="#ddd"/>
                <circle cx="22" cy="10" r="3" fill="#ddd"/>
                <circle cx="32" cy="10" r="3" fill="#ddd"/>
                
                {/* Quote */}
                <text x="30" y="45" fill="#e0e0e0" fontSize="28" fontFamily="Georgia, serif">"</text>
                <rect x="55" y="35" width="180" height="5" rx="1" fill="#666"/>
                <rect x="50" y="48" width="190" height="5" rx="1" fill="#666"/>
                <rect x="55" y="61" width="170" height="5" rx="1" fill="#666"/>
                
                {/* Author */}
                <circle cx="130" cy="95" r="15" fill="#e8e8e8"/>
                <rect x="95" y="118" width="70" height="6" rx="1" fill="#555"/>
                <rect x="85" y="130" width="90" height="4" rx="1" fill="#bbb"/>
              </g>
              
              {/* Arrow 3 */}
              <path d="M 285 330 L 310 330" stroke="#888" strokeWidth="1.5" markerEnd="url(#cleanArrow)"/>
              
              {/* Screen 5: Success Stories */}
              <g transform="translate(320, 250)">
                <text x="0" y="-8" fill="#666" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">Success Stories</text>
                <rect x="0" y="0" width="240" height="160" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                <circle cx="12" cy="10" r="3" fill="#ddd"/>
                <circle cx="22" cy="10" r="3" fill="#ddd"/>
                <circle cx="32" cy="10" r="3" fill="#ddd"/>
                
                {/* Header */}
                <rect x="60" y="28" width="120" height="8" rx="1" fill="#333"/>
                
                {/* Stacked cards */}
                <rect x="35" y="48" width="170" height="10" rx="3" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1"/>
                <rect x="30" y="55" width="180" height="12" rx="3" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
                <rect x="25" y="65" width="190" height="75" rx="4" fill="#fff" stroke="#ccc" strokeWidth="1.5"/>
                
                {/* Card content */}
                <circle cx="180" cy="90" r="18" fill="#eee"/>
                <rect x="40" y="80" width="70" height="6" rx="1" fill="#555"/>
                <rect x="40" y="92" width="100" height="4" rx="1" fill="#aaa"/>
                <rect x="40" y="102" width="90" height="4" rx="1" fill="#aaa"/>
                {/* Stats */}
                <rect x="45" y="118" width="45" height="14" rx="4" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
                <rect x="98" y="118" width="45" height="14" rx="4" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
              </g>
              
              {/* Arrow 4 */}
              <path d="M 570 330 L 595 330" stroke="#888" strokeWidth="1.5" markerEnd="url(#cleanArrow)"/>
              
              {/* Screen 6: Input State */}
              <g transform="translate(605, 250)">
                <text x="0" y="-8" fill="#666" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="500">Input State</text>
                <rect x="0" y="0" width="260" height="160" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5"/>
                <circle cx="12" cy="10" r="3" fill="#ddd"/>
                <circle cx="22" cy="10" r="3" fill="#ddd"/>
                <circle cx="32" cy="10" r="3" fill="#ddd"/>
                
                {/* Logo */}
                <rect x="10" y="28" width="50" height="8" rx="1" fill="#444"/>
                
                {/* Active input */}
                <rect x="20" y="50" width="220" height="28" rx="14" fill="#fff" stroke="#555" strokeWidth="2"/>
                <rect x="35" y="60" width="100" height="6" rx="1" fill="#666"/>
                <rect x="140" y="55" width="2" height="16" fill="#333"/>
                
                {/* Processing indicator */}
                <circle cx="130" cy="105" r="12" fill="none" stroke="#aaa" strokeWidth="2" strokeDasharray="8,4"/>
                
                <rect x="70" y="128" width="120" height="5" rx="1" fill="#bbb"/>
                <rect x="85" y="140" width="90" height="4" rx="1" fill="#ccc"/>
                
                <text x="75" y="155" fill="#888" fontSize="8" fontFamily="system-ui, sans-serif" fontStyle="italic">scanning AIs...</text>
              </g>
            </svg>
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
