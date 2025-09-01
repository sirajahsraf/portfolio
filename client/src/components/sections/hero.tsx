import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { PortfolioContent } from "@shared/schema";

export default function Hero() {
  const { data: heroContent } = useQuery<PortfolioContent>({
    queryKey: ['/api/portfolio/hero'],
    select: (data) => data,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-soft-blue relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-800 leading-tight tracking-tight">
                {heroContent?.title ? (
                  <>
                    {heroContent.title.split(' ').slice(0, 2).join(' ')}<br />
                    <span className="text-terracotta italic">{heroContent.title.split(' ').slice(2).join(' ')}</span>
                  </>
                ) : (
                    <>
                        A curious<br />
                    <span className="text-terracotta italic">    Builder-learner</span>
                    </>
                )}
              </h1>
              <p className="inline-block bg-sage/30 text-sage-900 dark:text-sage-100 px-4 py-2 rounded-xl font-semibold text-1.9xl shadow-sm border border-sage/40">
                Bio 
              </p>
              <p className="text-1.9xl text-gray-800 leading-relaxed max-w-lg">
                {heroContent?.description || "20 | Data Science undergrad | Diving into AI/ML, Code & startups | learning-failing-building software."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                className="bg-gray-900 text-cream hover:bg-gray-800 rounded-full px-8 py-4 text-lg font-medium transition-all hover:scale-105"
                onClick={() => scrollToSection('projects')}
              >
                <Eye className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-cream rounded-full px-8 py-4 text-lg font-medium transition-all hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>
          </div>

          <div className="relative lg:justify-self-end">
            {heroContent?.imageUrl ? (
              <div className="w-80 h-96 rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src={heroContent.imageUrl}
                  alt="Portfolio hero"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-80 h-96 bg-gradient-to-br from-terracotta via-sage to-warm-yellow rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="text-4xl font-mono mb-4">{ }</div>
                    <div className="text-lg font-medium">Building the future</div>
                    <div className="text-sm opacity-80 mt-2">one line at a time</div>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Code Elements */}
            <div className="absolute -top-4 -right-4 bg-warm-yellow text-gray-900 px-4 py-2 rounded-full font-mono text-sm font-semibold shadow-lg">
              console.log("hello world!");
            </div>
            <div className="absolute -bottom-4 -left-4 bg-terracotta text-white px-4 py-2 rounded-full font-mono text-sm font-semibold shadow-lg">
              git clone curiosity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
