import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-cream py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h4 className="text-3xl font-serif font-bold text-warm-yellow">Thanks for stopping by</h4>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Always excited to connect with fellow builders, learners, and curious minds.
              Let's create something amazing together.
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#" className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-terracotta transition-all hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-sage transition-all hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center hover:bg-warm-yellow hover:text-gray-900 transition-all hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Portfolio. Built with passion and curiosity.</p>
            <div className="mt-2 text-sm font-mono opacity-60 italic">
            // yo! Gang,Keep learning,peace out ✌️
            </div>
        </div>
      </div>
    </footer>
  );
}
