import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';

interface MoviePlayerUIProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  progress: number; // 0 to 100
  currentSceneName: string;
}

export const MoviePlayerUI: React.FC<MoviePlayerUIProps> = ({ isPlaying, onTogglePlay, progress, currentSceneName }) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2 justify-center">
      {/* Scrubber / Progress Bar */}
      <div className="w-full flex items-center gap-4">
        <span className="text-[10px] font-mono text-stone-500 font-bold tracking-widest uppercase w-32 shrink-0 truncate">
          {currentSceneName}
        </span>
        <div className="flex-grow h-1 bg-stone-800 rounded-full overflow-hidden relative cursor-pointer group">
          <div 
            className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
          {/* Hover scrubber effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-[10px] font-mono text-stone-500 font-bold tracking-widest w-12 text-right shrink-0">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6">
          <button onClick={onTogglePlay} className="text-stone-300 hover:text-amber-400 transition-colors cursor-pointer">
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer">
            <SkipBack className="w-4 h-4 fill-current" />
          </button>
          <button className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer">
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
          <button onClick={() => setIsMuted(!isMuted)} className="text-stone-400 hover:text-stone-200 transition-colors cursor-pointer ml-2">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] uppercase font-mono tracking-widest text-amber-500/50 border border-amber-500/20 px-2 py-0.5 rounded hidden sm:block">
            Director's Cut · 4K UHD
          </span>
          <button className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer" onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
              });
            } else {
              document.exitFullscreen();
            }
          }}>
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
