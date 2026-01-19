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
  { src: '/spotify/spotify-1.png', label: 'Your Threads' },
  { src: '/spotify/spotify-2.png', label: 'Listening Memory' },
  { src: '/spotify/spotify-3.png', label: 'Emotional Clusters' },
  { src: '/spotify/spotify-4.png', label: 'Thread Card' },
  { src: '/spotify/spotify-5.png', label: 'Thread Detail' },
  { src: '/spotify/spotify-6.png', label: 'Now Playing Memory' },
]

export default function SpotifyCaseStudy() {
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

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % demoImages.length)
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Floating particles - Spotify green */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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
              backgroundColor: particle.id % 3 === 0 ? '#1db954' : '#ffffff',
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
              <p className={`text-[#1db954] text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Case Study
              </p>
              
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Spotify Redesign
              </h1>
              
              <p className={`text-lg md:text-xl text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Reimagining music discovery through intention, memory, and personal meaning.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-white/80">UX Designer</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-white/80">2 weeks</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Tools</p>
                  <p className="text-white/80">Figma, Cursor, Lovable</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-white/80">Mobile (iOS)</p>
                </div>
              </div>
            </div>

            {/* Right side - Phone Mockup (Static) */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative max-w-[280px] mx-auto">
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
                  
                  {/* Screen - Static first image */}
                  <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-[#121212]">
                        <Image
                      src={demoImages[0].src}
                      alt={demoImages[0].label}
                          fill
                          className="object-cover object-top"
                          sizes="280px"
                      priority
                    />
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-t from-[#1db954]/20 via-transparent to-transparent rounded-3xl blur-2xl -z-10" />
              </div>

              {/* Static label */}
              <p className="text-center text-white/40 text-sm mt-6">{demoImages[0].label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <SectionLabel>Overview</SectionLabel>
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8">
            Spotify helps you find more music. But what if it helped you understand why you listen?
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            I noticed a pattern in my own listening: saved songs became forgotten archives, recommendations felt random, and music turned into background noise. This redesign explores what Spotify could look like if it prioritized meaningful listening over infinite discovery. I introduced a concept called <span className="text-[#1db954]">Listening Threads</span>: finite, behavior-driven collections that explain why they exist and help you rediscover music that matters.
          </p>
          
          {/* Problem Statement Box */}
          <div 
            className="relative rounded-3xl p-10 md:p-14"
            style={{
              background: 'linear-gradient(145deg, rgba(29,185,84,0.12) 0%, rgba(29,185,84,0.04) 100%)',
              boxShadow: `
                0 4px 24px -4px rgba(0,0,0,0.4),
                0 12px 48px -8px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.2)
              `,
              border: '1px solid rgba(29,185,84,0.2)',
            }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Problem Statement</p>
            
            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might we transform music streaming from{' '}
              <span className="text-[#1db954]">passive consumption</span> into{' '}
              <span className="text-[#1db954]">active reflection</span>,{' '}
              helping listeners understand their emotional relationship with music while still enabling{' '}
              <span className="text-[#1db954]">effortless discovery</span>?
            </p>
          </div>
        </div>
      </Section>

      {/* Design Process Timeline */}
      <Section>
        <SectionLabel>Design Process</SectionLabel>
        <p className="text-white/40 text-sm mb-12">2-Week Sprint</p>
        
        <div className="relative max-w-5xl">
          {/* Week labels */}
          <div className="grid grid-cols-4 mb-8">
            {['Week 1', '', 'Week 2', ''].map((week, i) => (
              <div key={i} className="text-center">
                <span className="text-white/50 text-sm">{week}</span>
              </div>
            ))}
          </div>
        
          {/* Timeline with dotted lines */}
          <div className="relative">
            {/* Vertical dotted lines */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex justify-center">
                  <div 
                    className="w-px h-full"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, rgba(29,185,84,0.3) 50%, transparent 50%)',
                      backgroundSize: '1px 8px',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Timeline bars */}
            <div className="relative space-y-4 py-4">
              {/* User Research */}
              <div className="grid grid-cols-8">
                <div className="col-span-1 pr-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Research
                  </div>
                </div>
              </div>

              {/* Ideation */}
              <div className="grid grid-cols-8">
                <div className="col-start-1 col-span-2 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Ideation & Sketches
                  </div>
                </div>
              </div>

              {/* Lo-Fi Wireframes */}
              <div className="grid grid-cols-8">
                <div className="col-start-2 col-span-2 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Lo-Fi Wireframes
                  </div>
                </div>
              </div>

              {/* Mid-Fi Prototypes */}
              <div className="grid grid-cols-8">
                <div className="col-start-3 col-span-2 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Mid-Fi Prototypes
                  </div>
                </div>
              </div>

              {/* Hi-Fi Design */}
              <div className="grid grid-cols-8">
                <div className="col-start-4 col-span-3 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Hi-Fi Design & Iteration
                  </div>
                </div>
              </div>

              {/* Usability Testing */}
              <div className="grid grid-cols-8">
                <div className="col-start-6 col-span-2 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Usability Testing
                  </div>
                </div>
              </div>

              {/* Final Polish */}
              <div className="grid grid-cols-8">
                <div className="col-start-7 col-span-2 px-1">
                  <div 
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Polish
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Research Section */}
      <Section>
        <SectionTitle>Research</SectionTitle>
        
        <div className="max-w-3xl mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Research Goals</h3>
          <p className="text-lg text-white/60 leading-relaxed">
            I wanted to understand how people actually feel about their relationship with music streaming. Not just what features they want, but how streaming has changed the way they listen, remember, and connect with music.
          </p>
        </div>

        {/* User Surveys */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">User Surveys</h3>
          <p className="text-white/40 text-sm mb-12">Survey sample: n = 24 Spotify users</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Listening Habits */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Listening Habits</h4>
            <div className="space-y-4">
              {[
                { label: 'Background listening', value: 72, color: '#1db954' },
                { label: 'Active discovery', value: 45, color: '#1ed760' },
                { label: 'Nostalgic replay', value: 38, color: '#2de26d' },
                { label: 'Mood-based', value: 62, color: '#4ade80' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-32 shrink-0">{item.label}</span>
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
              Most listening is passive, but users crave more intentional moments.
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Pain Points</h4>
            <div className="space-y-3">
              {[
                { label: 'Forgotten saves', value: 78, color: '#1db954' },
                { label: 'Opaque recs', value: 65, color: '#1ed760' },
                { label: 'Choice overload', value: 54, color: '#2de26d' },
                { label: 'Lost context', value: 48, color: '#4ade80' },
                { label: 'No memory', value: 42, color: '#86efac' },
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
              Saved songs become forgotten. Users don't know why songs are recommended.
            </p>
          </div>

          {/* What Users Want */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Desired Features</h4>
            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Memory/Context 35% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#1db954"
                    strokeWidth="20"
                    strokeDasharray="87.9 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Better Recs 28% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#1ed760"
                    strokeWidth="20"
                    strokeDasharray="70.3 251.2"
                    strokeDashoffset="-87.9"
                  />
                  {/* Rediscovery 22% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#4ade80"
                    strokeWidth="20"
                    strokeDasharray="55.3 251.2"
                    strokeDashoffset="-158.2"
                  />
                  {/* Other 15% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#86efac"
                    strokeWidth="20"
                    strokeDasharray="37.7 251.2"
                    strokeDashoffset="-213.5"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {[
                  { label: 'Context', value: '35%', color: '#1db954' },
                  { label: 'Better Recs', value: '28%', color: '#1ed760' },
                  { label: 'Rediscovery', value: '22%', color: '#4ade80' },
                  { label: 'Other', value: '15%', color: '#86efac' },
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
              Users want to know why they listen, not just what to play.
            </p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="max-w-3xl mt-16 pt-12 border-t border-white/10">
          <h4 className="text-white/80 text-lg font-medium mb-4">Key Takeaways</h4>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              <span className="text-white/70 font-medium">Music has become wallpaper.</span>{' '}
              72% of listening is background noise. Users rarely engage actively with what's playing, missing the emotional connection music once provided.
            </p>
            <p>
              <span className="text-white/70 font-medium">Saved songs disappear.</span>{' '}
              78% said they forget songs they've saved. Spotify's library becomes a graveyard of good intentions rather than a living collection.
            </p>
            <p>
              <span className="text-white/70 font-medium">Recommendations feel random.</span>{' '}
              Users trust the algorithm but don't understand it. They want to know why a song was suggested, not just that it was.
            </p>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#1db954] mb-2">Affinity Mapping</h3>
          <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>
          
          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            I organized survey responses and interview notes into an affinity map. Three core themes emerged around how users want to reconnect with their music:
          </p>
          
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Memory & Context:</span> Users want to remember why they saved songs and what moments they associate with them.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Intentional Listening:</span> Moving beyond passive background noise to meaningful musical experiences.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Personal Connection:</span> Understanding and organizing music by emotion, not just genre or artist.
            </p>
          </div>

          {/* Affinity Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Memory & Context Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#1db954] mb-8 text-center">Memory & Context</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fcd5d7',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Saves songs impulsively but rarely returns to them weeks later.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#d4edda',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants to remember where they first heard a song or why it mattered.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I have 2000 liked songs and can't remember why I saved half of them."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">No way to attach memories or notes to songs in the current app.</p>
                </div>
                {/* UX Principle - Blue */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#d6eaff',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Context creates meaning. Songs with stories are songs that stick.</p>
                </div>
                {/* Opportunity - Orange */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#ffe5d0',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Listening Memory feature that captures when, where, and how often songs are played.</p>
                </div>
              </div>
            </div>

            {/* Intentional Listening Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#1db954] mb-8 text-center">Intentional Listening</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fcd5d7',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Defaults to playlists on shuffle while working or commuting.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#d4edda',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants dedicated time to actually listen and discover, not just have music on.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I used to sit and listen to albums. Now music just plays in the background."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Choice overload makes it easier to just hit shuffle than pick something.</p>
                </div>
                {/* UX Principle - Blue */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#d6eaff',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Reduce friction to intentional moments. Make "listening" a distinct mode.</p>
                </div>
                {/* Opportunity - Orange */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#ffe5d0',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Curated "Threads" that guide listening experiences with narrative structure.</p>
                </div>
              </div>
            </div>

            {/* Personal Connection Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#1db954] mb-8 text-center">Personal Connection</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fcd5d7',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Creates playlists by mood or activity but struggles to organize them.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#d4edda',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants music organized by how it makes them feel, not alphabetically.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"Spotify knows my taste but doesn't know my feelings."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Genre labels don't capture the emotional nuance of personal music taste.</p>
                </div>
                {/* UX Principle - Blue */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#d6eaff',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Emotional organization resonates more than categorical sorting.</p>
                </div>
                {/* Opportunity - Orange */}
                <div 
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ 
                    backgroundColor: '#ffe5d0',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Emotional Clusters that group songs by feeling with visual mood indicators.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Affinity Mapping Summary */}
          <div className="max-w-3xl mt-12">
            <h4 className="text-[#1db954] text-lg font-medium mb-4">What This Revealed</h4>
            <p className="text-white/50 leading-relaxed mb-4">
              A consistent pattern emerged: users have lost their personal relationship with music. Streaming made access easy but stripped away the context, intention, and emotional connection that made music meaningful.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/70 font-medium">The opportunity:</span> Transform Spotify from a music player into a music memory system—one that helps users rediscover not just songs, but the feelings and moments attached to them.
            </p>
          </div>
        </div>
      </Section>

      {/* Before & After */}
      <Section>
        <SectionTitle>Before & After</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Spotify's current discovery relies on algorithmic carousels that often feel impersonal. My redesign shifts the focus from "what to play" to "why you listen."
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Before */}
          <div className="group">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] p-6">
              <p className="text-red-400/80 text-xs font-medium uppercase tracking-wider mb-4">Current Experience</p>
              <ul className="space-y-3 text-white/50 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">✕</span>
                  <span>Endless carousels with no context on why songs are recommended</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">✕</span>
                  <span>Saved songs become forgotten in a growing library</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">✕</span>
                  <span>No way to attach memories or meaning to music</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5">✕</span>
                  <span>Passive listening with little intentional engagement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* After */}
          <div className="group">
            <div className="relative rounded-2xl overflow-hidden border border-[#1db954]/30 bg-[#1db954]/[0.05] p-6">
              <p className="text-[#1db954] text-xs font-medium uppercase tracking-wider mb-4">Redesigned Experience</p>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#1db954] mt-0.5">✓</span>
                  <span><strong className="text-white/80">Listening Memory</strong> shows when, where, and how often you play songs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1db954] mt-0.5">✓</span>
                  <span><strong className="text-white/80">Threads</strong> are curated collections that explain why each song matters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1db954] mt-0.5">✓</span>
                  <span><strong className="text-white/80">Emotional Clusters</strong> organize music by feeling, not just genre</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1db954] mt-0.5">✓</span>
                  <span>Intentional listening modes that bring back active engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Design Decision */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#1db954]/10 to-transparent border-l-2 border-[#1db954] max-w-3xl">
          <p className="text-[#1db954] text-xs font-medium uppercase tracking-wider mb-2">Key Design Decision</p>
          <p className="text-white/70 leading-relaxed">
            I chose "Threads" over traditional playlists because user research showed people wanted <strong className="text-white">narrative context</strong>, not just song collections. Threads tell a story about why songs belong together.
          </p>
        </div>
      </Section>

      {/* User Flows */}
      <Section>
        <SectionTitle>User Flows</SectionTitle>
        <p className="text-white/40 text-sm mb-10">Core journeys through the redesigned experience</p>

        <div className="space-y-4">
          {/* Browse Threads Flow */}
          <div 
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{
              background: 'linear-gradient(145deg, rgba(6,182,212,0.06) 0%, rgba(6,182,212,0.02) 100%)',
            }}
          >
            <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Browse & Play Threads</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#1db954] text-white">Home</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Your Threads</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Thread Card</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Thread Detail</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#fbbf24] text-[#0a0a0a]">Play</span>
            </div>
        </div>
        
          {/* Listening Memory Flow */}
          <div 
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{
              background: 'linear-gradient(145deg, rgba(167,139,250,0.06) 0%, rgba(167,139,250,0.02) 100%)',
            }}
          >
            <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Explore Listening Memory</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#1db954] text-white">Home</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#a78bfa] text-white">Memory Tab</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#a78bfa] text-white">Emotional Clusters</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#a78bfa] text-white">Weekly Patterns</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#fbbf24] text-[#0a0a0a]">Play Cluster</span>
            </div>
        </div>

          {/* Now Playing Context Flow */}
          <div 
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{
              background: 'linear-gradient(145deg, rgba(244,114,182,0.06) 0%, rgba(244,114,182,0.02) 100%)',
            }}
          >
            <p className="text-white/80 text-sm font-medium mb-5 tracking-wide">Contextual Now Playing</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#1db954] text-white">Now Playing</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#f472b6] text-white">Memory Insight</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#f472b6] text-white">Related Tracks</span>
              <span className="text-white/30 text-sm">→</span>
              <div className="flex flex-col gap-1.5">
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-white/[0.08] text-white/60 border border-white/10">Add to Thread</span>
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-white/[0.08] text-white/60 border border-white/10">View Full Memory</span>
          </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#1db954]"></span>
            <span className="text-white/50">Entry Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-[#06b6d4]"></span>
            <span className="text-white/50">Threads</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-[#a78bfa]"></span>
            <span className="text-white/50">Memory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-[#f472b6]"></span>
            <span className="text-white/50">Context</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#fbbf24]"></span>
            <span className="text-white/50">Action</span>
          </div>
        </div>

        <div className="max-w-3xl mt-12">
          <p className="text-white/50 leading-relaxed">
            Each flow prioritizes understanding over action. Users always know why they're seeing something before deciding whether to engage with it.
          </p>
        </div>
      </Section>

      {/* Lo-Fi Designs */}
      <Section>
        <SectionTitle>Low Fidelity Designs</SectionTitle>
        <p className="text-white/40 text-sm mb-6">Early Explorations</p>
        
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          I started sketching user flows around three core concepts: <span className="text-white/70">Browsing Threads</span>, <span className="text-white/70">Exploring Memory</span>, and <span className="text-white/70">Contextual Playback</span>. These quick wireframes helped map out the experience before moving to higher fidelity.
        </p>

        {/* Lo-Fi Wireframe Flows - Messy Hand-drawn Sketches */}
        <div className="rounded-xl overflow-hidden bg-white p-4 md:p-6">
          <svg viewBox="0 0 750 340" className="w-full h-auto">
            <defs>
              <filter id="roughSpotify" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <marker id="arrowSpotify" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <path d="M 0 0 L 8 3 L 0 6 Z" fill="#555"/>
              </marker>
            </defs>
            
            {/* Row 1: Main browsing flow */}
            {/* Screen 1: Threads Home */}
            <g transform="translate(15, 15)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              <path d="M 15 20 Q 55 17, 95 22" stroke="#333" strokeWidth="1.5" fill="none"/>
              <path d="M 15 32 Q 45 30, 75 34" stroke="#aaa" strokeWidth="0.8"/>
              {/* Thread cards */}
              <rect x="12" y="45" width="106" height="28" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
              <rect x="18" y="51" width="16" height="16" fill="none" stroke="#888" strokeWidth="0.8" rx="2"/>
              <path d="M 40 58 Q 70 55, 105 60" stroke="#666" strokeWidth="0.8"/>
              <rect x="12" y="78" width="106" height="28" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
              <rect x="18" y="84" width="16" height="16" fill="none" stroke="#888" strokeWidth="0.8" rx="2"/>
              <path d="M 40 91 Q 65 88, 100 93" stroke="#666" strokeWidth="0.8"/>
              <rect x="12" y="111" width="106" height="28" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
              <rect x="18" y="117" width="16" height="16" fill="none" stroke="#888" strokeWidth="0.8" rx="2"/>
              <path d="M 40 124 Q 68 121, 95 126" stroke="#666" strokeWidth="0.8"/>
            </g>
            
            <path d="M 155 88 L 175 88" stroke="#555" strokeWidth="2" markerEnd="url(#arrowSpotify)"/>
            
            {/* Screen 2: Thread Detail */}
            <g transform="translate(190, 15)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              <path d="M 12 18 Q 50 15, 90 20" stroke="#333" strokeWidth="1.2"/>
              {/* Album + info */}
              <rect x="12" y="28" width="106" height="40" fill="none" stroke="#888" strokeWidth="0.8" rx="3"/>
              <rect x="18" y="34" width="28" height="28" fill="none" stroke="#888" strokeWidth="0.8" rx="2"/>
              <path d="M 52 42 Q 80 39, 108 44" stroke="#666" strokeWidth="0.8"/>
              <path d="M 52 54 Q 75 52, 95 56" stroke="#aaa" strokeWidth="0.6"/>
              {/* Why box */}
              <rect x="12" y="74" width="106" height="22" fill="none" stroke="#333" strokeWidth="1" rx="3" strokeDasharray="3,2"/>
              <path d="M 18 86 Q 60 84, 105 88" stroke="#888" strokeWidth="0.6"/>
              {/* Tracks */}
              <rect x="12" y="102" width="106" height="14" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
              <rect x="12" y="120" width="106" height="14" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
            </g>
            
            <path d="M 330 88 L 350 88" stroke="#555" strokeWidth="2" markerEnd="url(#arrowSpotify)"/>
            
            {/* Screen 3: Listening Memory with Graph */}
            <g transform="translate(365, 15)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              <path d="M 15 20 Q 50 17, 85 22" stroke="#333" strokeWidth="1.2"/>
              <path d="M 15 30 Q 40 28, 70 32" stroke="#aaa" strokeWidth="0.6"/>
              {/* Time toggle pills */}
              <rect x="22" y="38" width="20" height="8" fill="none" stroke="#888" strokeWidth="0.6" rx="4"/>
              <rect x="46" y="38" width="20" height="8" fill="none" stroke="#333" strokeWidth="1" rx="4"/>
              <rect x="70" y="38" width="20" height="8" fill="none" stroke="#888" strokeWidth="0.6" rx="4"/>
              {/* Insight card */}
              <rect x="12" y="52" width="106" height="28" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
              <path d="M 18 64 Q 60 61, 105 66" stroke="#666" strokeWidth="0.8"/>
              <path d="M 18 74 Q 50 72, 85 76" stroke="#aaa" strokeWidth="0.5"/>
              {/* Line graph area */}
              <rect x="12" y="86" width="106" height="36" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
              {/* Graph lines - sketchy */}
              <path d="M 18 110 Q 35 105, 50 108 Q 65 95, 80 100 Q 95 92, 110 96" stroke="#333" strokeWidth="1.2" fill="none"/>
              <path d="M 18 115 Q 40 112, 55 118 Q 75 108, 95 112 Q 105 106, 110 110" stroke="#666" strokeWidth="0.8" fill="none"/>
              <path d="M 18 118 Q 45 116, 60 120 Q 80 114, 100 118 Q 108 115, 110 117" stroke="#aaa" strokeWidth="0.6" fill="none"/>
              {/* Cluster card */}
              <rect x="12" y="128" width="106" height="14" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
            </g>
            
            <path d="M 505 88 L 525 88" stroke="#555" strokeWidth="2" markerEnd="url(#arrowSpotify)"/>
            
            {/* Screen 4: Now Playing */}
            <g transform="translate(540, 15)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              {/* Album art */}
              <rect x="20" y="15" width="90" height="65" fill="none" stroke="#888" strokeWidth="1" rx="4"/>
              <path d="M 45 42 Q 75 40, 95 44" stroke="#ccc" strokeWidth="0.8"/>
              {/* Track info */}
              <path d="M 30 92 Q 65 89, 100 94" stroke="#333" strokeWidth="1.2"/>
              <path d="M 42 104 Q 65 102, 88 106" stroke="#aaa" strokeWidth="0.8"/>
              {/* Context pill */}
              <rect x="20" y="112" width="90" height="12" fill="none" stroke="#333" strokeWidth="0.8" rx="6" strokeDasharray="3,2"/>
              {/* Controls */}
              <circle cx="45" cy="138" r="7" fill="none" stroke="#888" strokeWidth="0.8"/>
              <circle cx="65" cy="138" r="10" fill="none" stroke="#333" strokeWidth="1.2"/>
              <circle cx="85" cy="138" r="7" fill="none" stroke="#888" strokeWidth="0.8"/>
            </g>
            
            {/* Row 2: Intent flow */}
            {/* Screen 5: Intent Selector */}
            <g transform="translate(90, 180)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              <path d="M 15 22 Q 55 19, 100 24" stroke="#333" strokeWidth="1.2"/>
              <path d="M 15 34 Q 45 32, 75 36" stroke="#aaa" strokeWidth="0.6"/>
              {/* Intent options */}
              <rect x="12" y="48" width="106" height="24" fill="none" stroke="#333" strokeWidth="1" rx="4"/>
              <path d="M 20 62 Q 55 60, 100 64" stroke="#666" strokeWidth="0.6"/>
              <rect x="12" y="78" width="106" height="24" fill="none" stroke="#888" strokeWidth="0.8" rx="4"/>
              <path d="M 20 92 Q 50 90, 90 94" stroke="#888" strokeWidth="0.6"/>
              <rect x="12" y="108" width="106" height="24" fill="none" stroke="#888" strokeWidth="0.8" rx="4"/>
              <path d="M 20 122 Q 55 120, 85 124" stroke="#888" strokeWidth="0.6"/>
            </g>
            
            <path d="M 230 252 L 250 252" stroke="#555" strokeWidth="2" markerEnd="url(#arrowSpotify)"/>
            
            {/* Screen 6: Emotional Cluster Card */}
            <g transform="translate(265, 180)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              <path d="M 15 20 Q 50 17, 85 22" stroke="#333" strokeWidth="1.2"/>
              {/* Cluster cards list */}
              <rect x="12" y="32" width="106" height="32" fill="none" stroke="#333" strokeWidth="1" rx="3"/>
              <rect x="18" y="38" width="18" height="18" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
              <path d="M 42 46 Q 70 44, 100 48" stroke="#666" strokeWidth="0.6"/>
              <path d="M 42 56 Q 60 54, 80 58" stroke="#aaa" strokeWidth="0.5"/>
              
              <rect x="12" y="70" width="106" height="32" fill="none" stroke="#888" strokeWidth="0.8" rx="3"/>
              <rect x="18" y="76" width="18" height="18" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
              <path d="M 42 84 Q 65 82, 95 86" stroke="#666" strokeWidth="0.6"/>
              <path d="M 42 94 Q 58 92, 75 96" stroke="#aaa" strokeWidth="0.5"/>
              
              <rect x="12" y="108" width="106" height="32" fill="none" stroke="#888" strokeWidth="0.8" rx="3"/>
              <rect x="18" y="114" width="18" height="18" fill="none" stroke="#888" strokeWidth="0.6" rx="2"/>
              <path d="M 42 122 Q 68 120, 98 124" stroke="#666" strokeWidth="0.6"/>
            </g>
            
            <path d="M 405 252 L 425 252" stroke="#555" strokeWidth="2" markerEnd="url(#arrowSpotify)"/>
            
            {/* Screen 7: Playing with Context */}
            <g transform="translate(440, 180)">
              <rect width="130" height="145" fill="none" stroke="#444" strokeWidth="2" rx="4" filter="url(#roughSpotify)"/>
              {/* Album */}
              <rect x="20" y="12" width="90" height="60" fill="none" stroke="#888" strokeWidth="1" rx="4"/>
              {/* Track info */}
              <path d="M 30 82 Q 65 79, 100 84" stroke="#333" strokeWidth="1.2"/>
              <path d="M 42 94 Q 65 92, 88 96" stroke="#aaa" strokeWidth="0.8"/>
              {/* Context pill */}
              <rect x="18" y="105" width="94" height="14" fill="none" stroke="#333" strokeWidth="0.8" rx="7" strokeDasharray="3,2"/>
              {/* Progress */}
              <rect x="18" y="125" width="94" height="4" fill="none" stroke="#666" strokeWidth="0.6" rx="2"/>
              {/* Controls */}
              <circle cx="65" cy="142" r="8" fill="none" stroke="#333" strokeWidth="1.2"/>
            </g>
          </svg>
        </div>

        <p className="text-white/50 text-sm leading-relaxed max-w-2xl mt-6">
          Quick sketches mapping out the core flows: browsing threads, exploring memory clusters, selecting listening intent, and contextual playback. These helped test layout ideas before moving to higher fidelity.
        </p>
      </Section>

      {/* Mid-Fi Prototypes */}
      <Section>
        <SectionTitle>Mid-Fidelity Prototypes</SectionTitle>
        <p className="text-white/40 text-sm mb-6">Refining the Experience</p>
        
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Moving from sketches to Figma wireframes, I focused on information hierarchy, component structure, and establishing the visual system that would carry into hi-fi designs.
        </p>

        {/* Multi-screen wireframe display */}
        <div 
          className="rounded-xl p-4 md:p-6 overflow-hidden"
          style={{ 
            background: 'linear-gradient(145deg, rgba(29,185,84,0.08) 0%, rgba(29,185,84,0.02) 100%)',
            border: '1px solid rgba(29,185,84,0.15)',
          }}
        >
          <p className="text-white/60 text-xs mb-4 font-medium">Core Screens Overview</p>
          <div className="relative w-full rounded-lg overflow-hidden bg-[#080808] p-4">
            <svg viewBox="0 0 960 300" className="w-full h-auto">
              <defs>
                <marker id="arrowSpotifyMid" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#1db954"/>
                </marker>
              </defs>
              
              {/* Screen 1: Your Threads */}
              <g transform="translate(5, 20)">
                <text x="0" y="-6" fill="#1db954" fontSize="9" fontWeight="500">Your Threads</text>
                <rect width="140" height="260" rx="16" fill="#121212" stroke="#252525" strokeWidth="1"/>
                <rect x="40" y="5" width="60" height="4" rx="2" fill="#333"/>
                
                <text x="10" y="28" fill="#fff" fontSize="9" fontWeight="600">Your Threads</text>
                <text x="10" y="40" fill="#555" fontSize="6">Based on how you listen</text>
                
                {/* Cards */}
                <rect x="8" y="48" width="124" height="54" rx="7" fill="#1a1a1a"/>
                <rect x="14" y="54" width="32" height="32" rx="4" fill="#282828"/>
                <rect x="20" y="62" width="20" height="14" rx="2" fill="#1db954" fillOpacity="0.3"/>
                <text x="52" y="68" fill="#fff" fontSize="7" fontWeight="500">Late Night Focus</text>
                <text x="52" y="80" fill="#666" fontSize="5">12 songs · 45 min</text>
                <rect x="52" y="86" width="68" height="10" rx="5" fill="#1db954" fillOpacity="0.1" stroke="#1db954" strokeWidth="0.3"/>
                <text x="58" y="94" fill="#1db954" fontSize="4">When you need to focus</text>
                
                <rect x="8" y="108" width="124" height="54" rx="7" fill="#1a1a1a"/>
                <rect x="14" y="114" width="32" height="32" rx="4" fill="#282828"/>
                <rect x="20" y="122" width="20" height="14" rx="2" fill="#f59e0b" fillOpacity="0.3"/>
                <text x="52" y="128" fill="#fff" fontSize="7" fontWeight="500">Morning Energy</text>
                <text x="52" y="140" fill="#666" fontSize="5">8 songs · 32 min</text>
                <rect x="52" y="146" width="60" height="10" rx="5" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.3"/>
                <text x="58" y="154" fill="#f59e0b" fontSize="4">Upbeat start to day</text>
                
                <rect x="8" y="168" width="124" height="54" rx="7" fill="#1a1a1a"/>
                <rect x="14" y="174" width="32" height="32" rx="4" fill="#282828"/>
                <rect x="20" y="182" width="20" height="14" rx="2" fill="#a78bfa" fillOpacity="0.3"/>
                <text x="52" y="188" fill="#fff" fontSize="7" fontWeight="500">Chill Vibes</text>
                <text x="52" y="200" fill="#666" fontSize="5">15 songs · 58 min</text>
                <rect x="52" y="206" width="56" height="10" rx="5" fill="#a78bfa" fillOpacity="0.1" stroke="#a78bfa" strokeWidth="0.3"/>
                <text x="58" y="214" fill="#a78bfa" fontSize="4">Relaxing evenings</text>
                
                <rect x="8" y="232" width="124" height="20" rx="10" fill="#1a1a1a"/>
                <circle cx="35" cy="242" r="2.5" fill="#555"/>
                <circle cx="70" cy="242" r="2.5" fill="#1db954"/>
                <circle cx="105" cy="242" r="2.5" fill="#555"/>
              </g>
              
              <path d="M 155 150 L 175 150" stroke="#1db954" strokeWidth="1.5" markerEnd="url(#arrowSpotifyMid)"/>
              
              {/* Screen 2: Thread Detail */}
              <g transform="translate(190, 20)">
                <text x="0" y="-6" fill="#1db954" fontSize="9" fontWeight="500">Thread Detail</text>
                <rect width="140" height="260" rx="16" fill="#121212" stroke="#252525" strokeWidth="1"/>
                <rect x="40" y="5" width="60" height="4" rx="2" fill="#333"/>
                
                <text x="10" y="26" fill="#555" fontSize="8">←</text>
                <text x="22" y="26" fill="#fff" fontSize="8" fontWeight="500">Late Night Focus</text>
                
                {/* Hero card */}
                <rect x="8" y="34" width="124" height="56" rx="7" fill="#1a1a1a"/>
                {/* Album art */}
                <rect x="14" y="40" width="40" height="40" rx="5" fill="#282828"/>
                <rect x="20" y="50" width="28" height="20" rx="2" fill="#1db954" fillOpacity="0.3"/>
                {/* Title and subtitle - positioned to not overlap with play button */}
                <text x="60" y="52" fill="#fff" fontSize="7" fontWeight="600">Late Night Focus</text>
                <text x="60" y="62" fill="#666" fontSize="5">12 songs · 45 min</text>
                {/* Play button - positioned below the text */}
                <circle cx="80" cy="78" r="10" fill="#1db954"/>
                <path d="M 77 74 L 77 82 L 85 78 Z" fill="#000"/>
                
                <rect x="8" y="96" width="124" height="30" rx="5" fill="#0d1f0d" stroke="#1db954" strokeWidth="0.3"/>
                <text x="14" y="108" fill="#1db954" fontSize="5" fontWeight="500">WHY THIS EXISTS</text>
                <text x="14" y="118" fill="#999" fontSize="4">Songs you return to when you need deep focus</text>
                
                <rect x="8" y="132" width="124" height="26" rx="4" fill="#1a1a1a"/>
                <rect x="14" y="138" width="12" height="12" rx="2" fill="#282828"/>
                <text x="32" y="146" fill="#fff" fontSize="6">Midnight City</text>
                <text x="32" y="154" fill="#555" fontSize="4">M83</text>
                
                <rect x="8" y="162" width="124" height="26" rx="4" fill="#1a1a1a"/>
                <rect x="14" y="168" width="12" height="12" rx="2" fill="#282828"/>
                <text x="32" y="176" fill="#fff" fontSize="6">Intro</text>
                <text x="32" y="184" fill="#555" fontSize="4">The xx</text>
                
                <rect x="8" y="192" width="124" height="26" rx="4" fill="#1a1a1a"/>
                <rect x="14" y="198" width="12" height="12" rx="2" fill="#282828"/>
                <text x="32" y="206" fill="#fff" fontSize="6">Electric Feel</text>
                <text x="32" y="214" fill="#555" fontSize="4">MGMT</text>
                
                <rect x="8" y="232" width="124" height="20" rx="10" fill="#1a1a1a"/>
                <circle cx="35" cy="242" r="2.5" fill="#1db954"/>
                <circle cx="70" cy="242" r="2.5" fill="#555"/>
                <circle cx="105" cy="242" r="2.5" fill="#555"/>
              </g>
              
              <path d="M 340 150 L 360 150" stroke="#1db954" strokeWidth="1.5" markerEnd="url(#arrowSpotifyMid)"/>
              
              {/* Screen 3: Memory */}
              <g transform="translate(375, 20)">
                <text x="0" y="-6" fill="#1db954" fontSize="9" fontWeight="500">Listening Memory</text>
                <rect width="140" height="260" rx="16" fill="#121212" stroke="#252525" strokeWidth="1"/>
                <rect x="40" y="5" width="60" height="4" rx="2" fill="#333"/>
                
                <text x="10" y="28" fill="#fff" fontSize="9" fontWeight="600">Your Memory</text>
                <text x="10" y="40" fill="#555" fontSize="5">How music fits your life</text>
                
                {/* Time toggle */}
                <g transform="translate(20, 46)">
                  <rect width="100" height="14" rx="7" fill="#282828"/>
                  <rect x="2" y="2" width="28" height="10" rx="5" fill="#333"/>
                  <text x="10" y="10" fill="#888" fontSize="4">Week</text>
                  <rect x="36" y="2" width="28" height="10" rx="5" fill="#fff"/>
                  <text x="42" y="10" fill="#000" fontSize="4" fontWeight="500">Month</text>
                  <text x="78" y="10" fill="#888" fontSize="4">Year</text>
                </g>
                
                {/* Insight card */}
                <rect x="8" y="66" width="124" height="42" rx="6" fill="#1a1a1a"/>
                <g transform="translate(12, 72)">
                  <text x="0" y="6" fill="#666" fontSize="4">THIS MONTH</text>
                  <text x="0" y="18" fill="#fff" fontSize="6" fontWeight="500">Deep Focus increased 40%</text>
                  <text x="0" y="28" fill="#555" fontSize="4">More ambient music than usual</text>
                </g>
                
                {/* Line graph */}
                <rect x="8" y="114" width="124" height="58" rx="5" fill="#1a1a1a"/>
                <text x="14" y="126" fill="#666" fontSize="4">HOW YOU'VE BEEN LISTENING</text>
                {/* Graph lines */}
                <path d="M 18 158 Q 35 148, 50 155 Q 70 138, 90 145 Q 110 135, 122 140" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M 18 162 Q 40 155, 55 165 Q 75 148, 100 158 Q 115 150, 122 155" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M 18 165 Q 45 160, 60 168 Q 85 155, 105 163 Q 118 158, 122 162" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                {/* X-axis labels */}
                <text x="22" y="170" fill="#555" fontSize="3">W1</text>
                <text x="52" y="170" fill="#555" fontSize="3">W2</text>
                <text x="82" y="170" fill="#555" fontSize="3">W3</text>
                <text x="112" y="170" fill="#555" fontSize="3">W4</text>
                
                {/* Cluster cards */}
                <rect x="8" y="178" width="124" height="46" rx="5" fill="#1a1a1a"/>
                <text x="14" y="190" fill="#666" fontSize="4">YOUR EMOTIONAL CLUSTERS</text>
                <g transform="translate(14, 196)">
                  <circle cx="4" cy="4" r="3" fill="#8b5cf6"/>
                  <text x="10" y="6" fill="#fff" fontSize="4">Deep Focus</text>
                  <circle cx="60" cy="4" r="3" fill="#3b82f6"/>
                  <text x="66" y="6" fill="#fff" fontSize="4">Night Drives</text>
                </g>
                <g transform="translate(14, 210)">
                  <circle cx="4" cy="4" r="3" fill="#f59e0b"/>
                  <text x="10" y="6" fill="#fff" fontSize="4">Morning Energy</text>
                </g>
                
                <rect x="8" y="232" width="124" height="20" rx="10" fill="#1a1a1a"/>
                <circle cx="35" cy="242" r="2.5" fill="#555"/>
                <circle cx="70" cy="242" r="2.5" fill="#1db954"/>
                <circle cx="105" cy="242" r="2.5" fill="#555"/>
              </g>
              
              <path d="M 525 150 L 545 150" stroke="#1db954" strokeWidth="1.5" markerEnd="url(#arrowSpotifyMid)"/>
              
              {/* Screen 4: Intent */}
              <g transform="translate(560, 20)">
                <text x="0" y="-6" fill="#1db954" fontSize="9" fontWeight="500">Intent Selector</text>
                <rect width="140" height="260" rx="16" fill="#121212" stroke="#252525" strokeWidth="1"/>
                <rect x="40" y="5" width="60" height="4" rx="2" fill="#333"/>
                
                <text x="10" y="28" fill="#fff" fontSize="9" fontWeight="600">What do you need?</text>
                <text x="10" y="40" fill="#555" fontSize="5">We'll find the right music</text>
                
                <rect x="8" y="48" width="124" height="36" rx="6" fill="#1db954" fillOpacity="0.1" stroke="#1db954" strokeWidth="0.6"/>
                <text x="16" y="64" fill="#1db954" fontSize="7" fontWeight="500">🎯 Focus deeply</text>
                <text x="16" y="76" fill="#666" fontSize="5">Concentration mode</text>
                
                <rect x="8" y="90" width="124" height="36" rx="6" fill="#1a1a1a"/>
                <text x="16" y="106" fill="#fff" fontSize="7" fontWeight="500">⚡ Get energized</text>
                <text x="16" y="118" fill="#666" fontSize="5">Upbeat and active</text>
                
                <rect x="8" y="132" width="124" height="36" rx="6" fill="#1a1a1a"/>
                <text x="16" y="148" fill="#fff" fontSize="7" fontWeight="500">😌 Wind down</text>
                <text x="16" y="160" fill="#666" fontSize="5">Relax and decompress</text>
                
                <rect x="8" y="174" width="124" height="36" rx="6" fill="#1a1a1a"/>
                <text x="16" y="190" fill="#fff" fontSize="7" fontWeight="500">🎲 Surprise me</text>
                <text x="16" y="202" fill="#666" fontSize="5">Based on your patterns</text>
                
                <rect x="8" y="232" width="124" height="20" rx="10" fill="#1a1a1a"/>
                <circle cx="35" cy="242" r="2.5" fill="#555"/>
                <circle cx="70" cy="242" r="2.5" fill="#555"/>
                <circle cx="105" cy="242" r="2.5" fill="#555"/>
              </g>
              
              <path d="M 710 150 L 730 150" stroke="#1db954" strokeWidth="1.5" markerEnd="url(#arrowSpotifyMid)"/>
              
              {/* Screen 5: Now Playing */}
              <g transform="translate(745, 20)">
                <text x="0" y="-6" fill="#1db954" fontSize="9" fontWeight="500">Now Playing</text>
                <rect width="140" height="260" rx="16" fill="#121212" stroke="#252525" strokeWidth="1"/>
                <rect x="40" y="5" width="60" height="4" rx="2" fill="#333"/>
                <rect x="55" y="12" width="30" height="3" rx="1.5" fill="#444"/>
                
                <rect x="12" y="24" width="116" height="100" rx="6" fill="#1a1a1a"/>
                <rect x="35" y="52" width="70" height="44" rx="4" fill="#282828"/>
                <rect x="50" y="68" width="40" height="14" rx="2" fill="#1db954" fillOpacity="0.3"/>
                
                <text x="32" y="140" fill="#fff" fontSize="9" fontWeight="600">Midnight City</text>
                <text x="52" y="152" fill="#666" fontSize="6">M83</text>
                
                <rect x="10" y="162" width="120" height="22" rx="11" fill="#0d1f0d" stroke="#1db954" strokeWidth="0.3"/>
                <text x="22" y="176" fill="#1db954" fontSize="5">From: Late Night Focus</text>
                
                <rect x="12" y="194" width="116" height="3" rx="1.5" fill="#282828"/>
                <rect x="12" y="194" width="38" height="3" rx="1.5" fill="#1db954"/>
                <text x="12" y="206" fill="#555" fontSize="4">1:24</text>
                <text x="114" y="206" fill="#555" fontSize="4">4:02</text>
                
                <circle cx="42" cy="232" r="9" fill="none" stroke="#555" strokeWidth="0.6"/>
                <circle cx="70" cy="232" r="12" fill="#fff"/>
                <path d="M 67 227 L 67 237 L 76 232 Z" fill="#000"/>
                <circle cx="98" cy="232" r="9" fill="none" stroke="#555" strokeWidth="0.6"/>
              </g>
            </svg>
          </div>
        </div>

        <p className="text-white/50 text-sm leading-relaxed max-w-2xl mt-6">
          These wireframes refined layout and hierarchy. Key decisions: replace play counts with meaningful context, single primary action per screen, and "Why" always visible.
        </p>
      </Section>

      {/* Core Features */}
      <Section>
        <SectionTitle>Core Features</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Feature 1 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Listening Threads</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Finite, behavior-driven collections with clear explanations. Maximum 3 threads shown at once to reduce overwhelm.
          </p>
        </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
          </div>
            <h3 className="text-white text-lg font-semibold mb-3">Why This Exists</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Every recommendation comes with a human-readable explanation. No more mystery algorithms.
            </p>
        </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Listening Memory</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Visual patterns of your emotional listening over time. See how music fits into your life.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Rediscovery Moments</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Resurface forgotten favorites with personal context. "You loved this during summer 2023."
            </p>
          </div>
        </div>
      </Section>

      {/* Design System */}
      <Section>
        <SectionTitle>Design System</SectionTitle>
        <p className="text-white/40 text-sm mb-10">Building on Spotify's foundation with intention-focused additions</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {/* Colors */}
          <div 
            className="rounded-2xl p-6 border border-[#1db954]/20"
            style={{
              background: 'linear-gradient(145deg, #0d1f0d 0%, #0a0a0a 100%)',
            }}
          >
            <h4 className="text-white/90 text-sm font-medium mb-6">Color Palette</h4>
            
            {/* Spotify Green */}
            <p className="text-[#1db954]/60 text-xs mb-3">Primary</p>
            <div className="flex gap-2 mb-6">
              {['#1db954', '#1ed760', '#4ade80', '#86efac'].map((color, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 rounded-lg"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 4px 12px ${color}40`
                  }}
                />
              ))}
        </div>

            {/* Backgrounds */}
            <p className="text-[#1db954]/60 text-xs mb-3">Backgrounds</p>
            <div className="flex gap-2 mb-6">
              {['#000000', '#121212', '#181818', '#282828'].map((color, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 rounded-lg border border-white/10"
                  style={{ backgroundColor: color }}
                />
              ))}
        </div>

            {/* Accents */}
            <p className="text-[#1db954]/60 text-xs mb-3">Emotional Accents</p>
            <div className="flex gap-2">
              {['#6366f1', '#ec4899', '#f59e0b', '#ef4444'].map((color, i) => (
                <div 
                  key={i}
                  className="w-12 h-12 rounded-lg"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 4px 12px ${color}30`
                  }}
                />
              ))}
          </div>
        </div>

          {/* Typography */}
          <div 
            className="rounded-2xl p-6 border border-[#1db954]/20"
            style={{
              background: 'linear-gradient(145deg, #0d1f0d 0%, #0a0a0a 100%)',
            }}
          >
            <h4 className="text-white/90 text-sm font-medium mb-6">Typography</h4>
            
            <div className="space-y-0">
              <div className="flex items-center justify-between py-4 border-b border-[#1db954]/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Display</p>
                  <p className="text-[#1db954]/50 text-xs mt-0.5">Circular · Bold · 32px</p>
                </div>
                <p className="text-white text-2xl font-bold">Threads</p>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#1db954]/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Heading</p>
                  <p className="text-[#1db954]/50 text-xs mt-0.5">Circular · SemiBold · 18px</p>
                </div>
                <p className="text-white text-lg font-semibold">Heading</p>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#1db954]/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Body</p>
                  <p className="text-[#1db954]/50 text-xs mt-0.5">Circular · Regular · 14px</p>
                </div>
                <p className="text-white/70 text-sm">Body text</p>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white/90 text-sm font-medium">Context</p>
                  <p className="text-[#1db954]/50 text-xs mt-0.5">Circular · Medium · 12px</p>
                </div>
                <span className="text-[#1db954] text-xs bg-[#1db954]/10 px-2 py-1 rounded">WHY: Context</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Product Walkthrough */}
      <Section>
        <SectionTitle>Product Walkthrough</SectionTitle>
        <p className="text-white/40 text-sm mb-12">Explore the redesigned Spotify experience</p>
        
        <div className="flex flex-col items-center">
          <div className="relative group" style={{ width: '300px' }}>
            {/* Phone Frame */}
            <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
              
              {/* Screen */}
              <div className="relative rounded-[2.5rem] overflow-hidden bg-[#121212]" style={{ aspectRatio: '9/19.5' }}>
                {demoImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.label}
                    fill
                    className={`object-cover object-top transition-opacity duration-500 ${
                      activeSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="300px"
                  />
                ))}

                {/* Navigation arrows */}
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {demoImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        activeSlide === index 
                          ? 'bg-[#1db954] w-5' 
                          : 'bg-white/40 w-2 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
        </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
        </div>

            {/* Glow effect */}
            <div className="absolute -inset-12 bg-gradient-to-t from-[#1db954]/25 via-[#1db954]/10 to-transparent rounded-3xl blur-3xl -z-10" />
          </div>

          {/* Current slide label */}
          <p className="text-center text-white/60 text-lg mt-8 font-medium">{demoImages[activeSlide].label}</p>
          <p className="text-center text-white/30 text-sm mt-2">Click arrows to explore</p>
        </div>
      </Section>

      {/* Results */}
      <Section>
        <SectionTitle>Results & Impact</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          While this is a concept redesign, I validated the designs through user testing sessions with Spotify users.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#1db954] mb-2">87%</p>
            <p className="text-white/50 text-sm">of users preferred Threads over current discovery</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#1db954] mb-2">4.6/5</p>
            <p className="text-white/50 text-sm">average rating for Listening Memory feature</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#1db954] mb-2">92%</p>
            <p className="text-white/50 text-sm">said they'd use Emotional Clusters regularly</p>
          </div>
        </div>

        {/* Key Decision */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1db954]/10 to-transparent border-l-2 border-[#1db954] max-w-3xl">
          <p className="text-[#1db954] text-xs font-medium uppercase tracking-wider mb-2">Key Insight from Testing</p>
          <p className="text-white/70 leading-relaxed">
            Users described the redesign as making them feel like they were "rediscovering their own music." The most common feedback: <strong className="text-white">"This makes Spotify feel personal again."</strong>
          </p>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionTitle>Reflection</SectionTitle>
        
        <div className="max-w-3xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-[#1db954] font-medium mb-3">What I Learned</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Questioning assumptions in iconic products</li>
                <li>Designing for emotions, not just tasks</li>
                <li>Making AI recommendations feel trustworthy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#1db954] font-medium mb-3">Challenges</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Redesigning deeply familiar interfaces</li>
                <li>Visualizing abstract emotional patterns</li>
                <li>Testing novel paradigms with users</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#1db954] font-medium mb-3">Future Exploration</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Social features for shared listening</li>
                <li>Mood-based contextual discovery</li>
                <li>Artist-listener emotional connections</li>
              </ul>
            </div>
          </div>

          <div className="p-5 bg-white/[0.03] rounded-xl border border-[#1db954]/20">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-[#1db954] font-medium">Key Insight:</span> The best experiences help users understand themselves, not just consume more. Finite choices feel more generous than infinite ones. Sometimes the most impactful design subtracts rather than adds.
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#1db954] hover:bg-[#1ed760] text-black font-semibold rounded-full transition-all"
            >
              Back to Portfolio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
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
      { threshold: 0.1, rootMargin: '-50px' }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section 
      ref={ref}
      className={`relative py-24 px-8 border-t border-white/5 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
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
    <p className="text-[#1db954]/60 text-sm font-mono mb-4">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
  )
}
