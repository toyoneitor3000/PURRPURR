'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-60 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-lg">
          PURPUR Photography
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink href="#about">Nosotros</NavLink>
          <NavLink href="#gallery">Galería</NavLink>
          <NavLink href="#services">Servicios</NavLink>
          <NavLink href="#contact">Contacto</NavLink>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black bg-opacity-70 pb-4"
        >
          <div className="flex flex-col items-center space-y-4">
            <NavLink href="#about" onClick={toggleMenu}>Nosotros</NavLink>
            <NavLink href="#gallery" onClick={toggleMenu}>Galería</NavLink>
            <NavLink href="#services" onClick={toggleMenu}>Servicios</NavLink>
            <NavLink href="#contact" onClick={toggleMenu}>Contacto</NavLink>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link href={href}
    className="text-gray-200 hover:text-white font-medium transition-colors duration-300 relative group py-2"
    onClick={onClick}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
  </Link>
);

export default Navbar;