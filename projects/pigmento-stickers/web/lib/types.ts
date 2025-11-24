export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  minQuantity: number;
  imageUrl: string;
  tags?: string[];
}

export interface Material {
  id: string;
  name: string;
  factor: number;
}

export interface PricingTier {
  minQuantity: number;
  discount: number;
}