'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <nav className="fixed top-0 right-0 z-50 p-4 md:p-8">
      <div className="flex items-center gap-2 md:gap-8">
        <button
          onClick={toggleFullscreen}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center p-3 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5 touch-manipulation"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen (hide browser tabs for screen share)'}
        >
          {isFullscreen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>
        <Link
          href="/about"
          className="group relative min-h-[44px] flex items-center px-4 py-3 text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 touch-manipulation"
        >
          About
          <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
        <a
          href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative min-h-[44px] flex items-center px-4 py-3 text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 touch-manipulation"
        >
          LinkedIn
          <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>
        <a
          href="mailto:arama@ucdavis.edu"
          className="group relative min-h-[44px] flex items-center px-4 py-3 text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 touch-manipulation"
        >
          Email
          <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>
      </div>
    </nav>
  )
}
