import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getPerfumeRecommendations, generatePerfumeVisual } from '../services/geminiService';
import { Perfume } from '../types';

// Extracted Card Component to handle individual image generation state
const PerfumeCard: React.FC<{ perfume: Perfume; index: number }> = ({ perfume, index }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchVisual = async () => {
      // Stagger requests slightly to be gentle on rate limits
      await new Promise(resolve => setTimeout(resolve, index * 600));
      
      const generated = await generatePerfumeVisual(perfume.name, perfume.description);
      if (mounted) {
        if (generated) setImageUrl(generated);
        setLoadingImage(false);
      }
    };

    fetchVisual();

    return () => { mounted = false; };
  }, [perfume, index]);

  // Fallback to a geometric seed if AI image fails or hasn't loaded yet (though we show loader)
  const fallbackImage = `https://picsum.photos/seed/${perfume.name.replace(/\s/g,'')}/400/500`;
  const displayImage = imageUrl || fallbackImage;

  return (
    <div className="group bg-white flex flex-col border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 transform hover:-translate-y-1 h-full">
      <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden flex items-center justify-center">
        {loadingImage && (
          <div className="absolute inset-0 z-10 bg-stone-50 flex flex-col items-center justify-center text-stone-300">
            <Loader2 className="animate-spin mb-2" size={24} />
            <span className="text-xs uppercase tracking-widest font-light">Designing Bottle...</span>
          </div>
        )}
        
        <img 
          src={displayImage}
          alt={perfume.name}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${imageUrl ? '' : 'mix-blend-multiply opacity-90'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8 flex flex-col flex-grow text-center">
        <span className="text-xs uppercase tracking-widest text-gold mb-2">{perfume.brand}</span>
        <h3 className="text-2xl font-display text-charcoal mb-4">{perfume.name}</h3>
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {perfume.notes.slice(0, 3).map((note, i) => (
            <span key={i} className="text-xs border border-stone-200 text-stone-500 px-2 py-1 rounded-full bg-stone-50">
              {note}
            </span>
          ))}
        </div>
        <p className="text-stone-600 font-serif text-sm leading-relaxed mb-6 flex-grow">
          {perfume.description}
        </p>
        
        <div className="flex justify-between items-center border-t border-stone-100 pt-6 mt-auto">
          <span className="font-serif italic text-stone-500">{perfume.price}</span>
          <button className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ScentFinder: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Perfume[] | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setRecommendations(null);
    
    // Simulate a minimum "thinking" time for UX elegance
    const minTime = new Promise(resolve => setTimeout(resolve, 1500));
    const dataPromise = getPerfumeRecommendations(input);
    
    const [_, data] = await Promise.all([minTime, dataPromise]);
    
    setRecommendations(data);
    setLoading(false);
  };

  return (
    <section id="atelier" className="py-24 px-6 bg-white relative">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold">The AI Atelier</span>
          <h2 className="text-4xl md:text-5xl font-display text-charcoal mt-4 mb-6">Find Your Signature</h2>
          <p className="text-charcoal/60 font-serif text-lg max-w-2xl mx-auto italic">
            Describe your ideal atmosphere, a cherished memory, or your favorite notes. 
            Our AI Sommelier will curate a bespoke selection and visualize it just for you.
          </p>
        </div>

        {/* Input Area */}
        <div className="max-w-2xl mx-auto mb-20">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'A rainy library in London with old books and Earl Grey tea'..."
              className="w-full bg-sand/50 border-b-2 border-charcoal/10 px-6 py-6 text-lg md:text-xl font-serif text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold transition-colors text-center"
            />
            <button 
              type="submit"
              disabled={loading || !input}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-charcoal hover:text-gold disabled:opacity-30 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            </button>
          </form>
        </div>

        {/* Results */}
        {recommendations && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 animate-fade-in">
            {recommendations.map((perfume, idx) => (
              <PerfumeCard key={`${perfume.name}-${idx}`} perfume={perfume} index={idx} />
            ))}
          </div>
        )}
        
        {/* Empty State / Hint */}
        {!recommendations && !loading && (
          <div className="flex justify-center space-x-4 text-stone-400 text-sm font-light tracking-wide">
            <span>Try: "Fresh citrus and basil for summer"</span>
            <span>•</span>
            <span>"Dark oud and rose for a gala"</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScentFinder;