'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MiniCartLink({ mobile = false, onClick }) {
  const { itemsCount, isHydrated } = useCart();

  const count = isHydrated ? itemsCount : 0;

  return (
    <Link
      href="/warenkorb"
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 ${
        mobile
          ? 'text-white/80 hover:text-white py-3 px-4 text-base font-medium rounded-xl hover:bg-white/5'
          : 'text-white/75 hover:text-white px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5'
      }`}
    >
      <ShoppingBag className="w-4 h-4" />
      Warenkorb
      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-aqua-500 text-white text-[10px] font-bold grid place-items-center">
        {count}
      </span>
    </Link>
  );
}
