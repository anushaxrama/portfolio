'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center">
        <Link 
          href="/"
          className="text-white/60 text-sm font-light tracking-wider lowercase hover:text-white transition-colors"
        >
          ← back
        </Link>
        <div className="flex gap-6 md:gap-8 text-white/60 text-xs md:text-sm font-light tracking-wider lowercase">
          <a
            href="mailto:anusharama100@gmail.com"
            className="hover:text-white transition-colors duration-300"
          >
            email
          </a>
          <a
            href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            linkedin
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Photo */}
          <div 
            className={`relative transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Photo placeholder - replace src with your actual photo */}
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
              {/* Replace this with your actual image */}
              {/* <Image
                src="/your-photo.jpg"
                alt="Anusha Ramachandran"
                fill
                className="object-cover"
                priority
              /> */}
              
              {/* Placeholder until you add your photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/30 text-sm tracking-wider">your photo here</p>
              </div>
              
              {/* Subtle border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl blur-3xl -z-10" />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-12">
            {/* Greeting */}
            <div 
              className={`transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">About</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2">
                Hey,
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white/80">
                I'm Anusha.
              </h2>
            </div>

            {/* Intro */}
            <div 
              className={`transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                I'm a product designer exploring the intersection of cognition, technology, and human-centered design.
              </p>
            </div>

            {/* Main Description */}
            <div 
              className={`space-y-6 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-base text-white/50 leading-relaxed">
                I design digital experiences that help people understand, reflect, and make sense of complex systems — whether that's learning, decision-making, or AI-driven products. My work often focuses on clarity over clutter, meaning over metrics, and designing interfaces that respect how people actually think and feel.
              </p>
              <p className="text-base text-white/50 leading-relaxed">
                With a background in Computational Cognitive Science and Computer Science, I bring a research-driven mindset to design, grounding visual decisions in user behavior, mental models, and evidence. I'm especially interested in problems where technology needs to feel more transparent, humane, and intentional — particularly in learning tools, AI-powered systems, and data-heavy products.
              </p>
              <p className="text-base text-white/50 leading-relaxed">
                I thrive in ambiguous spaces — early-stage ideas, evolving requirements, and projects where design is as much about asking the right questions as it is about crafting polished interfaces. My approach blends systems thinking, storytelling, and iteration, with a strong bias toward simplicity and purpose.
              </p>
            </div>

            {/* What I Care About */}
            <div 
              className={`transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-6">What I Care About</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/50">
                  <span className="text-white/30 mt-1">—</span>
                  <span>Designing for understanding, not just engagement</span>
                </li>
                <li className="flex items-start gap-3 text-white/50">
                  <span className="text-white/30 mt-1">—</span>
                  <span>Making complex systems feel approachable and trustworthy</span>
                </li>
                <li className="flex items-start gap-3 text-white/50">
                  <span className="text-white/30 mt-1">—</span>
                  <span>Bridging research, UX strategy, and visual design</span>
                </li>
                <li className="flex items-start gap-3 text-white/50">
                  <span className="text-white/30 mt-1">—</span>
                  <span>Creating products that people return to because they're meaningful — not addictive</span>
                </li>
              </ul>
            </div>

            {/* When I'm Not Designing */}
            <div 
              className={`transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-6">When I'm Not Designing</h3>
              <p className="text-white/50 mb-4">You'll probably find me:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  'exploring new cities',
                  'working out',
                  'long walks',
                  'curating mood playlists',
                  'creative side projects',
                  'good food & coffee with friends'
                ].map((item, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Closing */}
            <div 
              className={`pt-8 border-t border-white/10 transition-all duration-700 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-white/50 leading-relaxed mb-8">
                I love meeting new people, talking about ideas, and learning from different perspectives — so feel free to reach out. I'm always happy to chat ✨
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:anusharama100@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all"
                >
                  <span>Get in touch</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all"
                >
                  <span>LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

