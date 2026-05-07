'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutErfolgPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#06253f] to-[#031526]">
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Vielen Dank fuer deine Bestellung</h1>
        <p className="text-white/70 text-lg mb-8">
          Die Zahlung war erfolgreich. Du erhaeltst in Kuerze eine Bestaetigung per E-Mail.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/produkte"
            className="inline-flex items-center justify-center bg-gradient-to-r from-aqua-500 to-aqua-600 text-white px-7 py-3 rounded-xl font-semibold"
          >
            Weiter einkaufen
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center border border-white/25 text-white px-7 py-3 rounded-xl font-semibold hover:border-aqua-300 hover:text-aqua-200"
          >
            Service kontaktieren
          </Link>
        </div>
      </div>
    </div>
  );
}
