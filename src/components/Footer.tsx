'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-black text-gray-400 py-12 md:py-16 border-t border-gray-800"
    >
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <div className="mb-8">
          <Link href="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-lg">
            PURPUR Photography
          </Link>
          <p className="mt-4 text-md max-w-2xl mx-auto">
            Capturando la esencia del automóvil con arte y precisión. Tu historia sobre ruedas, inmortalizada.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebook size={28} />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#E1306C' }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-pink-600 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={28} />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, color: '#1DA1F2' }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={28} />
          </motion.a>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} PURPUR Photography. Todos los derechos reservados.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/privacidad" className="hover:text-white transition-colors duration-300">Política de Privacidad</Link>
            <span className="text-gray-600">|</span>
            <Link href="/terminos" className="hover:text-white transition-colors duration-300">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;