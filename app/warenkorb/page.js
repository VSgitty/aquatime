'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { calculateOrderTotals } from '@/lib/shipping';

function formatEuro(minor) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((minor || 0) / 100);
}

export default function WarenkorbPage() {
  const { items, updateQty, removeItem, subtotalMinor, itemsCount } = useCart();
  const { shippingMinor, totalMinor } = calculateOrderTotals(items);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#061f35] to-[#031526]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h1 className="text-4xl font-black text-white">Warenkorb</h1>
          <p className="text-white/65">{itemsCount} Artikel</p>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center">
            <ShoppingCart className="w-12 h-12 text-aqua-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Dein Warenkorb ist leer</h2>
            <p className="text-white/60 mb-6">Entdecke jetzt unsere Produkte fur perfekte Wasserqualitat.</p>
            <Link
              href="/produkte"
              className="inline-flex items-center justify-center bg-gradient-to-r from-aqua-500 to-aqua-600 text-white px-7 py-3 rounded-xl font-semibold"
            >
              Produkte ansehen
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.slug} className="glass rounded-2xl p-4 md:p-5 flex gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-navy-900 border border-white/10 shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.name}</h3>
                    <p className="text-aqua-300 text-xs uppercase tracking-wide mb-3">{item.category}</p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.slug, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-lg border border-white/20 text-white grid place-items-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold min-w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.slug, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-white/20 text-white grid place-items-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="ml-3 text-rose-300 hover:text-rose-200 inline-flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" /> Entfernen
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-white font-bold text-lg">
                    {formatEuro(item.priceMinor * item.quantity)}
                  </div>
                </article>
              ))}
            </div>

            <aside className="glass rounded-2xl p-5 h-max">
              <h2 className="text-white text-xl font-bold mb-4">Zusammenfassung</h2>
              <div className="flex justify-between text-white/70 mb-2">
                <span>Zwischensumme</span>
                <span>{formatEuro(subtotalMinor)}</span>
              </div>
              <div className="flex justify-between text-white/70 mb-4">
                <span>Versand</span>
                <span>{shippingMinor > 0 ? formatEuro(shippingMinor) : 'Kostenlos'}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between text-white text-xl font-black mb-5">
                <span>Gesamt</span>
                <span>{formatEuro(totalMinor || subtotalMinor)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-aqua-500 text-white px-6 py-3 rounded-xl font-bold"
              >
                Zur Kasse
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
