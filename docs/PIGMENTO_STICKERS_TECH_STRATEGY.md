# Estrategia Tecnológica: Pigmento Stickers

## 1. Visión General
Plataforma de e-commerce de alto rendimiento enfocada en la personalización de stickers (die-cut, kiss-cut, hojas). El diferencial es la experiencia de usuario en el editor visual y la automatización del flujo hacia manufactura.

## 2. Stack Tecnológico (BEST-IN-CLASS)
- **Frontend**: Next.js 14 (App Router) + TypeScript.
- **UI/UX**: Tailwind CSS + Framer Motion (para micro-interacciones "Wow").
- **Editor Gráfico**: Fabric.js o React-Konva (Canvas API) para manipulación de imágenes en tiempo real.
- **Backend (Headless)**: MedusaJS (Node.js) o Supabase + Stripe (si se prefiere BaaS ligero).
- **Base de Datos**: PostgreSQL.
- **Storage**: AWS S3 (para archivos de impresión de alta resolución).

## 3. Arquitectura de Software
### Patrón: Headless Commerce
Separamos el frontend (Next.js) del motor de comercio. Esto permite que el "Editor de Stickers" sea una SPA compleja incrustada dentro de una web optimizada para SEO.

### Flujo de Datos (Critical Path)
1. Usuario sube imagen -> S3 (Bucket Temporal).
2. Editor procesa preview -> Canvas.
3. Add to Cart -> Se guarda metadata (URL imagen, dimensiones, material, corte) en la LineItem.
4. Checkout -> Webhook a Stripe.
5. Order Paid -> Webhook a sistema de manufactura (generación de PDF de corte).

## 4. Roadmap & Estimaciones
- **Fase 1 (Core):** Setup Next.js + Configuración Base de Datos + Catálogo estático. (1 semana)
- **Fase 2 (Editor MVP):** Subida de archivos, validación de DPI, selección de tamaño. (2 semanas)
- **Fase 3 (Commerce):** Carrito, Checkout, Integración Pasarela de Pagos. (1.5 semanas)
- **Fase 4 (Launch):** Testing, SEO, Analytics. (0.5 semanas)

## 5. Riesgos y Mitigación
- **Riesgo:** Calidad de archivos de usuarios.
- **Mitigación:** Implementar validador de resolución (DPI check) en el frontend antes de permitir la compra.
- **Riesgo:** Complejidad de precios por área.
- **Mitigación:** Algoritmo de precios en Edge Function, no en cliente.
