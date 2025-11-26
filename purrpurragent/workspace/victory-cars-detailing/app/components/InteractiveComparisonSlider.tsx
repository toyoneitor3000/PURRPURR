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
      {label && <h3 className="text-2xl text-center mb-6 text-victory-gold font-serif tracking-wide">{label}</h3>}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize border-2 border-victory-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image src={afterImage} alt="After" fill className="object-cover" />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-victory-gold px-3 py-1 rounded text-xs font-bold tracking-widest border border-victory-gold/20">DESPUÉS</div>
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden" 
          style={{ width: `${sliderPosition}%`, borderRight: '2px solid white' }}
        >
          <Image src={beforeImage} alt="Before" fill className="object-cover" />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold tracking-widest">ANTES</div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-victory-gold shadow-[0_0_20px_rgba(212,175,55,0.8)] z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="bg-victory-gold p-2 rounded-full text-black shadow-lg hover:scale-110 transition-transform">
            <MoveHorizontal size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
