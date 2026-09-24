import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, DollarSign, BarChart2,
  CheckCircle2, Clock, AlertCircle, Receipt, Smartphone,
  Plus, Trash2, Users, LogOut, Send, ArrowUpRight,
  ArrowDownRight, Wallet, Target, Activity, ShieldCheck,
  ChevronUp, ChevronDown, X, FileText, Zap
} from 'lucide-react';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const TIPO_CAMBIO    = 3.75;
const SEED_CAPITAL   = 55000; // S/
const TELEGRAM_NUM   = '+51 958 050 928';

const USUARIOS: Record<string, { nombre: string; rol: 'director' | 'comprador'; clave: string; color: string }> = {
  'director': { nombre: 'Director General',        rol: 'director',  clave: 'PampaNusta2026', color: '#D4AF37' },
  'campo1':   { nombre: 'Encargado de Campo',      rol: 'comprador', clave: 'Campo2026',      color: '#60A5FA' },
  'campo2':   { nombre: 'Voluntario Logística',    rol: 'comprador', clave: 'Logistica2026',  color: '#34D399' },
};

const CATEGORIAS = [
  'Materiales Construcción', 'Mano Obra Especializada', 'Alimentación Voluntarios',
  'Transporte / Pasajes', 'Viáticos / Alojamiento', 'Trámites Legales',
  'Marketing / Digital', 'Equipamiento', 'Semillas / Insumos Agrícolas',
  'Cohorte Universitaria', 'Donación', 'Otro',
];

const CAPEX_BUDGET: Record<string, number> = {
  'Materiales Construcción': 16500,
  'Mano Obra Especializada': 8000,
  'Trámites Legales': 5000,
  'Equipamiento': 5600,
  'Alimentación Voluntarios': 4500,
  'Transporte / Pasajes': 2200,
  'Viáticos / Alojamiento': 1800,
  'Marketing / Digital': 3200,
  'Servicios Básicos': 2600,
  'Semillas / Insumos Agrícolas': 1500,
};

const CAT_COLORS: Record<string, string> = {
  'Materiales Construcción': '#F59E0B', 'Mano Obra Especializada': '#F97316',
  'Alimentación Voluntarios': '#10B981', 'Transporte / Pasajes': '#3B82F6',
  'Viáticos / Alojamiento': '#8B5CF6', 'Trámites Legales': '#EF4444',
  'Marketing / Digital': '#06B6D4', 'Equipamiento': '#EC4899',
  'Semillas / Insumos Agrícolas': '#84CC16', 'Cohorte Universitaria': '#D4AF37',
  'Donación': '#34D399', 'Otro': '#6B7280',
};

type TipoTx = 'gasto' | 'ingreso' | 'inversion';
type EstadoTx = 'aprobado' | 'pendiente';

interface Transaccion {
  id: string; fecha: string; descripcion: string;
  categoria: string; monto: number; tipo: TipoTx;
  estado: EstadoTx; usuario: string; notas?: string;
  fuenteTelegram?: boolean;
}

const DEMO: Transaccion[] = [
  { id:'1', fecha:'2026-09-01', descripcion:'Madera de eucalipto — Domo 1', categoria:'Materiales Construcción', monto:1200, tipo:'gasto', estado:'aprobado', usuario:'campo1' },
  { id:'2', fecha:'2026-09-05', descripcion:'Honorarios Arqueólogo CIRA', categoria:'Trámites Legales', monto:3000, tipo:'gasto', estado:'aprobado', usuario:'director' },
  { id:'3', fecha:'2026-09-10', descripcion:'Aporte Socio Fundador — Ronda 1', categoria:'Donación', monto:18000, tipo:'ingreso', estado:'aprobado', usuario:'director' },
  { id:'4', fecha:'2026-09-15', descripcion:'Policarbonato + pernos estructura', categoria:'Materiales Construcción', monto:780, tipo:'gasto', estado:'pendiente', usuario:'campo2', fuenteTelegram:true },
  { id:'5', fecha:'2026-09-18', descripcion:'Bus Cusco→Pisac (2 voluntarios)', categoria:'Transporte / Pasajes', monto:30, tipo:'gasto', estado:'aprobado', usuario:'campo1' },
  { id:'6', fecha:'2026-09-20', descripcion:'Mercado semanal — 8 voluntarios', categoria:'Alimentación Voluntarios', monto:280, tipo:'gasto', estado:'aprobado', usuario:'campo1' },
  { id:'7', fecha:'2026-09-22', descripcion:'Cohorte Piloto PUCP — 8 alumnos', categoria:'Cohorte Universitaria', monto:12000, tipo:'ingreso', estado:'aprobado', usuario:'director' },
  { id:'8', fecha:'2026-09-23', descripcion:'Cemento + arena — Base Maloka', categoria:'Materiales Construcción', monto:450, tipo:'gasto', estado:'pendiente', usuario:'campo2', fuenteTelegram:true },
];

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────

const fmt = (n: number) => `S/ ${n.toLocaleString('es-PE', { minimumFractionDigits: 0 })}`;
const fmtUSD = (n: number) => `$${(n / TIPO_CAMBIO).toFixed(0)}`;

const Pill: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-[#25221F] text-[#A89F91]' }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{children}</span>
);

// Donut gauge
const Donut: React.FC<{ pct: number; size?: number; stroke?: number; color?: string; label?: string; sub?: string }> =
  ({ pct, size = 80, stroke = 8, color = '#D4AF37', label, sub }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (Math.min(pct, 100) / 100) * circ;
    return (
      <div className="flex flex-col items-center gap-1">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#25221F" strokeWidth={stroke} />
          <motion.circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={stroke}
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        {label && <div className="text-center -mt-1"><div className="text-white font-bold text-sm">{label}</div>{sub && <div className="text-[#A89F91] text-xs">{sub}</div>}</div>}
      </div>
    );
  };

// KPI Card
const KPI: React.FC<{ icon: React.ReactNode; label: string; value: string; sub: string; delta?: string; up?: boolean; color?: string; accent?: string }> =
  ({ icon, label, value, sub, delta, up, color = 'text-white', accent = '#D4AF37' }) => (
    <div className="relative bg-[#141210] border border-[#2A2825] rounded-2xl p-5 overflow-hidden group hover:border-[#3E3A33] transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: accent }} />
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg" style={{ background: `${accent}20` }}>
          <div style={{ color: accent }}>{icon}</div>
        </div>
        {delta && (
          <div className={`flex items-center gap-1 text-xs font-bold ${up ? 'text-green-400' : 'text-red-400'}`}>
            {up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}{delta}
          </div>
        )}
      </div>
      <div className={`text-2xl font-bold mb-0.5 ${color}`}>{value}</div>
      <div className="text-xs text-[#A89F91]">{label}</div>
      <div className="text-xs text-[#555] mt-0.5">{sub}</div>
    </div>
  );

// Sparkline bar
const SparkBar: React.FC<{ label: string; value: number; max: number; color: string; budget?: number }> = ({ label, value, max, color, budget }) => {
  const pct = max > 0 ? (value / max) * 100 : 0;
  const over = budget && value > budget;
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[#A89F91] text-xs truncate max-w-[140px]">{label}</span>
        <span className={`text-xs font-bold ${over ? 'text-red-400' : 'text-white'}`}>{fmt(value)}</span>
      </div>
      <div className="h-1.5 bg-[#25221F] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: over ? '#EF4444' : color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
      {budget && (
        <div className="flex justify-between mt-0.5">
          <span className="text-[#444] text-[10px]">Presupuesto: {fmt(budget)}</span>
          <span className={`text-[10px] font-bold ${over ? 'text-red-400' : 'text-green-400'}`}>{Math.min(pct, 100).toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const ContabilidadModule: React.FC = () => {

  // ── Auth ──
  const [usuario, setUsuario] = useState<string | null>(() => sessionStorage.getItem('pn_user'));
  const [uInput, setUInput] = useState('');
  const [pInput, setPInput] = useState('');
  const [authErr, setAuthErr] = useState(false);

  // ── Data ──
  const [txs, setTxs] = useState<Transaccion[]>(() => {
    try { return JSON.parse(localStorage.getItem('pn_txs2') || 'null') || DEMO; } catch { return DEMO; }
  });
  useEffect(() => { localStorage.setItem('pn_txs2', JSON.stringify(txs)); }, [txs]);

  // ── UI ──
  const [tab, setTab] = useState<'overview' | 'transactions' | 'budget' | 'telegram'>('overview');
  const [showForm, setShowForm] = useState(false);
  const [filterTipo, setFilterTipo] = useState<'todos' | TipoTx>('todos');
  const [sortField, setSortField] = useState<'fecha' | 'monto'>('fecha');
  const [sortAsc, setSortAsc] = useState(false);
  const [form, setForm] = useState({ desc: '', cat: CATEGORIAS[0], monto: '', tipo: 'gasto' as TipoTx, notas: '' });

  // ── Derived metrics ──
  const { gastos, ingresos, pendientes, saldo, gastoCat } = useMemo(() => {
    const aprobadas = txs.filter(t => t.estado === 'aprobado');
    const gastos = aprobadas.filter(t => t.tipo === 'gasto').reduce((s, t) => s + t.monto, 0);
    const ingresos = aprobadas.filter(t => t.tipo !== 'gasto').reduce((s, t) => s + t.monto, 0);
    const pendientes = txs.filter(t => t.estado === 'pendiente').length;
    const saldo = SEED_CAPITAL + ingresos - gastos;
    const gastoCat: Record<string, number> = {};
    CATEGORIAS.forEach(c => {
      gastoCat[c] = aprobadas.filter(t => t.tipo === 'gasto' && t.categoria === c).reduce((s, t) => s + t.monto, 0);
    });
    return { gastos, ingresos, pendientes, saldo, gastoCat };
  }, [txs]);

  const burnRate = (gastos / SEED_CAPITAL) * 100;
  const runway = saldo > 0 ? Math.floor(saldo / (gastos / 30 || 1)) : 0;

  // ── Sorted / Filtered txs ──
  const txsFiltered = useMemo(() => {
    let list = filterTipo === 'todos' ? txs : txs.filter(t => t.tipo === filterTipo);
    return [...list].sort((a, b) => {
      const va = sortField === 'fecha' ? a.fecha : a.monto;
      const vb = sortField === 'fecha' ? b.fecha : b.monto;
      return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
  }, [txs, filterTipo, sortField, sortAsc]);

  // ── Actions ──
  const aprobar = (id: string) => setTxs(p => p.map(t => t.id === id ? { ...t, estado: 'aprobado' } : t));
  const eliminar = (id: string) => setTxs(p => p.filter(t => t.id !== id));
  const guardar = () => {
    if (!form.desc || !form.monto) return;
    const userInfo = USUARIOS[usuario!];
    setTxs(p => [{
      id: Date.now().toString(), fecha: new Date().toISOString().split('T')[0],
      descripcion: form.desc, categoria: form.cat, monto: parseFloat(form.monto),
      tipo: form.tipo, estado: userInfo.rol === 'director' ? 'aprobado' : 'pendiente',
      usuario: usuario!,
    }, ...p]);
    setForm({ desc: '', cat: CATEGORIAS[0], monto: '', tipo: 'gasto', notas: '' });
    setShowForm(false);
  };

  const isDirector = usuario ? USUARIOS[usuario]?.rol === 'director' : false;

  // ─── LOGIN ────────────────────────────────────────────────────────────────
  if (!usuario) {
    const doLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const k = uInput.trim().toLowerCase();
      const u = USUARIOS[k];
      if (u && u.clave === pInput) { setUsuario(k); sessionStorage.setItem('pn_user', k); setAuthErr(false); }
      else { setAuthErr(true); setPInput(''); }
    };
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#141210] border border-[#2A2825] rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#D4AF3720' }}>
              <ShieldCheck className="text-[#D4AF37]" size={28} />
            </div>
            <h2 className="text-white font-bold text-xl">Centro de Control</h2>
            <p className="text-[#555] text-xs mt-1">Acceso financiero — Pampa Ñusta</p>
          </div>
          <form onSubmit={doLogin} className="space-y-4">
            <div>
              <label className="block text-[#A89F91] text-xs uppercase tracking-widest mb-2">Usuario</label>
              <input value={uInput} onChange={e => setUInput(e.target.value)} placeholder="director / campo1 / campo2"
                className="w-full bg-[#0F0D0A] border border-[#2A2825] focus:border-[#D4AF37] text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-[#333]" />
            </div>
            <div>
              <label className="block text-[#A89F91] text-xs uppercase tracking-widest mb-2">Contraseña</label>
              <input type="password" value={pInput} onChange={e => setPInput(e.target.value)} placeholder="••••••••"
                className="w-full bg-[#0F0D0A] border border-[#2A2825] focus:border-[#D4AF37] text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-[#333]" />
            </div>
            {authErr && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={11} />Credenciales incorrectas</p>}
            <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3CA40] text-black font-bold py-3 rounded-xl transition-all text-sm tracking-wide">
              Acceder al Dashboard
            </button>
          </form>
          <div className="mt-6 pt-5 border-t border-[#1C1A17]">
            <p className="text-[#444] text-[10px] uppercase tracking-widest text-center mb-3">Usuarios del sistema</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(USUARIOS).map(([k, u]) => (
                <div key={k} className="bg-[#0F0D0A] rounded-lg p-2 text-center border border-[#1C1A17]">
                  <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: u.color }} />
                  <div className="text-[#A89F91] text-[10px] font-mono">{k}</div>
                  <div className="text-[#555] text-[9px]">{u.rol}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const userInfo = USUARIOS[usuario];

  // ─── DASHBOARD ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-black" style={{ background: userInfo.color }}>
            {userInfo.nombre[0]}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{userInfo.nombre}</div>
            <div className="text-xs" style={{ color: userInfo.color }}>
              {isDirector ? '★ Director — acceso total' : '● Comprador — registra borradores'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {pendientes > 0 && (
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-1.5 bg-amber-900/30 border border-amber-700/50 rounded-full px-3 py-1">
              <Clock className="text-amber-400" size={12} />
              <span className="text-amber-400 text-xs font-bold">{pendientes} pendiente{pendientes > 1 ? 's' : ''}</span>
            </motion.div>
          )}
          <button onClick={() => { setUsuario(null); sessionStorage.removeItem('pn_user'); }}
            className="flex items-center gap-1 text-[#555] hover:text-red-400 transition-colors text-xs">
            <LogOut size={12} /> Salir
          </button>
        </div>
      </div>

      {/* ── Nav Tabs ── */}
      <div className="flex gap-1 p-1 bg-[#0F0D0A] rounded-xl border border-[#1C1A17]">
        {([
          { k: 'overview', label: 'Overview', Icon: BarChart2 },
          { k: 'transactions', label: 'Movimientos', Icon: Receipt },
          { k: 'budget', label: 'Presupuesto', Icon: Target },
          { k: 'telegram', label: 'Telegram Bot', Icon: Send },
        ] as const).map(({ k, label, Icon }) => (
          <button key={k} onClick={() => setTab(k)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              tab === k ? 'bg-[#1C1A17] text-white shadow' : 'text-[#555] hover:text-[#A89F91]'
            }`}>
            <Icon size={12} />{label}
          </button>
        ))}
      </div>

      {/* ── Floating Add Button ── */}
      <div className="flex justify-end">
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-lg shadow-green-900/30">
          <Plus size={14} /> Registrar Movimiento
        </button>
      </div>

      {/* ── Form Modal ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-[#141210] border border-[#2A2825] rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold">Nuevo Movimiento</h3>
                <button onClick={() => setShowForm(false)} className="text-[#555] hover:text-white"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A89F91] text-xs mb-1.5 uppercase tracking-wider">Tipo</label>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value as TipoTx })}
                    className="w-full bg-[#0F0D0A] border border-[#2A2825] text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]">
                    <option value="gasto">💸 Gasto</option>
                    <option value="ingreso">💰 Ingreso</option>
                    <option value="inversion">📈 Inversión</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A89F91] text-xs mb-1.5 uppercase tracking-wider">Monto (S/)</label>
                  <input type="number" value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-[#0F0D0A] border border-[#2A2825] text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37] placeholder-[#333]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#A89F91] text-xs mb-1.5 uppercase tracking-wider">Descripción</label>
                  <input value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
                    placeholder="Ej: Bolsas de cemento — Domo 2"
                    className="w-full bg-[#0F0D0A] border border-[#2A2825] text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37] placeholder-[#333]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#A89F91] text-xs mb-1.5 uppercase tracking-wider">Categoría</label>
                  <select value={form.cat} onChange={e => setForm({ ...form, cat: e.target.value })}
                    className="w-full bg-[#0F0D0A] border border-[#2A2825] text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D4AF37]">
                    {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              {!isDirector && <p className="text-amber-400/80 text-xs mt-3 flex items-center gap-1"><Clock size={10} />Quedará pendiente hasta que el Director lo apruebe.</p>}
              <div className="flex gap-2 mt-4">
                <button onClick={guardar} className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-sm transition-all">Guardar</button>
                <button onClick={() => setShowForm(false)} className="px-5 bg-[#1C1A17] text-[#A89F91] hover:text-white rounded-xl text-sm transition-all">Cancelar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ═══════════════ OVERVIEW ═══════════════ */}
        {tab === 'overview' && (
          <motion.div key="ov" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <KPI icon={<Wallet size={16} />} label="Saldo Disponible" value={fmt(saldo)}
                sub={fmtUSD(saldo)} delta="+Capital semilla" up color={saldo > 10000 ? 'text-green-400' : 'text-red-400'} accent="#10B981" />
              <KPI icon={<TrendingDown size={16} />} label="Total Gastado" value={fmt(gastos)}
                sub={`${burnRate.toFixed(0)}% del fondo`} color="text-red-400" accent="#EF4444" />
              <KPI icon={<TrendingUp size={16} />} label="Total Ingresado" value={fmt(ingresos)}
                sub={fmtUSD(ingresos)} color="text-green-400" accent="#10B981" />
              <KPI icon={<Activity size={16} />} label="Runway estimado" value={`${runway}d`}
                sub="Días de operación" color="text-amber-400" accent="#D4AF37" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* Donut gauges */}
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2"><Zap size={14} className="text-[#D4AF37]" />Salud Financiera</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <Donut pct={burnRate} color={burnRate > 80 ? '#EF4444' : '#D4AF37'} size={70} stroke={7} />
                    <div className="text-center"><div className="text-white text-xs font-bold">{burnRate.toFixed(0)}%</div><div className="text-[#555] text-[10px]">Burn Rate</div></div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Donut pct={ingresos > 0 ? (ingresos / (SEED_CAPITAL * 0.5)) * 100 : 0} color="#10B981" size={70} stroke={7} />
                    <div className="text-center"><div className="text-white text-xs font-bold">{ingresos > 0 ? ((ingresos/(SEED_CAPITAL*0.5))*100).toFixed(0) : 0}%</div><div className="text-[#555] text-[10px]">Meta ingreso</div></div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Donut pct={pendientes > 0 ? 100 : 0} color={pendientes > 0 ? '#F59E0B' : '#10B981'} size={70} stroke={7} />
                    <div className="text-center"><div className={`text-xs font-bold ${pendientes > 0 ? 'text-amber-400' : 'text-green-400'}`}>{pendientes}</div><div className="text-[#555] text-[10px]">Pendientes</div></div>
                  </div>
                </div>
              </div>

              {/* Gastos por categoría */}
              <div className="lg:col-span-2 bg-[#141210] border border-[#2A2825] rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2"><BarChart2 size={14} className="text-[#D4AF37]" />Gasto por Categoría</h3>
                <div className="space-y-3">
                  {Object.entries(gastoCat).filter(([, v]) => v > 0).sort(([, a], [, b]) => b - a).slice(0, 6).map(([cat, val]) => (
                    <SparkBar key={cat} label={cat} value={val} max={gastos || 1} color={CAT_COLORS[cat] || '#555'} budget={CAPEX_BUDGET[cat]} />
                  ))}
                  {Object.values(gastoCat).every(v => v === 0) && (
                    <div className="text-center text-[#555] text-sm py-4">No hay gastos registrados aún</div>
                  )}
                </div>
              </div>
            </div>

            {/* Últimas transacciones + Pendientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2"><Clock size={14} className="text-[#D4AF37]" />Actividad Reciente</h3>
                <div className="space-y-2">
                  {txs.slice(0, 5).map((t, i) => (
                    <div key={t.id} className="flex items-center gap-3 py-2 border-b border-[#1C1A17] last:border-0">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${CAT_COLORS[t.categoria] || '#555'}20` }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: CAT_COLORS[t.categoria] || '#555' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{t.descripcion}</p>
                        <p className="text-[#555] text-[10px]">{t.fecha} · {USUARIOS[t.usuario]?.nombre}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-xs font-bold ${t.tipo === 'ingreso' ? 'text-green-400' : 'text-red-400'}`}>
                          {t.tipo === 'ingreso' ? '+' : '-'}{fmt(t.monto)}
                        </div>
                        {t.estado === 'pendiente' && <div className="text-amber-400 text-[10px]">pendiente</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pendientes por aprobar */}
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <AlertCircle size={14} className="text-amber-400" />Pendientes de Aprobación
                  {pendientes > 0 && <span className="ml-auto bg-amber-900/50 text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold">{pendientes}</span>}
                </h3>
                {txs.filter(t => t.estado === 'pendiente').length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-24 text-center">
                    <CheckCircle2 className="text-green-500 mb-2" size={24} />
                    <p className="text-[#555] text-sm">Todo aprobado ✓</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {txs.filter(t => t.estado === 'pendiente').map(t => (
                      <div key={t.id} className="bg-[#1C1A17] border border-amber-900/30 rounded-xl p-3 flex items-center gap-3">
                        {t.fuenteTelegram && <Send className="text-blue-400 shrink-0" size={14} />}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium truncate">{t.descripcion}</p>
                          <p className="text-[#555] text-[10px]">{USUARIOS[t.usuario]?.nombre} · {t.fecha}</p>
                        </div>
                        <div className="text-red-400 font-bold text-sm shrink-0">-{fmt(t.monto)}</div>
                        {isDirector && (
                          <div className="flex gap-1.5 shrink-0">
                            <button onClick={() => aprobar(t.id)}
                              className="w-7 h-7 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-all">
                              <CheckCircle2 size={13} className="text-green-400" />
                            </button>
                            <button onClick={() => eliminar(t.id)}
                              className="w-7 h-7 bg-red-900/50 hover:bg-red-900 rounded-lg flex items-center justify-center transition-all">
                              <Trash2 size={13} className="text-red-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════ TRANSACTIONS ═══════════════ */}
        {tab === 'transactions' && (
          <motion.div key="tx" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {(['todos', 'gasto', 'ingreso', 'inversion'] as const).map(f => (
                <button key={f} onClick={() => setFilterTipo(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all capitalize ${
                    filterTipo === f ? 'bg-[#D4AF37] text-black' : 'bg-[#1C1A17] text-[#A89F91] hover:text-white'
                  }`}>{f === 'todos' ? 'Todos' : f}</button>
              ))}
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setSortField('fecha'); setSortAsc(p => !p); }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${sortField === 'fecha' ? 'bg-[#1C1A17] text-white' : 'text-[#555]'}`}>
                  Fecha {sortField === 'fecha' && (sortAsc ? <ChevronUp size={10}/> : <ChevronDown size={10}/>)}
                </button>
                <button onClick={() => { setSortField('monto'); setSortAsc(p => !p); }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${sortField === 'monto' ? 'bg-[#1C1A17] text-white' : 'text-[#555]'}`}>
                  Monto {sortField === 'monto' && (sortAsc ? <ChevronUp size={10}/> : <ChevronDown size={10}/>)}
                </button>
              </div>
            </div>

            <div className="bg-[#141210] border border-[#2A2825] rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1C1A17] text-[#555] text-xs uppercase tracking-widest">
                    <th className="text-left px-5 py-3">Descripción</th>
                    <th className="text-center px-3 py-3 hidden lg:table-cell">Categoría</th>
                    <th className="text-center px-3 py-3 hidden md:table-cell">Usuario</th>
                    <th className="text-center px-3 py-3">Fecha</th>
                    <th className="text-center px-3 py-3">Estado</th>
                    <th className="text-right px-5 py-3">Monto</th>
                    {isDirector && <th className="text-center px-3 py-3">Acc.</th>}
                  </tr>
                </thead>
                <tbody>
                  {txsFiltered.map(t => (
                    <tr key={t.id} className={`border-b border-[#1C1A17] hover:bg-[#1A1815] transition-colors ${t.estado === 'pendiente' ? 'opacity-60' : ''}`}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: CAT_COLORS[t.categoria] || '#555' }} />
                          <div>
                            <div className="text-white text-xs font-medium flex items-center gap-1">
                              {t.descripcion}
                              {t.fuenteTelegram && <span className="bg-blue-900/40 text-blue-400 text-[9px] px-1.5 py-0.5 rounded font-bold">TG</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center hidden lg:table-cell">
                        <span className="text-[#A89F91] text-xs">{t.categoria}</span>
                      </td>
                      <td className="px-3 py-3 text-center hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: USUARIOS[t.usuario]?.color || '#555' }} />
                          <span className="text-[#A89F91] text-xs">{USUARIOS[t.usuario]?.nombre || t.usuario}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center text-[#555] text-xs">{t.fecha}</td>
                      <td className="px-3 py-3 text-center">
                        {t.estado === 'aprobado'
                          ? <Pill color="bg-green-900/30 text-green-400"><CheckCircle2 size={9}/>OK</Pill>
                          : <Pill color="bg-amber-900/30 text-amber-400"><Clock size={9}/>Pendiente</Pill>}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className={`font-bold text-sm ${t.tipo === 'ingreso' ? 'text-green-400' : 'text-red-400'}`}>
                          {t.tipo === 'ingreso' ? '+' : '-'}{fmt(t.monto)}
                        </span>
                        <div className="text-[#444] text-[10px]">{fmtUSD(t.monto)}</div>
                      </td>
                      {isDirector && (
                        <td className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {t.estado === 'pendiente' && (
                              <button onClick={() => aprobar(t.id)} className="w-6 h-6 bg-green-900/50 hover:bg-green-800 rounded-lg flex items-center justify-center transition-all">
                                <CheckCircle2 size={11} className="text-green-400"/>
                              </button>
                            )}
                            <button onClick={() => eliminar(t.id)} className="w-6 h-6 bg-red-900/30 hover:bg-red-900/60 rounded-lg flex items-center justify-center transition-all">
                              <Trash2 size={11} className="text-red-400"/>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {txsFiltered.length === 0 && (
                <div className="text-center py-10 text-[#555]"><FileText size={24} className="mx-auto mb-2 opacity-30"/>Sin movimientos</div>
              )}
            </div>

            {/* Totales fila */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="bg-[#141210] border border-[#2A2825] rounded-xl p-3 text-center">
                <div className="text-red-400 font-bold">{fmt(gastos)}</div>
                <div className="text-[#555] text-xs">Total gastos</div>
              </div>
              <div className="bg-[#141210] border border-[#2A2825] rounded-xl p-3 text-center">
                <div className="text-green-400 font-bold">{fmt(ingresos)}</div>
                <div className="text-[#555] text-xs">Total ingresos</div>
              </div>
              <div className="bg-[#141210] border border-[#2A2825] rounded-xl p-3 text-center">
                <div className={`font-bold ${saldo >= 0 ? 'text-white' : 'text-red-400'}`}>{fmt(saldo)}</div>
                <div className="text-[#555] text-xs">Saldo neto</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════ BUDGET ═══════════════ */}
        {tab === 'budget' && (
          <motion.div key="bgt" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl p-4 text-center">
                <div className="text-[#555] text-xs uppercase mb-1">Capital Semilla</div>
                <div className="text-white font-bold text-xl">{fmt(SEED_CAPITAL)}</div>
              </div>
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl p-4 text-center">
                <div className="text-[#555] text-xs uppercase mb-1">Ejecutado</div>
                <div className="text-red-400 font-bold text-xl">{fmt(gastos)}</div>
              </div>
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl p-4 text-center">
                <div className="text-[#555] text-xs uppercase mb-1">Disponible</div>
                <div className={`font-bold text-xl ${saldo > 0 ? 'text-green-400' : 'text-red-400'}`}>{fmt(saldo)}</div>
              </div>
            </div>

            <div className="bg-[#141210] border border-[#2A2825] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1C1A17] flex items-center gap-3">
                <Target className="text-[#D4AF37]" size={16} />
                <h3 className="text-white font-bold text-sm">Semáforo por Partida CAPEX</h3>
                <div className="ml-auto flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-green-400"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"/>OK</span>
                  <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"/>Precaución</span>
                  <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"/>Excedido</span>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1C1A17] text-[#555] text-xs uppercase tracking-widest">
                    <th className="text-left px-5 py-3">Partida</th>
                    <th className="text-right px-3 py-3">Presupuesto</th>
                    <th className="text-right px-3 py-3">Ejecutado</th>
                    <th className="text-right px-3 py-3">Disponible</th>
                    <th className="px-5 py-3 text-center">Avance</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(CAPEX_BUDGET).map(([cat, budget]) => {
                    const exec = gastoCat[cat] || 0;
                    const pct = (exec / budget) * 100;
                    const color = pct > 90 ? '#EF4444' : pct > 65 ? '#F59E0B' : '#10B981';
                    const textColor = pct > 90 ? 'text-red-400' : pct > 65 ? 'text-amber-400' : 'text-green-400';
                    return (
                      <tr key={cat} className="border-b border-[#1C1A17] hover:bg-[#1A1815] transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: CAT_COLORS[cat] || '#555' }} />
                            <span className="text-white text-xs">{cat}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right text-[#A89F91] text-xs">{fmt(budget)}</td>
                        <td className={`px-3 py-3 text-right text-xs font-bold ${exec > 0 ? 'text-white' : 'text-[#333]'}`}>{fmt(exec)}</td>
                        <td className={`px-3 py-3 text-right text-xs font-bold ${budget - exec < 0 ? 'text-red-400' : 'text-green-400'}`}>{fmt(budget - exec)}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-[#25221F] rounded-full overflow-hidden">
                              <motion.div className="h-full rounded-full" style={{ background: color }}
                                initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }} transition={{ duration: 0.8 }} />
                            </div>
                            <span className={`text-xs font-bold w-10 text-right ${textColor}`}>{pct.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ═══════════════ TELEGRAM ═══════════════ */}
        {tab === 'telegram' && (
          <motion.div key="tg" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-[#141210] border border-blue-900/40 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: '#2563EB20' }}>
                  <Send className="text-blue-400" size={22} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Bot de Telegram — Registro Fotográfico</h3>
                  <p className="text-[#A89F91] text-sm mt-1">Sistema 100% gratuito. Foto del ticket → borrador automático → aprobación del Director.</p>
                  <div className="mt-2 inline-flex items-center gap-2 bg-blue-900/20 border border-blue-800/40 rounded-full px-3 py-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-blue-400 text-xs font-bold">{TELEGRAM_NUM}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Flujo de una compra</h4>
                  <div className="space-y-3">
                    {[
                      { n: 1, icon: '🪵', txt: 'Voluntario compra materiales en Pisac.' },
                      { n: 2, icon: '📷', txt: 'Fotografía el ticket o boleta.' },
                      { n: 3, icon: '📱', txt: `Envía la foto a ${TELEGRAM_NUM} con un texto: "Materiales Domo 2".` },
                      { n: 4, icon: '🤖', txt: 'Bot responde: "✅ S/ 320 detectados. Pendiente de aprobación."' },
                      { n: 5, icon: '✅', txt: 'Director aprueba en este portal con un clic.' },
                    ].map(s => (
                      <div key={s.n} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-900/50 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">{s.n}</span>
                        <span className="text-[#A89F91] text-sm">{s.icon} {s.txt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">Activación (5 minutos)</h4>
                  {[
                    { paso: '1', txt: 'Abre Telegram y busca @BotFather.', note: '' },
                    { paso: '2', txt: 'Escribe /newbot y sigue las instrucciones.', note: 'Te generará un Token API único.' },
                    { paso: '3', txt: 'Copia el token al archivo .env del servidor como TELEGRAM_BOT_TOKEN=...', note: '' },
                    { paso: '4', txt: '¡El webhook ya está programado en el servidor!', note: 'No se necesita código adicional.' },
                  ].map(s => (
                    <div key={s.paso} className="bg-[#1C1A17] rounded-xl p-3 flex gap-3">
                      <span className="text-[#D4AF37] font-bold text-xs w-4 shrink-0">{s.paso}.</span>
                      <div>
                        <p className="text-white text-xs">{s.txt}</p>
                        {s.note && <p className="text-[#555] text-[11px] mt-0.5">{s.note}</p>}
                      </div>
                    </div>
                  ))}
                  <div className="bg-green-900/20 border border-green-800/40 rounded-xl p-3">
                    <p className="text-green-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12}/>Costo: S/ 0.00 / mes — API 100% gratuita</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registros vía Telegram */}
            {txs.filter(t => t.fuenteTelegram).length > 0 && (
              <div className="bg-[#141210] border border-[#2A2825] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#1C1A17] flex items-center gap-2">
                  <Send className="text-blue-400" size={14} />
                  <h4 className="text-white font-bold text-sm">Recibidos vía Telegram</h4>
                </div>
                {txs.filter(t => t.fuenteTelegram).map(t => (
                  <div key={t.id} className="flex items-center gap-4 px-5 py-3 border-b border-[#1C1A17] last:border-0 hover:bg-[#1A1815] transition-colors">
                    <div className="flex-1"><p className="text-white text-sm font-medium">{t.descripcion}</p><p className="text-[#555] text-xs">{t.fecha} · {USUARIOS[t.usuario]?.nombre}</p></div>
                    <div className="text-red-400 font-bold">-{fmt(t.monto)}</div>
                    {t.estado === 'pendiente' && isDirector
                      ? <button onClick={() => aprobar(t.id)} className="bg-green-800 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"><CheckCircle2 size={11}/>Aprobar</button>
                      : <Pill color="bg-green-900/30 text-green-400"><CheckCircle2 size={9}/>OK</Pill>}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default ContabilidadModule;
