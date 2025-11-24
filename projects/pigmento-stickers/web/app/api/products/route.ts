import { NextResponse } from 'next/server';
import { PRODUCTS } from '../../../lib/db-mock';

export async function GET() {
  // Simulate DB latency
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return NextResponse.json({
    data: PRODUCTS,
    meta: {
      total: PRODUCTS.length,
      source: 'mock_db'
    }
  });
}