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
  { src: '/narbl/narbl-1.png', label: 'Build with Intelligence' },
  { src: '/narbl/narbl-3.png', label: 'Compare Side by Side' },
  { src: '/narbl/narbl-4.png', label: 'Chat with Any Model' },
  { src: '/narbl/narbl-5.png', label: 'Build Custom AI Agents' },
  { src: '/narbl/narbl-6.png', label: 'Powerful AI Products' },
  { src: '/narbl/narbl-7.png', label: 'User Dashboard' },
]

export default function NarblCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
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
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-8">
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
                Narbl
              </h1>
              
              <p className={`text-lg md:text-xl text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                One platform to chat, compare, and build with any AI.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-white/80">UX/UI Designer</p>
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
        <SectionLabel>Overview</SectionLabel>
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8">
            Most AI tools force you to choose a single model. Narbl lets you use them all.
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            During my internship, our team designed Narbl as a unified AI developer platform. The goal was simple: let developers chat with any LLM, compare responses side by side, and build custom AI agents. We wrapped it all in a sleek glassmorphism interface that makes complex AI workflows feel surprisingly intuitive.
          </p>
          
          {/* Problem Statement Box */}
          <div 
            className="relative rounded-3xl p-10 md:p-14"
            style={{
              background: 'linear-gradient(145deg, rgba(147,112,219,0.12) 0%, rgba(147,112,219,0.04) 100%)',
              boxShadow: `
                0 4px 24px -4px rgba(0,0,0,0.4),
                0 12px 48px -8px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.2)
              `,
              border: '1px solid rgba(147,112,219,0.2)',
            }}
          >
            {/* Label */}
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Problem Statement</p>
            
            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might we design an AI platform that helps developers{' '}
              <span className="text-[#60a5fa]">explore</span>,{' '}
              <span className="text-[#60a5fa]">compare</span>, and{' '}
              <span className="text-[#60a5fa]">build</span>{' '}
              with multiple LLMs in a way that supports{' '}
              <span className="text-[#60a5fa]">informed decision-making</span> and{' '}
              <span className="text-[#60a5fa]">rapid prototyping</span> rather than vendor lock-in?
            </p>
          </div>
        </div>
      </Section>

      {/* Design Process Timeline */}
      <Section>
        <SectionLabel>Design Process</SectionLabel>
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
        <SectionTitle>Research</SectionTitle>
        
        <div className="max-w-3xl mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Research Goals</h3>
          <p className="text-lg text-white/60 leading-relaxed">
            We started with a hypothesis: developers want to try different AI models, but current tools make switching between them a hassle. Our team wanted to dig into how developers actually work with LLMs, where they hit walls, and what would make model comparison and agent building feel{' '}
            <span className="text-white font-medium">frictionless</span> and{' '}
            <span className="text-white font-medium">intuitive</span>.
          </p>
        </div>

        {/* User Surveys */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">User Surveys</h3>
          <p className="text-white/40 text-sm mb-12">Survey sample: n = 32 developers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Primary AI Tools Used */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Primary AI Tools Used</h4>
            <div className="space-y-4">
              {[
                { label: 'ChatGPT', value: 78, color: '#3b82f6' },
                { label: 'Claude', value: 52, color: '#3b82f6' },
                { label: 'GitHub Copilot', value: 45, color: '#60a5fa' },
                { label: 'API Direct', value: 31, color: '#93c5fd' },
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
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Most developers use multiple tools but switch between separate interfaces.
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Top Pain Points</h4>
            <div className="space-y-3">
              {[
                { label: 'Model switching', value: 67, color: '#2563eb' },
                { label: 'Comparing outputs', value: 58, color: '#3b82f6' },
                { label: 'Managing contexts', value: 42, color: '#3b82f6' },
                { label: 'Building workflows', value: 38, color: '#60a5fa' },
                { label: 'Cost tracking', value: 29, color: '#93c5fd' },
                { label: 'Rate limits', value: 24, color: '#bfdbfe' },
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
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Switching models and comparing outputs are the biggest friction points.
            </p>
          </div>

          {/* Use Cases - Pie Chart */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Primary Use Cases</h4>
            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Code Generation 40% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="20"
                    strokeDasharray="100.5 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Chat/Assistance 30% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="75.4 251.2"
                    strokeDashoffset="-100.5"
                  />
                  {/* Content Creation 18% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#93c5fd"
                    strokeWidth="20"
                    strokeDasharray="45.2 251.2"
                    strokeDashoffset="-175.9"
                  />
                  {/* Other 12% */}
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
                  { label: 'Code Gen', value: '40%', color: '#2563eb' },
                  { label: 'Chat', value: '30%', color: '#3b82f6' },
                  { label: 'Content', value: '18%', color: '#93c5fd' },
                  { label: 'Other', value: '12%', color: '#bfdbfe' },
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
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Code generation and chat are primary, but needs vary by task.
            </p>
          </div>
        </div>

        {/* Survey Summary */}
        <div className="max-w-3xl mt-16 pt-12 border-t border-white/10">
          <h4 className="text-white/80 text-lg font-medium mb-4">Key Takeaways</h4>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              <span className="text-white/70 font-medium">Tool fatigue is real.</span>{' '}
              78% use ChatGPT, but over half also rely on Claude and other tools. Developers want the best model for each task, but juggling multiple platforms gets exhausting fast.
            </p>
            <p>
              <span className="text-white/70 font-medium">Comparison is manual and slow.</span>{' '}
              67% cited model switching as a major pain point. Most developers end up copying and pasting prompts between browser tabs just to compare outputs.
            </p>
            <p>
              <span className="text-white/70 font-medium">Workflows break across tools.</span>{' '}
              Building agents or automated workflows means stitching together APIs, managing separate contexts, and tracking costs by hand.
            </p>
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Competitive Analysis</h3>
          <p className="text-white/40 text-sm mb-10">Existing AI Platforms</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ChatGPT */}
            <div 
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(147,112,219,0.15) 0%, rgba(147,112,219,0.05) 100%)',
                border: '1px solid rgba(147,112,219,0.2)',
              }}
            >
              <h4 className="text-white font-medium mb-5">ChatGPT</h4>
              <div className="mb-5">
                <p className="text-white/70 text-sm font-medium mb-2">Strengths</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• Industry-leading brand recognition and trust</li>
                  <li>• Polished conversational interface</li>
                  <li>• Extensive plugin ecosystem</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-2">Limitations</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• Single model per conversation</li>
                  <li>• No native comparison features</li>
                  <li>• Limited customization for developers</li>
                </ul>
              </div>
            </div>

            {/* Claude */}
            <div 
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.05) 100%)',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
            >
              <h4 className="text-white font-medium mb-5">Claude</h4>
              <div className="mb-5">
                <p className="text-white/70 text-sm font-medium mb-2">Strengths</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• Superior at long-form content and analysis</li>
                  <li>• Clean, minimal interface design</li>
                  <li>• Excellent at following complex instructions</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-2">Limitations</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• No multi-model support</li>
                  <li>• Limited integration capabilities</li>
                  <li>• No agent-building features</li>
                </ul>
              </div>
            </div>

            {/* Poe */}
            <div 
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(147,112,219,0.15) 0%, rgba(147,112,219,0.05) 100%)',
                border: '1px solid rgba(147,112,219,0.2)',
              }}
            >
              <h4 className="text-white font-medium mb-5">Poe</h4>
              <div className="mb-5">
                <p className="text-white/70 text-sm font-medium mb-2">Strengths</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• Access to multiple models in one place</li>
                  <li>• Easy model switching</li>
                  <li>• Community-created bots</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-2">Limitations</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• No side-by-side comparison</li>
                  <li>• Consumer-focused, not developer-centric</li>
                  <li>• Limited workflow automation</li>
                </ul>
              </div>
            </div>

            {/* OpenRouter */}
            <div 
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.05) 100%)',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
            >
              <h4 className="text-white font-medium mb-5">OpenRouter</h4>
              <div className="mb-5">
                <p className="text-white/70 text-sm font-medium mb-2">Strengths</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• Unified API for all major models</li>
                  <li>• Pay-per-use pricing transparency</li>
                  <li>• Developer-first approach</li>
                </ul>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-2">Limitations</p>
                <ul className="space-y-1.5 text-white/50 text-sm">
                  <li>• API-only, no chat interface</li>
                  <li>• No visual comparison tools</li>
                  <li>• Requires technical integration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Competitive Analysis Summary */}
          <div className="max-w-3xl mt-12">
            <p className="text-white/50 leading-relaxed mb-4">
              <span className="text-white/70 font-medium">The gap:</span> existing tools either offer a polished interface for one model (ChatGPT, Claude) or multi-model access with clunky UX (Poe, OpenRouter). Nobody was combining beautiful design, side-by-side comparison, and agent building in one place.
            </p>
            <p className="text-white/50 leading-relaxed">
              That is exactly where Narbl comes in. Our team set out to build a developer platform with consumer-grade polish, model-agnostic flexibility, and powerful comparison and workflow tools.
            </p>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Affinity Mapping</h3>
          <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            We synthesized survey and interview data through affinity mapping. Three themes emerged:
          </p>
          
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Exploration:</span> Developers want to try different models quickly without commitment or complex setup.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Comparison:</span> Making informed model choices requires seeing outputs side-by-side for the same prompt.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Building:</span> Power users want to create custom agents and workflows without leaving the platform.
            </p>
          </div>

          {/* Affinity Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Exploration Column */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-8 text-center">Exploration</h4>
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
                  <p className="text-gray-700 leading-snug">Tries new models when they hear about them but switches back to familiar ones due to friction.</p>
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
                  <p className="text-gray-700 leading-snug">Wants to test new models on real tasks without signing up for new accounts.</p>
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
                  <p className="text-gray-700 leading-snug">Each AI platform requires separate login, payment setup, and learning curve.</p>
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
                  <p className="text-gray-700 leading-snug">Hard to know which model is best for a specific task without extensive testing.</p>
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
                  <p className="text-gray-700 leading-snug">Model exploration should be zero friction. One click, instant results.</p>
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
                  <p className="text-gray-700 leading-snug">Single interface with instant access to all major models. No setup required.</p>
                </div>
              </div>
            </div>

            {/* Comparison Column */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-8 text-center">Comparison</h4>
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
                  <p className="text-gray-700 leading-snug">Copies same prompt to multiple tools, then manually compares outputs in separate tabs.</p>
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
                  <p className="text-gray-700 leading-snug">Wants to make data-driven model choices, not just go with the popular option.</p>
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
                  <p className="text-gray-700 leading-snug">No way to see how different models respond to the same prompt simultaneously.</p>
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
                  <p className="text-gray-700 leading-snug">Time-consuming to test same prompt across multiple models manually.</p>
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
                  <p className="text-gray-700 leading-snug">Comparison should be native, not a workaround requiring multiple tools.</p>
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
                  <p className="text-gray-700 leading-snug">Split-screen comparison mode that runs the same prompt across selected models.</p>
                </div>
              </div>
            </div>

            {/* Building Column */}
            <div>
              <h4 className="text-2xl font-bold text-white mb-8 text-center">Building</h4>
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
                  <p className="text-gray-700 leading-snug">Uses AI chat for simple tasks but writes custom scripts for automation.</p>
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
                  <p className="text-gray-700 leading-snug">Wants to create custom AI agents without managing infrastructure.</p>
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
                  <p className="text-gray-700 leading-snug">Building agents requires stitching together multiple APIs and services.</p>
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
                  <p className="text-gray-700 leading-snug">No visual tools for prototyping AI workflows before coding them.</p>
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
                  <p className="text-gray-700 leading-snug">Power features should feel accessible, not hidden behind code.</p>
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
                  <p className="text-gray-700 leading-snug">Visual agent builder with drag-and-drop components and prompt chaining.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-10 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(216,180,254,0.9)' }}></div>
              <span className="text-white/40 text-xs">User Behavior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(167,216,156,0.9)' }}></div>
              <span className="text-white/40 text-xs">Needs / Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(254,240,138,0.9)' }}></div>
              <span className="text-white/40 text-xs">Pain Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(147,197,253,0.9)' }}></div>
              <span className="text-white/40 text-xs">UX Principle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(253,186,116,0.9)' }}></div>
              <span className="text-white/40 text-xs">Opportunity</span>
            </div>
          </div>

          {/* Affinity Mapping Summary */}
          <div className="max-w-3xl mt-12">
            <h4 className="text-white/80 text-lg font-medium mb-4">What This Revealed</h4>
            <p className="text-white/50 leading-relaxed mb-4">
              A clear progression emerged: users start by exploring models, then move to comparing for specific tasks, and eventually want to build on top of what they learn. Each stage has friction that breaks the flow.
            </p>
            <p className="text-white/50 leading-relaxed">
              The solution: <span className="text-white/70">a unified platform that supports the full journey</span>. Chat with any model, compare responses instantly, and graduate to building agents, all without leaving Narbl.
            </p>
          </div>
        </div>

        {/* User Flows */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">User Flows & Core Features</h3>
          <p className="text-white/40 text-sm mb-10">Four core journeys mapped from research insights</p>

          {/* Condensed User Flows Grid */}
          <div className="space-y-4">
            
            {/* Onboarding Flow */}
            <div 
              className="rounded-2xl p-6 border border-white/[0.06]"
              style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 100%)',
              }}
            >
              <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Onboarding</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">Landing Page</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Sign Up</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Choose Plan</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#f472b6] text-white">Dashboard</span>
              </div>
            </div>

            {/* Chat Flow */}
            <div 
              className="rounded-2xl p-6 border border-white/[0.06]"
              style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 100%)',
              }}
            >
              <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Chat with Any Model</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#f472b6] text-white">Dashboard</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-white/10 text-white/80 border border-white/20">New Chat</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Select Model</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Send Message</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Get Response</span>
                <span className="text-white/30 text-sm">→</span>
                <div className="flex flex-col gap-1.5">
                  <span className="px-3 py-1.5 rounded-md text-[11px] bg-white/[0.08] text-white/60 border border-white/10">Continue Chat</span>
                  <span className="px-3 py-1.5 rounded-md text-[11px] bg-white/[0.08] text-white/60 border border-white/10">Switch Model</span>
                </div>
              </div>
            </div>

            {/* Compare Flow */}
            <div 
              className="rounded-2xl p-6 border border-white/[0.06]"
              style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 100%)',
              }}
            >
              <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Compare Models</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#f472b6] text-white">Dashboard</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#2563eb] text-white">Compare Mode</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Select Models</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Enter Prompt</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#2563eb] text-white">Side-by-Side Results</span>
                <span className="text-white/30 text-sm">→</span>
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Choose Best</span>
              </div>
            </div>

            {/* Agent Builder Flow */}
            <div 
              className="rounded-2xl p-6 border border-white/[0.06]"
              style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0.02) 100%)',
              }}
            >
              <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Build AI Agent</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#f472b6] text-white">Dashboard</span>
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#ec4899] text-white">Agent Builder</span>
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Name Agent</span>
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Choose Model</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap pl-6">
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Set System Prompt</span>
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Add Knowledge</span>
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#3b82f6] text-[#1a1a2e]">Test Agent</span>
                  <span className="text-white/30 text-sm">→</span>
                  <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Deploy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#f472b6]"></span>
              <span className="text-white/50">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#3b82f6]"></span>
              <span className="text-white/50">Screens</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#2563eb]"></span>
              <span className="text-white/50">Compare</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#ec4899]"></span>
              <span className="text-white/50">Agent Builder</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#22c55e]"></span>
              <span className="text-white/50">Success/Exit</span>
            </div>
          </div>

          {/* User Flows Summary */}
          <div className="max-w-3xl mt-12">
            <p className="text-white/50 leading-relaxed">
              We mapped research insights to four core journeys: quick chat, model comparison, agent building, and account management. Each flow minimizes friction while maximizing power user capabilities.
            </p>
          </div>
        </div>

        {/* Low Fidelity Designs */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Low Fidelity Designs</h3>
          <p className="text-white/40 text-sm mb-6">Early Explorations</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            Our team started sketching user flows around three core experiences: <span className="text-white/70">multi-model chat</span>, <span className="text-white/70">side-by-side comparison</span>, and <span className="text-white/70">agent building</span>. These wireframe flows helped us map out the experience before moving to higher fidelity.
          </p>

          {/* Lo-Fi Wireframe Flows - Messy Hand-drawn Sketches */}
          <div className="rounded-xl overflow-hidden bg-white p-4 md:p-6 mb-12">
            <svg viewBox="0 0 800 500" className="w-full h-auto">
              <defs>
                <filter id="roughNarbl" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <filter id="pencilSketch">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3"/>
                  <feDisplacementMap in="SourceGraphic" scale="1.5"/>
                </filter>
              </defs>
              
              {/* Row 1: Chat Flow */}
              {/* Screen 1: Dashboard sketch */}
              <g transform="translate(15, 20)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Messy sidebar */}
                <path d="M 12 18 Q 14 80, 10 140" stroke="#666" strokeWidth="1.5" fill="none"/>
                <path d="M 35 18 Q 33 85, 38 140" stroke="#666" strokeWidth="1.5" fill="none"/>
                <circle cx="24" cy="35" r="10" fill="none" stroke="#333" strokeWidth="1.5"/>
                <path d="M 15 55 Q 22 53, 32 56" stroke="#888" strokeWidth="1.2"/>
                <path d="M 14 70 Q 25 68, 34 72" stroke="#888" strokeWidth="1.2"/>
                <path d="M 16 85 Q 23 83, 33 87" stroke="#888" strokeWidth="1.2"/>
                {/* Main content area scribbles */}
                <rect x="45" y="25" width="85" height="25" fill="none" stroke="#333" strokeWidth="1.5" rx="4"/>
                <path d="M 55 38 Q 80 35, 115 40" stroke="#666" strokeWidth="1"/>
                <rect x="45" y="58" width="85" height="35" fill="none" stroke="#aaa" strokeWidth="1" rx="3"/>
                <path d="M 52 72 Q 85 68, 120 75" stroke="#ccc" strokeWidth="0.8"/>
                <rect x="45" y="100" width="85" height="35" fill="none" stroke="#aaa" strokeWidth="1" rx="3"/>
                <path d="M 52 115 Q 90 112, 118 118" stroke="#ccc" strokeWidth="0.8"/>
              </g>
              
              <path d="M 165 95 Q 175 92, 190 95" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              <defs><marker id="arrowSketch" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M 0 0 L 8 3 L 0 6 Z" fill="#555"/></marker></defs>
              
              {/* Screen 2: Chat interface */}
              <g transform="translate(200, 20)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Model dropdown sketch */}
                <path d="M 12 20 Q 15 18, 85 22 Q 88 20, 90 35 Q 87 38, 15 36 Q 12 34, 12 20" stroke="#333" strokeWidth="1.5" fill="none"/>
                <path d="M 72 26 L 78 32 L 84 26" stroke="#333" strokeWidth="1.2" fill="none"/>
                {/* Chat bubbles - messy */}
                <path d="M 45 50 Q 48 48, 125 52 Q 128 55, 125 68 Q 122 72, 50 68 Q 45 65, 45 50" stroke="#333" strokeWidth="1.2" fill="none"/>
                <path d="M 55 58 Q 90 55, 115 60" stroke="#888" strokeWidth="0.8"/>
                <path d="M 12 78 Q 15 75, 100 80 Q 105 85, 100 105 Q 95 110, 18 105 Q 12 100, 12 78" stroke="#888" strokeWidth="1.2" fill="none"/>
                <path d="M 22 88 Q 60 85, 90 90" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 22 98 Q 55 95, 80 100" stroke="#aaa" strokeWidth="0.8"/>
                {/* Input bar */}
                <ellipse cx="70" cy="135" rx="58" ry="10" fill="none" stroke="#333" strokeWidth="1.5"/>
                <path d="M 25 135 Q 60 132, 100 136" stroke="#bbb" strokeWidth="0.8"/>
              </g>
              
              <path d="M 350 95 Q 360 92, 375 95" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              {/* Screen 3: Compare view */}
              <g transform="translate(385, 20)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Split view line */}
                <path d="M 70 15 Q 68 75, 72 145" stroke="#888" strokeWidth="1" strokeDasharray="5,4"/>
                {/* Left panel scribbles */}
                <rect x="10" y="25" width="50" height="18" fill="none" stroke="#666" strokeWidth="1.2" rx="3"/>
                <path d="M 15 45 Q 35 42, 55 47" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 15 55 Q 40 52, 50 58" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 15 65 Q 30 62, 52 68" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 15 75 Q 38 72, 48 78" stroke="#aaa" strokeWidth="0.8"/>
                {/* Right panel scribbles */}
                <rect x="80" y="25" width="50" height="18" fill="none" stroke="#666" strokeWidth="1.2" rx="3"/>
                <path d="M 85 45 Q 105 42, 125 47" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 85 55 Q 110 52, 120 58" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 85 65 Q 100 62, 122 68" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 85 75 Q 108 72, 118 78" stroke="#aaa" strokeWidth="0.8"/>
                {/* Bottom buttons */}
                <rect x="20" y="120" width="45" height="18" fill="none" stroke="#333" strokeWidth="1.2" rx="8"/>
                <rect x="75" y="120" width="45" height="18" fill="none" stroke="#333" strokeWidth="1.2" rx="8"/>
              </g>
              
              <path d="M 535 95 Q 545 92, 560 95" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              {/* Screen 4: Agent builder */}
              <g transform="translate(570, 20)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Form fields - sketchy */}
                <path d="M 12 25 Q 15 23, 125 27 Q 128 30, 125 40 Q 122 43, 18 40 Q 12 37, 12 25" stroke="#333" strokeWidth="1.2" fill="none"/>
                <path d="M 20 33 Q 60 30, 100 35" stroke="#888" strokeWidth="0.8"/>
                <path d="M 12 55 Q 15 53, 125 57 Q 128 60, 125 70 Q 122 73, 18 70 Q 12 67, 12 55" stroke="#333" strokeWidth="1.2" fill="none"/>
                <path d="M 20 63 Q 55 60, 90 65" stroke="#888" strokeWidth="0.8"/>
                <path d="M 12 85 Q 15 82, 125 88 Q 128 92, 125 118 Q 122 122, 18 118 Q 12 114, 12 85" stroke="#333" strokeWidth="1.2" fill="none"/>
                <path d="M 20 95 Q 80 92, 110 98" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 20 105 Q 65 102, 95 108" stroke="#aaa" strokeWidth="0.8"/>
                {/* Save button */}
                <ellipse cx="70" cy="135" rx="35" ry="10" fill="none" stroke="#333" strokeWidth="1.5"/>
              </g>
              
              {/* Row 2: More sketches */}
              {/* Screen 5: Dropdown expanded */}
              <g transform="translate(15, 190)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Dropdown box */}
                <rect x="12" y="20" width="80" height="20" fill="none" stroke="#333" strokeWidth="1.5" rx="3"/>
                <rect x="12" y="40" width="80" height="70" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
                <path d="M 12 58 L 92 58" stroke="#ddd" strokeWidth="0.5"/>
                <path d="M 12 76 L 92 76" stroke="#ddd" strokeWidth="0.5"/>
                <path d="M 12 94 L 92 94" stroke="#ddd" strokeWidth="0.5"/>
                <path d="M 20 50 Q 50 48, 75 52" stroke="#666" strokeWidth="0.8"/>
                <path d="M 20 68 Q 45 66, 70 70" stroke="#666" strokeWidth="0.8"/>
                <path d="M 20 86 Q 55 84, 78 88" stroke="#666" strokeWidth="0.8"/>
                <path d="M 20 104 Q 48 102, 72 106" stroke="#666" strokeWidth="0.8"/>
                {/* Faded content */}
                <rect x="12" y="118" width="115" height="25" fill="none" stroke="#ccc" strokeWidth="0.8" rx="3"/>
              </g>
              
              <path d="M 165 265 Q 175 262, 190 265" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              {/* Screen 6: Success state */}
              <g transform="translate(200, 190)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Big checkmark circle */}
                <circle cx="70" cy="55" r="28" fill="none" stroke="#333" strokeWidth="2"/>
                <path d="M 52 55 L 65 70 L 90 42" stroke="#333" strokeWidth="3" fill="none"/>
                {/* Text scribbles */}
                <path d="M 35 100 Q 70 97, 105 102" stroke="#666" strokeWidth="1.2"/>
                <path d="M 45 115 Q 70 112, 95 117" stroke="#aaa" strokeWidth="0.8"/>
                {/* Buttons */}
                <rect x="15" y="128" width="50" height="16" fill="none" stroke="#333" strokeWidth="1.2" rx="6"/>
                <rect x="75" y="128" width="50" height="16" fill="none" stroke="#333" strokeWidth="1.2" rx="6"/>
              </g>
              
              <path d="M 350 265 Q 360 262, 375 265" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              {/* Screen 7: Detailed chat */}
              <g transform="translate(385, 190)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Multiple chat bubbles messy */}
                <path d="M 60 18 Q 125 22, 125 35 Q 122 45, 65 42 Q 58 38, 60 18" stroke="#333" strokeWidth="1.2" fill="none"/>
                <path d="M 68 28 Q 95 25, 115 32" stroke="#888" strokeWidth="0.8"/>
                <path d="M 12 48 Q 15 52, 95 55 Q 100 65, 92 80 Q 88 85, 18 82 Q 12 78, 12 48" stroke="#888" strokeWidth="1.2" fill="none"/>
                <path d="M 22 58 Q 55 55, 82 62" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 22 70 Q 50 67, 75 73" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 55 92 Q 120 96, 125 108 Q 122 118, 62 115 Q 55 112, 55 92" stroke="#333" strokeWidth="1.2" fill="none"/>
                <path d="M 65 102 Q 90 99, 115 105" stroke="#888" strokeWidth="0.8"/>
                {/* Input */}
                <ellipse cx="70" cy="138" rx="55" ry="9" fill="none" stroke="#333" strokeWidth="1.5"/>
              </g>
              
              <path d="M 535 265 Q 545 262, 560 265" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              {/* Screen 8: Settings/API */}
              <g transform="translate(570, 190)">
                <rect width="140" height="150" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Settings rows */}
                <rect x="12" y="20" width="115" height="22" fill="none" stroke="#888" strokeWidth="1" rx="3"/>
                <path d="M 20 31 Q 55 28, 85 33" stroke="#aaa" strokeWidth="0.8"/>
                <circle cx="112" cy="31" r="6" fill="none" stroke="#666" strokeWidth="1"/>
                <rect x="12" y="50" width="115" height="22" fill="none" stroke="#888" strokeWidth="1" rx="3"/>
                <path d="M 20 61 Q 50 58, 78 63" stroke="#aaa" strokeWidth="0.8"/>
                <rect x="100" y="56" width="18" height="10" fill="none" stroke="#666" strokeWidth="1" rx="5"/>
                <rect x="12" y="80" width="115" height="22" fill="none" stroke="#888" strokeWidth="1" rx="3"/>
                <path d="M 20 91 Q 60 88, 90 93" stroke="#aaa" strokeWidth="0.8"/>
                {/* Code block sketch */}
                <rect x="12" y="110" width="115" height="32" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
                <path d="M 18 120 Q 40 118, 55 122" stroke="#666" strokeWidth="0.6"/>
                <path d="M 25 128 Q 50 126, 80 130" stroke="#666" strokeWidth="0.6"/>
                <path d="M 18 136 Q 35 134, 50 138" stroke="#666" strokeWidth="0.6"/>
              </g>
              
              {/* Row 3: Final flow screens */}
              <g transform="translate(110, 360)">
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Mini dashboard */}
                <rect x="10" y="15" width="25" height="95" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
                <circle cx="23" cy="30" r="7" fill="none" stroke="#333" strokeWidth="1"/>
                <path d="M 15 45 Q 23 43, 30 47" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 15 55 Q 23 53, 30 57" stroke="#aaa" strokeWidth="0.8"/>
                <rect x="42" y="15" width="88" height="95" fill="none" stroke="#ccc" strokeWidth="0.8" rx="2"/>
                <path d="M 50 35 Q 90 32, 120 38" stroke="#ddd" strokeWidth="0.8"/>
                <path d="M 50 55 Q 85 52, 115 58" stroke="#ddd" strokeWidth="0.8"/>
                <path d="M 50 75 Q 80 72, 110 78" stroke="#ddd" strokeWidth="0.8"/>
              </g>
              
              <path d="M 260 420 Q 275 417, 295 420" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              <g transform="translate(305, 360)">
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Full screen content */}
                <path d="M 12 25 Q 70 20, 125 28" stroke="#666" strokeWidth="1.2"/>
                <rect x="12" y="40" width="115" height="60" fill="none" stroke="#888" strokeWidth="1" rx="4"/>
                <path d="M 20 55 Q 70 52, 115 58" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 20 70 Q 60 67, 100 73" stroke="#aaa" strokeWidth="0.8"/>
                <path d="M 20 85 Q 55 82, 90 88" stroke="#aaa" strokeWidth="0.8"/>
                <rect x="35" y="105" width="70" height="10" fill="none" stroke="#333" strokeWidth="1.2" rx="5"/>
              </g>
              
              <path d="M 455 420 Q 470 417, 490 420" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowSketch)"/>
              
              <g transform="translate(500, 360)">
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughNarbl)"/>
                {/* Final state */}
                <circle cx="70" cy="45" r="22" fill="none" stroke="#333" strokeWidth="1.5"/>
                <path d="M 55 45 L 65 56 L 88 35" stroke="#333" strokeWidth="2.5" fill="none"/>
                <path d="M 40 80 Q 70 77, 100 82" stroke="#666" strokeWidth="1"/>
                <rect x="25" y="95" width="40" height="15" fill="none" stroke="#333" strokeWidth="1" rx="6"/>
                <rect x="75" y="95" width="40" height="15" fill="none" stroke="#333" strokeWidth="1" rx="6"/>
              </g>
            </svg>
          </div>

          {/* Lo-Fi Description */}
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl mt-6">
            These rough sketches helped us explore layout options and user flows before committing to any specific design direction. We focused on mapping out the core interactions: chatting with AI models, comparing outputs side by side, and building custom agents. Quick pen-and-paper iterations let us test ideas fast and get early feedback from the team.
          </p>
        </div>

        {/* Mid-Fidelity Prototypes */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Mid-Fidelity Prototypes</h3>
          <p className="text-white/40 text-sm mb-6">Refining the Experience</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            We built mid-fi wireframes to nail down layout, hierarchy, and interactions before jumping into high-fidelity designs. This stage let us test core functionality and get early feedback from the development team.
          </p>

          {/* Mid-Fi Wireframes - Figma Style */}
          <div className="space-y-8">
            {/* Main Screens Overview */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Core Screens</p>
              <div className="relative rounded-xl overflow-hidden border border-[#e0e0e0] bg-[#f5f5f5] p-6">
                <svg viewBox="0 0 920 380" className="w-full h-auto">
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  
                  {/* Dashboard Screen */}
                  <g transform="translate(20, 20)" filter="url(#shadow)">
                    <rect x="0" y="0" width="280" height="340" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Header */}
                    <rect x="0" y="0" width="280" height="48" rx="8" fill="#fafafa"/>
                    <rect x="0" y="40" width="280" height="8" fill="#fafafa"/>
                    <text x="16" y="30" fill="#333" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Dashboard</text>
                    <circle cx="256" cy="24" r="12" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Sidebar */}
                    <rect x="0" y="48" width="56" height="292" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="16" y="64" width="24" height="24" rx="6" fill="#6366f1"/>
                    <rect x="16" y="100" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    <rect x="16" y="136" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    <rect x="16" y="172" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    
                    {/* Stats cards row */}
                    <rect x="72" y="64" width="92" height="72" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <text x="84" y="84" fill="#888" fontSize="9" fontFamily="Inter, sans-serif">Total Chats</text>
                    <text x="84" y="108" fill="#333" fontSize="18" fontWeight="600" fontFamily="Inter, sans-serif">1,284</text>
                    <rect x="84" y="120" width="60" height="6" rx="3" fill="#6366f1" opacity="0.2"/>
                    <rect x="84" y="120" width="40" height="6" rx="3" fill="#6366f1"/>
                    
                    <rect x="172" y="64" width="92" height="72" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <text x="184" y="84" fill="#888" fontSize="9" fontFamily="Inter, sans-serif">Tokens Used</text>
                    <text x="184" y="108" fill="#333" fontSize="18" fontWeight="600" fontFamily="Inter, sans-serif">45.2K</text>
                    <rect x="184" y="120" width="60" height="6" rx="3" fill="#22c55e" opacity="0.2"/>
                    <rect x="184" y="120" width="48" height="6" rx="3" fill="#22c55e"/>
                    
                    {/* Recent chats list */}
                    <text x="72" y="160" fill="#333" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">Recent Chats</text>
                    
                    <rect x="72" y="172" width="192" height="48" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <circle cx="92" cy="196" r="12" fill="#6366f1" opacity="0.1"/>
                    <rect x="112" y="188" width="80" height="6" rx="2" fill="#333"/>
                    <rect x="112" y="200" width="120" height="4" rx="2" fill="#ccc"/>
                    <text x="232" y="196" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">2m ago</text>
                    
                    <rect x="72" y="228" width="192" height="48" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <circle cx="92" cy="252" r="12" fill="#3b82f6" opacity="0.1"/>
                    <rect x="112" y="244" width="70" height="6" rx="2" fill="#333"/>
                    <rect x="112" y="256" width="100" height="4" rx="2" fill="#ccc"/>
                    <text x="232" y="252" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">1h ago</text>
                    
                    <rect x="72" y="284" width="192" height="48" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <circle cx="92" cy="308" r="12" fill="#22c55e" opacity="0.1"/>
                    <rect x="112" y="300" width="90" height="6" rx="2" fill="#333"/>
                    <rect x="112" y="312" width="80" height="4" rx="2" fill="#ccc"/>
                    <text x="232" y="308" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">3h ago</text>
                  </g>
                  
                  {/* Chat Screen */}
                  <g transform="translate(320, 20)" filter="url(#shadow)">
                    <rect x="0" y="0" width="280" height="340" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Header */}
                    <rect x="0" y="0" width="280" height="48" rx="8" fill="#fafafa"/>
                    <rect x="0" y="40" width="280" height="8" fill="#fafafa"/>
                    <text x="16" y="30" fill="#333" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Chat</text>
                    
                    {/* Model selector */}
                    <rect x="72" y="12" width="120" height="28" rx="6" fill="#fff" stroke="#6366f1" strokeWidth="1.5"/>
                    <text x="84" y="30" fill="#6366f1" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif">GPT-4 Turbo</text>
                    <path d="M 172 22 L 178 28 L 184 22" fill="none" stroke="#6366f1" strokeWidth="1.5"/>
                    
                    {/* Sidebar */}
                    <rect x="0" y="48" width="56" height="292" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="16" y="64" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    <rect x="16" y="100" width="24" height="24" rx="6" fill="#6366f1"/>
                    <rect x="16" y="136" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    
                    {/* Chat messages */}
                    <rect x="150" y="68" width="114" height="32" rx="16" fill="#6366f1"/>
                    <rect x="164" y="80" width="70" height="6" rx="2" fill="#fff"/>
                    
                    <rect x="72" y="110" width="160" height="56" rx="12" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="88" y="124" width="120" height="5" rx="2" fill="#666"/>
                    <rect x="88" y="136" width="100" height="4" rx="2" fill="#999"/>
                    <rect x="88" y="148" width="80" height="4" rx="2" fill="#999"/>
                    
                    <rect x="150" y="176" width="114" height="32" rx="16" fill="#6366f1"/>
                    <rect x="164" y="188" width="60" height="6" rx="2" fill="#fff"/>
                    
                    <rect x="72" y="218" width="140" height="48" rx="12" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="88" y="232" width="100" height="5" rx="2" fill="#666"/>
                    <rect x="88" y="244" width="80" height="4" rx="2" fill="#999"/>
                    
                    {/* Input */}
                    <rect x="72" y="280" width="192" height="38" rx="19" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="88" y="295" width="100" height="5" rx="2" fill="#ccc"/>
                    <circle cx="240" cy="299" r="13" fill="#6366f1"/>
                    <path d="M 235 299 L 245 299 M 240 294 L 245 299 L 240 304" fill="none" stroke="#fff" strokeWidth="2"/>
                  </g>
                  
                  {/* Agent Builder Screen */}
                  <g transform="translate(620, 20)" filter="url(#shadow)">
                    <rect x="0" y="0" width="280" height="340" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Header */}
                    <rect x="0" y="0" width="280" height="48" rx="8" fill="#fafafa"/>
                    <rect x="0" y="40" width="280" height="8" fill="#fafafa"/>
                    <text x="16" y="30" fill="#333" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Agent Builder</text>
                    
                    {/* Sidebar */}
                    <rect x="0" y="48" width="56" height="292" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="16" y="64" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    <rect x="16" y="100" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    <rect x="16" y="136" width="24" height="24" rx="6" fill="#e0e0e0"/>
                    <rect x="16" y="172" width="24" height="24" rx="6" fill="#ec4899"/>
                    
                    {/* Form fields */}
                    <text x="72" y="72" fill="#666" fontSize="9" fontFamily="Inter, sans-serif">Agent Name</text>
                    <rect x="72" y="78" width="192" height="32" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="84" y="90" width="100" height="5" rx="2" fill="#333"/>
                    
                    <text x="72" y="128" fill="#666" fontSize="9" fontFamily="Inter, sans-serif">Base Model</text>
                    <rect x="72" y="134" width="192" height="32" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="84" y="146" width="80" height="5" rx="2" fill="#333"/>
                    <path d="M 244 144 L 250 150 L 256 144" fill="none" stroke="#888" strokeWidth="1.5"/>
                    
                    <text x="72" y="184" fill="#666" fontSize="9" fontFamily="Inter, sans-serif">System Prompt</text>
                    <rect x="72" y="190" width="192" height="75" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="84" y="204" width="160" height="4" rx="2" fill="#666"/>
                    <rect x="84" y="216" width="140" height="4" rx="2" fill="#999"/>
                    <rect x="84" y="228" width="120" height="4" rx="2" fill="#999"/>
                    <rect x="84" y="240" width="150" height="4" rx="2" fill="#999"/>
                    
                    {/* Buttons */}
                    <rect x="72" y="280" width="88" height="34" rx="6" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <text x="92" y="302" fill="#666" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif">Cancel</text>
                    
                    <rect x="168" y="280" width="96" height="34" rx="6" fill="#ec4899"/>
                    <text x="188" y="302" fill="#fff" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif">Create</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Compare Flow */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Compare Flow</p>
              <div className="relative rounded-xl overflow-hidden border border-[#e0e0e0] bg-[#f5f5f5] p-6">
                <svg viewBox="0 0 880 380" className="w-full h-auto">
                  <defs>
                    <filter id="shadowFlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
                    </filter>
                    <marker id="arrowMidFi" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#6366f1"/>
                    </marker>
                  </defs>
                  
                  {/* Step 1: Select Models */}
                  <g transform="translate(15, 20)" filter="url(#shadowFlow)">
                    <rect x="0" y="0" width="210" height="340" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Step indicator */}
                    <rect x="12" y="12" width="24" height="24" rx="12" fill="#6366f1"/>
                    <text x="20" y="29" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">1</text>
                    <text x="44" y="28" fill="#333" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">Select Models</text>
                    
                    {/* Model cards */}
                    <rect x="12" y="52" width="186" height="60" rx="8" fill="#fff" stroke="#6366f1" strokeWidth="2"/>
                    <circle cx="34" cy="82" r="14" fill="#6366f1" opacity="0.1"/>
                    <text x="30" y="86" fill="#6366f1" fontSize="10" fontWeight="600">G</text>
                    <text x="56" y="74" fill="#333" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">GPT-4 Turbo</text>
                    <text x="56" y="88" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">OpenAI • Fast</text>
                    <rect x="170" y="70" width="18" height="18" rx="4" fill="#6366f1"/>
                    <path d="M 175 79 L 179 83 L 185 75" fill="none" stroke="#fff" strokeWidth="1.5"/>
                    
                    <rect x="12" y="120" width="186" height="60" rx="8" fill="#fff" stroke="#3b82f6" strokeWidth="2"/>
                    <circle cx="34" cy="150" r="14" fill="#3b82f6" opacity="0.1"/>
                    <text x="30" y="154" fill="#3b82f6" fontSize="10" fontWeight="600">C</text>
                    <text x="56" y="142" fill="#333" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Claude 3 Opus</text>
                    <text x="56" y="156" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">Anthropic • Smart</text>
                    <rect x="170" y="138" width="18" height="18" rx="4" fill="#3b82f6"/>
                    <path d="M 175 147 L 179 151 L 185 143" fill="none" stroke="#fff" strokeWidth="1.5"/>
                    
                    <rect x="12" y="188" width="186" height="60" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <circle cx="34" cy="218" r="14" fill="#f0f0f0"/>
                    <text x="30" y="222" fill="#888" fontSize="10" fontWeight="600">G</text>
                    <text x="56" y="210" fill="#333" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Gemini Pro</text>
                    <text x="56" y="224" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">Google</text>
                    <rect x="170" y="206" width="18" height="18" rx="4" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    <rect x="12" y="256" width="186" height="60" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <circle cx="34" cy="286" r="14" fill="#f0f0f0"/>
                    <text x="30" y="290" fill="#888" fontSize="10" fontWeight="600">L</text>
                    <text x="56" y="278" fill="#333" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Llama 3 70B</text>
                    <text x="56" y="292" fill="#888" fontSize="8" fontFamily="Inter, sans-serif">Meta</text>
                    <rect x="170" y="274" width="18" height="18" rx="4" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1"/>
                  </g>
                  
                  {/* Arrow 1 */}
                  <path d="M 240 190 L 270 190" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowMidFi)"/>
                  
                  {/* Step 2: Enter Prompt */}
                  <g transform="translate(285, 20)" filter="url(#shadowFlow)">
                    <rect x="0" y="0" width="210" height="340" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Step indicator */}
                    <rect x="12" y="12" width="24" height="24" rx="12" fill="#6366f1"/>
                    <text x="20" y="29" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">2</text>
                    <text x="44" y="28" fill="#333" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">Enter Prompt</text>
                    
                    {/* Selected model tags */}
                    <rect x="12" y="52" width="72" height="26" rx="13" fill="#6366f1" opacity="0.1"/>
                    <text x="22" y="69" fill="#6366f1" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">GPT-4</text>
                    <rect x="92" y="52" width="68" height="26" rx="13" fill="#3b82f6" opacity="0.1"/>
                    <text x="102" y="69" fill="#3b82f6" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">Claude 3</text>
                    
                    {/* Prompt area */}
                    <text x="12" y="100" fill="#666" fontSize="9" fontFamily="Inter, sans-serif">Your Prompt</text>
                    <rect x="12" y="108" width="186" height="160" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="24" y="124" width="150" height="5" rx="2" fill="#333"/>
                    <rect x="24" y="140" width="130" height="4" rx="2" fill="#666"/>
                    <rect x="24" y="156" width="160" height="4" rx="2" fill="#999"/>
                    <rect x="24" y="172" width="120" height="4" rx="2" fill="#999"/>
                    
                    {/* Compare button */}
                    <rect x="12" y="290" width="186" height="44" rx="8" fill="#6366f1"/>
                    <text x="68" y="316" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">Compare</text>
                  </g>
                  
                  {/* Arrow 2 */}
                  <path d="M 510 190 L 540 190" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowMidFi)"/>
                  
                  {/* Step 3: Compare Results */}
                  <g transform="translate(555, 20)" filter="url(#shadowFlow)">
                    <rect x="0" y="0" width="305" height="340" rx="8" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1"/>
                    
                    {/* Step indicator */}
                    <rect x="12" y="12" width="24" height="24" rx="12" fill="#22c55e"/>
                    <text x="19" y="29" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">3</text>
                    <text x="44" y="28" fill="#333" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">Compare Results</text>
                    
                    {/* Divider */}
                    <line x1="152" y1="52" x2="152" y2="324" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4,4"/>
                    
                    {/* Left result - GPT-4 */}
                    <rect x="12" y="52" width="130" height="26" rx="6" fill="#6366f1"/>
                    <text x="22" y="69" fill="#fff" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif">GPT-4 Turbo</text>
                    
                    <rect x="12" y="86" width="130" height="175" rx="8" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="22" y="100" width="100" height="5" rx="2" fill="#444"/>
                    <rect x="22" y="114" width="90" height="4" rx="2" fill="#888"/>
                    <rect x="22" y="128" width="105" height="4" rx="2" fill="#888"/>
                    <rect x="22" y="142" width="80" height="4" rx="2" fill="#888"/>
                    <rect x="22" y="156" width="95" height="4" rx="2" fill="#888"/>
                    <rect x="22" y="170" width="70" height="4" rx="2" fill="#888"/>
                    <rect x="22" y="184" width="85" height="4" rx="2" fill="#888"/>
                    <rect x="22" y="198" width="90" height="4" rx="2" fill="#888"/>
                    
                    {/* Metrics */}
                    <rect x="12" y="275" width="60" height="26" rx="6" fill="#22c55e" opacity="0.1"/>
                    <text x="22" y="292" fill="#22c55e" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">1.2s</text>
                    <rect x="80" y="275" width="62" height="26" rx="6" fill="#f0f0f0"/>
                    <text x="90" y="292" fill="#666" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">847 tok</text>
                    
                    {/* Right result - Claude */}
                    <rect x="162" y="52" width="130" height="26" rx="6" fill="#3b82f6"/>
                    <text x="172" y="69" fill="#fff" fontSize="10" fontWeight="500" fontFamily="Inter, sans-serif">Claude 3 Opus</text>
                    
                    <rect x="162" y="86" width="130" height="175" rx="8" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1"/>
                    <rect x="172" y="100" width="100" height="5" rx="2" fill="#444"/>
                    <rect x="172" y="114" width="95" height="4" rx="2" fill="#888"/>
                    <rect x="172" y="128" width="105" height="4" rx="2" fill="#888"/>
                    <rect x="172" y="142" width="85" height="4" rx="2" fill="#888"/>
                    <rect x="172" y="156" width="90" height="4" rx="2" fill="#888"/>
                    <rect x="172" y="170" width="75" height="4" rx="2" fill="#888"/>
                    <rect x="172" y="184" width="100" height="4" rx="2" fill="#888"/>
                    
                    {/* Metrics */}
                    <rect x="162" y="275" width="60" height="26" rx="6" fill="#f0f0f0"/>
                    <text x="172" y="292" fill="#666" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">2.4s</text>
                    <rect x="230" y="275" width="62" height="26" rx="6" fill="#f0f0f0"/>
                    <text x="240" y="292" fill="#666" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">1.1k tok</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Mid-Fi Summary */}
          <div className="max-w-3xl mt-12">
            <h4 className="text-white/80 text-lg font-medium mb-4">Key Refinements</h4>
            <div className="space-y-3 text-white/50 leading-relaxed">
              <p><span className="text-white/70 font-medium">Persistent sidebar:</span> Same navigation pattern across all screens for consistency.</p>
              <p><span className="text-white/70 font-medium">Model cards:</span> Visual representation of each AI model with quick-select actions.</p>
              <p><span className="text-white/70 font-medium">Comparison metrics:</span> Response time, token count, and cost displayed inline.</p>
            </div>
          </div>

          {/* Figma Design */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Figma Design</h3>
            <p className="text-white/50 leading-relaxed max-w-3xl mb-10">
              Overview of the complete design system including mood boards, landing page explorations, lo-fi wireframes, and design notes from the iteration process.
            </p>

            <div className="max-w-4xl">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
                <Image 
                  src="/narbl/narbl-figma.png" 
                  alt="Narbl Figma Design Overview"
                  width={1200}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Features */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Core Features</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Four integrated features that make working with multiple AI models intuitive, from exploration to production.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {/* Feature 1: Multi-Model Chat */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Multi-Model Chat</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Chat with GPT-4, Claude, Llama, Gemini, and more from one interface. Switch models mid-conversation without losing context.
            </p>
          </div>

          {/* Feature 2: Side-by-Side Compare */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Side-by-Side Compare</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Run the same prompt across multiple models simultaneously. See responses side-by-side to make informed decisions.
            </p>
          </div>

          {/* Feature 3: Agent Builder */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-pink-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Agent Builder</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Create custom AI agents with system prompts, knowledge bases, and specific model configurations. Deploy in minutes.
            </p>
          </div>

          {/* Feature 4: Smart Dashboard */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Smart Dashboard</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Track usage, costs, and performance across all models. Optimize your AI workflows with actionable insights.
            </p>
          </div>
        </div>

        {/* Features Summary */}
        <div className="max-w-3xl mt-12">
          <p className="text-white/50 leading-relaxed">
            Each feature works on its own while building toward a complete AI workflow platform. Start with chat, graduate to comparison, then evolve to building. All in one place.
          </p>
        </div>
      </Section>

      {/* Design System */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Design System</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Our team designed a glassmorphism-inspired system that feels both futuristic and approachable. The dark navy theme reduces eye strain during long coding sessions while blue accents create a distinct, tech-forward identity that feels professional and trustworthy.
        </p>

        {/* Design System */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {/* Colors */}
          <div 
            className="rounded-2xl p-8 border border-cyan-500/20"
            style={{
              background: 'linear-gradient(145deg, #0d1117 0%, #161b22 100%)',
            }}
          >
            <h5 className="text-white text-lg font-semibold mb-8">Colors</h5>
            
            {/* Background */}
            <div className="mb-8">
              <p className="text-cyan-400/70 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Background</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0a0f14] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#0A0F14</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0d1117] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#0D1117</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#161b22] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#161B22</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#21262d] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#21262D</span>
                </div>
              </div>
            </div>

            {/* Primary - Cyan/Teal */}
            <div className="mb-8">
              <p className="text-cyan-400/70 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Primary · Cyan</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0891b2] shadow-lg shadow-cyan-500/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#0891B2</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#06b6d4] shadow-lg shadow-cyan-400/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#06B6D4</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#22d3ee] shadow-lg shadow-cyan-300/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#22D3EE</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#67e8f9] shadow-lg shadow-cyan-200/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#67E8F9</span>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-8">
              <p className="text-cyan-400/70 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Accent</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#10b981] shadow-lg shadow-emerald-500/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#10B981</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#ec4899] shadow-lg shadow-pink-500/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#EC4899</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#3b82f6] shadow-lg shadow-blue-500/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#3B82F6</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#f59e0b] shadow-lg shadow-amber-500/40"></div>
                  <span className="text-white/50 text-[10px] font-mono">#F59E0B</span>
                </div>
              </div>
            </div>

            {/* UI Elements */}
            <div>
              <p className="text-cyan-400/70 text-xs uppercase tracking-[0.2em] mb-4 font-medium">UI Elements</p>
              <div className="space-y-3">
                <div 
                  className="h-12 rounded-lg flex items-center justify-between px-4 text-xs"
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    border: '1px solid rgba(6,182,212,0.3)',
                  }}
                >
                  <span className="text-white/70">Primary Button</span>
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded text-[10px] font-medium">Action</span>
                </div>
                <div 
                  className="h-12 rounded-lg flex items-center justify-between px-4 text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="text-white/50">Card Surface</span>
                  <span className="text-cyan-400 text-[10px]">Glass Effect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div 
            className="rounded-2xl p-8 border border-cyan-500/20"
            style={{
              background: 'linear-gradient(145deg, #0d1117 0%, #161b22 100%)',
            }}
          >
            <h5 className="text-white text-lg font-semibold mb-8">Typography</h5>
            
            <div className="space-y-0">
              {/* Display */}
              <div className="flex items-center justify-between py-4 border-b border-cyan-500/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Display</p>
                  <p className="text-cyan-400/50 text-xs mt-0.5">Inter Bold · 48px</p>
                </div>
                <p className="text-white text-3xl font-bold">Narbl</p>
              </div>

              {/* Heading */}
              <div className="flex items-center justify-between py-4 border-b border-cyan-500/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Heading</p>
                  <p className="text-cyan-400/50 text-xs mt-0.5">Inter SemiBold · 24px</p>
                </div>
                <p className="text-white text-2xl font-semibold">Heading</p>
              </div>

              {/* Subheading */}
              <div className="flex items-center justify-between py-4 border-b border-cyan-500/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Subheading</p>
                  <p className="text-cyan-400/50 text-xs mt-0.5">Inter Medium · 18px</p>
                </div>
                <p className="text-white/90 text-lg font-medium">Subheading</p>
              </div>

              {/* Body */}
              <div className="flex items-center justify-between py-4 border-b border-cyan-500/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Body</p>
                  <p className="text-cyan-400/50 text-xs mt-0.5">Inter Regular · 14px</p>
                </div>
                <p className="text-white/70 text-sm">Body text</p>
              </div>

              {/* Code */}
              <div className="flex items-center justify-between py-4 border-b border-cyan-500/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Code</p>
                  <p className="text-cyan-400/50 text-xs mt-0.5">JetBrains Mono · 13px</p>
                </div>
                <code className="text-cyan-400 text-sm font-mono bg-cyan-500/10 px-2 py-1 rounded">const ai = new Narbl()</code>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white/90 text-sm font-medium">Caption</p>
                  <p className="text-cyan-400/50 text-xs mt-0.5">Inter Regular · 12px</p>
                </div>
                <p className="text-white/50 text-xs">Caption text</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Impact & Results */}
      <Section>
        <SectionLabel>04</SectionLabel>
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

          {/* Testimonial */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#60a5fa]/10 to-transparent border border-[#60a5fa]/20">
            <svg className="absolute top-6 left-6 w-8 h-8 text-[#60a5fa]/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <div className="pl-12">
              <p className="text-white/80 text-lg leading-relaxed mb-4 italic">
                "Anusha consistently delivered designs that balanced user needs with our technical constraints. Her ability to take feedback, iterate quickly, and communicate design decisions made her an invaluable part of the team. The onboarding redesign she led directly contributed to our growth metrics."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#60a5fa]/20 flex items-center justify-center text-[#60a5fa] font-semibold">
                  JK
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Engineering Lead</p>
                  <p className="text-white/50 text-xs">Narbl</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Reflection</SectionTitle>
        
        <div className="max-w-3xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">What We Learned</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Collaborating daily with engineers on constraints</li>
                <li>Building design systems from scratch</li>
                <li>Designing for power users who skip tutorials</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">Challenges</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Managing information density in comparisons</li>
                <li>Handling unpredictable AI response times</li>
                <li>Balancing input from multiple stakeholders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">Next Time</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Test with non-technical users earlier</li>
                <li>Design mobile comparison patterns sooner</li>
                <li>Explore team collaboration features</li>
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
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Final Product</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Browse through the final high-fidelity designs showcasing Narbl's core features and glassmorphism aesthetic.
        </p>

        {/* Big Looping Slideshow */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            {/* Slideshow Container */}
            <div className="relative aspect-[16/10]">
              {demoImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-cover"
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
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold rounded-full transition-all"
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
    <p className="text-blue-400/40 text-sm font-mono mb-4">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
  )
}
