'use client';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-950 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-lg">
            Contáctanos
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Estamos listos para capturar la esencia de tu vehículo. Ponte en contacto con nosotros hoy mismo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Información de Contacto</h3>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-3xl text-orange-400" />
              <div>
                <p className="text-lg font-semibold">Teléfono:</p>
                <p className="text-gray-300">(+34) 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-3xl text-orange-400" />
              <div>
                <p className="text-lg font-semibold">Email:</p>
                <p className="text-gray-300">info@purpurphotography.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-3xl text-orange-400" />
              <div>
                <p className="text-lg font-semibold">Dirección:</p>
                <p className="text-gray-300">Calle Ficticia 123, 28001 Madrid, España</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-800 bg-opacity-30 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Envíanos un Mensaje</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-200 text-sm font-bold mb-2">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border border-gray-600 rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 bg-opacity-50 transition-all duration-300"
                  placeholder="Tu Nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border border-gray-600 rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 bg-opacity-50 transition-all duration-300"
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-200 text-sm font-bold mb-2">Mensaje:</label>
                <textarea
                  id="message"
                  rows={5}
                  className="shadow appearance-none border border-gray-600 rounded w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-700 bg-opacity-50 transition-all duration-300 resize-y"
                  placeholder="Describe tu proyecto o consulta..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,165,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-orange-400 hover:to-red-500 transition-all duration-300 ease-in-out text-lg w-full"
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;