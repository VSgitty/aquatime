'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowUpDown, Star } from 'lucide-react';
import AddToCartButton from '@/components/shop/AddToCartButton';

function formatEuro(minor) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((minor || 0) / 100);
}

export default function ProductGrid({ products, categories }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Alle');
  const [sortBy, setSortBy] = useState('relevance');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const out = products.filter((product) => {
      const inCategory = category === 'Alle' || product.category === category;
      const inText =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return inCategory && inText;
    });

    if (sortBy === 'price-asc') out.sort((a, b) => a.priceMinor - b.priceMinor);
    if (sortBy === 'price-desc') out.sort((a, b) => b.priceMinor - a.priceMinor);
    if (sortBy === 'name') out.sort((a, b) => a.name.localeCompare(b.name, 'de'));

    return out;
  }, [products, search, category, sortBy]);

  return (
    <section className="py-16 bg-gradient-to-b from-[#072947] to-[#031a2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-4 md:p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_220px] gap-3">
            <label className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3">
              <Search className="w-4 h-4 text-aqua-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Produkte suchen"
                className="w-full bg-transparent py-3 text-white placeholder:text-white/45"
              />
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white"
            >
              <option value="Alle">Alle Kategorien</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3">
              <ArrowUpDown className="w-4 h-4 text-aqua-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent py-3 text-white"
              >
                <option value="relevance">Sortierung</option>
                <option value="price-asc">Preis: aufsteigend</option>
                <option value="price-desc">Preis: absteigend</option>
                <option value="name">Name A-Z</option>
              </select>
            </label>
          </div>
        </div>

        <p className="text-white/65 text-sm mb-5">{filtered.length} Produkte gefunden</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="product-card bg-navy-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col"
            >
              <Link href={`/produkte/${product.slug}`} className="relative block aspect-[4/3] bg-navy-900">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    fill
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-aqua-600/20 to-navy-900" />
                )}
                {product.onSale && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold rounded-full px-3 py-1">
                    Sale
                  </span>
                )}
                {!product.inStock && (
                  <span className="absolute top-3 right-3 bg-white/80 text-navy-900 text-xs font-semibold rounded-full px-3 py-1">
                    Ausverkauft
                  </span>
                )}
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <div className="text-aqua-300 text-xs font-semibold tracking-wide uppercase mb-2">
                  {product.category}
                </div>
                <Link href={`/produkte/${product.slug}`} className="text-white text-xl font-black leading-tight mb-2 hover:text-aqua-300 transition-colors">
                  {product.name}
                </Link>
                <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                  {product.description || 'Hochwertige Wassertechnik von AquaTime.'}
                </p>

                <div className="flex items-center gap-2 text-white/50 text-xs mb-5">
                  <Star className="w-3.5 h-3.5 text-aqua-400" />
                  {product.reviewCount > 0
                    ? `${product.rating.toFixed(1)} (${product.reviewCount} Bewertungen)`
                    : 'Noch keine Bewertungen'}
                </div>

                <div className="mt-auto border-t border-white/10 pt-4 flex items-end justify-between gap-3">
                  <div>
                    {product.onSale && product.regularPriceMinor > product.priceMinor && (
                      <div className="text-white/35 text-xs line-through">
                        {formatEuro(product.regularPriceMinor)}
                      </div>
                    )}
                    <div className="text-2xl font-black text-white">{formatEuro(product.priceMinor)}</div>
                    <div className="text-white/35 text-xs">inkl. MwSt.</div>
                  </div>

                  <AddToCartButton
                    product={product}
                    className={product.inStock ? '' : 'pointer-events-none opacity-50'}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
