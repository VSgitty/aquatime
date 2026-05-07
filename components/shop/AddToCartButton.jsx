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
      className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 hover:from-white hover:via-aqua-200 hover:to-emerald-100 text-[#031828] rounded-2xl px-4 py-2.5 font-bold text-sm transition-all shadow-[0_20px_55px_rgba(125,211,252,0.22)] hover:-translate-y-0.5 ${className}`}
    >
      {done ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      {done ? 'Hinzugefügt' : 'In den Warenkorb'}
    </button>
  );
}
