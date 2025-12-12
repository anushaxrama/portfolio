const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center z-10">
        <h1 className="font-black text-white tracking-tight uppercase">
          <span className="block text-7xl md:text-9xl">Anusha</span>
          <span className="block text-5xl md:text-7xl">Ramachandran</span>
        </h1>
        <p className="mt-8 text-white/60 text-sm tracking-widest uppercase animate-pulse">
          Scroll Anywhere
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
