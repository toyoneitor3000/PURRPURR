# Arquitectura Técnica: PigmentosTkts

## 1. Visión General
Plataforma de venta de entradas (ticketing) de alto rendimiento, enfocada en la experiencia de usuario y conversión.

## 2. Stack Tecnológico
- **Frontend**: Next.js 14 (App Router), React, TypeScript.
- **Estilos**: Tailwind CSS, Shadcn/ui (componentes base), Framer Motion.
- **Backend**: Next.js Server Actions (BFF pattern).
- **Base de Datos**: PostgreSQL (vía Supabase) para gestión de eventos, tickets, usuarios y órdenes.
- **Auth**: Supabase Auth (Email, Google, Apple).
- **Pagos**: Stripe / MercadoPago (según región).
- **Infraestructura**: Vercel (Deploy), Cloudflare (DNS/Security).

## 3. Estructura del Proyecto (Monorepo friendly)
- `/app`: Rutas y páginas (Next.js App Router).
- `/components`: UI Kit atómico.
- `/lib`: Utilidades, clientes de DB y API.
- `/types`: Definiciones TypeScript globales.
- `/drizzle` o `/prisma`: ORM Schemas.

## 4. Decisiones Clave (ADRs)
- **ADR-001**: Uso de Server Components por defecto para SEO y performance.
- **ADR-002**: Base de datos relacional (SQL) para garantizar consistencia transaccional en venta de tickets (evitar sobreventa).
- **ADR-003**: Procesamiento de pagos asíncrono con Webhooks.