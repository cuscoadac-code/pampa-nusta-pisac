import React from 'react';
import { Sparkles, MapPin, Award, HeartHandshake, Leaf, Compass, Trees, MessageCircle, ShieldCheck, Lock, RotateCcw, Activity, CheckCircle2, ChevronRight, CreditCard, Building2, Mountain, Instagram, Facebook, Youtube, Mail, Send, CheckCircle, FileText, Download, ExternalLink } from 'lucide-react';

import { useTranslation } from 'react-i18next';

interface FooterProps {
  onSelectModule?: (moduleId: string) => void;
  onOpenSecurityModal?: (tab?: 'guarantee' | 'ssl' | 'altitude' | 'payments') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectModule, onOpenSecurityModal }) => {
  const { t } = useTranslation();
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
    <footer className="relative bg-sadhana-sand text-sadhana-dark border-t border-sadhana-dark/10 overflow-hidden">
      {/* End Credits Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Vision (Takes up 4 cols on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-sadhana-primary/20 flex items-center justify-center text-sadhana-primary shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="font-sans font-extrabold text-xl tracking-widest text-sadhana-dark uppercase">
                Pampa Ñusta
              </span>
            </div>
            <p className="text-sm font-sans leading-relaxed text-sadhana-brown font-medium pr-4">
              {t('footer.brand.desc')}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-white border border-sadhana-dark/10 hover:border-sadhana-primary hover:text-sadhana-primary text-sadhana-brown transition-colors shadow-sm">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white border border-sadhana-dark/10 hover:border-sadhana-primary hover:text-sadhana-primary text-sadhana-brown transition-colors shadow-sm">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white border border-sadhana-dark/10 hover:border-sadhana-primary hover:text-sadhana-primary text-sadhana-brown transition-colors shadow-sm">
                <Youtube className="w-4 h-4" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest font-extrabold text-sadhana-dark mb-6 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-sadhana-primary" />
              {t('footer.explore.title')}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t('nav.inicio'), href: '#memoria-viva' },
                { label: t('nav.leyenda'), href: '#leyenda-originaria' },
                { label: t('nav.botanica'), href: '#ecoaldea-modulos' },
                { label: t('nav.identidad'), href: '#identidad-corporativa' },
                { label: t('nav.lideres'), href: '#guardianes' },
                { label: t('nav.media'), href: '#media-hub' },
                { label: t('nav.unirse'), href: '#como-unirse' },
                { label: t('nav.recorrido'), href: '#recorrido-360' },
                { label: t('nav.adopcion'), href: '#donaciones' }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm font-medium hover:text-sadhana-primary text-sadhana-brown transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-sadhana-dark/20 group-hover:bg-sadhana-primary transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest font-extrabold text-sadhana-dark mb-6 flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-sadhana-orange" />
              {t('footer.contact.title')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contacto@pampanusta.org" className="text-sm font-medium hover:text-sadhana-primary text-sadhana-brown transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-sadhana-dark/10 flex items-center justify-center text-sadhana-brown shadow-sm">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  contacto@pampañusta.org
                </a>
              </li>
              <li>
                <div className="text-sm font-medium flex items-start gap-3 text-sadhana-brown">
                  <div className="w-8 h-8 rounded-lg bg-white border border-sadhana-dark/10 flex items-center justify-center text-sadhana-brown shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed">
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
            <h4 className="font-mono text-xs uppercase tracking-widest font-extrabold text-sadhana-dark mb-6">
              {t('footer.newsletter.title')}
            </h4>
            <p className="text-xs text-sadhana-brown mb-4 leading-relaxed font-medium">
              {t('footer.newsletter.desc')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 relative">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={t('footer.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-white border border-sadhana-dark/10 text-sm focus:outline-none focus:border-sadhana-primary transition-colors text-sadhana-dark placeholder-sadhana-brown/60 shadow-inner"
                  disabled={status === 'submitting' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-sadhana-primary hover:bg-sadhana-orange text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 shadow-sm"
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
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {t('footer.newsletter.success')}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ESTATUTO — BLOQUE DE DESCARGA                                 */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-12 mb-8 pt-10 border-t border-sadhana-dark/10 relative z-10">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Fondo con gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-sadhana-dark/5 via-sadhana-primary/5 to-sadhana-sand/30 rounded-2xl" />
            <div className="absolute inset-0 border border-sadhana-primary/15 rounded-2xl" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7">
              {/* Ícono + Texto */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sadhana-dark flex items-center justify-center shadow-lg shrink-0">
                  <FileText className="w-6 h-6 text-sadhana-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-sadhana-primary">Documento Legal</span>
                    <span className="w-1 h-1 rounded-full bg-sadhana-dark/30" />
                    <span className="font-mono text-[10px] text-sadhana-brown/60 uppercase tracking-wider">PDF / Imprimible</span>
                  </div>
                  <h4 className="font-sans font-bold text-sadhana-dark text-base sm:text-lg leading-snug">
                    Estatuto Social — Asociación Civil Pampa Ñusta
                  </h4>
                  <p className="text-xs text-sadhana-brown/70 mt-1 font-medium">
                    Código Civil Peruano, Arts. 80–98 · SUNARP Zona X, Cusco · Documento Fundacional 2026
                  </p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="/estatuto-pampa-nusta.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-sadhana-dark/20 bg-white/70 text-sadhana-brown text-xs font-bold uppercase tracking-wider hover:border-sadhana-primary hover:text-sadhana-primary transition-all duration-200 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ver estatuto
                </a>
                <a
                  href="/estatuto-pampa-nusta.html"
                  onClick={(e) => {
                    e.preventDefault();
                    const w = window.open('/estatuto-pampa-nusta.html', '_blank');
                    if (w) setTimeout(() => w.print(), 800);
                  }}
                  className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sadhana-dark text-white text-xs font-bold uppercase tracking-wider overflow-hidden shadow-lg hover:shadow-sadhana-primary/20 hover:scale-[1.02] transition-all duration-200"
                >
                  <div className="absolute inset-0 bg-sadhana-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Download className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Descargar PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* COMPLIANCE */}
        <div className="mb-8 pb-2 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-mono font-bold text-sadhana-brown">
            <a href="https://ejemplo.com/ssl" target="_blank" rel="noopener noreferrer" className="hover:text-sadhana-primary transition-colors flex items-center gap-2 group">
              <Lock className="w-3.5 h-3.5 text-sadhana-primary/70 group-hover:text-sadhana-primary" />
              <span>SSL 256-Bit TLS 1.3</span>
            </a>
            <a href="https://ejemplo.com/pagos" target="_blank" rel="noopener noreferrer" className="hover:text-sadhana-primary transition-colors flex items-center gap-2 group">
              <CreditCard className="w-3.5 h-3.5 text-sadhana-primary/70 group-hover:text-sadhana-primary" />
              <span>Pagos Seguros</span>
            </a>
            <a href="https://ejemplo.com/garantia" target="_blank" rel="noopener noreferrer" className="hover:text-sadhana-primary transition-colors flex items-center gap-2 group">
              <RotateCcw className="w-3.5 h-3.5 text-sadhana-primary/70 group-hover:text-sadhana-primary" />
              <span>Garantía de Confianza</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tech Badges */}
        <div className="mt-8 pt-8 border-t border-sadhana-dark/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs font-mono text-sadhana-brown font-bold">
            <div className="flex items-center gap-2">
              <Mountain className="w-3.5 h-3.5 text-sadhana-primary/70" />
              <span>© {currentYear} Proyecto Pampa Ñusta Pisac.</span>
            </div>
            <span className="hidden md:inline text-sadhana-dark/20">|</span>
            <span className="text-sadhana-brown/80 font-sans text-[10px] md:text-xs tracking-wider">
              Desarrollado por <a href="https://www.cixlab.site" target="_blank" rel="noopener noreferrer" className="text-sadhana-primary hover:text-sadhana-orange transition-colors font-bold uppercase underline decoration-sadhana-primary/30 underline-offset-4">Cix Lab</a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-sadhana-brown/80 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-sadhana-dark transition-colors">{t('footer.legal.privacy')}</a>
            <a href="#" className="hover:text-sadhana-dark transition-colors">{t('footer.legal.transparency')}</a>
            <a href="#" className="hover:text-sadhana-dark transition-colors">{t('footer.legal.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
