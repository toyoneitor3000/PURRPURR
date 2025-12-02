'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  label?: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage, label }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  const handleTouchStart = () => setIsResizing(true);
  const handleTouchEnd = () => setIsResizing(false);

  const handleMove = (clientX: number) => {
    if (!isResizing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percent, 0), 100));
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 select-none">
      {label && <h3 className="text-2xl text-center mb-6 text-brand-cyan font-orbitron tracking-wide text-glow">{label}</h3>}
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize border-2 border-brand-mid-blue shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 bg-brand-dark-blue">
          <div className="absolute inset-0 flex items-center justify-center text-brand-slate opacity-20 font-orbitron text-4xl">DESPUÉS</div>
          <div className="relative w-full h-full">
            <Image src={afterImage} alt="After" fill className="object-cover" />
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-brand-cyan px-3 py-1 rounded text-xs font-bold tracking-widest border border-brand-cyan/20 font-orbitron">DESPUÉS</div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden bg-brand-charcoal"
          style={{ width: `${sliderPosition}%`, borderRight: '2px solid white' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-brand-slate opacity-20 font-orbitron text-4xl">ANTES</div>
          <div className="relative w-full h-full">
            <Image src={beforeImage} alt="Before" fill className="object-cover" />
          </div>
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold tracking-widest font-orbitron">ANTES</div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brand-cyan shadow-[0_0_20px_#06b6d4] z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="bg-brand-cyan p-2 rounded-full text-brand-dark-blue shadow-lg hover:scale-110 transition-transform">
            <MoveHorizontal size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
