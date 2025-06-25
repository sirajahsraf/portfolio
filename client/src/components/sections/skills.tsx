export default function Skills() {
  const skills = [
    { name: "React & Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Python", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "TensorFlow", category: "AI/ML" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Git & GitHub", category: "Tools" },
    { name: "Docker", category: "DevOps" },
    { name: "Jupyter", category: "Data Science" },
    { name: "OpenAI API", category: "AI/ML" },
    { name: "MongoDB", category: "Database" }
  ];

  return (
    <section id="skills" className="bg-warm-yellow py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            My toolkit
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Technologies I use to bring ideas to life, constantly evolving as I learn
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="font-semibold text-gray-900 mb-2">{skill.name}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{skill.category}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 font-medium">
            Always learning something new →
          </p>
        </div>
      </div>
    </section>
  );
}
