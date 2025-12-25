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
  { src: '/spotify-1.png', label: 'Your Threads' },
  { src: '/spotify-2.png', label: 'Listening Memory' },
  { src: '/spotify-3.png', label: 'Emotional Clusters' },
  { src: '/spotify-4.png', label: 'Thread Card' },
  { src: '/spotify-5.png', label: 'Thread Detail' },
  { src: '/spotify-6.png', label: 'Now Playing Memory' },
]

export default function SpotifyCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.05,
    }));
  }, []);

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
      {/* Floating particles - Spotify green tinted */}
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
              
              <p className={`text-xl md:text-2xl text-white/40 mb-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Listening With Intention
              </p>
              
              <p className={`text-lg text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Reimagining music discovery as reflection, not endless scrolling.
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
                  <p className="text-white/80">React, Tailwind, Figma</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-white/80">Mobile (iOS)</p>
                </div>
              </div>
            </div>

            {/* Right side - Phone Mockup */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative group max-w-[280px] mx-auto">
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
                  
                  {/* Screen */}
                  <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-[#121212]">
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
                          className="object-cover object-top"
                          sizes="280px"
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
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {demoImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSlide(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            activeSlide === index 
                              ? 'bg-[#1db954] w-4' 
                              : 'bg-white/40 w-1.5 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-t from-[#1db954]/10 via-transparent to-transparent rounded-3xl blur-2xl -z-10" />
              </div>

              {/* Current slide label */}
              <p className="text-center text-white/40 text-sm mt-6">{demoImages[activeSlide].label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <Section>
        <SectionLabel>01</SectionLabel>
        <SectionTitle>The Story</SectionTitle>
        <div className="max-w-3xl">
          <p className="text-lg text-white/60 leading-relaxed mb-6">
            Spotify is excellent at helping users find more music — but over time, I noticed that saved songs became easy to forget, recommendations felt opaque, and listening turned passive.
          </p>
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            This redesign explores what Spotify could look like if it prioritized meaningful listening over infinite discovery.
          </p>
          <p className="text-xl text-white/80 leading-relaxed mb-8">
            I introduced a new mental model called <span className="text-[#1db954]">Listening Threads</span>: finite, behavior-driven collections of music that explain why they exist, help users rediscover forgotten favorites, and reflect how music fits into their daily lives.
          </p>
          <p className="text-2xl md:text-3xl text-white/70 font-light italic leading-relaxed border-l-2 border-[#1db954]/50 pl-6">
            Rather than asking "What do you want to play?", this experience asks: "Why are you listening right now — and what does that say about you?"
          </p>
        </div>
      </Section>

      {/* Key Ideas */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Key Ideas</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl">
          <KeyIdea 
            title="Listening Threads"
            description="Finite, intention-based collections shaped by behavior — not algorithms"
          />
          <KeyIdea 
            title="Why This Exists"
            description="Transparent, human explanations for every recommendation"
          />
          <KeyIdea 
            title="Listening Memory"
            description="A living reflection of listening patterns over time"
          />
          <KeyIdea 
            title="Rediscovery Moments"
            description="Resurfacing music tied to personal context and memory"
          />
        </div>
      </Section>

      {/* What Makes This Different */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>What Makes This Different</SectionTitle>
        
        <div className="max-w-3xl space-y-6">
          <Difference 
            before="Endless content"
            after="Intentional moments"
          />
          <Difference 
            before="Opaque algorithms"
            after="Transparent reasoning"
          />
          <Difference 
            before="Metrics and stats"
            after="Story and memory"
          />
          <Difference 
            before="What do you want?"
            after="Why are you listening?"
          />
        </div>
      </Section>

      {/* Process: Research */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Research & Problem Framing</SectionTitle>
        
        <div className="max-w-3xl mb-12">
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            What I observed about long-term Spotify use — pain points around discovery, trust, and memory.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 max-w-3xl mb-12">
          <p className="text-white/50 border-l border-white/20 pl-6">Saved songs become forgotten archives</p>
          <p className="text-white/50 border-l border-white/20 pl-6">Recommendations feel random, not personal</p>
          <p className="text-white/50 border-l border-white/20 pl-6">No context for why songs were suggested</p>
          <p className="text-white/50 border-l border-white/20 pl-6">Listening becomes passive background noise</p>
        </div>

        {/* Placeholder for screenshots */}
        <div className="max-w-3xl">
          <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <p className="text-white/30 text-sm">Research notes & insights</p>
          </div>
        </div>
      </Section>

      {/* Process: Concepts */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Early Concepts & Wireframes</SectionTitle>
        
        <div className="max-w-3xl mb-12">
          <p className="text-lg text-white/60 leading-relaxed">
            Exploring how discovery could be finite, reflective, and calm — without losing speed.
          </p>
        </div>

        {/* Placeholder for screenshots */}
        <div className="max-w-3xl">
          <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <p className="text-white/30 text-sm">Low-fidelity wireframes</p>
          </div>
        </div>
      </Section>

      {/* Process: Iteration */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Iteration & Refinement</SectionTitle>
        
        <div className="max-w-3xl mb-12">
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            Refining hierarchy, reducing density, and making the "why" behind recommendations immediately scannable.
          </p>
          
          <div className="space-y-6">
            <Iteration 
              change="Added 'WHY THIS EXISTS' labels"
              reason="Makes intent immediately obvious to users"
            />
            <Iteration 
              change="Capped threads at 5-7 tracks"
              reason="Finite collections feel intentional, not overwhelming"
            />
            <Iteration 
              change="Replaced stats with contextual insights"
              reason="'47 plays' → 'Most replayed during finals week'"
            />
            <Iteration 
              change="Single primary CTA per thread"
              reason="Reduces decision fatigue"
            />
          </div>
        </div>

        {/* Placeholder for screenshots */}
        <div className="max-w-3xl">
          <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <p className="text-white/30 text-sm">Before / after comparisons</p>
          </div>
        </div>
      </Section>

      {/* Final Design */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Final Design</SectionTitle>
        
        <div className="max-w-3xl mb-12">
          <p className="text-lg text-white/60 leading-relaxed">
            A Spotify experience organized around <span className="text-white/80">how</span> and <span className="text-white/80">why</span> users listen — not just what they play.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl mb-12">
          <Feature title="Listening Threads Home" description="Maximum 3 threads, full-width cards, no carousels" />
          <Feature title="Thread Detail View" description="Reason at top, finite track list, refine controls" />
          <Feature title="Listening Memory" description="Animated patterns, emotional clusters, one insight at a time" />
          <Feature title="Contextual Now Playing" description="Memory insights replace raw metrics" />
        </div>

        {/* Placeholder for screenshots */}
        <div className="max-w-3xl">
          <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <p className="text-white/30 text-sm">Final UI screens</p>
          </div>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Reflection</SectionTitle>
        
        <div className="max-w-3xl">
          <p className="text-xl text-white/70 leading-relaxed mb-8">
            This project challenged me to design within an iconic product while introducing a fundamentally new interaction model.
          </p>
          <p className="text-xl text-white/70 leading-relaxed mb-12">
            It reinforced my belief that the most meaningful digital experiences help users <span className="text-[#1db954]">understand themselves</span>, not just consume more content.
          </p>
          
          <div className="space-y-4 text-white/50">
            <p>• Constraints enable creativity and clarity</p>
            <p>• Context is more valuable than content</p>
            <p>• Explaining "why" builds trust in recommendations</p>
            <p>• Finite choices can feel more generous than infinite ones</p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <FooterSection />

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

function KeyIdea({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h4 className="text-white/90 text-lg font-semibold mb-2">{title}</h4>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  )
}

function Difference({ before, after }: { before: string; after: string }) {
  return (
    <div className="flex items-center gap-6">
      <span className="text-white/30 line-through flex-1 text-right">{before}</span>
      <span className="text-[#1db954]">→</span>
      <span className="text-white/80 flex-1">{after}</span>
    </div>
  )
}

function Iteration({ change, reason }: { change: string; reason: string }) {
  return (
    <div className="border-l-2 border-[#1db954]/30 pl-6">
      <p className="text-white/80 mb-1">{change}</p>
      <p className="text-white/40 text-sm">{reason}</p>
    </div>
  )
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h4 className="text-white/80 mb-1">{title}</h4>
      <p className="text-white/40 text-sm">{description}</p>
    </div>
  )
}

function FooterSection() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
      className={`relative py-32 px-8 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-6">
          <a
            href="https://github.com/anushaxrama/your-music-journey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#1db954] hover:bg-[#1ed760] text-black font-semibold rounded-full transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Prototype
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm"
          >
            Back to Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
