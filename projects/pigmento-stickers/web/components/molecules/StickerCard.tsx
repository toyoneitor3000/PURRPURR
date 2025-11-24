import React from 'react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';

interface StickerCardProps {
  title: string;
  price: string;
  image?: string;
  tag?: string;
}

export const StickerCard = ({ title, price, image, tag }: StickerCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Image Placeholder */}
      <div className="aspect-square w-full bg-surface-50 relative flex items-center justify-center overflow-hidden">
         {tag && (
           <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
             {tag}
           </span>
         )}
         {image ? (
           <img src={image} alt={title} className="object-cover w-full h-full transition-transform group-hover:scale-105" />
         ) : (
           <div className="text-4xl opacity-20">🎨</div>
         )}
      </div>
      
      <div className="p-4">
        <Typography variant="h3" className="mb-1">{title}</Typography>
        <div className="flex items-center justify-between mt-3">
          <span className="font-sans font-bold text-lg text-primary">{price}</span>
          <Button size="sm" variant="secondary">Add</Button>
        </div>
      </div>
    </div>
  );
};