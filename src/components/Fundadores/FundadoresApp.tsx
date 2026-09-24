import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Map, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { RoadmapAccordion } from './RoadmapAccordion';
import FinancialDashboard from './FinancialDashboard';

export const FundadoresApp: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'estrategia' | 'voluntarios' | 'finanzas'>('estrategia');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'PampaÑusta2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <ShieldCheck className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl font-light text-white tracking-widest uppercase">Pampa Ñusta</h1>
            <p className="text-[#A89F91] mt-2 tracking-widest text-sm font-semibold uppercase">Portal de Fundadores</p>
          </div>
          <form onSubmit={handleLogin} className="bg-[#141414] p-8 rounded-2xl border border-[#333] shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#A89F91] uppercase tracking-wider mb-2">Clave de Acceso</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555] w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#333] text-white px-12 py-4 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2 font-medium">Clave incorrecta. Acceso denegado.</p>}
              </div>
              <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3CA40] text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                Ingresar al Masterplan <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  const fase1Tasks = [
    { title: 'Constitución S.A.C. y RUC', description: 'Registro oficial de la empresa para abrir cuentas y firmar convenios B2B.', completed: true },
    { title: 'Cuenta Bancaria Corporativa', description: 'Apertura en BCP/Interbank para recibir pagos internacionales.', completed: false },
    { title: 'Dominio y Correos Profesionales', description: 'Adquisición de pampanusta.com y configuración de hola@pampanusta.com.', completed: false },
    { title: 'Inscripción en MINCETUR', description: 'Registro como prestador de servicios turísticos.', completed: false },
  ];
  const fase2Tasks = [
    { title: 'Certificado CIRA', description: 'Aprobación del Ministerio de Cultura. Requisito para construir.', completed: false },
    { title: 'Licencia de Funcionamiento', description: 'Trámite municipal en Pisac con inspección INDECI.', completed: false },
    { title: 'Seguro de Responsabilidad Civil', description: 'Póliza internacional de $1M (Exigencia de universidades de EE.UU).', completed: false },
  ];
  const volBioTasks = [
    { title: 'Día 1–5: Preparación de Terreno', description: 'Limpieza y nivelación manual. Mano de obra: Voluntariado.', completed: false },
    { title: 'Día 6–15: Bioconstrucción Activa', description: 'Muros con adobe y quincha. Supervisado por maestro local.', completed: false },
    { title: 'Día 16–20: Techos y Aislamiento', description: 'Coberturas térmicas y sellado contra lluvias.', completed: false },
  ];
  const volAgroTasks = [
    { title: 'Día 1–3: Sustrato', description: 'Preparación de camas, compostaje y tierra negra.', completed: false },
    { title: 'Día 4–10: Banco Genético de Wachuma', description: 'Recolección, clasificación y siembra de semillas nativas.', completed: false },
  ];

  const tabs = [
    { k: 'estrategia', label: 'Institucional B2B' },
    { k: 'voluntarios', label: 'Cronograma (Campo)' },
    { k: 'finanzas', label: '📊 Presupuesto e Inversión' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0F0D0A] font-sans text-white pb-20">
      {/* Header */}
      <div className="bg-[#1C1A17] border-b border-[#3E3A33] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Map className="text-[#D4AF37] w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#FDFBF7]">Pampa Ñusta Fundadores</h1>
              <p className="text-[#A89F91] text-xs">Portal Privado — Nivel Institucional</p>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-[#A89F91] hover:text-white transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-[#1C1A17] rounded-xl border border-[#3E3A33] mb-10 max-w-3xl mx-auto justify-center">
          {tabs.map(({ k, label }) => (
            <button
              key={k}
              onClick={() => setActiveTab(k)}
              className={`flex-1 min-w-[140px] py-3 text-sm font-bold rounded-lg transition-all ${
                activeTab === k
                  ? k === 'finanzas' ? 'bg-green-600 text-white shadow-md' : 'bg-[#D4AF37] text-black shadow-md'
                  : 'text-[#A89F91] hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'estrategia' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-[#FDFBF7] mb-2">Visión Institucional B2B</h2>
              <p className="text-[#A89F91] max-w-2xl">Hoja de ruta estratégica para convertir a Pampa Ñusta en un eco-santuario certificado y firmar convenios universitarios.</p>
            </div>
            <RoadmapAccordion title="Fase 1: Arranque Legal y Digital" subtitle="Cimientos para recibir fondos e inversores." tasks={fase1Tasks} defaultOpen />
            <RoadmapAccordion title="Fase 2: Blindaje de Infraestructura" subtitle="Permisos gubernamentales y construcción mínima viable." tasks={fase2Tasks} />
          </motion.div>
        )}

        {activeTab === 'voluntarios' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-[#FDFBF7] mb-2">Cronograma de Campo</h2>
              <p className="text-[#A89F91] max-w-2xl">Actividades diarias por módulo. La mano de obra bruta es 100% cubierta por voluntarios bioconstructores.</p>
            </div>
            <RoadmapAccordion title="Módulo 1: Bioconstrucción" subtitle="Domos, Maloka y estructuras (Días 1–20)" tasks={volBioTasks} defaultOpen />
            <RoadmapAccordion title="Módulo 2: Banco Genético de Wachuma" subtitle="Agroecología andina y preservación de semillas (Días 1–10)" tasks={volAgroTasks} />
          </motion.div>
        )}

        {activeTab === 'finanzas' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-green-400 mb-1">Dashboard Financiero del Proyecto</h2>
              <p className="text-[#A89F91] max-w-3xl">Análisis integral de inversión, presupuesto de materiales, ROI proyectado y cronograma de obra. Nivel asesor — apto para presentación ante socios inversores o entidades de fomento.</p>
            </div>
            <FinancialDashboard />
          </motion.div>
        )}
      </div>
    </div>
  );
};
