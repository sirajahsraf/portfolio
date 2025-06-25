import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-rich-brown text-cream px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-serif font-bold text-warm-yellow">Portfolio</h1>
        </div>

        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
          <button onClick={() => scrollToSection('about')} className="hover:text-warm-yellow transition-colors">About</button>
          <button onClick={() => scrollToSection('skills')} className="hover:text-warm-yellow transition-colors">Skills</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-warm-yellow transition-colors">Projects</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-warm-yellow transition-colors">Contact</button>
        </div>

        <Button
          className="hidden md:block bg-warm-yellow hover:bg-warm-yellow/80 text-gray-900 rounded-full font-medium transition-colors px-6"
          onClick={() => scrollToSection('contact')}
        >
          Let's Connect
        </Button>

        <button
          className="md:hidden text-warm-yellow"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-rich-brown border-t border-rich-brown/20 mt-4 pt-4">
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('about')} className="text-left hover:text-warm-yellow transition-colors">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-left hover:text-warm-yellow transition-colors">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="text-left hover:text-warm-yellow transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-left hover:text-warm-yellow transition-colors">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}
