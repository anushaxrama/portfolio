'use client'

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-0 right-0 z-50 p-6 md:p-8">
      <div className="flex gap-6 md:gap-8 text-white/60 text-xs md:text-sm font-light tracking-wider uppercase">
        <button
          onClick={() => scrollToSection('about')}
          className="hover:text-white transition-colors duration-300 cursor-pointer"
        >
          about
        </button>
        <button
          onClick={() => scrollToSection('resume')}
          className="hover:text-white transition-colors duration-300 cursor-pointer"
        >
          resume
        </button>
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
  )
}

