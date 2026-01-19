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
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <Link 
          href="/"
          className="text-white/60 text-sm font-light tracking-wider lowercase hover:text-white transition-colors"
        >
          ← back
        </Link>
        <div className="flex gap-6 md:gap-8 text-white/60 text-xs md:text-sm font-light tracking-wider lowercase">
          <a
            href="mailto:arama@ucdavis.edu"
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
        {/* Mobile: text first, then photo. Desktop: side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Photo & Info - Order 2 on mobile, Order 1 on desktop */}
          <div 
            className={`relative order-2 lg:order-1 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Photo - Smaller on mobile */}
            <div className="relative aspect-[3/4] w-48 md:w-64 lg:w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/newlongsleeves.png"
                alt="Anusha Ramachandran"
                fill
                className="object-cover object-[center_20%]"
                priority
              />
              {/* Subtle border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl blur-3xl -z-10" />

            {/* Info Cards Under Photo - Hidden on mobile, shown on desktop */}
            <div 
              className={`hidden lg:block mt-8 space-y-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Location */}
              <div className="flex items-center gap-3 text-white/50">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm">Pleasanton, California</span>
              </div>

              {/* Education */}
              <div className="flex items-center gap-3 text-white/50">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span className="text-sm">UC Davis — Cognitive Science & CS</span>
              </div>

              {/* Focus */}
              <div className="flex items-center gap-3 text-white/50">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-sm">Product & UX Design</span>
              </div>

              {/* Currently */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Currently</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Looking for full-time product design roles where I can contribute to meaningful, user-centered work.
                </p>
              </div>
            </div>
          </div>

          {/* Content - Order 1 on mobile, Order 2 on desktop */}
          <div className="space-y-10 order-1 lg:order-2">
            {/* Greeting */}
            <div 
              className={`transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">About</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Hi, I'm Anusha.
              </h1>
            </div>

            {/* Intro */}
            <div 
              className={`transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-lg text-white/70 leading-relaxed">
                I'm a product designer working across different types of digital products, from early ideas to more complex systems. I'm especially interested in problems where design supports thinking, learning, and decision-making.
              </p>
            </div>

            {/* Main Description */}
            <div 
              className={`space-y-5 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-base text-white/50 leading-relaxed">
                I care about how design choices shape understanding and trust, but I also care about how things feel. I like working on experiences that are clear and intentional, with visual decisions that support meaning rather than distract from it. I pay close attention to details like hierarchy, spacing, and tone, especially in moments where users need a bit more clarity. My goal is to reduce guesswork and help people feel comfortable moving through a product.
              </p>
              <p className="text-base text-white/50 leading-relaxed">
                My background is in Computational Cognitive Science and Computer Science, and it strongly influences how I approach design. I start by thinking about how people interpret what they see and what they expect to happen next. Research, mental models, and observed behavior guide my decisions before I move into visuals or interactions. I enjoy making things feel simple, even when the problem is not.
              </p>
              <p className="text-base text-white/50 leading-relaxed">
                I'm comfortable working in early or ambiguous problem spaces. I like collaborating through evolving requirements and open questions. I care about structure, consistency, and systems that continue to make sense as a product grows.
              </p>
            </div>

            {/* When I'm Not Designing */}
            <div 
              className={`transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-5">When I'm not designing</h3>
              <p className="text-white/50 text-sm mb-5">You'll usually find me:</p>
              <ul className="space-y-3">
                {[
                  'Exploring new cities',
                  'At the gym or on a long walk',
                  'Making monthly playlists',
                  'Jumping between creative side projects',
                  'Getting good food or coffee with friends',
                ].map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-3 text-white/60 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Excites Me */}
            <div 
              className={`transition-all duration-700 delay-450 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-5">What excites me right now</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'AI-assisted design tools',
                  'Designing for trust & transparency',
                  'Cognitive psychology in UX',
                  'Complex system simplification',
                  'Accessible design patterns',
                ].map((item, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-white/70 text-sm hover:border-purple-500/40 hover:text-white/90 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Closing */}
            <div 
              className={`pt-8 border-t border-white/10 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-white/50 leading-relaxed mb-6">
                I enjoy meeting new people and talking through ideas, so feel free to reach out. I'm always happy to chat.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:arama@ucdavis.edu"
                  className="relative z-30 inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all touch-manipulation"
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
                  className="relative z-30 inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all touch-manipulation"
                >
                  <span>LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>

              {/* Mobile Info Cards - Show only on mobile */}
              <div className="lg:hidden mt-8 pt-8 border-t border-white/10 space-y-4">
                <div className="flex flex-wrap gap-3 text-white/50 text-sm">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Pleasanton, CA
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    UC Davis
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Product Design
                  </span>
                </div>
              </div>

              {/* Back to Portfolio */}
              <div className="mt-8">
                <Link
                  href="/"
                  className="relative z-30 inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white transition-colors text-sm touch-manipulation"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Back to Portfolio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
