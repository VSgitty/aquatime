'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
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
    <div className="pt-24 min-h-screen bg-[#020814] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-65" />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute bottom-16 right-[6%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 text-aqua-100 text-xs font-semibold uppercase tracking-[0.24em] mb-4 backdrop-blur-xl">
              Shopping Cart
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.05em] text-white">Warenkorb</h1>
          </div>
          <p className="text-white/65 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">{itemsCount} Artikel</p>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-[2rem] p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_28%)]" />
            <ShoppingCart className="w-12 h-12 text-aqua-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Dein Warenkorb ist leer</h2>
            <p className="text-white/60 mb-6">Entdecke jetzt unsere Produkte fur perfekte Wasserqualitat.</p>
            <Link
              href="/produkte"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 text-[#031828] px-7 py-3 rounded-2xl font-bold shadow-[0_20px_55px_rgba(125,211,252,0.25)]"
            >
              Produkte ansehen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.slug} className="glass rounded-[1.75rem] p-4 md:p-5 flex gap-4 items-start product-card">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-navy-900 border border-white/10 shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" sizes="96px" />
                    ) : null}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.name}</h3>
                    <p className="text-aqua-300 text-xs uppercase tracking-[0.24em] mb-3">{item.category}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => updateQty(item.slug, Math.max(1, item.quantity - 1))}
                        className="w-9 h-9 rounded-xl border border-white/14 bg-white/6 text-white grid place-items-center backdrop-blur-xl"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold min-w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.slug, item.quantity + 1)}
                        className="w-9 h-9 rounded-xl border border-white/14 bg-white/6 text-white grid place-items-center backdrop-blur-xl"
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

                  <div className="text-right text-white font-bold text-lg whitespace-nowrap self-center">
                    {formatEuro(item.priceMinor * item.quantity)}
                  </div>
                </article>
              ))}
            </div>

            <aside className="glass rounded-[2rem] p-5 h-max sticky top-28">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-5 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-aqua-100 text-xs uppercase tracking-[0.24em] font-semibold mb-2">
                  Order Summary
                </div>
                <h2 className="text-white text-2xl font-black tracking-[-0.04em]">Zusammenfassung</h2>
              </div>
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

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <ShieldCheck className="w-4 h-4 text-aqua-300" />
                  Sicherer Checkout mit Stripe
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Truck className="w-4 h-4 text-aqua-300" />
                  Lieferung deutschlandweit
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 text-[#031828] px-6 py-3.5 rounded-2xl font-bold shadow-[0_20px_55px_rgba(125,211,252,0.22)]"
              >
                Zur Kasse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
