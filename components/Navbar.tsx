'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 z-50 p-4 md:p-8">
      <div className="flex items-center gap-2 md:gap-8">
        <Link
          href="/about"
          className="group relative px-3 py-2 text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 touch-manipulation"
        >
          About
          <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
        <a
          href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-3 py-2 text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 touch-manipulation"
        >
          LinkedIn
          <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>
        <a
          href="mailto:arama@ucdavis.edu"
          className="group relative px-3 py-2 text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 touch-manipulation"
        >
          Email
          <span className="absolute bottom-1 left-3 right-3 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>
      </div>
    </nav>
  )
}
