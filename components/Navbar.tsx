import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, Share2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    // Copies the current URL to the clipboard
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    
    // Hide the "Copied" message after 2 seconds
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-md py-2 border-b border-white/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className={`text-2xl font-display tracking-widest transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'} hover:text-gold`}>
            Y&A <span className="text-xs align-top opacity-80">PARFUM</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {['Collection', 'Maison', 'The Atelier', 'Journal'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className={`text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 font-sans ${
                isScrolled ? 'text-white/90' : 'text-white drop-shadow-md'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className={`hidden md:flex items-center space-x-6 ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>
          <button 
            onClick={handleShare}
            className="hover:text-gold transition-colors relative group"
            aria-label="Share this site"
          >
            <Share2 size={20} strokeWidth={1.5} />
            {/* Tooltip for desktop */}
            <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest bg-white text-charcoal px-3 py-1 transition-all duration-300 whitespace-nowrap ${showCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              Link Copied
            </span>
          </button>
          <button className="hover:text-gold transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="hover:text-gold transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-white' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl shadow-xl md:hidden py-8 px-6 flex flex-col space-y-6 border-t border-white/10">
           {['Collection', 'Maison', 'The Atelier', 'Journal'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-lg font-serif text-white hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => { handleShare(); }}
            className="text-lg font-serif text-white hover:text-gold transition-colors text-left flex items-center gap-3"
          >
            <span>Share Site</span>
            <Share2 size={16} />
            {showCopied && <span className="text-xs text-gold uppercase tracking-widest border border-gold px-2 py-0.5 ml-2">Copied</span>}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;