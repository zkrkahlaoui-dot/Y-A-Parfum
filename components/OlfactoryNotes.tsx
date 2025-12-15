import React, { useState } from 'react';

const OlfactoryNotes: React.FC = () => {
  const [activeNote, setActiveNote] = useState<'top' | 'heart' | 'base'>('heart');

  const notes = {
    top: {
      title: "Top Notes",
      subtitle: "L'Envolée",
      desc: "The first impression. Light, volatile, and fleeting. These notes introduce the fragrance but evaporate quickly, usually within the first 15 minutes.",
      examples: "Citrus, Berries, Herbs",
      color: "bg-yellow-50"
    },
    heart: {
      title: "Heart Notes",
      subtitle: "Le Cœur",
      desc: "The soul of the perfume. Developing after the top notes fade, they last for 3-5 hours and define the fragrance's true character.",
      examples: "Rose, Jasmine, Spices",
      color: "bg-rose-50"
    },
    base: {
      title: "Base Notes",
      subtitle: "Le Sillage",
      desc: "The lasting memory. Heavy, rich molecules that linger on the skin for 6+ hours, providing depth and solidity to the composition.",
      examples: "Sandalwood, Musk, Vanilla, Amber",
      color: "bg-stone-100"
    }
  };

  return (
    <section className="py-24 px-6 bg-sand/30">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Visual Pyramid */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-4">
          <button 
            onClick={() => setActiveNote('top')}
            className={`w-48 h-32 clip-triangle-top transition-all duration-500 flex items-end justify-center pb-4 backdrop-blur-sm
              ${activeNote === 'top' ? 'bg-gold/80 scale-110 shadow-lg z-10' : 'bg-gold/20 hover:bg-gold/40'}`}
          >
            <span className={`text-xs uppercase tracking-widest font-bold ${activeNote === 'top' ? 'text-white' : 'text-charcoal'}`}>Top</span>
          </button>
          
          <button 
            onClick={() => setActiveNote('heart')}
            className={`w-64 h-32 transition-all duration-500 flex items-center justify-center backdrop-blur-sm
              ${activeNote === 'heart' ? 'bg-amber-600/80 scale-110 shadow-lg z-10' : 'bg-amber-600/20 hover:bg-amber-600/40'}`}
          >
            <span className={`text-xs uppercase tracking-widest font-bold ${activeNote === 'heart' ? 'text-white' : 'text-charcoal'}`}>Heart</span>
          </button>
          
          <button 
            onClick={() => setActiveNote('base')}
            className={`w-80 h-32 transition-all duration-500 flex items-start justify-center pt-4 backdrop-blur-sm
              ${activeNote === 'base' ? 'bg-charcoal/80 scale-110 shadow-lg z-10' : 'bg-charcoal/10 hover:bg-charcoal/30'}`}
          >
            <span className={`text-xs uppercase tracking-widest font-bold ${activeNote === 'base' ? 'text-white' : 'text-charcoal'}`}>Base</span>
          </button>
        </div>

        {/* Info Content */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden p-8 border border-charcoal/5 bg-white shadow-sm h-80 flex flex-col justify-center">
            <span className="text-9xl absolute -right-4 -top-8 text-stone-50 font-display select-none -z-10">
              {activeNote === 'top' ? 'I' : activeNote === 'heart' ? 'II' : 'III'}
            </span>
            
            <span className="text-gold text-sm tracking-[0.2em] uppercase mb-2 block transition-all duration-300">
              {notes[activeNote].subtitle}
            </span>
            <h3 className="text-4xl font-display text-charcoal mb-6 transition-all duration-300">
              {notes[activeNote].title}
            </h3>
            <p className="text-stone-600 font-serif text-lg leading-relaxed mb-8 transition-all duration-300">
              {notes[activeNote].desc}
            </p>
            <div className="flex items-center space-x-4 border-t border-stone-100 pt-6">
              <span className="text-xs uppercase tracking-widest text-stone-400">Key Notes:</span>
              <span className="text-charcoal font-medium">{notes[activeNote].examples}</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .clip-triangle-top {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </section>
  );
};

export default OlfactoryNotes;