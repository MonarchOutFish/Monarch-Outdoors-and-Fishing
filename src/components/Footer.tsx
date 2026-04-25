import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Send, Instagram, Twitter, Facebook, ExternalLink, Youtube, Loader2, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../constants';
import { subscribeToNewsletter } from '../services/firebaseService';
import { Link, useLocation } from 'react-router-dom';
import { useGear } from '../services/gearService';

export function GearSection() {
  const { gear, loading } = useGear();
  // Only show first 3 items on the main page
  const featuredGear = gear.slice(0, 3);

  return (
    <section id="gear" className="py-24 bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-12 bg-orange-600" />
              <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm">Expert Approved</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic">The Gear Vault</h3>
          </div>
          <Link to="/gear" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            View All Essentials <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : featuredGear && featuredGear.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredGear.map((item) => (
              <Link to="/gear" key={item.id} className="block group bg-[#0A1210] border border-white/5 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all shadow-xl">
                <div className="p-8 pb-4 min-h-[100px] relative flex flex-col justify-end bg-white/5 border-b border-white/10">
                  <div className="absolute top-4 right-4 bg-orange-600 text-white font-black px-3 py-1 rounded-full text-xs">
                    {item.price}
                  </div>
                  <h4 className="text-xl mt-6 font-black text-white uppercase tracking-tight">{item.name}</h4>
                </div>
                <div className="p-8">
                  <p className="text-white/50 text-sm italic mb-6 leading-relaxed">
                    "{item.description}"
                  </p>
                  <div className="w-full bg-white/5 group-hover:bg-white text-white group-hover:text-black py-4 rounded-xl font-bold uppercase transition-all flex items-center justify-center gap-2 text-xs border border-white/10 group-hover:border-white">
                    <ShoppingCart className="w-4 h-4" />
                    Check It Out
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/10 rounded-3xl bg-[#0A1210]">
            <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-2xl font-black text-white uppercase mb-2">Nothing Listed</h3>
            <p className="text-white/50">There is currently no gear requested on the main page. Check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email.');
      return;
    }
    
    setStatus('loading');
    setErrorMessage('');
    
    try {
      await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-600 z-0" />
      <div className="absolute inset-0 opacity-10 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h3 className="text-4xl md:text-6xl font-black text-[#0A0F0D] uppercase italic mb-6 leading-[0.8]">
          Get My Best <br /> Fishing Spots & Tips
        </h3>
        <p className="text-[#0A0F0D]/70 text-lg md:text-xl font-bold uppercase mb-10 max-w-2xl mx-auto italic">
          No spam. Just top-tier locations, gear hacks, and early access to new drops.
        </p>
        
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 bg-white/10 p-8 rounded-3xl max-w-md mx-auto backdrop-blur-sm border-2 border-[#0A0F0D]/10"
          >
            <CheckCircle2 className="w-12 h-12 text-[#0A0F0D]" />
            <div>
              <p className="text-[#0A0F0D] font-black uppercase text-xl">You're on the list!</p>
              <p className="text-[#0A0F0D]/70 font-bold uppercase text-sm mt-1">Keep an eye on your inbox.</p>
            </div>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-[#0A0F0D] underline font-bold uppercase text-xs"
            >
              Subscribe another
            </button>
          </motion.div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex-1 relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL" 
                disabled={status === 'loading'}
                className={`w-full bg-white/20 border-2 ${status === 'error' ? 'border-red-600' : 'border-[#0A0F0D]'} rounded-full px-8 py-4 text-[#0A0F0D] font-black placeholder:text-[#0A0F0D]/40 focus:outline-none focus:bg-white transition-all uppercase text-sm`}
              />
              {status === 'error' && (
                <p className="absolute -bottom-6 left-4 text-red-600 font-bold text-xs uppercase">{errorMessage}</p>
              )}
            </div>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#0A0F0D] disabled:opacity-50 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  JOINING...
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  JOIN THE SQUAD
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0A0F0D] py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              {BRAND.logo.includes('.') ? (
                <img src={BRAND.logo} alt="Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center font-bold text-white">
                  {BRAND.logo}
                </div>
              )}
              <span className="font-bold text-2xl tracking-tighter text-white uppercase">
                {BRAND.logo === 'M' ? 'Monarch' : BRAND.fullName.split(' ')[0]}
              </span>
            </div>
            <p className="text-white/40 max-w-sm italic leading-relaxed uppercase text-xs font-bold tracking-wider">
              Capturing the raw beauty of the outdoors through the lens of a fisherman. Follow the journey.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Youtube, href: BRAND.youtubeUrl },
                { Icon: Instagram, href: BRAND.instagramUrl },
                { Icon: Twitter, href: BRAND.twitterUrl },
                { Icon: Facebook, href: BRAND.facebookUrl }
              ].map(({ Icon, href }, idx) => (
                <a 
                  key={idx} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange-500 hover:border-orange-500 transition-all font-bold"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">Navigation</h5>
            <ul className="space-y-4">
              {[
                { label: 'Latest Adventures', href: '/#latest' },
                { label: 'Video Library', href: '/#videos' },
                { label: `About ${BRAND.creatorName.split(' ')[0]}`, href: '/#about' },
                { label: 'Essential Gear', href: '/gear' },
                { label: 'Contact', href: 'mailto:monarchoutdoorsandfishing@gmail.com' },
                { label: 'Admin Dashboard', href: '/admin' },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('mailto:') || link.href.startsWith('http') || link.href.includes('#') ? (
                    <a href={link.href} className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{link.label}</a>
                  ) : (
                    <Link to={link.href} className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">Contact</h5>
            <p className="text-white/40 text-xs font-bold uppercase mb-4 tracking-widest">Inquiries & Partnerships</p>
            <a href="mailto:monarchoutdoorsandfishing@gmail.com" className="text-white font-black text-sm uppercase underline decoration-orange-600 decoration-2 underline-offset-4">monarchoutdoorsandfishing@gmail.com</a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
            © 2026 {BRAND.fullName.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-white/20 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms" className="text-white/20 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
