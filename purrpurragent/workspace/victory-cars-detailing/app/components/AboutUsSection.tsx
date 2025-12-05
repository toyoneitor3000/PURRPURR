import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, Zap, Award } from 'lucide-react';

const AboutUsSection: React.FC = () => {
  const featuredServices = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Protección Cerámica 9H",
      description: "Tecnología SYLEX y GTECHNIQ con garantía de 3-5 años.",
      highlight: "Garantía Real"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "PPF Shield",
      description: "Película de protección transparente que se autoregenera.",
      highlight: "10 Años"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Detailing Premium",
      description: "Corrección de pintura profesional y detailing completo.",
      highlight: "Resultado Espejo"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certificación IGL",
      description: "Únicos en Bogotá con certificación oficial IGL Coatings.",
      highlight: "Certificado"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-brand-petroleum via-brand-black to-brand-dark-blue relative overflow-hidden">
      {/* Fondo con efectos */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent-blue/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Sección original About Us */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-24">
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-4 bg-brand-cyan/20 rounded-xl blur-2xl -z-10"></div>
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Placeholder image since we know images are missing, adding a colored div as fallback */}
              <div className="absolute inset-0 bg-brand-mid-blue flex items-center justify-center text-brand-slate">
                [Imagen Taller / Equipo]
              </div>
              <Image
                src="/about-us.jpg"
                alt="Victory Cars S.A.S. Taller"
                fill
                style={{ objectFit: "cover" }}
                className="opacity-80"
              />
            </div>
          </div>
          <div className="md:w-1/2 text-brand-slate">
            <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">Artesanos de la <span className="text-brand-cyan">Perfección</span></h2>
            <p className="text-lg leading-relaxed mb-6 font-light">
              En <span className="font-orbitron text-white">VICTORY CARS</span> no solo lavamos autos; <span className="text-white font-medium">restauramos obras de ingeniería</span>. Somos un centro especializado en protección y personalización automotriz de alto calibre.
            </p>
            <p className="text-lg leading-relaxed mb-8 font-light">
              Combinamos tecnología de vanguardia, técnicas de corrección milimétrica y productos premium como <span className="text-brand-cyan font-bold">IGL Coatings</span> para garantizar que su inversión mantenga su valor y estética por años.
            </p>
            <a href="https://wa.me/573124730909?text=Hola,%20deseo%20conocer%20más%20sobre%20Victory%20Cars." target="_blank" rel="noopener noreferrer" className="text-brand-cyan border-b border-brand-cyan pb-1 hover:text-white hover:border-white transition-all duration-300 text-sm tracking-widest uppercase font-bold font-orbitron">
              Contáctanos
            </a>
          </div>
        </div>

        {/* Sección de Servicios Destacados */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-light-blue to-blue-400">
              Nuestros Servicios Destacados
            </span>
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto mb-8 leading-relaxed">
            Descubre los servicios premium que nos distinguen en el mercado automotriz
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-brand-cyan to-brand-light-blue mx-auto rounded-full shadow-[0_0_20px_rgba(76,201,240,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredServices.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-brand-cyan/30 hover:transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-cyan/20 to-brand-light-blue/20 rounded-xl mb-6 group-hover:from-brand-cyan/30 group-hover:to-brand-light-blue/30 transition-all duration-300 mx-auto">
                <div className="text-brand-cyan">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-3 font-orbitron tracking-wide">
                {service.title}
              </h3>
              <p className="text-brand-slate text-center text-sm mb-4 leading-relaxed">
                {service.description}
              </p>
              <div className="text-center">
                <span className="inline-block bg-gradient-to-r from-brand-cyan/20 to-brand-light-blue/20 text-brand-cyan text-xs font-bold py-1.5 px-4 rounded-full border border-brand-cyan/30">
                  {service.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-brand-black/40 to-brand-petroleum/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-white mb-6 font-orbitron">¿Listo para transformar tu vehículo?</h3>
          <p className="text-xl text-brand-slate max-w-2xl mx-auto mb-8 leading-relaxed">
            Agenda una evaluación personalizada y descubre cómo podemos llevar tu vehículo a su máxima expresión.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#services" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-cyan to-brand-light-blue text-brand-dark-blue font-bold py-3 px-8 rounded-full hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 font-orbitron tracking-wide"
            >
              <span>Ver todos los servicios</span>
              <Sparkles className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/573124730909" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-brand-cyan text-brand-cyan font-bold py-3 px-8 rounded-full hover:bg-brand-cyan/10 transition-all duration-300 font-orbitron tracking-wide"
            >
              <span>Agendar cita</span>
              <Shield className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
