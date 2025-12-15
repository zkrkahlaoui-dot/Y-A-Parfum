import React, { useState } from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-sand py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="md:col-span-1">
          <a href="#" className="block mb-8 text-3xl font-display text-white tracking-widest hover:text-gold transition-colors">
            Y&A <span className="text-sm align-top opacity-60">PARFUM</span>
          </a>
          <p className="text-white/40 font-serif text-sm leading-relaxed">
            Curating the world's finest olfactory experiences through the lens of artificial intelligence and timeless tradition.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest mb-6">Maison</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">The Noses</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest mb-6">Service</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Book a Consultation</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest mb-6">Newsletter</h4>
          <p className="text-white/40 text-sm mb-4">Subscribe for exclusive drops and olfactory tales.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent w-full outline-none text-white placeholder-white/20 font-serif"
            />
            <button className="text-xs uppercase tracking-widest text-gold hover:text-white transition-colors">Join</button>
          </div>
          <div className="flex space-x-4 mt-8 text-white/40">
            <Instagram size={18} className="hover:text-white cursor-pointer transition-colors" />
            <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
            <Facebook size={18} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/20">
        <p>© 2024 Y&A Parfum. All rights reserved.</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;