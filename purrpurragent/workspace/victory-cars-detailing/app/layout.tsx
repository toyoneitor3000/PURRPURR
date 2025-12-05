import type { Metadata } from 'next';
import { Inter, Orbitron, Style_Script } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });
const styleScript = Style_Script({ subsets: ['latin'], weight: ['400'], variable: '--font-style-script' });

export const metadata: Metadata = {
  title: 'Victory Cars S.A.S. | Detailing & Paint Protection',
  description: 'El Aliado Profesional que Lleva tu Vehículo a su Máxima Expresión de Brillo y Detalle.',
};

const Logo = () => (
  <div className="relative h-12 w-48 md:h-16 md:w-64">
    {/* Intenta cargar el logo de imagen, si no existe, el usuario verá el alt text o espacio vacio hasta que lo suba */}
    <Image
      src="/logo.png"
      alt="Victory Cars Detailing"
      fill
      sizes="(max-width: 768px) 192px, 256px"
      style={{ objectFit: "contain" }}
      className="object-left"
      priority
    />
  </div>
);

const navLinks = [
  { href: '/#services', label: 'Servicios' },
  { href: '/#gallery', label: 'Galería' },
  { href: '/#testimonials', label: 'Testimonios' },
];


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${styleScript.variable} font-sans bg-brand-dark-blue text-brand-slate selection:bg-brand-cyan selection:text-brand-dark-blue`}>
        <header className="fixed top-0 left-0 w-full z-50 bg-brand-dark-blue/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link href="/"><Logo /></Link>
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm font-bold tracking-widest uppercase text-brand-slate hover:text-brand-cyan transition-colors font-orbitron">
                  {link.label}
                </Link>
              ))}
            </nav>
            <a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" className="hidden md:flex bg-brand-cyan text-brand-dark-blue font-bold py-2 px-6 rounded-full hover:bg-white transition-all duration-300 items-center gap-2 text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] font-orbitron tracking-wide">
              Contacto <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        {children}

        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
