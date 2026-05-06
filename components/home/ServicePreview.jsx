'use client';

import Link from 'next/link';
import { ArrowRight, Wrench, CheckCircle, Clock, MapPin } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

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
    <section className="py-24 bg-gradient-to-b from-[#083354] to-[#06273f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <AnimatedSection direction="left">
              <span className="inline-block bg-aqua-500/10 border border-aqua-200/30 text-aqua-200 text-sm font-semibold rounded-full px-4 py-1.5 mb-5">
                Service & Montage
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
                Wir kummern uns um{' '}
                <span className="text-aqua-300">alles</span>
              </h2>
              <p className="text-xl text-white/75 mb-8 leading-relaxed">
                Von der Beratung bis zur Inbetriebnahme – unser Team aus erfahrenen
                Technikern sorgt für eine saubere, fachgerechte Installation.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {serviceHighlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-white/85 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>

              {/* Location badge */}
              <div className="flex items-center gap-3 bg-white/8 border border-white/15 rounded-2xl px-5 py-3 mb-8 w-fit backdrop-blur-md">
                <MapPin className="w-4 h-4 text-aqua-500" />
                <div>
                  <div className="text-white font-semibold text-sm">Direkter Einsatz aus Babenhausen</div>
                  <div className="text-white/65 text-xs">fur ganz Deutschland</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/service"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-500 to-aqua-600 text-white px-6 py-3.5 rounded-xl font-bold hover:from-aqua-400 hover:to-aqua-500 transition-all hover:shadow-glow hover:-translate-y-0.5"
                >
                  Mehr zum Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:border-aqua-300 hover:text-aqua-100 px-6 py-3.5 rounded-xl font-semibold transition-all"
                >
                  Termin anfragen
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Process steps */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="space-y-4">
              {serviceSteps.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-4 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-aqua-200/50 rounded-2xl p-5 transition-all group backdrop-blur-md"
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

              <div className="bg-navy-950 rounded-2xl p-5 flex items-center gap-4">
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
