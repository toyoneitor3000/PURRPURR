# Estrategia Técnica: Pigmento Stickers

## 1. Visión General
E-commerce funcional para venta de stickers. Proyecto listo para deploy a Vercel.

## 2. Estado del Proyecto
- **Directorio**: `./pigmentostkts-web`
- **Estado**: ✅ Completado (MVP Funcional)

## 3. Funcionalidades Completas
- 🛍️ **Catálogo**: Grid responsive con productos destacados.
- 🔍 **Detalle de Producto**: Páginas dinámicas (`/stickers/[id]`).
- 🛒 **Carrito**: Persistente, animado y funcional.
- 💳 **Checkout (Simulado)**: 
  - Formulario de datos de envío.
  - Resumen de pedido en tiempo real.
  - Simulación de proceso de pago.
  - Página de éxito (`/checkout/success`).

## 4. Stack Tecnológico
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Context API (Gestión de Estado)

## 5. Próximos Pasos (Producción)
1.  **Imágenes Reales**: Reemplazar placeholders en `src/lib/data.ts`.
2.  **Pasarela de Pagos**: Reemplazar la simulación en `src/app/checkout/page.tsx` con Stripe/MercadoPago SDK.
3.  **Deploy**: Subir a Vercel/Netlify.

## 6. Ejecución
```bash
cd pigmentostkts-web
npm run dev
```
