import Link from 'next/link';
import type { Metadata } from 'next';
import { Orbitron, Style_Script } from 'next/font/google';
import './globals.css';
import { ArrowRight } from 'lucide-react';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-orbitron' });
const styleScript = Style_Script({ subsets: ['latin'], weight: ['400'], variable: '--font-style-script' });

export const metadata = {
  title: 'Victory Cars Detailing',
  description: 'El Aliado Profesional que Lleva su Vehículo a su Máxima Expresión de Belleza y Detalle.',
};

const Logo = () => (
  <div className="flex items-center select-none">
    <span className="font-orbitron text-2xl md:text-3xl font-black tracking-tighter text-white">VICTORY CARS</span>
    <span className="font-style-script text-3xl md:text-4xl text-brand-cyan ml-2">Detailing</span>
  </div>
);

const WhatsAppIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.32 4.94L2 22l5.27-1.38c1.41.81 3.02 1.29 4.77 1.29h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zM9.53 8.3c.24-.24.58-.25.82-.25.22 0 .42.02.61.27.19.25.63 1.53.63 1.66 0 .13-.08.25-.16.33-.08.08-.19.1-.33.2-.14.1-.33.18-.48.28-.15.1-.3.23-.43.38-.13.15-.27.33-.11.62s.51.93.99 1.4c.66.66 1.2 1.03 1.35 1.15.15.12.24.1.38-.05.14-.15.63-.73.8-1s.17-.22.28-.13c.11.09 1 .48 1.18.56.18.08.3.13.35.19.05.06.03.93-.16 1.15-.19.22-1.18 1.11-1.36 1.13-.18.02-.38.03-.58.03-.2 0-1.03-.1-1.95-.58-.92-.48-1.78-1.24-2.52-2.14s-1.2-1.9-1.38-2.22c-.18-.32-.38-.68-.38-1.03 0-.35.2-.68.44-.92z"/>
  </svg>
);

const navLinks = [
  { href: '/#services', label: 'Servicios' },
  { href: '/#process', label: 'Proceso' },
  { href: '/#gallery', label: 'Galería' },
  { href: '/#testimonials', label: 'Testimonios' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${orbitron.variable} ${styleScript.variable} font-sans bg-brand-dark-blue bg-subtle-grid text-brand-slate`}>
        <header className="fixed top-0 left-0 w-full z-50 bg-brand-dark-blue/30 backdrop-blur-xl border-b border-white/10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/"><Logo /></Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-brand-slate hover:text-brand-cyan transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            <a href="https://www.instagram.com/victorycars_paintdetailing/" target="_blank" rel="noopener noreferrer" className="bg-brand-cyan text-brand-dark-blue font-bold py-2 px-5 rounded-lg hover:bg-white transition-colors duration-300 flex items-center gap-2 text-sm md:text-base">
              Contacto <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </header>
        
        {children}

        <footer className="bg-brand-mid-blue border-t border-white/10 py-8">
            <div className="container mx-auto px-6 text-center text-brand-slate">
              <Link href="/"><Logo /></Link>
              <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Victory Cars Detailing. Todos los derechos reservados.</p>
            </div>
        </footer>
        
        <a href="https://wa.me/573124730909" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-blue focus:ring-green-500 transition-all duration-300">
          <WhatsAppIcon className="h-8 w-8" />
        </a>
      </body>
    </html>
  );
}