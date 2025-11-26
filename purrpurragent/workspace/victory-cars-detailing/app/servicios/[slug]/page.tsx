import Image from 'next/image';
import { SERVICES } from '@/lib/services';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const whatsappMessage = `https://wa.me/573124730909?text=Hola,%20estoy%20interesado%20en%20el%20servicio%20de%20${encodeURIComponent(service.title)}.`;

  return (
    <main>
      <section className="h-[60vh] relative flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src={service.heroImage} alt={service.title} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-blue via-brand-dark-blue/80 to-transparent"></div>
        <div className="relative z-10 text-center">
          <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-tight uppercase text-white">{service.title}</h1>
        </div>
      </section>

      <section className="py-20 px-6 relative z-10 -mt-24">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <p className="text-lg text-brand-slate leading-relaxed">{service.longDescription}</p>
            
            {service.gallery && service.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="font-orbitron text-2xl font-bold mb-6 text-center text-white">Resultados del Servicio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.gallery.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border-2 border-brand-cyan/50">
                       <Image src={img} alt={`${service.title} - imagen ${index + 1}`} fill className="object-cover"/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 text-center">
               <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-cyan text-brand-dark-blue font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors duration-300 text-lg">
                Cotizar este Servicio <ArrowRight className="inline h-5 w-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}