import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-1">
           <h3 className="text-2xl font-serif text-white mb-6">VICTORY CARS</h3>
           <p className="text-sm leading-relaxed mb-6">
             Elevando el estándar del cuidado automotriz en Bogotá. Pasión, tecnología y perfección en cada detalle.
           </p>
           <div className="flex space-x-4">
            <a href="#" className="hover:text-victory-gold transition-colors"><Instagram size={24}/></a>
            <a href="#" className="hover:text-victory-gold transition-colors"><Facebook size={24}/></a>
            <a href="#" className="hover:text-victory-gold transition-colors"><Twitter size={24}/></a>
           </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Servicios</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-victory-gold transition-colors">Cerámico 9H</a></li>
            <li><a href="#" className="hover:text-victory-gold transition-colors">PPF Protection</a></li>
            <li><a href="#" className="hover:text-victory-gold transition-colors">Detailing Interior</a></li>
            <li><a href="#" className="hover:text-victory-gold transition-colors">Corrección de Pintura</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Empresa</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-victory-gold transition-colors">Nosotros</a></li>
            <li><a href="#" className="hover:text-victory-gold transition-colors">Portafolio</a></li>
            <li><a href="#" className="hover:text-victory-gold transition-colors">Contacto</a></li>
            <li><a href="#" className="hover:text-victory-gold transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Boletín VIP</h4>
           <p className="text-xs mb-4">Reciba ofertas exclusivas y consejos de mantenimiento.</p>
           <div className="flex">
               <input type="email" placeholder="Su email" className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:border-victory-gold w-full text-sm"/>
               <button className="bg-victory-gold text-black px-4 py-2 rounded-r-lg hover:bg-white transition-colors">
                   <ArrowRight size={18}/>
               </button>
           </div>
        </div>

      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        &copy; 2025 Victory Cars S.A.S. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
