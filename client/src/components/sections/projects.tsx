import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    select: (data) => data.filter(project => project.featured),
  });

  return (
    <section id="projects" className="bg-soft-blue py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            Featured work
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Projects that challenged me, taught me, and made me a better builder
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {project.imageUrl ? (
                  <div className="aspect-[4/3] rounded-2xl mb-6 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-terracotta via-sage to-warm-yellow rounded-2xl mb-6 flex items-center justify-center">
                    <div className="text-6xl text-white/80 font-mono">{ }</div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="text-gray-400 hover:text-terracotta transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} className="text-gray-400 hover:text-terracotta transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{project.description}</p>

                  {project.tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button className="bg-gray-900 text-cream hover:bg-gray-800 rounded-full px-8 py-4 text-lg font-medium transition-all hover:scale-105">
            <Github className="w-5 h-5 mr-2" />
            View All on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
