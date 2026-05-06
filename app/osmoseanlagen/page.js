'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Droplets, Zap, Phone, Star } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const trinityFeatures = [
  { icon: '🎯', title: '0,0001 Mikrometer', desc: 'Filtert selbst kleinste Verunreinigungen, Bakterien und Schwermetalle zuverlässig heraus.' },
  { icon: '⚡', title: '1,6L pro Minute', desc: 'Schnelle Durchflussrate – kein langes Warten auf frisches, sauberes Wasser.' },
  { icon: '📊', title: 'TDS-Display', desc: 'Das integrierte Display zeigt Ihnen die Wasserqualität in Echtzeit in ppm an.' },
  { icon: '🔇', title: 'Leise (40 dB)', desc: 'So leise wie ein Flüstern. Kaum hörbar, auch nachts.' },
  { icon: '🔄', title: 'Selbstreinigend', desc: 'Automatische Rückspülung hält die Anlage dauerhaft in Top-Zustand.' },
  { icon: '💧', title: '4000L Kapazität', desc: 'Hohe Filterkapazität – lange Standzeit vor dem Filterreinigung.' },
];

const comparisonData = [
  { label: 'Schwermetalle entfernen', tap: '✗', bottled: '~', trinity: '✓' },
  { label: 'Bakterien filtern', tap: '✗', bottled: '✓', trinity: '✓' },
  { label: 'Nitrate entfernen', tap: '✗', bottled: '~', trinity: '✓' },
  { label: 'Kalk entfernen', tap: '✗', bottled: '~', trinity: '✓' },
  { label: 'Geschmack', tap: 'Mittel', bottled: 'Gut', trinity: 'Hervorragend' },
  { label: 'Kosten/Liter', tap: '0,002€', bottled: '0,40€+', trinity: '0,01€' },
  { label: 'Umweltfreundlich', tap: '✓', bottled: '✗', trinity: '✓' },
  { label: 'Immer verfügbar', tap: '✓', bottled: '✗', trinity: '✓' },
];

export default function OsmoseanlagenPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-navy-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="glow-orb w-[600px] h-[600px] bg-emerald-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full px-4 py-1.5 mb-5"
          >
            Umkehrosmose Technologie
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white mb-5"
          >
            Reinstes Trinkwasser<br />
            <span className="bg-gradient-to-r from-emerald-400 to-aqua-400 bg-clip-text text-transparent">direkt aus dem Hahn</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/55 max-w-2xl mx-auto mb-8"
          >
            Kein Schleppen von Wasserflaschen mehr. Die AquaTime Trinity Umkehrosmoseanlage
            liefert kristallklares Trinkwasser – günstiger, frischer, umweltfreundlicher.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-aqua-500 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity hover:-translate-y-1 hover:shadow-glow"
            >
              Jetzt bestellen
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:060737433137"
              className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/14 transition-all"
            >
              <Phone className="w-4 h-4 text-aqua-400" />
              Beratung: 06073 743 3137
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product Spotlight */}
      <section className="py-20 bg-gradient-to-b from-[#082c49] to-[#06233c] relative overflow-hidden">
        <div className="absolute inset-0 water-flow-lines opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block bg-emerald-500/10 border border-emerald-300/30 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
                #1 OSMOSEANLAGE
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                AquaTime Trinity
              </h2>
              <p className="text-xl text-white/75 mb-6 leading-relaxed">
                Unsere leistungsstärkste Osmoseanlage. Kompakt genug für jeden Unterschrank,
                leistungsstark genug für die ganze Familie.
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-white/45 text-lg line-through">599,00 EUR</span>
                <span className="bg-red-500/15 text-red-200 font-bold text-sm px-2.5 py-0.5 rounded-lg">-37%</span>
              </div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-white">378,97</span>
                <span className="text-aqua-300 text-2xl font-bold">EUR</span>
                <span className="text-white/45 text-sm">inkl. MwSt.</span>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  'Filterung bis 0,0001 Mikrometer',
                  'TDS-Display am Wasserhahn integriert',
                  'Selbstreinigende Membran',
                  '4000L Kapazität pro Kartusche',
                  'Einfache Installation unterm Waschbecken',
                  'Ersatzkartuschen günstig nachkaufen',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-white/85 font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-aqua-500 text-white px-7 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all hover:-translate-y-0.5"
                >
                  Jetzt bestellen
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:060737433137"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-xl font-semibold hover:border-aqua-300 hover:text-aqua-100 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Beratung anfordern
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              {/* Product visual */}
              <div className="relative bg-gradient-to-br from-navy-950 to-navy-800 rounded-3xl overflow-hidden p-10 border border-white/8">
                <div className="glow-orb w-72 h-72 bg-emerald-500/10 top-0 right-0" />
                <div className="relative z-10">
                  {/* Product mockup */}
                  <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-br from-navy-700 to-navy-900 rounded-2xl border border-white/10 p-8 shadow-2xl">
                      <Droplets className="w-20 h-20 text-aqua-400 mx-auto mb-3" />
                      <div className="text-white font-black text-2xl">TRINITY</div>
                      <div className="text-aqua-400 text-sm font-medium">Umkehrosmoseanlage</div>
                    </div>
                  </div>

                  {/* Spec pills */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: '0,0001μm', label: 'Filtergröße' },
                      { val: '1,6L/min', label: 'Durchfluss' },
                      { val: '4000L', label: 'Kapazität' },
                      { val: '40 dB', label: 'Geräuschpegel' },
                    ].map((s) => (
                      <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                        <div className="text-emerald-400 font-black text-lg">{s.val}</div>
                        <div className="text-white/40 text-xs">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-[#072641] to-[#051f35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">
              6 Gründe für die Trinity
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Technologie die überzeugt – von der Filtergröße bis zum Display.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
            {trinityFeatures.map((f) => (
              <StaggerItem key={f.title}>
                <div className="bg-white/8 rounded-2xl border border-white/12 p-6 hover:border-emerald-200/50 hover:shadow-card-hover transition-all hover:-translate-y-1 group backdrop-blur-md">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-gradient-to-b from-[#041e34] to-[#031a2f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-3">
              Trinity vs. Alternatives
            </h2>
            <p className="text-white/70">Vergleich: Leitungswasser, Flaschenwasser, AquaTime Trinity</p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="bg-navy-950 rounded-3xl overflow-hidden border border-white/8">
              {/* Header */}
              <div className="grid grid-cols-4 bg-navy-900">
                <div className="px-5 py-4 text-white/40 text-sm font-medium">Kriterium</div>
                <div className="px-4 py-4 text-center">
                  <span className="text-white/50 text-sm font-semibold">Leitungswasser</span>
                </div>
                <div className="px-4 py-4 text-center">
                  <span className="text-white/50 text-sm font-semibold">Flaschenwasser</span>
                </div>
                <div className="px-4 py-4 text-center bg-emerald-500/10 border-l border-emerald-500/20">
                  <span className="text-emerald-400 text-sm font-bold">Trinity ✓</span>
                </div>
              </div>
              {comparisonData.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-4 border-t border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}
                >
                  <div className="px-5 py-3.5 text-white/60 text-sm">{row.label}</div>
                  <div className="px-4 py-3.5 text-center text-sm text-white/50">{row.tap}</div>
                  <div className="px-4 py-3.5 text-center text-sm text-white/50">{row.bottled}</div>
                  <div className="px-4 py-3.5 text-center bg-emerald-500/5 border-l border-emerald-500/15">
                    <span className="text-emerald-400 font-semibold text-sm">{row.trinity}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-3xl font-black text-white mb-3">
            Bereit für reines Trinkwasser?
          </h3>
          <p className="text-white/50 mb-8">
            Sparen Sie ab sofort Geld und genießen Sie bestes Trinkwasser aus Ihrem Hahn.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-aqua-500 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            Jetzt Trinity bestellen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
