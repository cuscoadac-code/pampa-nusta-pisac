import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, DollarSign, BarChart2, PieChart,
  AlertTriangle, CheckCircle2, Clock, ArrowUpRight,
  Building2, Leaf, FileText, Users, Hammer, CalendarDays
} from 'lucide-react';

// ─── DATOS DEL PROYECTO ─────────────────────────────────────────────────────

const CAPEX = [
  { categoria: 'Trámites Legales (CIRA, SUNARP, MINCETUR)', monto: 1500, tipo: 'legal' },
  { categoria: 'Dominio + Google Workspace (1 año)', monto: 250, tipo: 'digital' },
  { categoria: 'Seguro de Responsabilidad Civil', monto: 1200, tipo: 'legal' },
  { categoria: 'Materiales Domo 1 (Madera, Adobe, Paja, Policarbonato)', monto: 800, tipo: 'construccion' },
  { categoria: 'Materiales Domo 2', monto: 800, tipo: 'construccion' },
  { categoria: 'Materiales Domo 3', monto: 800, tipo: 'construccion' },
  { categoria: 'Maloka / Aula Viva (Estructura Principal)', monto: 1800, tipo: 'construccion' },
  { categoria: 'Instalaciones Sanitarias (Biodigestores + Tuberías)', monto: 900, tipo: 'construccion' },
  { categoria: 'Termas Solares + Panel Solar Básico', monto: 700, tipo: 'sostenibilidad' },
  { categoria: 'Mobiliario y Equipamiento (Camas, Estufas, Utensilios)', monto: 1500, tipo: 'equipamiento' },
  { categoria: 'Internet Starlink (Hardware)', monto: 600, tipo: 'digital' },
  { categoria: 'Mano de Obra Especializada (Maestro + Electricista)', monto: 2150, tipo: 'obra' },
  { categoria: 'Botiquín de Trauma + Balones de Oxígeno', monto: 400, tipo: 'seguridad' },
  { categoria: 'Reserva Operativa (1er mes)', monto: 600, tipo: 'reserva' },
];

const INGRESOS_B2B = [
  { programa: 'Cohorte Universitaria (15 alumnos × $2,000)', ingresos: 30000, costo: 7500, duracion: '14 días' },
  { programa: 'Cohorte Universitaria (10 alumnos × $1,800)', ingresos: 18000, costo: 5000, duracion: '10 días' },
  { programa: 'Taller Intensivo (5 Investigadores × $1,200)', ingresos: 6000, costo: 1800, duracion: '7 días' },
  { programa: 'Voluntariado Pago (8 personas × $500 / mes)', ingresos: 4000, costo: 800, duracion: '30 días' },
];

const CRONOGRAMA = [
  { mes: 'Mes 1', hito: 'Constitución Legal y Trámites Base', estado: 'critico', presupuesto: 1750 },
  { mes: 'Mes 2', hito: 'CIRA + Licencia Municipal + Dominios', estado: 'critico', presupuesto: 1750 },
  { mes: 'Mes 3-4', hito: 'Construcción Domos 1, 2, 3 + Maloka', estado: 'construccion', presupuesto: 5100 },
  { mes: 'Mes 5', hito: 'Instalaciones Sanitarias y Energía Solar', estado: 'construccion', presupuesto: 1600 },
  { mes: 'Mes 6', hito: 'Equipamiento + Starlink + Seguro', estado: 'equipamiento', presupuesto: 2300 },
  { mes: 'Mes 7', hito: 'Primera Cohorte Universitaria (Piloto B2B)', estado: 'operacion', presupuesto: 0 },
  { mes: 'Mes 8-12', hito: 'Escalamiento: 1 cohorte/mes promedio', estado: 'operacion', presupuesto: 0 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const totalCapex = CAPEX.reduce((s, i) => s + i.monto, 0);
const colorPorTipo: Record<string, string> = {
  legal: 'bg-red-900/40 text-red-300', construccion: 'bg-amber-900/40 text-amber-300',
  digital: 'bg-blue-900/40 text-blue-300', sostenibilidad: 'bg-green-900/40 text-green-300',
  equipamiento: 'bg-purple-900/40 text-purple-300', obra: 'bg-orange-900/40 text-orange-300',
  seguridad: 'bg-pink-900/40 text-pink-300', reserva: 'bg-gray-900/40 text-gray-300',
};
const estadoHito: Record<string, string> = {
  critico: 'bg-red-600 text-white', construccion: 'bg-amber-500 text-black',
  equipamiento: 'bg-blue-600 text-white', operacion: 'bg-green-600 text-white',
};

// ─── COMPONENTES ─────────────────────────────────────────────────────────────

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; sub?: string; color?: string }> =
  ({ icon, label, value, sub, color = 'text-white' }) => (
    <div className="bg-[#1C1A17] border border-[#3E3A33] rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[#A89F91] text-xs uppercase tracking-wider">
        {icon} {label}
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-[#A89F91] text-xs">{sub}</div>}
    </div>
  );

// ─── BAR CHART HORIZONTAL ────────────────────────────────────────────────────

const BarHorizontal: React.FC<{ label: string; value: number; max: number; colorClass: string }> =
  ({ label, value, max, colorClass }) => (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-[#A89F91] text-xs w-36 shrink-0">{label}</span>
      <div className="flex-1 h-5 bg-[#25221F] rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${colorClass}`}
        />
      </div>
      <span className="text-white text-xs font-bold w-16 text-right">${value.toLocaleString()}</span>
    </div>
  );

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const FinancialDashboard: React.FC = () => {
  const [section, setSection] = useState<'resumen' | 'capex' | 'roi' | 'cronograma'>('resumen');

  const totalIngresos = INGRESOS_B2B.reduce((s, i) => s + i.ingresos, 0);
  const totalCostos = INGRESOS_B2B.reduce((s, i) => s + i.costo, 0);
  const utilidadBruta = totalIngresos - totalCostos;
  const roiAnual = ((utilidadBruta / totalCapex) * 100).toFixed(0);
  const payback = (totalCapex / (utilidadBruta / 12)).toFixed(1);

  return (
    <div className="w-full">

      {/* Sub-nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {([
          { k: 'resumen', label: 'Resumen Ejecutivo', Icon: BarChart2 },
          { k: 'capex', label: 'CAPEX Detallado', Icon: Hammer },
          { k: 'roi', label: 'ROI y Proyección', Icon: TrendingUp },
          { k: 'cronograma', label: 'Cronograma de Obra', Icon: CalendarDays },
        ] as const).map(({ k, label, Icon }) => (
          <button
            key={k}
            onClick={() => setSection(k)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              section === k ? 'bg-[#D4AF37] text-black' : 'bg-[#25221F] text-[#A89F91] hover:text-white'
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── RESUMEN ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {section === 'resumen' && (
          <motion.div key="resumen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={<DollarSign size={14} />} label="Capital Semilla" value={`$${totalCapex.toLocaleString()}`} sub="USD — Monto total de inversión" color="text-green-400" />
              <StatCard icon={<TrendingUp size={14} />} label="ROI Estimado" value={`${roiAnual}%`} sub="Año 1 (4 cohortes)" color="text-amber-400" />
              <StatCard icon={<Clock size={14} />} label="Payback" value={`${payback} meses`} sub="Recuperación de inversión" color="text-blue-400" />
              <StatCard icon={<Users size={14} />} label="Mano de Obra Bruta" value="$0" sub="100% cubierta por voluntarios" color="text-purple-400" />
            </div>

            <div className="bg-[#1C1A17] border border-[#3E3A33] rounded-xl p-6 mb-6">
              <h3 className="text-[#D4AF37] text-sm uppercase tracking-widest font-bold mb-4 flex items-center gap-2"><PieChart size={14} /> Distribución del CAPEX por Categoría</h3>
              <BarHorizontal label="Construcción" value={CAPEX.filter(i=>i.tipo==='construccion').reduce((s,i)=>s+i.monto,0)} max={totalCapex} colorClass="bg-amber-500" />
              <BarHorizontal label="Mano especializada" value={CAPEX.filter(i=>i.tipo==='obra').reduce((s,i)=>s+i.monto,0)} max={totalCapex} colorClass="bg-orange-500" />
              <BarHorizontal label="Legal y Trámites" value={CAPEX.filter(i=>i.tipo==='legal').reduce((s,i)=>s+i.monto,0)} max={totalCapex} colorClass="bg-red-500" />
              <BarHorizontal label="Equipamiento" value={CAPEX.filter(i=>i.tipo==='equipamiento').reduce((s,i)=>s+i.monto,0)} max={totalCapex} colorClass="bg-purple-500" />
              <BarHorizontal label="Seguro" value={CAPEX.filter(i=>i.tipo==='seguridad').reduce((s,i)=>s+i.monto,0)} max={totalCapex} colorClass="bg-pink-500" />
              <BarHorizontal label="Digital" value={CAPEX.filter(i=>i.tipo==='digital').reduce((s,i)=>s+i.monto,0)} max={totalCapex} colorClass="bg-blue-500" />
            </div>

            <div className="bg-[#1C1A17] border border-amber-800/40 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="text-amber-400 font-bold mb-1">Factores de Riesgo y Mitigación</h4>
                  <ul className="text-[#A89F91] text-sm space-y-1">
                    <li>• <strong className="text-white">Retraso en CIRA:</strong> Mitigado usando arquitectura 100% desmontable en fase 1 (Sin excavaciones profundas).</li>
                    <li>• <strong className="text-white">Rotación de Voluntarios:</strong> Estructurar contrato de "Voluntariado Profesional" con mínimo 30 días de compromiso.</li>
                    <li>• <strong className="text-white">Estacionalidad (Lluvias Jun-Ago):</strong> Agendar cohortes universitarias entre Abril-Mayo y Septiembre-Noviembre.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CAPEX ─────────────────────────────────────────────────── */}
        {section === 'capex' && (
          <motion.div key="capex" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-[#1C1A17] border border-[#3E3A33] rounded-xl overflow-hidden">
              <div className="p-5 border-b border-[#3E3A33] flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-2"><FileText size={16} /> CAPEX Total — Inversión Física del Proyecto</h3>
                  <p className="text-[#A89F91] text-xs mt-1">Mano de obra bruta excluida (cubierta por voluntariado). Presupuesto estrictamente de insumos y honorarios especializados.</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-[#A89F91] uppercase tracking-wider">Total</span>
                  <span className="block text-2xl font-bold text-green-400">${totalCapex.toLocaleString()} USD</span>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#25221F] text-[#A89F91] text-xs uppercase tracking-wider">
                    <th className="text-left p-4">Partida</th>
                    <th className="text-center p-4">Categoría</th>
                    <th className="text-right p-4">Costo USD</th>
                    <th className="text-right p-4">% del Total</th>
                  </tr>
                </thead>
                <tbody>
                  {CAPEX.map((item, i) => (
                    <tr key={i} className="border-t border-[#2A2825] hover:bg-[#25221F] transition-colors">
                      <td className="p-4 text-[#FDFBF7] font-medium">{item.categoria}</td>
                      <td className="p-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${colorPorTipo[item.tipo]}`}>{item.tipo}</span>
                      </td>
                      <td className="p-4 text-right text-white font-bold">${item.monto.toLocaleString()}</td>
                      <td className="p-4 text-right text-[#A89F91]">{((item.monto / totalCapex) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#D4AF37] bg-[#25221F]">
                    <td className="p-4 text-[#D4AF37] font-bold uppercase tracking-wider">TOTAL CAPEX</td>
                    <td className="p-4"></td>
                    <td className="p-4 text-right text-green-400 font-bold text-xl">${totalCapex.toLocaleString()}</td>
                    <td className="p-4 text-right text-white font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard icon={<Building2 size={14}/>} label="3 Domos (Solo Materiales)" value="$2,400" sub="Sin mano de obra bruta" />
              <StatCard icon={<Leaf size={14}/>} label="1 Maloka Aula Viva" value="$1,800" sub="Centro académico principal" />
              <StatCard icon={<Users size={14}/>} label="Mano Obra Voluntaria (Aporte)" value="~$9,000" sub="Valor estimado aportado en horas" color="text-green-400" />
            </div>
          </motion.div>
        )}

        {/* ── ROI ─────────────────────────────────────────────────────── */}
        {section === 'roi' && (
          <motion.div key="roi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard icon={<ArrowUpRight size={14}/>} label="Ingreso Bruto (4 Programas)" value={`$${totalIngresos.toLocaleString()}`} color="text-green-400" />
              <StatCard icon={<DollarSign size={14}/>} label="Costos Operativos" value={`$${totalCostos.toLocaleString()}`} color="text-red-400" />
              <StatCard icon={<TrendingUp size={14}/>} label="Utilidad Bruta" value={`$${utilidadBruta.toLocaleString()}`} color="text-amber-400" />
              <StatCard icon={<BarChart2 size={14}/>} label="Margen Neto" value={`${((utilidadBruta/totalIngresos)*100).toFixed(0)}%`} color="text-purple-400" />
            </div>

            <div className="bg-[#1C1A17] border border-[#3E3A33] rounded-xl overflow-hidden mb-6">
              <div className="p-5 border-b border-[#3E3A33]">
                <h3 className="text-white font-bold flex items-center gap-2"><TrendingUp size={16}/> Proyección de Programas B2B</h3>
                <p className="text-[#A89F91] text-xs mt-1">Ingreso por tipo de programa educativo. Escenario conservador: 1 cohorte grande / trimestre.</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#25221F] text-[#A89F91] text-xs uppercase tracking-wider">
                    <th className="text-left p-4">Programa</th>
                    <th className="text-center p-4">Duración</th>
                    <th className="text-right p-4">Ingresos</th>
                    <th className="text-right p-4">Costo Op.</th>
                    <th className="text-right p-4">Utilidad</th>
                    <th className="text-right p-4">ROI Prog.</th>
                  </tr>
                </thead>
                <tbody>
                  {INGRESOS_B2B.map((row, i) => {
                    const util = row.ingresos - row.costo;
                    const roi = ((util / row.costo) * 100).toFixed(0);
                    return (
                      <tr key={i} className="border-t border-[#2A2825] hover:bg-[#25221F] transition-colors">
                        <td className="p-4 text-[#FDFBF7] font-medium">{row.programa}</td>
                        <td className="p-4 text-center text-[#A89F91]">{row.duracion}</td>
                        <td className="p-4 text-right text-green-400 font-bold">${row.ingresos.toLocaleString()}</td>
                        <td className="p-4 text-right text-red-400">${row.costo.toLocaleString()}</td>
                        <td className="p-4 text-right text-amber-400 font-bold">${util.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <span className="bg-green-900/40 text-green-400 px-2 py-1 rounded-full text-xs font-bold">{roi}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-[#1C1A17] border border-green-800/40 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="text-green-400 font-bold mb-2">Punto de Equilibrio y Payback</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-[#25221F] rounded-lg p-3 text-center">
                      <span className="block text-[#A89F91] text-xs uppercase">Inversión Total</span>
                      <span className="block text-white font-bold text-lg">${totalCapex.toLocaleString()}</span>
                    </div>
                    <div className="bg-[#25221F] rounded-lg p-3 text-center">
                      <span className="block text-[#A89F91] text-xs uppercase">Utilidad Mensual Prom.</span>
                      <span className="block text-amber-400 font-bold text-lg">${(utilidadBruta/12).toFixed(0)}</span>
                    </div>
                    <div className="bg-[#25221F] rounded-lg p-3 text-center">
                      <span className="block text-[#A89F91] text-xs uppercase">Payback Estimado</span>
                      <span className="block text-green-400 font-bold text-lg">{payback} meses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CRONOGRAMA ───────────────────────────────────────────────── */}
        {section === 'cronograma' && (
          <motion.div key="cronograma" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-[#1C1A17] border border-[#3E3A33] rounded-xl overflow-hidden mb-6">
              <div className="p-5 border-b border-[#3E3A33]">
                <h3 className="text-white font-bold flex items-center gap-2"><CalendarDays size={16}/> Cronograma de Obra y Operaciones</h3>
                <p className="text-[#A89F91] text-xs mt-1">Plan de ejecución desde la constitución legal hasta la primera cohorte universitaria pagada.</p>
              </div>
              <div className="p-5 space-y-4">
                {CRONOGRAMA.map((hito, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${hito.estado === 'operacion' ? 'bg-green-600' : 'bg-[#3E3A33]'} text-white`}>
                        {hito.estado === 'operacion' ? '★' : i + 1}
                      </div>
                      {i < CRONOGRAMA.length - 1 && <div className="w-px h-8 bg-[#3E3A33]" />}
                    </div>
                    <div className="flex-1 bg-[#25221F] rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full font-bold mr-2 ${estadoHito[hito.estado]}`}>{hito.mes}</span>
                        <span className="text-[#FDFBF7] font-medium">{hito.hito}</span>
                      </div>
                      {hito.presupuesto > 0 ? (
                        <span className="text-amber-400 font-bold text-sm whitespace-nowrap">${hito.presupuesto.toLocaleString()} USD</span>
                      ) : (
                        <span className="text-green-400 font-bold text-sm">💰 Genera Ingresos</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinancialDashboard;
