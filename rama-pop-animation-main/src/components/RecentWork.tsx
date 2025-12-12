const RecentWork = () => {
  const projects = [
    { title: "Project One", category: "Design & Development" },
    { title: "Project Two", category: "Creative Direction" },
    { title: "Project Three", category: "Web Design" },
  ];

  return (
    <section className="relative min-h-screen z-10 px-8 py-24 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tight uppercase">
          Recent Work
        </h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-t border-white/10 pt-8 hover:border-white/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:translate-x-4 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm tracking-wider uppercase">
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
