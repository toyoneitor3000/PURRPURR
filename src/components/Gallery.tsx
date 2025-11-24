'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  {
    src: "/gallery-image-1.png",
    alt: "Deportivo rojo en la ciudad por la noche",
    title: "Ritmo Urbano",
    description: "La energía de la ciudad y la silueta de la velocidad.",
  },
  {
    src: "/gallery-image-2.png",
    alt: "Coche clásico azul en un paisaje rural",
    title: "Elegancia Atemporal",
    description: "Donde la historia y la belleza se encuentran.",
  },
  {
    src: "/gallery-image-3.png",
    alt: "SUV todoterreno en un entorno de aventura",
    title: "Aventura sin Límites",
    description: "Capturando la libertad de cada viaje.",
  },
  {
    src: "/gallery-image-4.png",
    alt: "Primer plano de un motor de alto rendimiento",
    title: "Ingeniería en Detalle",
    description: "La potencia y precisión en cada componente.",
  },
  {
    src: "/gallery-image-5.png",
    alt: "Coche eléctrico futurista cargando",
    title: "Visión Eléctrica",
    description: "El futuro de la movilidad en cada fotograma.",
  },
  {
    src: "/gallery-image-6.png",
    alt: "Deportivo de lujo en un estudio minimalista",
    title: "Lujo Minimalista",
    description: "Exclusividad y diseño en su máxima expresión.",
  },
];

const Gallery = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-lg">
            Nuestro Portafolio Visual
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Una selección cuidadosamente curada de nuestros trabajos más destacados, donde cada imagen cuenta una historia única.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
              className="relative group rounded-xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                objectFit="cover"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2 text-white">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;