import React from 'react';
import { MessageCircle, Phone, CalendarCheck, MapPin, Mail } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 bg-victory-charcoal relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Info Side */}
          <div className="lg:w-1/3 space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8 font-serif">Inicie su Transformación</h2>
            <p className="text-gray-400">
              Estamos listos para llevar su vehículo al siguiente nivel. Agende su cita o visítenos para una evaluación personalizada.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-start">
                    <MapPin className="text-victory-gold mt-1 mr-4" size={24} />
                    <div>
                        <h4 className="text-white font-bold">Ubicación</h4>
                        <p className="text-gray-400">Calle 128 #47-36, Bogotá</p>
                    </div>
                </div>
                 <div className="flex items-start">
                    <Phone className="text-victory-gold mt-1 mr-4" size={24} />
                    <div>
                        <h4 className="text-white font-bold">Línea Directa</h4>
                        <p className="text-gray-400">+57 314 256 1889</p>
                    </div>
                </div>
                 <div className="flex items-start">
                    <Mail className="text-victory-gold mt-1 mr-4" size={24} />
                    <div>
                        <h4 className="text-white font-bold">Email</h4>
                        <p className="text-gray-400">contacto@victorycars.com</p>
                    </div>
                </div>
            </div>

            <div className="pt-8">
                <h4 className="text-white font-bold mb-4">Horario de Atención</h4>
                <div className="flex justify-between text-gray-400 border-b border-white/10 py-2">
                    <span>Lunes - Viernes</span>
                    <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400 border-b border-white/10 py-2">
                    <span>Sábados</span>
                    <span>9:00 AM - 4:00 PM</span>
                </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 bg-victory-black p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Nombre Completo</label>
                    <input type="text" className="w-full bg-victory-charcoal border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-victory-gold transition-colors" placeholder="Su nombre" />
                </div>
                <div>
                    <label className="block text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Teléfono</label>
                    <input type="tel" className="w-full bg-victory-charcoal border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-victory-gold transition-colors" placeholder="+57 ..." />
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Vehículo</label>
                    <input type="text" className="w-full bg-victory-charcoal border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-victory-gold transition-colors" placeholder="Marca y Modelo" />
                </div>
                <div>
                    <label className="block text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Servicio de Interés</label>
                     <select className="w-full bg-victory-charcoal border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-victory-gold transition-colors">
                        <option>Seleccionar...</option>
                        <option>Cerámico 9H</option>
                        <option>PPF</option>
                        <option>Detailing Interior</option>
                        <option>Polarizado</option>
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Mensaje</label>
                <textarea rows={4} className="w-full bg-victory-charcoal border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-victory-gold transition-colors" placeholder="¿Cómo podemos ayudarle?"></textarea>
              </div>

              <button type="submit" className="w-full bg-victory-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-lg">
                Enviar Solicitud VIP
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
