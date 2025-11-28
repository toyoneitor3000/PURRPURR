'use client';

import React, { useState, useEffect } from 'react';

interface BackgroundCarouselProps {
  images: string[];
  interval?: number; // Interval in milliseconds
}

const BackgroundCarousel: React.FC<BackgroundCarouselProps> = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (images.length === 0) {
    return null; // Or a fallback div
  }

  return (
    <div className="background-carousel-container">
      {images.map((image, index) => (
        <div
          key={image}
          className={`background-carousel-image ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="background-carousel-overlay"></div>
    </div>
  );
};

export default BackgroundCarousel;
2. Código para src/app/globals.css (o tu archivo CSS global)

/* src/app/globals.css o un archivo CSS similar */

.background-carousel-container {
  position: fixed; /* O 'absolute' si prefieres que se desplace con el contenido */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; /* Asegura que esté detrás del contenido principal */
}

.background-carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out; /* Transición suave entre imágenes */
}

.background-carousel-image.active {
  opacity: 1;
}

.background-carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Overlay oscuro del 60% */
  z-index: 1; /* Encima de las imágenes, debajo del contenido */
}
Instrucciones para la integración en app/page.tsx:

Asegúrate de tener imágenes en tu carpeta public/carrusel. Por ejemplo: /public/carrusel/image1.jpg, /public/carrusel/image2.jpg, etc.

Modifica tu archivo app/page.tsx (o el componente de página donde quieras el carrusel) para importar y usar el BackgroundCarousel, pasando las rutas de tus imágenes:

// app/page.tsx
import BackgroundCarousel from '../src/components/BackgroundCarousel'; // Ajusta la ruta si es necesario
// import styles from './page.module.css'; // Si usas CSS Modules para tu página

export default function Home() {
  const carouselImages = [
    '/carrusel/image1.jpg', // Asegúrate de que estas rutas sean correctas
    '/carrusel/image2.jpg',
    '/carrusel/image3.jpg',
  ];

  return (
    <main /* className={styles.main} si usas CSS Modules */>
      <BackgroundCarousel images={carouselImages} interval={7000} /> {/* Intervalo de 7 segundos */}

      {/* Aquí va el resto de tu contenido, que se superpondrá al carrusel */}
      <div style={{ position: 'relative', zIndex: 2, color: 'white', textAlign: 'center', padding: '20px' }}>
        {/* Contenido del Hero Section */}
        <h1>ARTESANOS DE LA PERFECCIÓN</h1>
        <p>En VICTORY CARS, transformamos tu vehículo en una obra de arte.</p>
        {/* ... otros elementos de tu página ... */}
      </div>
    </main>
  );
}
