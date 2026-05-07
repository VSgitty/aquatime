'use client';

import { Shield, Wrench, HeartHandshake, Award, Truck, Phone, Clock, Leaf } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const reasons = [
  {
    icon: Award,
    title: 'Zertifizierte Qualität',
    desc: 'Alle Anlagen werden vor der Lieferung geprüft. Wir arbeiten ausschließlich mit hochwertigen Komponenten von Markenherstellern.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Wrench,
    title: 'Profi-Montage vor Ort',
    desc: 'Unsere zertifizierten Techniker installieren Ihre Anlage fachgerecht – inkl. Einweisung und Dokumentation.',
    color: 'text-aqua-600',
    bg: 'bg-aqua-50',
  },
  {
    icon: HeartHandshake,
    title: '10 Jahre Garantie',
    desc: 'Wir stehen hinter unseren Produkten. Volle Herstellergarantie + erweiterte AquaTime-Garantie.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Phone,
    title: 'Persönliche Beratung',
    desc: 'Keine Hotlines, kein Skript. Echte Experten analysieren Ihren Wasserhärtegrad und empfehlen die optimale Anlage.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Truck,
    title: 'Deutschlandweite Lieferung',
    desc: 'Schnelle Lieferung in 24–72 Stunden. Wir liefern und montieren in ganz Deutschland.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Leaf,
    title: 'Nachhaltig & Sparsam',
    desc: 'Weniger Waschmittel, weniger Energie, längere Gerätelebensdauer. Gut für Ihre Geldbörse und die Umwelt.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Clock,
    title: 'Schnelle Installation',
    desc: 'Komplette Installation in 2–3 Stunden. Danach läuft Ihre Anlage vollautomatisch – ohne weiteren Aufwand.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: 'Lokaler Partner',
    desc: 'Direkt aus Babenhausen – kurze Wege, schnelle Reaktionszeiten, persönlicher Service. Kein anonymes Versandhaus.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
];

export default function WhyUs() {
  return (
    <section className="py-28 bg-[#03111d] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-50" />
      <div className="absolute top-12 right-[10%] w-80 h-80 rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="absolute bottom-0 left-[8%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            Warum AquaTime?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-white mb-4 leading-[0.95]">
            Nicht nur ein Produkt,<br />
            <span className="bg-gradient-to-r from-aqua-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">ein Rundum-Service</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/68 max-w-3xl mx-auto leading-relaxed">
            Von der Beratung über die Installation bis zum Wartungsservice –
            wir begleiten Sie auf dem gesamten Weg zu weichem Wasser.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl p-6 md:p-8 shadow-[0_28px_100px_rgba(1,8,18,0.42)]">
            <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
              <div>
                <div className="text-white/40 text-xs uppercase tracking-[0.28em] mb-3">Premium Betreuung statt Standard-Shop</div>
                <h3 className="text-2xl md:text-3xl font-black tracking-[-0.04em] text-white mb-3">
                  Beratung, Montage und Service muessen so stark sein wie das Produkt selbst.
                </h3>
                <p className="text-white/62 leading-relaxed max-w-2xl">
                  AquaTime verkauft nicht nur Technik. Wir liefern Planungssicherheit, professionelle Installation und einen lokalen Ansprechpartner fuer den gesamten Lebenszyklus der Anlage.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                  <div className="text-3xl font-black text-aqua-200 tracking-[-0.05em]">24-72h</div>
                  <div className="text-white/55 text-sm mt-1">typische Lieferzeit</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                  <div className="text-3xl font-black text-emerald-200 tracking-[-0.05em]">2-3h</div>
                  <div className="text-white/55 text-sm mt-1">typische Installationsdauer</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.07}>
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="group p-6 rounded-[1.75rem] border border-white/10 hover:border-white/18 transition-all duration-300 hover:-translate-y-1.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_24px_90px_rgba(1,8,18,0.35)]">
                <div className={`w-12 h-12 ${r.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  <r.icon className={`w-5 h-5 ${r.color}`} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{r.title}</h3>
                <p className="text-white/66 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
