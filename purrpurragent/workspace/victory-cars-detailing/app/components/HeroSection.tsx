import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }} 
      >
         <div className="absolute inset-0 bg-gradient-to-b from-victory-black/80 via-victory-black/60 to-victory-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
          Perfección <span className="text-transparent bg-clip-text bg-gradient-to-r from-victory-gold to-yellow-200">Absoluta</span><br />
          Para Tu Vehículo
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          El centro de detallado automotriz más exclusivo de Bogotá.
          <span className="block mt-2 text-victory-silver font-medium">Cerámicos 9H • PPF • Restauración Premium</span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className="bg-victory-gold text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            Agendar Cita VIP
          </button>
          <button className="bg-transparent border border-white/30 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Explorar Servicios
          </button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-xs md:text-sm text-gray-500 font-medium tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-victory-gold rounded-full shadow-[0_0_10px_#D4AF37]"></span> Bogotá, Col
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-victory-gold rounded-full shadow-[0_0_10px_#D4AF37]"></span> Certificado IGL
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-victory-gold rounded-full shadow-[0_0_10px_#D4AF37]"></span> Garantía Real
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
