import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { X, MapPin, Compass, ChevronLeft, ChevronRight, Radio, Eye, Navigation } from 'lucide-react';

interface InterdimensionalJourneyProps {
  isOpen: boolean;
  onClose: () => void;
}

// --------------------------------------------------------
// 3D TUNNEL COMPONENT
// --------------------------------------------------------
const Tunnel: React.FC<{ progressRef: React.MutableRefObject<number> }> = ({ progressRef }) => {
  const { camera, scene } = useThree();
  const tubeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create curve
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = Math.sin(t * Math.PI * 4) * 3;
      const y = Math.cos(t * Math.PI * 4) * 3;
      const z = -t * 100;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  // Create particles
  const [particleGeo, particleMat] = useMemo(() => {
    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorChoices = [
      new THREE.Color('#00ae42'), // emerald
      new THREE.Color('#13612e'), // dark emerald
      new THREE.Color('#e8dcc4'), // sand/gold
      new THREE.Color('#ffffff'), // white
    ];

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const pointOnCurve = curve.getPointAt(t);
      
      // Random offset from curve
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 4;
      
      positions[i * 3] = pointOnCurve.x + Math.cos(angle) * radius;
      positions[i * 3 + 1] = pointOnCurve.y + Math.sin(angle) * radius;
      positions[i * 3 + 2] = pointOnCurve.z + (Math.random() - 0.5) * 5;

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    return [geo, mat];
  }, [curve]);

  useFrame((state, delta) => {
    const progress = Math.min(Math.max(progressRef.current, 0), 1);
    
    // Position camera along curve
    const t = Math.min(progress, 0.999);
    const pos = curve.getPointAt(t);
    const lookAtPos = curve.getPointAt(Math.min(t + 0.01, 1));
    
    camera.position.copy(pos);
    camera.lookAt(lookAtPos);
    
    // Add subtle camera shake based on speed (progress)
    camera.position.x += (Math.random() - 0.5) * progress * 0.1;
    camera.position.y += (Math.random() - 0.5) * progress * 0.1;

    if (tubeRef.current) {
      tubeRef.current.rotation.z += delta * 0.2; // Auto-rotate
    }
    
    if (particlesRef.current) {
      // Speed effect: elongate particles visually by scaling them based on progress?
      // Since it's Points we can't scale non-uniformly easily without shaders.
      // But we can rotate the particle system slightly.
      particlesRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curve, 200, 2, 16, false]} />
        <meshBasicMaterial
          color="#00ae42"
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
      <points ref={particlesRef} geometry={particleGeo} material={particleMat} />
    </>
  );
};

// --------------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------------
export const InterdimensionalJourney: React.FC<InterdimensionalJourneyProps> = ({ isOpen, onClose }) => {
  const [progressState, setProgressState] = useState(0);
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Phase 3 state
  const [currentViewIdx, setCurrentViewIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [currentDrag, setCurrentDrag] = useState(0);

  const views = [
    { name: 'Valle Sagrado Aéreo', image: '/images/journey/valley-aerial.jpg' },
    { name: 'Santuario Ecológico', image: '/images/journey/sanctuary-panorama.jpg' },
    { name: 'Terrazas Ancestrales', image: '/images/journey/terraces-mountains.jpg' }
  ];

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.005 : -0.005;
    progressRef.current = Math.min(Math.max(progressRef.current + delta, 0), 1);
    setProgressState(progressRef.current);
  }, []);

  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const deltaY = touchStartY.current - e.touches[0].clientY;
    const delta = deltaY * 0.0005; // sensitivity
    progressRef.current = Math.min(Math.max(progressRef.current + delta, 0), 1);
    setProgressState(progressRef.current);
    touchStartY.current = e.touches[0].clientY;
  }, []);

  useEffect(() => {
    if (isOpen && progressRef.current < 1) {
      const container = containerRef.current;
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
      }
      return () => {
        if (container) {
          container.removeEventListener('wheel', handleWheel);
          container.removeEventListener('touchstart', handleTouchStart);
          container.removeEventListener('touchmove', handleTouchMove);
        }
      };
    }
  }, [isOpen, handleWheel, handleTouchStart, handleTouchMove, progressState]);

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      progressRef.current = 0;
      setProgressState(0);
      setDragOffset(0);
      setCurrentDrag(0);
    }
  }, [isOpen]);

  // Street view dragging
  const handlePanoramaMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handlePanoramaMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setCurrentDrag(diff);
  };

  const handlePanoramaMouseUp = () => {
    setIsDragging(false);
    // limit drag
    let newOffset = dragOffset + currentDrag;
    const maxOffset = 500; // arbitrary max pan
    const minOffset = -500;
    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));
    setDragOffset(newOffset);
    setCurrentDrag(0);
  };

  if (!isOpen) return null;

  const p = progressState;
  const isPhase1 = p < 0.85;
  const isPhase2 = p >= 0.85 && p < 1;
  const isPhase3 = p === 1;

  const speedKph = Math.floor(300 + (29000 - 300) * (p / 0.85));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* ALWAYS VISIBLE CLOSE BUTTON */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm"
      >
        <X size={24} />
      </button>

      {/* PHASE 1 & 2: 3D CANVAS */}
      {!isPhase3 && (
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 1.5]} gl={{ antialias: false }}>
            <Tunnel progressRef={progressRef} />
          </Canvas>
          
          {/* HUD OVERLAY (Phase 1) */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isPhase1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest text-[#00ae42] uppercase">
              Viaje Interdimensional
            </div>
            
            <div className="absolute top-6 right-20 font-mono text-[10px] tracking-widest text-[#e8dcc4] uppercase text-right">
              Velocidad<br/>
              <span className="text-[#00ae42]">{Math.min(speedKph, 29000).toLocaleString()} km/h</span>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/20">
              <div 
                className="h-full bg-[#00ae42] transition-all duration-75"
                style={{ width: `${(p / 0.85) * 100}%` }}
              />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/50 uppercase">
              Scroll para avanzar
            </div>

            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.2em] text-white/70 uppercase text-center transition-opacity duration-1000 ${p > 0.3 && p < 0.8 ? 'opacity-100' : 'opacity-0'}`}>
              Cruzando dimensiones hacia<br/>el Valle Sagrado...
            </div>
          </div>

          {/* FLASH TRANSITION (Phase 2) */}
          <div className={`absolute inset-0 bg-white/90 flex flex-col items-center justify-center transition-opacity duration-1000 pointer-events-none ${isPhase2 ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-black tracking-widest text-center mb-4">
              Bienvenido a Pampa Ñusta
            </h1>
            <p className="font-mono text-sm tracking-[0.3em] text-black/70 uppercase text-center">
              Pisac · Valle Sagrado · 3,347 m.s.n.m.
            </p>
          </div>
        </div>
      )}

      {/* PHASE 3: STREET VIEW */}
      {isPhase3 && (
        <div className="absolute inset-0 z-10 bg-black flex flex-col animate-in fade-in duration-1000">
          
          {/* Panoramic Image Container */}
          <div 
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handlePanoramaMouseDown}
            onMouseMove={handlePanoramaMouseMove}
            onMouseUp={handlePanoramaMouseUp}
            onMouseLeave={handlePanoramaMouseUp}
            onTouchStart={handlePanoramaMouseDown}
            onTouchMove={handlePanoramaMouseMove}
            onTouchEnd={handlePanoramaMouseUp}
          >
            <div 
              className="absolute inset-y-0 -inset-x-[100vw] bg-cover bg-center transition-transform duration-75 ease-out"
              style={{
                backgroundImage: `url('${views[currentViewIdx].image}')`,
                transform: `translateX(${dragOffset + currentDrag}px) scale(1.1)`
              }}
            />
            
            {/* Street View UI Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />

            <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
              <Radio size={14} className="text-[#00ae42] animate-pulse" />
              <span className="font-mono text-xs tracking-wider text-white uppercase">EN VIVO · Pampa Ñusta, Pisac</span>
            </div>

            <div className="absolute top-6 right-20 flex flex-col items-end gap-1 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 pointer-events-none">
              <div className="flex items-center gap-2 text-white/70">
                <Compass size={14} />
                <span className="font-mono text-[10px] tracking-widest uppercase">Coordenadas GPS</span>
              </div>
              <span className="font-mono text-sm text-[#e8dcc4]">-13.4225, -71.8488</span>
            </div>
            
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentViewIdx((prev) => (prev - 1 + views.length) % views.length); setDragOffset(0); }}
                className="w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 border border-white/20 rounded-full text-white backdrop-blur-md transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentViewIdx((prev) => (prev + 1) % views.length); setDragOffset(0); }}
                className="w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 border border-white/20 rounded-full text-white backdrop-blur-md transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

          </div>

          {/* Bottom Panel */}
          <div className="h-48 bg-[#0a0a0a] border-t border-white/10 flex flex-col items-center justify-center gap-6 relative z-20">
            
            <div className="flex gap-4 px-6 max-w-full overflow-x-auto no-scrollbar">
              {views.map((view, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentViewIdx(idx); setDragOffset(0); }}
                  className={`relative w-32 h-20 rounded-lg overflow-hidden shrink-0 transition-all duration-300 ${currentViewIdx === idx ? 'ring-2 ring-[#00ae42] opacity-100 scale-105' : 'ring-1 ring-white/20 opacity-50 hover:opacity-80'}`}
                >
                  <img src={view.image} alt={view.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="font-mono text-[9px] tracking-wider text-white uppercase text-left leading-tight">{view.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-3 bg-[#00ae42] hover:bg-[#13612e] text-white font-mono text-sm uppercase tracking-widest transition-colors rounded-none"
            >
              <Eye size={16} />
              Explorar el Santuario Completo
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};
