'use client';
import { motion } from 'framer-motion';
import { FaCameraRetro, FaCar, FaFilm, FaPalette } from 'react-icons/fa'; // Icons for services

const servicesList = [
  {
    icon: FaCameraRetro,
    title: "Sesiones Fotográficas Personalizadas",
    description: "Creamos paquetes a medida para cada cliente, desde tomas estáticas en estudio hasta acción en carretera o pista.",
  },
  {
    icon: FaCar,
    title: "Fotografía de Eventos Automotrices",
    description: "Cobertura completa de exposiciones, lanzamientos, rallys y eventos privados con un toque editorial.",
  },
  {
    icon: FaFilm,
    title: "Producción de Video Automotriz",
    description: "Desde cortometrajes cinemáticos hasta anuncios dinámicos, damos vida a tu visión en movimiento.",
  },
  {
    icon: FaPalette,
    title: "Retoque y Post-producción Premium",
    description: "Edición avanzada para perfeccionar cada imagen, asegurando colores vibrantes, detalles nítidos y un acabado impecable.",
  },
];

const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 drop-shadow-lg">
            Nuestros Servicios Exclusivos
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Ofrecemos una gama completa de servicios para satisfacer todas tus necesidades de fotografía y video automotriz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,255,255,0.2)" }}
              className="relative group bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700 flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="text-5xl text-teal-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;