import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
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
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you subscribe to our newsletter, interact with our content, or communicate with us. This may include your email address, name, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to communicate with you, send you the newsletter you subscribed to, improve our website and content, and to understand how users interact with our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">4. Third-Party Links</h2>
            <p className="mb-4">
              Occasionally, at our discretion, we may include or offer third-party products or services on our website (such as recommended gear). These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">5. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-widest text-orange-500">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:monarchoutdoorsandfishing@gmail.com" className="text-white hover:text-orange-500 underline">monarchoutdoorsandfishing@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
