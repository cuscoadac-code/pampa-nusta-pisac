# 🏔️ PAMPA ÑUSTA — Base de Datos del Proyecto

> **Eco-Santuario Ancestral · Pisac, Valle Sagrado, Cusco, Perú**
> Versión del documento: 1.0 | Actualizado: 23 de Septiembre 2026

---

## 🌐 Infraestructura Digital

| Recurso | URL / Valor |
|---------|-------------|
| **Sitio web en producción** | https://pampa-nusta-pisac.vercel.app |
| **Repositorio GitHub** | https://github.com/lifextremes-projects/pampa-nusta-pisac |
| **Plataforma de deploy** | Vercel (lifextremes-projects) |
| **Project ID Vercel** | prj_bADIZrYG2YgWYgp3joHeEDyfV4ku |
| **Org Vercel** | team_qCpDlotyq1efKtKIf2M4scRy |
| **Stack tecnológico** | React 19 · Vite · TypeScript · Tailwind CSS |
| **Backend / API** | Express.js (Node) · `/api/index.ts` |
| **Base de datos** | LocalStorage (frontend) → migrar a SQLite/PostgreSQL |

---

## 🔐 Accesos del Sistema

| Sistema | Credencial |
|---------|------------|
| **Portal Fundadores** (contraseña) | `PampaÑusta2026` |
| **Roles del sistema** | Director (1) · Compradores (4) |
| **Moneda operativa** | Soles (PEN - S/.) |
| **Bot de Telegram** | Pendiente de configurar token |

---

## 🏗️ Arquitectura del Proyecto

```
pampa-nusta-pisac/
├── src/
│   ├── App.tsx                        # Router principal (react-router-dom)
│   ├── main.tsx                       # Entry point
│   ├── components/
│   │   ├── Fundadores/                # Portal privado de socios
│   │   │   ├── FundadoresApp.tsx      # App principal con tabs
│   │   │   ├── ContabilidadModule.tsx # Módulo financiero completo
│   │   │   ├── FinancialDashboard.tsx # Dashboard de inversiones
│   │   │   └── RoadmapAccordion.tsx   # Mapa de ruta del proyecto
│   │   ├── Hero.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ConectaPampaNustaChatbot.tsx
│   │   ├── VirtualTour360.tsx
│   │   ├── InteractiveSanctuaryMap.tsx
│   │   └── ... (30+ componentes)
│   ├── i18n/                          # Internacionalización ES/EN
│   └── data/                          # Datos estáticos
├── server/
│   └── index.ts                       # API Express (Telegram webhook aquí)
├── api/
│   └── index.ts                       # Serverless function para Vercel
├── docs/                              # 📚 Base de datos del proyecto
│   ├── PROYECTO_BASE.md               # Este archivo
│   ├── AVANCES_DIARIOS.md             # Log de avances por fecha
│   └── ROADMAP_TECNICO.md             # Hoja de ruta técnica
├── public/                            # Assets estáticos
├── dist/                              # Build de producción (auto-generado)
├── automatizar.py                     # Script de deploy automatizado
└── vercel.json                        # Config de Vercel
```

---

## 👥 Equipo y Roles

| Rol | Función |
|-----|---------|
| **Director** | Acceso total al portal de fundadores, aprobación de gastos, reportes |
| **Comprador 1-4** | Puede registrar facturas y gastos vía Telegram o portal |
| **Voluntarios** | Mano de obra local para construcción (no digital) |

---

## 💰 Modelo Financiero

- **Estrategia:** Capital semilla mínimo · Austero · Autofinanciado
- **Tracking de gastos:** Por categoría CAPEX (materiales, mano obra especializada, logística)
- **Sistema semáforo:** Verde (<80% del presupuesto) · Amarillo (80-99%) · Rojo (>100%)
- **ROI objetivo:** Turismo regenerativo · Retiros espirituales · Alianzas institucionales

---

## 📋 Módulos del Portal Fundadores (`/fundadores`)

1. **Dashboard** — KPIs en tiempo real, flujo de caja
2. **Contabilidad** — Registro de gastos/ingresos, semáforo CAPEX
3. **Bot Telegram** — OCR automático de facturas por foto
4. **Road Map** — Fases de construcción tipo "juego de estrategia"
5. **Marketing** — Estrategias B2B, outreach a universidades
6. **Documentos** — Dossier institucional, certificaciones

---

## 🤖 Bot de Telegram (En implementación)

- **Función:** Voluntarios envían foto de factura → sistema lee monto/proveedor → registra como gasto automáticamente
- **Costo:** $0 (API de Telegram es gratuita)
- **Endpoint destino:** `/api/webhook/telegram` en `server/index.ts`
- **Usuarios:** 5 (Director + 4 Compradores)
- **Moneda:** Soles (PEN)

---

## 🔗 Contactos e Instituciones Clave

- **Ministerio de Cultura Perú** → Permiso CIRA para excavaciones
- **SERNANP** → Coordinación área natural protegida
- **Universidades aliadas** → PUCP, UNSAAC (programas de voluntariado)
- **Proveedores locales** → Ferreterías de Pisac, artesanos del Valle Sagrado
