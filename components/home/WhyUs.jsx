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
    <section className="py-24 bg-gradient-to-b from-[#0a2f4d] to-[#07253d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-white/8 border border-white/10 text-aqua-200 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
            Warum AquaTime?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Nicht nur ein Produkt,<br />
            <span className="text-aqua-300">ein Rundum-Service</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Von der Beratung über die Installation bis zum Wartungsservice –
            wir begleiten Sie auf dem gesamten Weg zu weichem Wasser.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.07}>
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="group p-6 rounded-2xl border border-white/12 hover:border-aqua-200/35 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-[#0a304d]/65 backdrop-blur-md">
                <div className={`w-12 h-12 ${r.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <r.icon className={`w-5 h-5 ${r.color}`} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{r.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
