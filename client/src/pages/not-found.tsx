import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-8xl font-serif font-bold text-terracotta">404</h1>
          <h2 className="text-3xl font-serif font-semibold text-gray-900">
            Page not found
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Looks like this page decided to take a coding break.
            Let's get you back to something that exists!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-8 py-4 text-lg font-medium">
              <Home className="w-5 h-5 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="bg-warm-yellow/30 rounded-3xl p-8 mt-12">
          <div className="text-6xl font-mono mb-4 text-gray-700">{ }</div>
          <p className="text-gray-700 font-medium">
            // Debug mode: Route not found in portfolio.routes
          </p>
        </div>
      </div>
    </div>
  );
}
