'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 z-50 p-6 md:p-8">
      <div className="flex items-center gap-6 md:gap-8">
        <Link
          href="/about"
          className="group relative text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300"
        >
          About
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
        </Link>
        <a
          href="/Anusha_Ramachandran_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300"
        >
          Resume
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
        </a>
        <a
          href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300"
        >
          LinkedIn
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
        </a>
        <a
          href="mailto:arama@ucdavis.edu"
          className="group relative text-white/80 text-sm font-medium tracking-wide hover:text-white transition-colors duration-300"
        >
          Email
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
        </a>
      </div>
    </nav>
  )
}
