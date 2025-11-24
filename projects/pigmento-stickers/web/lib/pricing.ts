import { MATERIALS, PRICING_TIERS } from './db-mock';

interface QuoteParams {
  width: number;
  height: number;
  quantity: number;
  materialId: string;
  basePricePerSqIn: number;
}

export function calculateQuote({ width, height, quantity, materialId, basePricePerSqIn }: QuoteParams) {
  const area = width * height;
  const material = MATERIALS.find(m => m.id === materialId) || MATERIALS[0];
  
  // Find discount tier
  const tier = PRICING_TIERS.slice().reverse().find(t => quantity >= t.minQuantity) || PRICING_TIERS[0];
  
  const unitBasePrice = area * basePricePerSqIn * material.factor;
  const unitPrice = unitBasePrice * (1 - tier.discount);
  const totalPrice = unitPrice * quantity;

  return {
    unitPrice: Number(unitPrice.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
    details: {
      area,
      materialFactor: material.factor,
      discountApplied: tier.discount
    }
  };
}