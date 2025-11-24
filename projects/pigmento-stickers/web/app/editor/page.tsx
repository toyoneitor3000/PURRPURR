'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '../../components/organisms/Navbar';
import { Typography } from '../../components/atoms/Typography';

// Importamos el editor dinámicamente para evitar errores de 'window is not defined' (SSR)
// Fabric.js requiere window, por lo que deshabilitamos SSR para este componente.
const StickerEditor = dynamic(
  () => import('../../components/organisms/StickerEditor').then((mod) => mod.StickerEditor),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-surface-50 font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Typography variant="h2">Editor de Stickers</Typography>
          <Typography variant="body" className="text-surface-900/60">
            Visualiza cómo quedará tu sticker antes de imprimirlo.
          </Typography>
        </header>

        <StickerEditor />
      </main>
    </div>
  );
}