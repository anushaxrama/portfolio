'use client'

import { useEffect, useState, useMemo } from 'react'
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

export default function NeuranNoteCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Back to Portfolio</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center justify-center px-6 pt-20 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <span className="text-purple-400 text-sm">Case Study</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="text-white">Neura</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Note</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
            AI-Powered Cognitive Note-Taking Platform
          </p>

          {/* Project Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Role</p>
              <p className="text-white">UX Designer & Researcher</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Timeline</p>
              <p className="text-white">6 weeks</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Tools</p>
              <p className="text-white">Figma, FigJam, Lovable</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Platform</p>
              <p className="text-white">Web Application</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section title="Overview" accent="purple">
        <p className="text-lg text-white/70 leading-relaxed">
          NeuraNote is an AI-powered note-taking platform designed to help learners move beyond passive note storage toward deep understanding and long-term retention. Unlike traditional note apps that prioritize speed and volume, NeuraNote is grounded in cognitive science principles such as <Highlight>retrieval practice</Highlight>, <Highlight>spacing</Highlight>, and <Highlight>metacognition</Highlight>.
        </p>
        <p className="text-lg text-white/70 leading-relaxed mt-6">
          This project explores how design can support how people actually learn, not just how they record information.
        </p>
      </Section>

      {/* Problem Statement */}
      <Section title="Problem Statement" accent="pink">
        <p className="text-lg text-white/70 leading-relaxed mb-8">
          Students and lifelong learners take extensive notes, but often:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ProblemCard icon="📖" text="Reread notes instead of actively engaging with them" />
          <ProblemCard icon="🤔" text="Confuse familiarity with understanding" />
          <ProblemCard icon="😰" text="Feel overwhelmed by large volumes of information" />
          <ProblemCard icon="❓" text="Lack feedback on what they actually know" />
        </div>
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10">
          <p className="text-xl text-white/80 italic text-center">
            "How might we design a note-taking experience that supports learning, retention, and self-awareness—without adding stress or pressure?"
          </p>
        </div>
      </Section>

      {/* Research Goals */}
      <Section title="Research" accent="blue">
        <h3 className="text-2xl font-bold text-white mb-6">Goals</h3>
        <p className="text-lg text-white/70 leading-relaxed mb-8">
          The goal of research was to understand:
        </p>
        <ul className="space-y-3 mb-12">
          <ListItem>How learners currently take and review notes</ListItem>
          <ListItem>What feels difficult or ineffective about studying</ListItem>
          <ListItem>How users perceive "knowing" vs. "recognizing" information</ListItem>
          <ListItem>Emotional responses to current productivity tools</ListItem>
        </ul>

        <h3 className="text-2xl font-bold text-white mb-6">Methods</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <MethodCard title="User Interviews" description="6 semi-structured interviews with college students & early-career professionals" />
          <MethodCard title="Competitive Analysis" description="Analysis of Notion, Apple Notes, and Obsidian" />
          <MethodCard title="Heuristic Evaluation" description="Evaluation of learning-focused tools" />
          <MethodCard title="Literature Review" description="Cognitive psychology research synthesis" />
        </div>
      </Section>

      {/* User Interviews */}
      <Section title="User Interviews" accent="cyan">
        <h3 className="text-2xl font-bold text-white mb-6">Participants</h3>
        <div className="flex flex-wrap gap-4 mb-12">
          <Tag>4 undergraduate students</Tag>
          <Tag>2 early-career professionals</Tag>
          <Tag>Mixed STEM and non-STEM backgrounds</Tag>
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">Key Quotes</h3>
        <div className="space-y-6">
          <QuoteCard 
            question="How do you usually review your notes?"
            answer="I reread them a lot. I highlight things, but I'm not sure it actually helps."
          />
          <QuoteCard 
            question="How do you know when you understand something?"
            answer="If it looks familiar, I assume I get it—until I'm tested."
          />
          <QuoteCard 
            question="What feels stressful about studying?"
            answer="Not knowing what I should focus on. Everything feels important."
          />
          <QuoteCard 
            question="What tools do you currently use?"
            answer="Notion or Google Docs, but they're more about organization than learning."
          />
        </div>
      </Section>

      {/* Key Insights */}
      <Section title="Key Insights" accent="green">
        <div className="space-y-8">
          <InsightCard 
            number="01"
            insight="Users rely heavily on rereading, even though they doubt its effectiveness."
            implication="Encourage active recall instead of passive review."
          />
          <InsightCard 
            number="02"
            insight="Familiarity is often mistaken for understanding."
            implication="Build mechanisms that reveal gaps in knowledge."
          />
          <InsightCard 
            number="03"
            insight="Users feel overwhelmed by large volumes of notes."
            implication="Surface only what matters most at a given time."
          />
          <InsightCard 
            number="04"
            insight="Productivity tools often increase anxiety rather than reduce it."
            implication="Use calm, non-judgmental language and avoid streaks or scores."
          />
        </div>
      </Section>

      {/* Persona */}
      <Section title="Primary Persona" accent="orange">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-white/10">
          <h3 className="text-3xl font-bold text-white mb-2">The Overwhelmed Learner</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-white/40 uppercase text-sm tracking-wider mb-3">Behaviors</h4>
              <ul className="space-y-2">
                <ListItem>Takes detailed notes</ListItem>
                <ListItem>Rereads often</ListItem>
                <ListItem>Unsure what to prioritize</ListItem>
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 uppercase text-sm tracking-wider mb-3">Values</h4>
              <ul className="space-y-2">
                <ListItem>Clarity over speed</ListItem>
                <ListItem>Deep understanding</ListItem>
                <ListItem>Stress-free learning</ListItem>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Design Principles */}
      <Section title="Design Principles" accent="purple">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PrincipleCard icon="🔄" title="Design for retrieval" description="Not rereading" />
          <PrincipleCard icon="📦" title="Reduce cognitive load" description="Through chunking" />
          <PrincipleCard icon="🪞" title="Support metacognition" description="Self-awareness of knowledge" />
          <PrincipleCard icon="🧘" title="Avoid anxiety-driven motivation" description="No streaks or pressure" />
          <PrincipleCard icon="🤖" title="Transparent AI" description="Optional and clear" />
        </div>
      </Section>

      {/* Design Process */}
      <Section title="Design Process" accent="pink">
        <h3 className="text-2xl font-bold text-white mb-6">Ideation & Deprioritized Ideas</h3>
        <p className="text-lg text-white/70 leading-relaxed mb-6">
          Early ideas that were deprioritized:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <DeprioritizedCard 
            idea="Flashcard-only systems" 
            reason="Encouraged memorization over understanding" 
          />
          <DeprioritizedCard 
            idea="Gamified study streaks" 
            reason="Increased pressure and anxiety" 
          />
          <DeprioritizedCard 
            idea="AI-generated summaries" 
            reason="Replaced thinking rather than supporting it" 
          />
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">Wireframes to Final</h3>
        <div className="space-y-6">
          <ProcessStep 
            stage="Low-Fidelity"
            focus="Concept-based note blocks, review flow centered on questions, minimal dashboard"
          />
          <ProcessStep 
            stage="Mid-Fidelity"
            focus="Reduced AI prompts, moved reflection into note flow, simplified navigation"
          />
          <ProcessStep 
            stage="High-Fidelity"
            focus="Polished visuals, calm color palette, refined micro-interactions"
          />
        </div>
      </Section>

      {/* Usability Testing */}
      <Section title="Usability Testing" accent="blue">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Method</h3>
            <p className="text-white/70 mb-4">4 usability tests with tasks including:</p>
            <ul className="space-y-2">
              <ListItem>Create a note</ListItem>
              <ListItem>Review a concept</ListItem>
              <ListItem>Use the concept map</ListItem>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Key Findings</h3>
            <ul className="space-y-2">
              <ListItem>Users skipped prompts if they felt intrusive</ListItem>
              <ListItem>Concept map was intuitive but needed clearer entry points</ListItem>
              <ListItem>Review felt calming when language was supportive</ListItem>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">Iterations Made</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <IterationCard before="Forced prompts" after="Dismissible and optional prompts" />
          <IterationCard before="Hidden concept map" after="Concept map previews added" />
          <IterationCard before="Urgent copy" after="Supportive, calm language" />
        </div>
      </Section>

      {/* Final Design */}
      <Section title="Final Design" accent="green">
        <h3 className="text-2xl font-bold text-white mb-8">Key Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon="📝"
            title="Concept-based Notes"
            description="Notes organized into focused concept blocks"
          />
          <FeatureCard 
            icon="🤖"
            title="AI Reflection Prompts"
            description="Gentle prompts to encourage deeper thinking"
          />
          <FeatureCard 
            icon="🗺️"
            title="Visual Concept Map"
            description="See your knowledge as connected ideas"
          />
          <FeatureCard 
            icon="🧘"
            title="Low-Pressure Review"
            description="Calm, supportive review experience"
          />
          <FeatureCard 
            icon="💪"
            title="Memory Strength"
            description="Indicators showing concept familiarity"
          />
          <FeatureCard 
            icon="📊"
            title="Insight Dashboard"
            description="Personalized learning analytics"
          />
        </div>
      </Section>

      {/* Accessibility & Ethics */}
      <Section title="Accessibility & Ethics" accent="cyan">
        <div className="grid md:grid-cols-2 gap-4">
          <EthicsCard icon="🚫" text="No streaks or penalties" />
          <EthicsCard icon="🎨" text="Adjustable motion and contrast" />
          <EthicsCard icon="🔍" text="Transparent AI suggestions" />
          <EthicsCard icon="🎮" text="User control over prompts" />
        </div>
      </Section>

      {/* Impact */}
      <Section title="Projected Impact" accent="purple">
        <p className="text-lg text-white/70 leading-relaxed mb-8">
          If implemented, success would be measured by:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <ImpactCard metric="Retrieval Use" description="Increased use of retrieval over rereading" />
          <ImpactCard metric="Confidence Accuracy" description="More accurate confidence judgments" />
          <ImpactCard metric="Anxiety Reduction" description="Reduced study anxiety" />
          <ImpactCard metric="Retention" description="Improved long-term retention" />
        </div>
      </Section>

      {/* Reflection */}
      <Section title="Reflection" accent="pink">
        <h3 className="text-2xl font-bold text-white mb-6">Key Learnings</h3>
        <div className="space-y-4 mb-12">
          <ReflectionCard text="Designing for cognition, not just usability" />
          <ReflectionCard text="Questioning productivity norms" />
          <ReflectionCard text="Treating AI as a collaborator, not an authority" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-6">Future Work</h3>
        <div className="flex flex-wrap gap-4">
          <Tag>Longitudinal testing</Tag>
          <Tag>Classroom pilots</Tag>
          <Tag>Collaboration features</Tag>
        </div>
      </Section>

      {/* Footer CTA */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want to see more?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/anushaxrama/neuranote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
            >
              Back to Portfolio
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

// Component definitions
function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  const accentColors: Record<string, string> = {
    purple: 'from-purple-500 to-purple-400',
    pink: 'from-pink-500 to-pink-400',
    blue: 'from-blue-500 to-blue-400',
    cyan: 'from-cyan-500 to-cyan-400',
    green: 'from-green-500 to-green-400',
    orange: 'from-orange-500 to-orange-400',
  }

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r ${accentColors[accent]} bg-clip-text text-transparent`}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-purple-400 font-medium">{children}</span>
}

function ProblemCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
      <span className="text-2xl mb-3 block">{icon}</span>
      <p className="text-white/70">{text}</p>
    </div>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-white/70">
      <span className="text-purple-400 mt-1">•</span>
      {children}
    </li>
  )
}

function MethodCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm">
      {children}
    </span>
  )
}

function QuoteCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <p className="text-white/50 text-sm mb-2">Q: {question}</p>
      <p className="text-white/90 italic">"{answer}"</p>
    </div>
  )
}

function InsightCard({ number, insight, implication }: { number: string; insight: string; implication: string }) {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10">
      <span className="text-green-400 text-sm font-mono mb-4 block">Insight {number}</span>
      <p className="text-white text-xl font-medium mb-4">{insight}</p>
      <div className="pt-4 border-t border-white/10">
        <span className="text-white/40 text-sm uppercase tracking-wider">Design Implication</span>
        <p className="text-white/70 mt-1">{implication}</p>
      </div>
    </div>
  )
}

function PrincipleCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center hover:border-purple-500/30 transition-all">
      <span className="text-3xl mb-3 block">{icon}</span>
      <h4 className="text-white font-semibold mb-1">{title}</h4>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  )
}

function DeprioritizedCard({ idea, reason }: { idea: string; reason: string }) {
  return (
    <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
      <p className="text-white font-medium mb-2 line-through opacity-60">{idea}</p>
      <p className="text-white/50 text-sm">{reason}</p>
    </div>
  )
}

function ProcessStep({ stage, focus }: { stage: string; focus: string }) {
  return (
    <div className="flex items-start gap-6">
      <div className="w-32 shrink-0">
        <span className="text-pink-400 font-medium">{stage}</span>
      </div>
      <p className="text-white/70">{focus}</p>
    </div>
  )
}

function IterationCard({ before, after }: { before: string; after: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <p className="text-white/40 text-sm line-through mb-2">{before}</p>
      <p className="text-green-400">→ {after}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10 hover:border-green-500/30 transition-all">
      <span className="text-3xl mb-3 block">{icon}</span>
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

function EthicsCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <p className="text-white/80">{text}</p>
    </div>
  )
}

function ImpactCard({ metric, description }: { metric: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
      <h4 className="text-purple-400 font-semibold mb-2">{metric}</h4>
      <p className="text-white/70">{description}</p>
    </div>
  )
}

function ReflectionCard({ text }: { text: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
      <span className="text-pink-400">✦</span>
      <p className="text-white/80">{text}</p>
    </div>
  )
}

