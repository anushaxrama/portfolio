const Navigation = () => {
  return (
    <nav className="fixed top-8 right-8 z-50 flex gap-8">
      <a
        href="#about"
        className="text-white/60 hover:text-white transition-colors text-sm font-light tracking-wider uppercase"
      >
        About
      </a>
      <a
        href="#resume"
        className="text-white/60 hover:text-white transition-colors text-sm font-light tracking-wider uppercase"
      >
        Resume
      </a>
      <a
        href="mailto:anusha@example.com"
        className="text-white/60 hover:text-white transition-colors text-sm font-light tracking-wider uppercase"
      >
        Email
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors text-sm font-light tracking-wider uppercase"
      >
        LinkedIn
      </a>
    </nav>
  );
};

export default Navigation;
