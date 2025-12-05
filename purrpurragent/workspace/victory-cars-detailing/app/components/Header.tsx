'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#about', label: 'About Us' },
  { href: '/#services', label: 'Servicios' },
  { href: '/#contact', label: 'Contacto' },
];

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Controlar visibilidad del navbar
      if (currentScrollY > 100) {
        setIsNavbarVisible(true);
      } else if (currentScrollY < 50) {
        setIsNavbarVisible(false);
      }
      
      // Controlar opacidad del logo (se desvanece al hacer scroll)
      // El logo se mantiene completamente visible en la parte superior
      // y se desvanece gradualmente al hacer scroll
      const newOpacity = Math.max(0, 1 - (currentScrollY / 200));
      setLogoOpacity(newOpacity);
      
      setLastScrollY(currentScrollY);
    };

    // Agregar event listener con debounce para mejor performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [lastScrollY]);

  // Cerrar menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Cerrar menú móvil al hacer scroll - DESACTIVADO para evitar conflictos
  // useEffect(() => {
  //   if (isMobileMenuOpen) {
  //     setIsMobileMenuOpen(false);
  //   }
  // }, [lastScrollY, isMobileMenuOpen]);

  return (
    <>
      {/* ===== LOGO INDEPENDIENTE (pre-navbar) ===== */}
      {/* Este logo aparece al inicio y se desvanece al hacer scroll */}
      {/* Para modificar: ajustar top-*, h-*, w-*, md:h-*, md:w-* */}
      <div 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300"
        style={{ opacity: logoOpacity }}
      >
        <Link href="/">
          <div className="relative h-16 w-64 md:h-20 md:w-80">
            <Image
              src="/logo.png"
              alt="Victory Cars Detailing"
              fill
              sizes="(max-width: 768px) 256px, 320px"
              style={{ objectFit: "contain" }}
              className="drop-shadow-[0_0_15px_rgba(76,201,240,0.3)]"
              priority
            />
          </div>
        </Link>
      </div>

      {/* ===== NAVBAR QUE APARECE AL HACER SCROLL ===== */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out ${
        isNavbarVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}>
        <div className="relative bg-gradient-to-b from-black/80 via-black/60 to-black/0 pb-8 md:pb-0">
          <div className="absolute inset-0 backdrop-blur-xl md:backdrop-blur-xl" style={{
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
          }}></div>
          <div className="container mx-auto px-4 md:px-6 py-2 md:py-3 relative">
            {/* Botón hamburguesa en móvil - dentro del navbar */}
            <button
              className="md:hidden absolute top-4 right-4 z-[70] text-white/80 hover:text-brand-light-blue transition-colors duration-300 p-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* ===== LOGO DENTRO DEL NAVBAR ===== */}
            {/* Este logo aparece cuando el navbar se muestra al hacer scroll */}
            {/* Para modificar: ajustar top-*, h-*, w-*, md:h-*, md:w-* */}
            <Link href="/" className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative h-16 w-64 md:h-20 md:w-80">
                <Image
                  src="/logo.png"
                  alt="Victory Cars Detailing"
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  style={{ objectFit: "contain" }}
                  className="drop-shadow-[0_0_15px_rgba(76,201,240,0.3)]"
                />
              </div>
            </Link>
            
            {/* Contenido del navbar (navegación y botón) */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
              {/* Menú de navegación - Desktop */}
              <nav className="hidden md:flex items-center gap-4 md:gap-8 order-3 md:order-2 w-full md:w-auto justify-center mt-2 md:mt-2">
                {navLinks.map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-xs md:text-sm font-bold tracking-widest uppercase text-white/80 hover:text-brand-light-blue transition-all duration-300 hover:scale-105 font-orbitron relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-light-blue transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Menú de navegación - Mobile */}
              <div className={`md:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
                isMobileMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : '-translate-y-full opacity-0 pointer-events-none'
              }`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                  {navLinks.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={handleNavLinkClick}
                      className="text-2xl font-bold tracking-widest uppercase text-white/90 hover:text-brand-light-blue transition-all duration-300 hover:scale-105 font-orbitron relative group py-2"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-light-blue transition-all duration-300 group-hover:w-3/4"></span>
                    </Link>
                  ))}
                  <a 
                    href="https://wa.me/573124730909" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-8 bg-gradient-to-r from-brand-cyan/90 to-brand-light-blue/90 text-white font-bold py-3 px-8 rounded-full hover:from-brand-cyan hover:to-brand-light-blue transition-all duration-300 items-center gap-2 text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] font-orbitron tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-sm flex"
                  >
                    Contacto <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
              
              <div className="order-2 md:order-3 md:ml-auto mt-2 md:mt-2">
                <a 
                  href="https://wa.me/573124730909" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hidden md:flex bg-gradient-to-r from-brand-cyan/90 to-brand-light-blue/90 text-white font-bold py-2 px-6 rounded-full hover:from-brand-cyan hover:to-brand-light-blue transition-all duration-300 items-center gap-2 text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] font-orbitron tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-sm"
                >
                  Contacto <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
