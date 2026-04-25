import { motion } from 'motion/react';
import { Youtube, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { BRAND, STATS } from '../constants';
import { useYouTube } from '../context/YouTubeContext';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-[#0A0F0D]/90 backdrop-blur-md border-white/10 py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {BRAND.logo.includes('.') ? (
            <img src={BRAND.logo} alt="Logo" className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-12 h-12 bg-orange-600 rounded flex items-center justify-center font-bold text-white text-xl">
              {BRAND.logo}
            </div>
          )}
          <span className="font-bold text-xl tracking-tighter text-white uppercase">
            {BRAND.logo === 'M' ? 'Monarch' : BRAND.fullName.split(' ' )[0]}
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Latest', 'Videos', 'About', 'Gear'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-orange-500 transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
          <a 
            href={BRAND.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/20"
          >
            <Youtube className="w-4 h-4" />
            SUBSCRIBE
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-[#0A0F0D] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {['Latest', 'Videos', 'About', 'Gear'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`}
              className="text-lg font-bold text-white uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href={BRAND.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold"
          >
            <Youtube className="w-5 h-5" />
            SUBSCRIBE ON YOUTUBE
          </a>
        </motion.div>
      )}
    </nav>
  );
}

export function Hero() {
  const { getFormattedStat } = useYouTube();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={BRAND.heroBackground} 
          alt="Fishing at dawn" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F0D] via-[#0A0F0D]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] mb-6 uppercase italic">
            Set out <br />
            to be a <br />
            <span className="text-orange-500">Legendary</span> <br />
            Angler.
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
            Join thousands watching raw outdoor adventures, expert techniques, and the pursuit of monsters every single week.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById('latest');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#0A0F0D] px-8 py-4 rounded-full font-black uppercase text-sm flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all w-full sm:w-auto justify-center group"
            >
              Watch Latest Video
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#videos"
              className="bg-transparent border-2 border-white/20 text-white hover:border-white transition-all px-8 py-4 rounded-full font-black uppercase text-sm w-full sm:w-auto text-center"
            >
              Browse All Videos
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Meta Stats */}
      <div className="hidden lg:block absolute bottom-12 right-6 z-10">
        <div className="flex flex-col gap-8 text-right border-r-2 border-orange-600 pr-6">
          {STATS.slice(0, 2).map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black text-white">{getFormattedStat(stat.label, stat.value)}</div>
              <div className="text-xs font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
