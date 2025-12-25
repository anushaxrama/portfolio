'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const spotifyImages = [
  { src: '/spotify-1.png', label: 'Your Threads - Home' },
  { src: '/spotify-2.png', label: 'Thread Detail View' },
  { src: '/spotify-3.png', label: 'Listening Memory' },
  { src: '/spotify-4.png', label: 'Now Playing with Insights' },
  { src: '/spotify-5.png', label: 'Emotional Clusters' },
]

export default function SpotifyCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setIsLoaded(true)
    
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]))
          }
        },
        { threshold: 0.15 }
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && sectionRefs.current[index]) {
          observer.unobserve(sectionRefs.current[index]!)
        }
      })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % spotifyImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + spotifyImages.length) % spotifyImages.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % spotifyImages.length)
  }

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  const sections = [
    {
      number: '01',
      title: 'The Problem',
      content: `Spotify's current discovery experience overwhelms users with endless carousels and algorithmically-generated playlists. Users save music but forget why they liked it. Discovery feels algorithmic but not understandable. The home screen presents too many choices without context.

The core issue: Spotify optimizes for engagement metrics, not meaningful listening experiences.`
    },
    {
      number: '02',
      title: 'Research Insights',
      content: `Through user interviews and competitive analysis, three key insights emerged:

1. Users confuse familiarity with understanding — they recognize songs but can't recall why they saved them.

2. Context matters more than content — knowing "when" and "why" creates stronger connections than knowing "what."

3. Finite choices reduce anxiety — endless options create decision fatigue, while curated collections feel intentional.`
    },
    {
      number: '03',
      title: 'Design Principles',
      content: `The redesign is built on four core principles:

Intent over algorithm — Surface music based on how users actually listen, not just what they play.

Context over metrics — Replace "47 plays" with "Most replayed during finals week."

Finite over infinite — Cap content at intentional limits. No endless scrolling.

Explanation over mystery — Every recommendation explains why it exists.`
    },
    {
      number: '04',
      title: 'The Solution: Listening Threads',
      content: `Listening Threads reimagines Spotify's home as a feed of curated, finite collections — not carousels. Each thread:

• Has a clear title and reason for existing
• Contains 5-7 tracks maximum
• Explains "why this thread exists"
• Ends with a single, intentional action

Examples: "Music you play when you need focus," "Songs you saved late at night," "Your energy boosters."`
    },
    {
      number: '05',
      title: 'Listening Memory',
      content: `A new reflective space that helps users understand their listening patterns over time. Features include:

• Emotional clusters — Music grouped by how it makes you feel
• Trend indicators — "Deep Focus is growing this month"
• Rediscovery prompts — "You loved this once" with contextual memory
• Pattern visualization — Animated charts showing listening evolution

This screen is reflective, not analytical. It tells stories, not stats.`
    },
    {
      number: '06',
      title: 'Contextual Now Playing',
      content: `The playback screen transforms from a music player into a reflection on your relationship with the song.

Instead of raw metrics like "47 total plays" or "188 minutes listened," users see contextual insights:

• "Most replayed during Finals Week '23"
• "You often returned to this song late at night"  
• "Part of your Night Drives collection"

Metrics support storytelling, not performance tracking.`
    },
    {
      number: '07',
      title: 'Key UX Decisions',
      content: `Several intentional constraints shaped the design:

Maximum 3 threads on home — Forces curation over content dumping
No infinite scroll — Every screen has clear boundaries
"WHY THIS EXISTS" labels — Makes intent immediately scannable
Single primary CTA per thread — Reduces decision fatigue
Evolving note — "This thread updates as your listening changes"

These constraints create a fundamentally different mental model from current Spotify.`
    },
    {
      number: '08',
      title: 'Impact & Reflection',
      content: `This redesign shifts Spotify from an endless content feed to an intent-based experience. Users can quickly understand why something is recommended, making the algorithm feel like a collaborator rather than a black box.

Key learnings:
• Constraints enable creativity and clarity
• Context is more valuable than content
• Explaining "why" builds trust in recommendations
• Finite choices can feel more generous than infinite ones`
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/#work" 
            className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>
          <a 
            href="https://github.com/anushaxrama/your-music-journey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Prototype
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 pt-20 pb-12 gap-12 lg:gap-16">
        {/* Left: Title and Info */}
        <div className={`flex-1 max-w-xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[#1db954] text-sm uppercase tracking-widest mb-4">UX Case Study</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-6">
            Spotify
            <br />
            <span className="text-white/40">Redesign</span>
          </h1>
          <p className="text-xl text-white/60 mb-8 leading-relaxed">
            Listening Threads — An intent-based discovery experience that replaces endless carousels with curated, meaningful collections.
          </p>
          
          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-white/40 uppercase tracking-wider text-xs mb-1">Role</p>
              <p className="text-white/80">UX Designer</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider text-xs mb-1">Timeline</p>
              <p className="text-white/80">2 weeks</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider text-xs mb-1">Platform</p>
              <p className="text-white/80">Mobile (iOS)</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider text-xs mb-1">Tools</p>
              <p className="text-white/80">React, Tailwind</p>
            </div>
          </div>
        </div>

        {/* Right: Phone Mockup */}
        <div className={`relative w-full lg:w-1/2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative max-w-[300px] mx-auto">
            {/* Phone Frame */}
            <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
              
              {/* Screen */}
              <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-[#121212]">
                {spotifyImages.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      activeSlide === imgIndex ? 'opacity-100' : 'opacity-0'
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
                
                {/* Navigation */}
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-all opacity-0 hover:opacity-100 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-all opacity-0 hover:opacity-100 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {spotifyImages.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => setActiveSlide(dotIndex)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeSlide === dotIndex ? 'bg-[#1db954] w-4' : 'bg-white/30 w-1.5 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
            </div>
            
            {/* Glow */}
            <div className="absolute -inset-10 bg-gradient-to-t from-[#1db954]/10 via-transparent to-transparent rounded-3xl blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {sections.map((section, index) => (
          <section
            key={index}
            ref={setSectionRef(index)}
            className={`py-16 border-t border-white/10 transition-all duration-700 ${
              visibleSections.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[#1db954] text-sm font-mono">{section.number}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h2>
            </div>
            <div className="text-white/60 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <section className="border-t border-white/10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Explore the Prototype</p>
          <a
            href="https://github.com/anushaxrama/your-music-journey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
    </main>
  )
}

