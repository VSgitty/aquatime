'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product, quantity = 1, className = '' }) {
  const { addItem } = useCart();
  const [done, setDone] = useState(false);

  const handleClick = () => {
    addItem(product, quantity);
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white rounded-xl px-4 py-2.5 font-semibold text-sm transition-all ${className}`}
    >
      {done ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      {done ? 'Hinzugefügt' : 'In den Warenkorb'}
    </button>
  );
}
