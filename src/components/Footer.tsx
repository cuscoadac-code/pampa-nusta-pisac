import React from 'react';
import { Sparkles, MapPin, Award, HeartHandshake, Leaf, Compass, Trees, MessageCircle, ShieldCheck, Lock, RotateCcw, Activity, CheckCircle2, ChevronRight, CreditCard, Building2, Mountain, Instagram, Facebook, Youtube, Mail, Send, CheckCircle } from 'lucide-react';
import { ECOALDEA_MODULES } from '../data/ecoaldeaModules';

interface FooterProps {
  onSelectModule?: (moduleId: string) => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectModule, onOpenSecurityModal }) => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleSecurityClick = (tab: 'guarantee' | 'ssl' | 'altitude' | 'payments' = 'guarantee') => {
    if (onOpenSecurityModal) {
      onOpenSecurityModal(tab);
    } else {
      const el = document.getElementById('certificaciones-seguridad');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#050505] text-stone-300 border-t border-stone-800 overflow-hidden">
      {/* End Credits Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Vision (Takes up 4 cols on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="font-cinzel font-bold text-xl tracking-widest text-stone-50">
                PISAC
              </span>
            </div>
            <p className="text-sm font-sans leading-relaxed text-stone-400 font-light pr-4">
              Protegiendo la memoria ancestral del Valle Sagrado. Un santuario arqueológico, una reserva botánica de Wachuma y una ecoaldea sostenible vibrando en Ayni.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-400 transition-colors shadow-sm">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-400 transition-colors shadow-sm">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500 hover:text-amber-400 transition-colors shadow-sm">
                <Youtube className="w-4 h-4" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-100 mb-6 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-sky-500" />
              Explorar
            </h4>
            <ul className="space-y-3">
              {['El Santuario', 'Jardín Botánico', 'Recorrido 3D', 'Mecenazgo'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-stone-700 group-hover:bg-amber-500 transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-100 mb-6 flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-500" />
              Contacto Ecoaldea
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@pisacsacred.org" className="text-sm hover:text-amber-400 transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  info@pisacsacred.org
                </a>
              </li>
              <li>
                <div className="text-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed text-stone-400">
                    Sector Intihuatana s/n<br />
                    Pisac, Valle Sagrado<br />
                    Cusco, Perú
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bulletin */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-stone-100 mb-6">
              Bitácora Arqueológica
            </h4>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed font-light">
              Recibe crónicas mensuales sobre hallazgos, eventos astronómicos y avances en la restauración.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 relative">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm focus:outline-none focus:border-amber-500 transition-colors text-stone-100 placeholder-stone-600"
                  disabled={status === 'submitting' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-stone-800 hover:bg-amber-500 text-stone-300 hover:text-stone-950 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                  aria-label="Suscribirse"
                >
                  {status === 'submitting' ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {status === 'success' && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Suscripción confirmada
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* COMPLIANCE, RISK-FREE & CERTIFICATIONS IN FOOTER (TEXTUAL)    */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-12 mb-10 pt-8 pb-7 border-t border-stone-800 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-mono text-stone-400">
            <a href="https://ejemplo.com/ssl" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
              <Lock className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-500" />
              <span>SSL 256-Bit TLS 1.3</span>
            </a>
            <a href="https://ejemplo.com/pagos" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
              <CreditCard className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-500" />
              <span>Pagos Seguros (Yape · Plin · Tarjetas)</span>
            </a>
            <a href="https://ejemplo.com/garantia" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
              <RotateCcw className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-500" />
              <span>Garantía 100% Sin Penalidad</span>
            </a>
            <a href="https://ejemplo.com/altitud" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2 group">
              <Activity className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-500" />
              <span>Oxígeno & Aclimatación 3,347 msnm</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tech Badges */}
        <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 font-light">
            <Mountain className="w-3.5 h-3.5 text-stone-600" />
            <span>© {currentYear} Proyecto Pampa Ñusta Pisac.</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-stone-500 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Transparencia Financiera</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
