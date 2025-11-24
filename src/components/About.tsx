'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-950 text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 drop-shadow-lg">
            Nuestra Pasión por la Velocidad y el Arte
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            En PURPUR Photography, no solo capturamos imágenes; inmortalizamos el alma de cada vehículo.
            Combinamos arte, técnica y un profundo amor por la ingeniería automotriz para ofrecerte fotografías que cuentan una historia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/about-studio-shot.png" // Placeholder, will replace with generated image
              alt="Fotógrafo capturando un coche en estudio"
              layout="fill"
              objectFit="cover"
              quality={90}
              className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <p className="text-md md:text-lg text-gray-200 leading-relaxed">
              Desde el rugido de un motor en la pista hasta la elegancia silenciosa de un clásico en exhibición, cada disparo es una búsqueda de la perfección.
              Utilizamos equipos de última generación y técnicas innovadoras para resaltar cada curva, cada reflejo y cada detalle que hace único a tu automóvil.
            </p>
            <p className="text-md md:text-lg text-gray-200 leading-relaxed">
              Nuestro equipo de fotógrafos profesionales entiende la dinámica de la luz y la composición, creando imágenes que no solo son visualmente impactantes, sino que también evocan emociones y celebran la cultura automotriz en su máxima expresión.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 ease-in-out text-base"
            >
              Conoce al Equipo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;