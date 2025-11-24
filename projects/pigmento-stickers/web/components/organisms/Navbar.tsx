import React from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-surface-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" />
      
      <div className="container relative mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo optimizado para fondo oscuro: filtro blanco o SVG directo */}
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="/logo.svg" 
              alt="Pigmento Logo" 
              className="h-10 w-auto relative z-10 brightness-0 invert" // Invertir a blanco
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {['Materiales', 'Editor', 'Precios'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Editor' ? '/editor' : '#'}
              className="text-sm font-medium text-surface-100/70 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex text-surface-100 hover:text-white hover:bg-white/10"
          >
            Log in
          </Button>
          <Link href="/editor">
             <Button 
               variant="primary" 
               size="sm" 
               className="shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] border border-primary-light/20"
             >
               Empezar
             </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};