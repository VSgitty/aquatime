'use client';

import Link from 'next/link';
import { ArrowRight, Users, Droplets, Zap } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const products = [
  {
    id: 'neo-80',
    badge: '🔥 Bestseller',
    badgeColor: 'bg-orange-500/90',
    name: 'NEO 80',
    tagline: 'Das beliebteste Modell',
    desc: 'Die perfekte Wahl für Familien. Kompaktes Kabinettgehäuse, vollautomatisch, BNT-Steuerventil – einfach installieren und vergessen.',
    price: '619',
    persons: 'bis 7 Personen',
    capacity: '17L Harz',
    highlight: true,
    href: '/enthaertungsanlagen#neo',
    features: ['Vollautomatisch', 'BNT-Steuerventil', 'Kabinett-Design', 'Salzsparend'],
    gradient: 'from-aqua-600 to-navy-700',
    accent: 'text-aqua-400',
  },
  {
    id: 'neo-120',
    badge: 'Für Großfamilien',
    badgeColor: 'bg-purple-500/90',
    name: 'NEO 120',
    tagline: 'Maximale Kapazität',
    desc: 'Unser leistungsstärkstes NEO-Modell. Ideal für große Haushalte und Häuser mit hohem Wasserverbrauch.',
    price: '659',
    persons: 'bis 12 Personen',
    capacity: '26L Harz',
    highlight: false,
    href: '/enthaertungsanlagen#neo',
    features: ['26L Harzkapazität', 'BNT-Steuerventil', 'Intelligente Regeneration', 'Lange Standzeit'],
    gradient: 'from-purple-800 to-navy-800',
    accent: 'text-purple-400',
  },
  {
    id: 'trinity',
    badge: '💧 Osmose',
    badgeColor: 'bg-emerald-500/90',
    name: 'Trinity',
    tagline: 'Reinstes Trinkwasser',
    desc: 'Umkehrosmoseanlage für kristallklares Trinkwasser direkt aus dem Hahn. TDS-Display zeigt Qualität in Echtzeit.',
    price: '378',
    priceNote: 'statt 599 €',
    persons: '4000L Kapazität',
    capacity: '1,6L/min',
    highlight: false,
    href: '/osmoseanlagen',
    features: ['0,0001μm Filterung', 'TDS-Display', 'Selbstreinigend', 'Leise (40 dB)'],
    gradient: 'from-emerald-800 to-navy-800',
    accent: 'text-emerald-400',
  },
];

export default function ProductsPreview() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-aqua-50 border border-aqua-200 text-aqua-700 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
            Unsere Bestseller
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4 leading-tight">
            Die richtige Anlage für{' '}
            <span className="text-aqua-600">Ihr Zuhause</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-xl mx-auto">
            Von der Einzel-Person bis zur Großfamilie – wir haben die passende Lösung.
          </p>
        </AnimatedSection>

        {/* Product cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={i * 0.1} direction="up">
              <div
                className={`product-card relative bg-navy-950 rounded-3xl overflow-hidden border ${
                  p.highlight
                    ? 'border-aqua-500/40 ring-2 ring-aqua-500/20'
                    : 'border-white/8'
                }`}
              >
                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${p.gradient} px-7 pt-7 pb-10 relative overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/5 rounded-full" />

                  <span className={`inline-block ${p.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}>
                    {p.badge}
                  </span>
                  <div className="text-white/90 font-black text-4xl mb-1">{p.name}</div>
                  <div className={`${p.accent} text-sm font-semibold mb-3`}>{p.tagline}</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-white/70 text-xs">
                      <Users className="w-3 h-3" />
                      {p.persons}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-white/70 text-xs">
                      <Droplets className="w-3 h-3" />
                      {p.capacity}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-7 py-6">
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{p.desc}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-white/70 text-xs">
                        <Zap className={`w-3 h-3 ${p.accent} flex-shrink-0`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between pt-4 border-t border-white/8">
                    <div>
                      {p.priceNote && (
                        <div className="text-white/35 text-xs line-through mb-0.5">{p.priceNote}</div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{p.price}</span>
                        <span className={`text-lg font-bold ${p.accent}`}>€</span>
                      </div>
                      <div className="text-white/35 text-xs">inkl. MwSt.</div>
                    </div>
                    <Link
                      href={p.href}
                      className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-glow hover:-translate-y-0.5`}
                    >
                      Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* View all */}
        <AnimatedSection className="text-center" delay={0.3}>
          <Link
            href="/enthaertungsanlagen"
            className="inline-flex items-center gap-2 text-aqua-600 hover:text-aqua-500 font-semibold text-lg transition-colors group"
          >
            Alle Produkte ansehen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
