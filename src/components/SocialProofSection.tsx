import React, { useState } from 'react';
import { Star, Award, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TRIPADVISOR_REVIEWS } from '../data/mockData';

export const SocialProofSection: React.FC = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const activeReview = TRIPADVISOR_REVIEWS[currentReviewIndex];

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % TRIPADVISOR_REVIEWS.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + TRIPADVISOR_REVIEWS.length) % TRIPADVISOR_REVIEWS.length);
  };

  return (
    <section id="testimonios" className="relative py-24 bg-[#050505] text-stone-100 border-b border-stone-800 overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 bg-amber-950/40 text-amber-300 text-xs uppercase tracking-widest mb-3 font-mono font-bold shadow-sm backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>TESTIMONIOS Y RECONOCIMIENTO INTERNACIONAL</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-stone-50">
            Voces de la Comunidad & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">Experiencias en Pisac</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed font-sans font-light">
            Elogios y testimonios internacionales de visitantes en el santuario y la ecoaldea en el Valle Sagrado.
          </p>
        </div>

        {/* Reviews Card Centered */}
        <div className="max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/50 backdrop-blur-md border border-stone-800 shadow-2xl relative overflow-hidden">
            {/* Cinematic light flare top */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-stone-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Quote className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <span className="font-bold text-[10px] uppercase tracking-wider text-amber-500 font-mono">
                    Opiniones de la Audiencia
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-stone-100">Pisac & Ecoaldea Pampa Ñusta</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-stone-950 px-2.5 py-1 rounded-lg border border-amber-500/30">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-mono font-bold text-sm text-amber-300">4.9 / 5.0</span>
              </div>
            </div>

            {/* Active Review Box */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-stone-950 border border-stone-800 min-h-[200px] flex flex-col justify-between shadow-inner">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeReview.avatarUrl}
                      alt={activeReview.author}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-stone-700 p-0.5"
                    />
                    <div>
                      <span className="font-bold text-sm text-stone-100 block">{activeReview.author}</span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {activeReview.countryFlag} {activeReview.country} · {activeReview.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <h4 className="font-cinzel text-base sm:text-lg font-bold text-amber-300 mb-2">
                  «{activeReview.title}»
                </h4>
                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans font-light italic">
                  {activeReview.comment}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{activeReview.helpfulCount} cinéfilos coinciden con esta reseña</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Award className="w-3 h-3" /> Experiencia Verificada</span>
              </div>
            </div>

            {/* Review Carousel Controls */}
            <div className="flex items-center justify-between mt-6 relative z-10">
              <span className="text-xs font-mono text-stone-500 font-bold tracking-widest uppercase">
                Toma {currentReviewIndex + 1} de {TRIPADVISOR_REVIEWS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevReview}
                  className="p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-pointer shadow-sm"
                  aria-label="Opinión anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextReview}
                  className="p-3 rounded-xl bg-stone-950 border border-stone-700 text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-pointer shadow-sm"
                  aria-label="Siguiente opinión"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
