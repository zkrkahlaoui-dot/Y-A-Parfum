import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=2564&auto=format&fit=crop" 
          alt="Perfume Bottle" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
        <span className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
          Elegance in every drop
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 tracking-wide drop-shadow-lg">
          L'Art du Parfum
        </h1>
        <p className="max-w-lg text-white/90 font-serif text-lg md:text-xl italic mb-12 leading-relaxed">
          "Perfume is the key to our memories."
        </p>
        
        <button 
          onClick={() => document.getElementById('atelier')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-3 border border-white text-white hover:bg-white hover:text-charcoal transition-all duration-500 uppercase tracking-widest text-xs md:text-sm"
        >
          Discover Your Scent
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
        <ChevronDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;