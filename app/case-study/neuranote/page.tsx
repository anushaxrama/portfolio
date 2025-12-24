'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function NeuranNoteCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-white/40 text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Case Study
          </p>
          
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            NeuraNote
          </h1>
          
          <p className={`text-xl md:text-2xl text-white/50 max-w-2xl mb-16 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Designing an AI-powered note-taking platform grounded in cognitive science.
          </p>

          {/* Project Meta */}
          <div className={`flex flex-wrap gap-x-16 gap-y-6 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
              <p className="text-white/80">UX Designer & Researcher</p>
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-white/80">6 weeks</p>
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-wider mb-1">Tools</p>
              <p className="text-white/80">Figma, FigJam, Lovable</p>
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-wider mb-1">Platform</p>
              <p className="text-white/80">Web Application</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <Section>
        <SectionLabel>01</SectionLabel>
        <SectionTitle>Overview</SectionTitle>
        <div className="max-w-3xl">
          <p className="text-lg text-white/60 leading-relaxed mb-6">
            NeuraNote helps learners move beyond passive note storage toward deep understanding and long-term retention. Unlike traditional note apps that prioritize speed and volume, this platform is grounded in cognitive science principles—retrieval practice, spacing, and metacognition.
          </p>
          <p className="text-lg text-white/60 leading-relaxed">
            This project explores how design can support how people actually learn, not just how they record information.
          </p>
        </div>
      </Section>

      {/* Problem */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Problem</SectionTitle>
        <div className="max-w-3xl mb-12">
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            Students and lifelong learners take extensive notes, but existing tools prioritize organization over learning. Users end up spending more time studying without better outcomes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 max-w-3xl mb-16">
          <p className="text-white/50 border-l border-white/20 pl-6">Rereading notes instead of actively engaging</p>
          <p className="text-white/50 border-l border-white/20 pl-6">Confusing familiarity with understanding</p>
          <p className="text-white/50 border-l border-white/20 pl-6">Feeling overwhelmed by information volume</p>
          <p className="text-white/50 border-l border-white/20 pl-6">Lacking feedback on actual knowledge</p>
        </div>

        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl text-white/80 font-light italic leading-relaxed">
            "How might we design a note-taking experience that supports learning, retention, and self-awareness—without adding stress?"
          </p>
        </div>
      </Section>

      {/* Research */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Research</SectionTitle>
        
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Methods</h3>
            <ul className="space-y-3 text-white/60">
              <li>6 semi-structured user interviews</li>
              <li>Competitive analysis (Notion, Apple Notes, Obsidian)</li>
              <li>Heuristic evaluation of learning tools</li>
              <li>Cognitive psychology literature review</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Participants</h3>
            <ul className="space-y-3 text-white/60">
              <li>4 undergraduate students</li>
              <li>2 early-career professionals</li>
              <li>Mixed STEM and non-STEM backgrounds</li>
            </ul>
          </div>
        </div>

        <h3 className="text-white/40 uppercase tracking-wider text-sm mb-8">What We Heard</h3>
        <div className="space-y-8 max-w-3xl">
          <Quote text="I reread my notes a lot. I highlight things, but I'm not sure it actually helps." />
          <Quote text="If it looks familiar, I assume I get it—until I'm tested." />
          <Quote text="Not knowing what I should focus on. Everything feels important." />
          <Quote text="Notion and Google Docs are more about organization than learning." />
        </div>
      </Section>

      {/* Insights */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Key Insights</SectionTitle>
        
        <div className="space-y-16">
          <Insight 
            number="1"
            finding="Users rely heavily on rereading, even though they doubt its effectiveness."
            implication="Encourage active recall instead of passive review."
          />
          <Insight 
            number="2"
            finding="Familiarity is often mistaken for understanding."
            implication="Build mechanisms that reveal gaps in knowledge."
          />
          <Insight 
            number="3"
            finding="Users feel overwhelmed by large volumes of notes."
            implication="Surface only what matters most at a given time."
          />
          <Insight 
            number="4"
            finding="Productivity tools often increase anxiety rather than reduce it."
            implication="Use calm, non-judgmental language. Avoid streaks or scores."
          />
        </div>
      </Section>

      {/* Design Principles */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Design Principles</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10 max-w-4xl">
          <Principle title="Design for retrieval" description="Not rereading" />
          <Principle title="Reduce cognitive load" description="Through chunking" />
          <Principle title="Support metacognition" description="Self-awareness of knowledge" />
          <Principle title="Avoid anxiety-driven motivation" description="No streaks or pressure" />
          <Principle title="Make AI transparent" description="Optional and clear" />
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Design Process</SectionTitle>
        
        <div className="max-w-3xl mb-16">
          <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Deprioritized Ideas</h3>
          <div className="space-y-4 text-white/50">
            <p><span className="line-through">Flashcard-only systems</span> — encouraged memorization over understanding</p>
            <p><span className="line-through">Gamified study streaks</span> — increased pressure and anxiety</p>
            <p><span className="line-through">AI-generated summaries</span> — replaced thinking rather than supporting it</p>
          </div>
        </div>

        <div className="max-w-3xl">
          <h3 className="text-white/40 uppercase tracking-wider text-sm mb-8">Iteration</h3>
          <div className="space-y-8">
            <ProcessStage 
              stage="Low-fi" 
              description="Concept-based note blocks, review flow centered on questions, minimal dashboard" 
            />
            <ProcessStage 
              stage="Mid-fi" 
              description="Reduced AI prompts, moved reflection into note flow, simplified navigation" 
            />
            <ProcessStage 
              stage="High-fi" 
              description="Polished visuals, calm color palette, refined micro-interactions" 
            />
          </div>
        </div>
      </Section>

      {/* Testing */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Usability Testing</SectionTitle>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-4xl mb-16">
          <div>
            <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Findings</h3>
            <ul className="space-y-3 text-white/60">
              <li>Users skipped prompts if they felt intrusive</li>
              <li>Concept map needed clearer entry points</li>
              <li>Review felt calming when language was supportive</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Changes Made</h3>
            <ul className="space-y-3 text-white/60">
              <li>Prompts became dismissible and optional</li>
              <li>Added concept map previews</li>
              <li>Rewrote copy to remove urgency</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Final Design */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Final Design</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
          <Feature title="Concept-based Notes" description="Notes organized into focused concept blocks" />
          <Feature title="AI Reflection Prompts" description="Gentle prompts to encourage deeper thinking" />
          <Feature title="Visual Concept Map" description="Knowledge visualized as connected ideas" />
          <Feature title="Low-Pressure Review" description="Calm, supportive review experience" />
          <Feature title="Memory Strength Indicators" description="See how well you know each concept" />
          <Feature title="Insight Dashboard" description="Personalized learning analytics" />
        </div>
      </Section>

      {/* Ethics */}
      <Section>
        <SectionLabel>09</SectionLabel>
        <SectionTitle>Accessibility & Ethics</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl text-white/60">
          <p>No streaks or penalties</p>
          <p>Adjustable motion and contrast</p>
          <p>Transparent AI suggestions</p>
          <p>User control over prompts</p>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>10</SectionLabel>
        <SectionTitle>Reflection</SectionTitle>
        
        <div className="max-w-3xl">
          <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Key Learnings</h3>
          <ul className="space-y-3 text-white/60 mb-16">
            <li>Designing for cognition, not just usability</li>
            <li>Questioning productivity norms</li>
            <li>Treating AI as a collaborator, not an authority</li>
          </ul>

          <h3 className="text-white/40 uppercase tracking-wider text-sm mb-6">Future Work</h3>
          <p className="text-white/60">Longitudinal testing, classroom pilots, collaboration features</p>
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
    <p className="text-white/20 text-sm font-mono mb-4">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
  )
}

function Quote({ text }: { text: string }) {
  return (
    <p className="text-white/70 text-lg italic border-l-2 border-white/20 pl-6">
      "{text}"
    </p>
  )
}

function Insight({ number, finding, implication }: { number: string; finding: string; implication: string }) {
  return (
    <div className="grid lg:grid-cols-[1fr,2fr] gap-8 max-w-4xl">
      <div>
        <span className="text-white/20 text-6xl font-light">{number}</span>
      </div>
      <div>
        <p className="text-white/80 text-xl mb-4">{finding}</p>
        <p className="text-white/40">→ {implication}</p>
      </div>
    </div>
  )
}

function Principle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h4 className="text-white/80 mb-1">{title}</h4>
      <p className="text-white/40 text-sm">{description}</p>
    </div>
  )
}

function ProcessStage({ stage, description }: { stage: string; description: string }) {
  return (
    <div className="grid grid-cols-[100px,1fr] gap-8">
      <span className="text-white/30">{stage}</span>
      <p className="text-white/60">{description}</p>
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
            href="https://github.com/anushaxrama/neuranote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm"
          >
            View on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
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
