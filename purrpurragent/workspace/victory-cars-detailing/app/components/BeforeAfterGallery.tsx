'use client';

import React from 'react';
import ComparisonSlider from './InteractiveComparisonSlider';

const BeforeAfterGallery: React.FC = () => {
  return (
    <section className="py-24 bg-victory-black relative overflow-hidden">
       {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-victory-charcoal via-victory-black to-victory-black opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Evidencia Real</h2>
          <div className="h-1 w-24 bg-victory-gold mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Desliza para descubrir la verdadera transformación que logramos en cada vehículo.
          </p>
        </div>

        <div className="space-y-24 max-w-5xl mx-auto">
          <ComparisonSlider 
            label="Corrección de Pintura: Eliminación de Swirls"
            beforeImage="/gallery/paint-before.jpg" 
            afterImage="/gallery/paint-after.jpg" 
          />
          <ComparisonSlider 
            label="Restauración de Faros y Plásticos"
            beforeImage="/gallery/trim-before.jpg" 
            afterImage="/gallery/trim-after.jpg" 
          />
           <ComparisonSlider 
            label="Detailing Interior Profundo"
            beforeImage="/gallery/interior-before.jpg" 
            afterImage="/gallery/interior-after.jpg" 
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
