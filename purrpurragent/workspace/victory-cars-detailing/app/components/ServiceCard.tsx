import React from 'react';
import Image from 'next/image';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string | JSX.Element;
  imageUrl: string;
  price?: string;
  promotion?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl, price, promotion }) => {
  return (
    <div className="group relative bg-victory-charcoal border border-white/5 rounded-2xl overflow-hidden hover:border-victory-gold/50 transition-all duration-500 h-full flex flex-col hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          className="group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-victory-charcoal via-transparent to-transparent opacity-90"></div>
        {promotion && (
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg border border-red-400/30">
            {promotion}
          </div>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-grow relative -mt-12 z-10">
        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-victory-gold transition-colors duration-300">{title}</h3>
        
        <div className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed space-y-2">
          {typeof description === 'string' ? <p>{description}</p> : description}
        </div>
        
        {price && (
          <div className="mb-6 pt-4 border-t border-white/5">
             <p className="text-[10px] text-victory-gold uppercase tracking-widest mb-1">Inversión desde</p>
             <p className="text-2xl font-bold text-white">{price}</p>
          </div>
        )}
        
        <a
          href={`https://wa.me/573142561889?text=Hola,%20deseo%20información%20VIP%20sobre%20${title.replace(/ /g, '%20')}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white/5 hover:bg-victory-gold hover:text-black text-white border border-white/10 font-bold py-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          <span className="mr-2 text-sm uppercase tracking-wide">Cotizar Experiencia</span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
