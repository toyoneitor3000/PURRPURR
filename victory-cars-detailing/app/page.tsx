'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, PROCESS_STEPS, TESTIMONIALS } from '@/lib/services';

const GradientBorderContainer = ({ children, className = '' }) => (
  <div className={`bg-gradient-to-br from-brand-cyan to-blue-500 p-0.5 rounded-2xl ${className}`}>
    <div className="bg-brand-mid-blue w-full h-full rounded-[15px]">{children}</div>
  </div>
);

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', alt: 'Coche deportivo amarillo con pintura brillante' },
  { src: 'https://images.unsplash.com/photo-1617021323101-9a74a13f7a62?q=80&w=1974&auto=format&fit=crop', alt: 'Llanta de coche de lujo detallada' },
  { src: 'https://images.unsplash.com/photo-1626558310323-b153482c1a49?q=80&w=1964&auto=format&fit=crop', alt: 'Interior de cuero de coche deportivo' },
  { src: 'https://images.unsplash.com/photo-1614262842352-a7d05716503c?q=80&w=2070&auto=format&fit=crop', alt: 'Faro trasero de un coche de lujo' }
];

export default function Home() {
  const [featuredImage, setFeaturedImage] = useState(galleryImages[0]);

  return (
    <main className="pt-24">
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center relative">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop" alt="Hero Background Car" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/80 to-transparent"></div>
        <div className="relative z-10 p-8">
          <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-tight uppercase text-white">Tu Vehículo a su Máxima<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Expresión de Belleza</span></h1>
          <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-brand-slate">El aliado profesional que combina estética y funcionalidad con materiales de la más alta calidad.</p>
        </div>
      </section>

      <section id="services" className="py-20 px-6 relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-white">Nuestros <span className="text-brand-cyan">Servicios</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link href={`/servicios/${service.slug}`} key={service.slug} className="group block">
                  <div className="h-full bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-brand-cyan/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center shadow-2xl shadow-black/40">
                    <div className="mb-6 p-4 border-2 border-white/20 rounded-full group-hover:border-brand-cyan transition-colors duration-300"><Icon className="h-8 w-8 text-brand-cyan" /></div>
                    <h3 className="text-xl font-orbitron font-bold mb-3 text-white transition-colors duration-300 group-hover:text-brand-cyan">{service.title}</h3>
                    <p className="text-brand-slate text-sm flex-grow">{service.shortDescription}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-6 bg-brand-mid-blue/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-white">Nuestro Proceso de <span className="text-brand-cyan">Excelencia</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center">
                    <div className="p-4 bg-brand-dark-blue border-2 border-brand-cyan rounded-full"><Icon className="h-10 w-10 text-brand-cyan"/></div>
                    <h3 className="mt-4 text-xl font-orbitron font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-brand-slate text-sm">{step.description}</p>
                  </div>
                );
            })}
          </div>
        </div>
      </section>

       <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-white">Clientes <span className="text-brand-cyan">Satisfechos</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <GradientBorderContainer key={testimonial.name}>
                 <div className="p-8 h-full flex flex-col justify-center">
                    <p className="text-brand-slate italic">“{testimonial.quote}”</p>
                    <p className="mt-4 font-bold text-white">- {testimonial.name} <span className="text-brand-cyan font-normal">({testimonial.car})</span></p>
                 </div>
              </GradientBorderContainer>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6">
        <div className="container mx-auto text-center">
           <h2 className="text-4xl font-orbitron font-bold mb-12 text-white">Nuestros <span className="text-brand-cyan">Resultados</span></h2>
           <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden border-2 border-brand-cyan/50">
              <Image src={featuredImage.src} alt={featuredImage.alt} fill className="object-cover transition-all duration-500" key={featuredImage.src}/>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 max-w-4xl mx-auto">
              {galleryImages.map((img) => (
                <div key={img.src} onClick={() => setFeaturedImage(img)} className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ${featuredImage.src === img.src ? 'border-brand-cyan' : 'border-transparent hover:border-brand-cyan/50'}`}>
                   <Image src={img.src} alt={img.alt} fill className="object-cover"/>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container mx-auto">
          <GradientBorderContainer className="shadow-2xl shadow-black/40">
            <div className="bg-white/5 backdrop-blur-lg p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white">¿Listo para la <span className="text-brand-cyan">transformación</span>?</h2>
              <p className="mt-4 text-lg max-w-2xl mx-auto">Contáctanos para ver más trabajos y agendar una cita.</p>
              <a href="https://www.instagram.com/victorycars_paintdetailing/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-brand-cyan text-brand-dark-blue font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors duration-300 text-lg">
                Ver Galería en Instagram
              </a>
            </div>
          </GradientBorderContainer>
        </div>
      </section>
    </main>
  );
}