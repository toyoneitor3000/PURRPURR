import React from 'react';
import Image from 'next/image';

const AboutUsSection: React.FC = () => {
  return (
    <section className="py-24 bg-victory-black relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="md:w-1/2 relative">
             <div className="absolute -inset-4 bg-victory-gold/20 rounded-xl blur-2xl -z-10"></div>
            <Image
              src="/about-us.jpg"
              alt="Victory Cars S.A.S. Taller"
              width={600}
              height={400}
              layout="responsive"
              className="rounded-xl shadow-2xl border border-white/10"
            />
          </div>
          <div className="md:w-1/2 text-gray-300">
            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Artesanos de la <span className="text-victory-gold">Perfección</span></h2>
            <p className="text-lg leading-relaxed mb-6 font-light">
              En Victory Cars S.A.S. no solo lavamos autos; <span className="text-white font-medium">restauramos obras de ingeniería</span>. Somos un centro especializado en protección y personalización automotriz de alto calibre.
            </p>
            <p className="text-lg leading-relaxed mb-8 font-light">
              Combinamos tecnología de vanguardia, técnicas de corrección milimétrica y productos premium como <span className="text-victory-gold">IGL Coatings</span> para garantizar que su inversión mantenga su valor y estética por años.
            </p>
            <button className="text-victory-gold border-b border-victory-gold pb-1 hover:text-white hover:border-white transition-all duration-300 text-sm tracking-widest uppercase font-bold">
              Nuestra Historia
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
