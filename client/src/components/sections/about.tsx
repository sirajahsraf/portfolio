import React from "react";

export default function About() {
  return (
    <section className="bg-rich-brown text-cream py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-7xl font-serif font-bold text-warm-yellow mb-8 leading-tight">
              My approach
            </h2>
            <p className="text-3xl text-blue max-w-2xl">
              I believe the best way to master technology is by building real
              solutions to real problems. 
            </p>
                    <div className="text-xl text-cream max-w-2xl">
                        <p>
                          Awaiting AGI but
                          Currently straching my head over these.
                        </p>
                         </div>
            <ul className="text-xl text-cream max-w-1.7xl list-disc pl-5 space-y-2">
              <li> AI inference & training</li>
              <li> Experimenting with agentic AI</li>
              <li> Building GenAI tools</li>
              <li> Workflow automation</li>
              <li> Content creation casually </li>
              <li> rapid prototyping stuffs </li>
            </ul>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-5xl font-bold text-warm-yellow">2+</div>
                <div className="text-lg text-cream mt-2">Years Learning</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-warm-yellow">15+</div>
                <div className="text-lg text-cream mt-2">Projects Built</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-cream mb-2">
                  Always Learning
                </div>
                <div className="text-lg text-cream opacity-80">
                  Building • Failing • Iterating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
