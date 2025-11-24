import { Product, Material, PricingTier } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p_1',
    name: 'Die Cut Stickers',
    slug: 'die-cut-stickers',
    description: 'Corte preciso siguiendo la forma de tu diseño. El clásico favorito.',
    basePrice: 0.15, // $0.15 per sq inch
    minQuantity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1616406432452-07bc59365145?auto=format&fit=crop&q=80&w=800',
    tags: ['Best Seller', 'Vinyl']
  },
  {
    id: 'p_2',
    name: 'Holographic Stickers',
    slug: 'holographic-stickers',
    description: 'Efecto arcoiris metálico que cambia con la luz. Impacto visual garantizado.',
    basePrice: 0.25,
    minQuantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=800',
    tags: ['Premium', 'Shiny']
  },
  {
    id: 'p_3',
    name: 'Kiss Cut Sheets',
    slug: 'kiss-cut-sheets',
    description: 'Múltiples stickers en una sola hoja (A4/A5). Ideal para sets.',
    basePrice: 2.00, // Per sheet
    minQuantity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1629905678898-000c14041e7f?auto=format&fit=crop&q=80&w=800',
    tags: ['Sets', 'Value']
  },
  {
    id: 'p_4',
    name: 'Clear Stickers',
    slug: 'clear-stickers',
    description: 'Vinilo transparente para un look \'sin fondo\'.',
    basePrice: 0.18,
    minQuantity: 25,
    imageUrl: 'https://images.unsplash.com/photo-1606166325683-e6deb697d301?auto=format&fit=crop&q=80&w=800',
    tags: ['Minimal']
  }
];

export const MATERIALS: Material[] = [
  { id: 'm_vinyl', name: 'White Vinyl', factor: 1.0 },
  { id: 'm_holo', name: 'Holographic', factor: 1.5 },
  { id: 'm_clear', name: 'Clear', factor: 1.2 }
];

export const PRICING_TIERS: PricingTier[] = [
  { minQuantity: 10, discount: 0 },
  { minQuantity: 50, discount: 0.10 },
  { minQuantity: 100, discount: 0.20 },
  { minQuantity: 500, discount: 0.35 },
  { minQuantity: 1000, discount: 0.50 }
];