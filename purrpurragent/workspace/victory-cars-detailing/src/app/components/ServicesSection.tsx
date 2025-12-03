import React from 'react';
import type { Service } from '../../../lib/services';
import { SERVICES } from '../../../lib/services';

const ServicesSection: React.FC = () => {
  return (
    <section>
      <h2>Our Services</h2>
      <div className="flex flex-wrap justify-center">
        {SERVICES.map((service: Service) => (
          <div key={service.slug} className="w-full lg:w-1/2 xl:w-1/3 p-4">
            <img src={service.heroImage} alt={service.title} />
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
