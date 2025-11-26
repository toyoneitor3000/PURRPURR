import React from 'react';
import { Car, Paintbrush, Shield, WashingMachine, Sparkles, Sun } from 'lucide-react';

interface ServiceIconProps {
  icon: React.ElementType;
  label: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center p-6 hover:bg-white/5 rounded-xl cursor-pointer transition duration-300 border border-transparent hover:border-victory-gold/30 group">
    <Icon size={32} className="text-gray-400 group-hover:text-victory-gold mb-3 transition-colors duration-300" />
    <span className="text-center text-xs font-medium text-gray-400 group-hover:text-white uppercase tracking-widest">{label}</span>
  </div>
);

const FeaturedServicesBar: React.FC = () => {
  return (
    <section className="bg-victory-charcoal border-y border-white/5 py-4">
      <div className="container mx-auto px-4 flex flex-wrap justify-around items-center gap-y-4">
        <ServiceIcon icon={WashingMachine} label="Aqua Wash" />
        <ServiceIcon icon={Sparkles} label="Detailing" />
        <ServiceIcon icon={Shield} label="Cerámico 9H" />
        <ServiceIcon icon={Car} label="PPF Shield" />
        <ServiceIcon icon={Paintbrush} label="Pintura" />
        <ServiceIcon icon={Sun} label="Polarizado" />
      </div>
    </section>
  );
};

export default FeaturedServicesBar;
