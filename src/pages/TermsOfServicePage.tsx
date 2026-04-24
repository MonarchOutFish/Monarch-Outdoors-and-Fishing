import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0A0F0D]">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-12">Terms of Service</h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">2. Description of Service</h2>
            <p className="mb-4">
              We provide outdoor and fishing content, gear recommendations, and video entertainment. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">3. User Conduct</h2>
            <p className="mb-4">
              When interacting with our content, you agree to do so in a respectful manner. You must not use our website for any unlawful purposes or to conduct any activity that would violate the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">4. Affiliate Disclaimer</h2>
            <p className="mb-4">
              Some of the links on this website (such as those in the Gear Vault) may be affiliate links. This means that if you click on the link and make a purchase, we may receive a small commission at no extra cost to you. This helps support our adventures and content creation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, images, and video clips, is our property or the property of our content suppliers and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">6. Limitation of Liability</h2>
            <p className="mb-4">
              We shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages resulting from your use of this website or the gear recommended herein. Outdoor activities carry inherent risks; always practice safety and use equipment responsibly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
