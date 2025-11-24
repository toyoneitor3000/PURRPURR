import React from 'react';
import { Navbar } from '../components/organisms/Navbar';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { StickerCard } from '../components/molecules/StickerCard';
import { PRODUCTS } from '../lib/db-mock'; // Direct DB access (Server Component pattern)

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-50 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
            🚀 Calidad Industrial, Pedidos Flexibles
          </span>
          <Typography variant="h1" className="mb-6 mx-auto max-w-4xl">
            Tus ideas, adheridas al <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">mundo real.</span>
          </Typography>
          <Typography variant="body" className="mb-10 mx-auto max-w-2xl text-lg">
            Plataforma de manufactura de stickers de alta fidelidad. Die-cut, kiss-cut y hojas completas con acabados premium.
          </Typography>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="primary">Subir mi Diseño</Button>
            <Button size="lg" variant="outline">Ver Muestras</Button>
          </div>
        </div>
      </section>

      {/* Featured Products (Dynamic from DB) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
             <Typography variant="h2">Catálogo de Materiales</Typography>
             <p className="text-surface-900/60 mt-2">Elige el corte perfecto para tu marca.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <StickerCard 
                key={product.id}
                title={product.name}
                price={`Desde $${product.basePrice}/in²`}
                image={product.imageUrl}
                tag={product.tags?.[0]}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}