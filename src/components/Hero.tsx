'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/bmw_m2_porsche_gt3rs.png" // This path needs to be correct, assuming it's in public folder
        alt="BMW M2 and Porsche GT3 RS"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay for Glassmorphism effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 text-center text-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-700 mx-4 md:mx-0"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          Captura la Esencia del Automóvil
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light">
          Fotografía automotriz que va más allá de lo ordinario.
          Inmortalizamos la velocidad, el diseño y la pasión.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,255,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 ease-in-out text-lg"
        >
          Ver Nuestro Portafolio
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;