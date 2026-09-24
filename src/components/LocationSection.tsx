import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Mountain, 
  Car, 
  Eye, 
  ChevronRight, 
  Compass 
} from 'lucide-react';

interface LocationSectionProps {
  onOpenJourney: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenJourney }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="como-llegar" 
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0a1610] text-sadhana-sand overflow-hidden font-sans"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-sadhana-primary rounded-full blur-[150px] opacity-10"></div>
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-sadhana-orange rounded-full blur-[150px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className={`flex flex-col items-center text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center gap-3 mb-4 text-sadhana-primary">
            <MapPin size={24} />
            <h2 className="text-4xl md:text-6xl font-cinzel tracking-widest text-white uppercase">
              Cómo Llegar
            </h2>
            <MapPin size={24} />
          </div>
          
          <p className="text-xl md:text-2xl text-sadhana-sand/80 font-light tracking-wide mb-8 max-w-2xl">
            Sector Intihuatana s/n, Pisac, Valle Sagrado, Cusco, Perú
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-sadhana-primary/30 bg-sadhana-dark/20 backdrop-blur-sm">
              <Mountain size={18} className="text-sadhana-primary" />
              <span className="font-medium tracking-wider">3,347 m.s.n.m.</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 rounded-full border border-sadhana-orange/30 bg-sadhana-dark/20 backdrop-blur-sm">
              <Navigation size={18} className="text-sadhana-orange" />
              <span className="font-medium tracking-wider">-13.4225, -71.8488</span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center w-full mb-20 opacity-30">
          <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent to-sadhana-sand"></div>
          <Compass size={24} className="mx-4 text-sadhana-sand animate-[spin_10s_linear_infinite]" />
          <div className="h-[1px] w-1/4 bg-gradient-to-l from-transparent to-sadhana-sand"></div>
        </div>

        {/* Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {/* Card 1 */}
          <div className={`p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="w-14 h-14 rounded-full bg-sadhana-dark/50 flex items-center justify-center mb-6 border border-sadhana-primary/20 group-hover:border-sadhana-primary/50 transition-colors">
              <Clock size={28} className="text-sadhana-primary" />
            </div>
            <h3 className="text-2xl font-cinzel text-white mb-4 tracking-wider">Desde Cusco</h3>
            <p className="text-sadhana-sand/70 leading-relaxed text-lg font-light">
              1h 30min por carretera asfaltada. <br/>
              <span className="text-sadhana-sand mt-2 block">Ruta: Cusco <ChevronRight size={14} className="inline opacity-50"/> Ccorao <ChevronRight size={14} className="inline opacity-50"/> Pisac <ChevronRight size={14} className="inline opacity-50"/> Pampa Ñusta</span>
            </p>
          </div>

          {/* Card 2 */}
          <div className={`p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
            <div className="w-14 h-14 rounded-full bg-sadhana-dark/50 flex items-center justify-center mb-6 border border-sadhana-orange/20 group-hover:border-sadhana-orange/50 transition-colors">
              <Navigation size={28} className="text-sadhana-orange" />
            </div>
            <h3 className="text-2xl font-cinzel text-white mb-4 tracking-wider">Desde Ollantaytambo</h3>
            <p className="text-sadhana-sand/70 leading-relaxed text-lg font-light">
              45 min por el Valle Sagrado. Ruta escénica siguiendo el río Vilcanota a través de paisajes inolvidables.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '600ms' }}>
            <div className="w-14 h-14 rounded-full bg-sadhana-dark/50 flex items-center justify-center mb-6 border border-white/20 group-hover:border-white/50 transition-colors">
              <Car size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-cinzel text-white mb-4 tracking-wider">Transporte</h3>
            <p className="text-sadhana-sand/70 leading-relaxed text-lg font-light">
              Colectivos desde Cusco (S/. 10), taxi privado, o servicio de recojo coordinado directamente con nosotros.
            </p>
          </div>
        </div>

        {/* Hero Action */}
        <div className={`relative w-full rounded-3xl overflow-hidden border border-white/10 group cursor-pointer ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-1000 delay-700`} onClick={onOpenJourney}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
          {/* Dark fallback background */}
          <div className="absolute inset-0 bg-[#0f1110] z-0"></div>
          
          <div className="relative z-20 flex flex-col items-center justify-center py-32 px-6 text-center">
            <button 
              className="group/btn relative flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-sadhana-primary to-[#0f4d25] rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,174,66,0.3)] hover:shadow-[0_0_60px_rgba(0,174,66,0.5)] transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sadhana-orange to-sadhana-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              <Eye size={28} className="relative z-10 text-white group-hover/btn:animate-pulse" />
              <span className="relative z-10 text-2xl font-cinzel text-white tracking-widest uppercase">
                Ver el Lugar
              </span>
            </button>
            <p className="mt-8 text-xl text-sadhana-sand/80 font-light tracking-wide group-hover:text-white transition-colors duration-300">
              Experiencia inmersiva de llegada al santuario
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
