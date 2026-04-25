import React, { useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGear } from '../services/gearService';

export function GearVaultPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { gear, loading } = useGear();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0A0F0D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 font-bold uppercase text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-orange-600" />
            <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm">Full Inventory</h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic">The Gear Vault</h1>
          <p className="text-white/50 mt-4 max-w-2xl text-lg relative z-10">
            Every piece of equipment I use to catch monsters. Check stock status below.
          </p>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          </div>
        ) : gear.length > 0 ? (
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-8">
            {gear.map((item) => (
              <div key={item.id} className="group bg-[#0A1210] border border-white/5 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all shadow-xl flex flex-col h-full relative">
                <div className="p-6 pb-2 min-h-[120px] relative flex flex-col justify-end bg-white/5 border-b border-white/10">
                  <div className="absolute top-4 right-4 bg-orange-600 text-white font-black px-3 py-1 rounded-full text-xs">
                    {item.price}
                  </div>
                  <div className={`absolute top-4 left-4 font-black px-3 py-1 rounded-full text-[10px] tracking-widest uppercase ${item.inStock ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <h4 className="text-xl mt-8 font-black text-white uppercase tracking-tight">{item.name}</h4>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-white/50 text-xs italic mb-6 leading-relaxed flex-1">
                    "{item.description}"
                  </p>
                  <a href={item.link || '#'} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-xl font-bold uppercase transition-all flex items-center justify-center gap-2 text-xs border ${item.inStock ? 'bg-white/5 hover:bg-white text-white hover:text-black border-white/10 hover:border-white' : 'bg-white/5 border-white/5 text-white/30 cursor-not-allowed'}`}>
                    <ShoppingCart className="w-4 h-4" />
                    {item.inStock ? 'Check Availability' : 'Currently Unavailable'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/10 rounded-3xl bg-[#0A1210]">
            <ShoppingCart className="w-16 h-16 text-white/20 mb-4" />
            <h3 className="text-2xl font-black text-white uppercase mb-2">Nothing Listed</h3>
            <p className="text-white/50">There is currently no gear listed in the vault. Check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
