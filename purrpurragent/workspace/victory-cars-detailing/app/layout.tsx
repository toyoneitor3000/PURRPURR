import type { Metadata } from 'next';
import { Inter, Orbitron, Style_Script } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import ScrollReveal from './components/ScrollReveal';
import VisualEffects from './components/VisualEffects';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });
const styleScript = Style_Script({ subsets: ['latin'], weight: ['400'], variable: '--font-style-script' });

export const metadata: Metadata = {
  title: 'Victory Cars S.A.S. | Detailing & Paint Protection',
  description: 'El Aliado Profesional que Lleva tu Vehículo a su Máxima Expresión de Brillo y Detalle.',
};

const Logo = () => (
  <div className="relative h-10 w-40 md:h-14 md:w-56">
    {/* Intenta cargar el logo de imagen, si no existe, el usuario verá el alt text o espacio vacio hasta que lo suba */}
    <Image
      src="/logo.png"
      alt="Victory Cars Detailing"
      fill
      sizes="(max-width: 768px) 160px, 224px"
      style={{ objectFit: "contain" }}
      className="object-left"
      priority
    />
  </div>
);

const navLinks = [
  { href: '/#about', label: 'About Us' },
  { href: '/#services', label: 'Servicios' },
  { href: '/#contact', label: 'Contacto' },
];


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${styleScript.variable} font-sans bg-brand-dark-blue text-brand-slate selection:bg-brand-cyan selection:text-brand-dark-blue custom-cursor`}>
<header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-brand-petroleum/80 to-brand-black/60 backdrop-blur-3xl border-b border-white/20 shadow-2xl transition-all duration-300 hover:from-brand-petroleum/90 hover:to-brand-black/80">
  <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
    <Link href="/" className="relative -left-2 md:left-0">
      <Logo />
    </Link>
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm font-bold tracking-widest uppercase text-brand-slate hover:text-brand-light-blue transition-all duration-300 hover:scale-105 font-orbitron relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-light-blue transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            <a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="hidden md:flex bg-gradient-to-r from-brand-cyan to-brand-light-blue text-brand-dark-blue font-bold py-3 px-8 rounded-full hover:from-white hover:to-brand-cyan transition-all duration-300 items-center gap-3 text-sm shadow-[0_0_20px_rgba(6,182,212,0.6)] font-orbitron tracking-wide hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.8)]">
              Contacto <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        {children}

        <ScrollReveal />
        <VisualEffects />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
