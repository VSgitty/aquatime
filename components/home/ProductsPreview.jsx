'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Droplets, Zap } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

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
    gradient: 'from-[#0b6fb0] via-[#108dd4] to-[#18a08d]',
    accent: 'text-aqua-300',
    image: 'https://aquatimegmbh.de/wp-content/uploads/2025/05/slider_neo40_120.webp',
    layout: 'hero',
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
    gradient: 'from-[#0d2036] via-[#114a7b] to-[#16a34a]',
    accent: 'text-emerald-300',
    image: 'https://aquatimegmbh.de/wp-content/uploads/2025/02/Aquatime-Shooting-Neues-Kabinett01-scaled.jpg',
    layout: 'stack',
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
    gradient: 'from-[#0a1d2e] via-[#0f6d86] to-[#0dbb8c]',
    accent: 'text-cyan-200',
    image: 'https://aquatimegmbh.de/wp-content/uploads/2024/04/Osmose_02.jpg',
    layout: 'stack',
  },
];

export default function ProductsPreview() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#031426] via-[#051b2d] to-[#03111f] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-60" />
      <div className="absolute top-20 right-[12%] w-80 h-80 rounded-full bg-aqua-400/10 blur-[120px]" />
      <div className="absolute bottom-0 left-[8%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            Curated Product Selection
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-[0.95] tracking-[-0.05em]">
            Produkte, die sich wie{' '}
            <span className="bg-gradient-to-r from-aqua-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              High-End Hardware
            </span>{' '}
            anfuehlen.
          </h2>
          <p className="text-lg sm:text-xl text-white/68 max-w-2xl mx-auto leading-relaxed">
            Mehr Tiefe, mehr Bildfokus, mehr Materialitaet. Unsere Bestseller werden wie Premium-Produkte inszeniert und nicht wie Standard-Shop-Karten.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-stretch">
          <AnimatedSection className="lg:col-span-7" direction="up">
            <div className="product-card relative min-h-[34rem] rounded-[2rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl overflow-hidden shadow-[0_35px_120px_rgba(1,9,18,0.48)]">
              <div className={`absolute inset-0 bg-gradient-to-br ${products[0].gradient}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_18%),linear-gradient(180deg,rgba(3,10,20,0.08),rgba(3,10,20,0.35))]" />
              <div className="absolute right-[-8%] bottom-[-4%] top-[10%] w-[56%]">
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.38)]"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-7 sm:p-9 max-w-[32rem]">
                <div>
                  <span className={`inline-block ${products[0].badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-5`}>
                    {products[0].badge}
                  </span>
                  <div className="text-white/70 text-sm font-semibold uppercase tracking-[0.24em] mb-3">
                    Premium Wasserenthaerter
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black text-white tracking-[-0.05em] leading-[0.96] mb-3">
                    {products[0].name}
                  </h3>
                  <p className={`${products[0].accent} text-base font-semibold mb-5`}>{products[0].tagline}</p>
                  <p className="text-white/78 text-base leading-relaxed mb-6">{products[0].desc}</p>

                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {products[0].features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-white/80 text-sm rounded-xl bg-white/10 px-3 py-2 backdrop-blur-xl border border-white/8">
                        <Zap className={`w-3.5 h-3.5 ${products[0].accent} flex-shrink-0`} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <div className="text-white/45 text-xs uppercase tracking-[0.25em] mb-2">ab Preis</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white">{products[0].price}</span>
                      <span className={`text-xl font-bold ${products[0].accent}`}>€</span>
                    </div>
                    <div className="text-white/35 text-xs mt-1">inkl. MwSt.</div>
                  </div>

                  <Link
                    href={products[0].href}
                    className="inline-flex items-center justify-center gap-2 bg-white/12 hover:bg-white/18 border border-white/15 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  >
                    Details entdecken
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {products.slice(1).map((p, i) => (
              <AnimatedSection key={p.id} delay={0.08 + i * 0.1} direction="up">
                <div className="product-card relative min-h-[22rem] rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_28px_90px_rgba(1,9,18,0.42)]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.14),transparent_18%),linear-gradient(180deg,rgba(3,10,20,0.08),rgba(3,10,20,0.45))]" />
                  <div className="absolute right-[-8%] top-[8%] bottom-[8%] w-[46%]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain drop-shadow-[0_25px_70px_rgba(0,0,0,0.42)]"
                    />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-6 max-w-[65%]">
                    <div>
                      <span className={`inline-block ${p.badgeColor} text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4`}>
                        {p.badge}
                      </span>
                      <h3 className="text-3xl font-black text-white tracking-[-0.04em] mb-2">{p.name}</h3>
                      <div className={`${p.accent} text-sm font-semibold mb-4`}>{p.tagline}</div>
                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-white/72 text-xs">
                          <Users className="w-3.5 h-3.5 text-white/60" />
                          {p.persons}
                        </div>
                        <div className="flex items-center gap-2 text-white/72 text-xs">
                          <Droplets className="w-3.5 h-3.5 text-white/60" />
                          {p.capacity}
                        </div>
                      </div>
                      <p className="text-white/68 text-sm leading-relaxed">{p.desc}</p>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex items-end justify-between gap-3">
                      <div>
                        {p.priceNote && <div className="text-white/35 text-xs line-through mb-1">{p.priceNote}</div>}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-white">{p.price}</span>
                          <span className={`text-base font-bold ${p.accent}`}>€</span>
                        </div>
                      </div>
                      <Link
                        href={p.href}
                        className="inline-flex items-center gap-1.5 bg-white/12 hover:bg-white/18 border border-white/12 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                      >
                        Ansehen
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection className="text-center" delay={0.3}>
          <Link
            href="/produkte"
            className="inline-flex items-center gap-2 text-aqua-100 hover:text-white font-semibold text-lg transition-colors group bg-white/6 border border-white/10 rounded-full px-6 py-3 backdrop-blur-xl"
          >
            Alle Produkte ansehen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
