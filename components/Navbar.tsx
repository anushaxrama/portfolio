'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 z-50 p-4 md:p-6">
      <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08]">
        <Link
          href="/about"
          className="px-3 py-1.5 text-white/70 text-xs md:text-sm font-medium tracking-wide hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
        >
          About
        </Link>
        <a
          href="/Anusha_Ramachandran_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-white/70 text-xs md:text-sm font-medium tracking-wide hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
        >
          Resume
        </a>
        <a
          href="https://www.linkedin.com/in/anusha-ramachandran-45882724a"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-white/70 text-xs md:text-sm font-medium tracking-wide hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
        >
          LinkedIn
        </a>
        <a
          href="mailto:arama@ucdavis.edu"
          className="px-3 py-1.5 text-white/70 text-xs md:text-sm font-medium tracking-wide hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
        >
          Email
        </a>
      </div>
    </nav>
  )
}
