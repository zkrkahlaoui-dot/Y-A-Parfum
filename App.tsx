import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScentFinder from './components/ScentFinder';
import OlfactoryNotes from './components/OlfactoryNotes';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 overflow-x-hidden selection:bg-gold/30 selection:text-charcoal animate-fade-in">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Intro Text */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-charcoal/80">
              "A perfume is like a piece of clothing, a message, a way of presenting oneself, a costume that differs according to the woman who wears it."
            </p>
            <span className="block mt-6 text-xs uppercase tracking-widest text-gold font-bold">— Paloma Picasso</span>
          </div>
        </section>

        <ScentFinder />
        
        <OlfactoryNotes />

        {/* Featured Collection Teaser */}
        <section id="collection" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold">The Collection</span>
                <h2 className="text-4xl font-display text-charcoal mt-2">Curated Excellences</h2>
              </div>
              <a href="#" className="hidden md:block text-xs uppercase tracking-widest border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors">View All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Nuit de Sable", brand: "L'Artisan", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop" },
                { name: "Santal 33", brand: "Le Labo", img: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop" },
                { name: "Baccarat Rouge", brand: "Maison FK", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop" },
                { name: "Gypsy Water", brand: "Byredo", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop" }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-6 bg-stone-100 relative">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-charcoal px-6 py-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      Quick View
                    </button>
                  </div>
                  <span className="block text-xs text-stone-500 uppercase tracking-widest mb-1">{item.brand}</span>
                  <h3 className="text-lg font-display text-charcoal group-hover:text-gold transition-colors">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}

export default App;