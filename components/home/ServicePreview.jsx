'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, MapPin } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const serviceSteps = [
  {
    icon: '📞',
    title: 'Beratung',
    desc: 'Kostenlose telefonische Beratung. Wir empfehlen die passende Anlage für Ihren Haushalt.',
  },
  {
    icon: '📦',
    title: 'Lieferung',
    desc: 'Schnelle Lieferung in 24–72h – deutschlandweit, versichert und termingerecht.',
  },
  {
    icon: '🔧',
    title: 'Montage',
    desc: 'Unsere zertifizierten Techniker installieren alles fachgerecht in 2–3 Stunden.',
  },
  {
    icon: '✅',
    title: 'Fertig!',
    desc: 'Einweisung, Test, Dokumentation. Sie genießen ab sofort weiches Wasser.',
  },
];

const serviceHighlights = [
  'Zertifizierte Montagetechniker',
  'Installation in 2–3 Stunden',
  'Einweisung & Dokumentation inklusive',
  'Regelmäßiger Wartungsservice',
  'Deutschlandweiter Einsatz',
  'Telefonischer Support nach Montage',
];

export default function ServicePreview() {
  return (
    <section className="py-28 bg-[#03111d] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-45" />
      <div className="absolute top-0 left-[8%] w-80 h-80 rounded-full bg-cyan-400/8 blur-[130px]" />
      <div className="absolute bottom-0 right-[8%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimatedSection direction="left">
              <span className="inline-block bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-5 backdrop-blur-xl">
                Service & Montage
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-[0.95] tracking-[-0.05em]">
                Wir kummern uns um{' '}
                <span className="gradient-text">alles</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/68 mb-8 leading-relaxed max-w-2xl">
                Von der Beratung bis zur Inbetriebnahme – unser Team aus erfahrenen
                Technikern sorgt für eine saubere, fachgerechte Installation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {serviceHighlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/5 px-3 py-3 backdrop-blur-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-white/85 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-2xl px-5 py-3 mb-8 w-fit backdrop-blur-xl">
                <MapPin className="w-4 h-4 text-aqua-500" />
                <div>
                  <div className="text-white font-semibold text-sm">Direkter Einsatz aus Babenhausen</div>
                  <div className="text-white/65 text-xs">fur ganz Deutschland</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/service"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 text-[#031828] px-6 py-3.5 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-[0_24px_65px_rgba(125,211,252,0.25)]"
                >
                  Mehr zum Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 border border-white/14 bg-white/6 text-white hover:border-aqua-300 hover:text-aqua-100 px-6 py-3.5 rounded-2xl font-semibold transition-all backdrop-blur-xl"
                >
                  Termin anfragen
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-4">
              {serviceSteps.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] border border-white/10 hover:border-white/18 rounded-[1.75rem] p-5 transition-all group backdrop-blur-2xl shadow-[0_24px_90px_rgba(1,8,18,0.35)]"
                >
                  <div className="w-12 h-12 bg-white/90 rounded-xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-aqua-600 font-black text-xs">0{i + 1}</span>
                      <h3 className="text-white font-bold">{s.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}

              <div className="bg-[#081523] border border-white/10 rounded-[1.75rem] p-5 flex items-center gap-4 backdrop-blur-2xl">
                <Clock className="w-8 h-8 text-aqua-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold">Schnelle Montage</div>
                  <div className="text-white/60 text-sm">Ihre Anlage ist in 2–3 Stunden einsatzbereit</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
