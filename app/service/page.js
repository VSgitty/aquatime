'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Phone, MapPin, Clock, Shield, Wrench, Calendar } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const servicePackages = [
  {
    name: 'Basic Montage',
    price: 'Ab 199 €',
    icon: '🔧',
    color: 'border-slate-200',
    features: [
      'Fachgerechte Installation',
      'Anschluss an Wasserleitung',
      'Funktionstest',
      'Kurzeinweisung',
    ],
  },
  {
    name: 'Komplett-Service',
    price: 'Ab 299 €',
    icon: '⭐',
    color: 'border-aqua-300 ring-2 ring-aqua-100',
    highlight: true,
    features: [
      'Alles aus Basic',
      'Umfangreiche Einweisung',
      'Schriftliche Dokumentation',
      'Einstellung auf Ihre Wasserhärte',
      '3 Monate Nachsorge-Hotline',
    ],
  },
  {
    name: 'Premium + Wartung',
    price: 'Auf Anfrage',
    icon: '👑',
    color: 'border-purple-200',
    features: [
      'Alles aus Komplett',
      'Jährliche Wartung',
      'Harzreinigung',
      'Ersatzteile-Service',
      'Priority Support',
    ],
  },
];

const serviceProcess = [
  { step: '01', title: 'Kontakt aufnehmen', desc: 'Anruf oder Online-Formular – wir melden uns innerhalb von 24h.' },
  { step: '02', title: 'Beratung & Angebot', desc: 'Kostenlose telefonische Beratung, individuelle Anlage & Preis.' },
  { step: '03', title: 'Terminvereinbarung', desc: 'Flexibler Termin nach Ihrer Wahl – auch samstags möglich.' },
  { step: '04', title: 'Lieferung & Montage', desc: 'Pünktliche Ankunft, saubere Arbeit, 2–3 Stunden Installation.' },
  { step: '05', title: 'Einweisung & Test', desc: 'Alles erklärt, alles getestet – Sie sind absofort startklar.' },
  { step: '06', title: 'Nachsorge', desc: 'Bei Fragen sind wir per Telefon erreichbar. Persönlicher Service.' },
];

const coverageAreas = [
  'Frankfurt am Main', 'Darmstadt', 'Offenbach', 'Aschaffenburg',
  'Hanau', 'Dieburg', 'Groß-Gerau', 'Rüsselsheim',
  'Wiesbaden', 'Mainz', 'Heidelberg', 'Mannheim',
  '+ ganz Deutschland', 'auf Anfrage',
];

export default function ServicePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-navy-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="glow-orb w-[500px] h-[500px] bg-aqua-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-aqua-500/10 border border-aqua-500/20 text-aqua-400 text-sm font-semibold rounded-full px-4 py-1.5 mb-5"
          >
            Professionelle Montage
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white mb-5"
          >
            Service & Montage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/55 max-w-2xl mx-auto mb-8"
          >
            Wir installieren Ihre Anlage fachgerecht, schnell und sauber.
            Von Babenhausen aus – für ganz Deutschland.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-aqua-500 to-aqua-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-aqua-400 hover:to-aqua-500 transition-all hover:shadow-glow hover:-translate-y-1"
            >
              Termin anfragen
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why professional installation */}
      <section className="py-20 bg-gradient-to-b from-[#082f4e] to-[#06253f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">
              Warum Profi-Montage wichtig ist
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Eine korrekte Installation ist entscheidend für Effizienz und Langlebigkeit Ihrer Anlage.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.1}>
            {[
              {
                icon: Shield,
                title: 'Optimale Leistung',
                desc: 'Nur eine fachgerecht installierte Anlage erzielt die bestmögliche Wasserenthärtung und arbeitet effizient.',
                color: 'text-aqua-600',
                bg: 'bg-aqua-50',
              },
              {
                icon: Clock,
                title: 'Längere Lebensdauer',
                desc: 'Fehler bei der Installation können die Haltbarkeit drastisch beeinträchtigen. Unsere Experten vermeiden diese zuverlässig.',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
              {
                icon: Wrench,
                title: 'Individuelle Einstellung',
                desc: 'Wir stimmen die Anlage exakt auf Ihre Wasserhärte und die Gegebenheiten Ihres Hauses ab.',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
            ].map((r) => (
              <StaggerItem key={r.title}>
                <div className="text-center p-6 rounded-2xl border border-white/12 bg-white/8 backdrop-blur-md hover:border-aqua-200/40 hover:shadow-card transition-all">
                  <div className={`w-14 h-14 ${r.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <r.icon className={`w-7 h-7 ${r.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{r.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Service packages */}
      <section className="py-20 bg-gradient-to-b from-[#072742] to-[#041f36]" id="pakete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Service-Pakete</h2>
            <p className="text-white/70">Das richtige Paket fur jeden Bedarf.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6" stagger={0.1}>
            {servicePackages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div className={`bg-white/8 rounded-3xl border ${pkg.color} p-7 h-full flex flex-col shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 backdrop-blur-md`}>
                  <div className="text-3xl mb-3">{pkg.icon}</div>
                  {pkg.highlight && (
                    <span className="inline-block bg-aqua-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                      Empfohlen
                    </span>
                  )}
                  <h3 className="text-white font-black text-xl mb-1">{pkg.name}</h3>
                  <div className="text-2xl font-black text-aqua-600 mb-5">{pkg.price}</div>
                  <div className="space-y-2.5 flex-1 mb-6">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/kontakt"
                    className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                      pkg.highlight
                        ? 'bg-gradient-to-r from-aqua-500 to-aqua-600 text-white hover:from-aqua-400 hover:to-aqua-500 hover:shadow-glow'
                        : 'border border-white/30 text-white hover:border-aqua-300 hover:text-aqua-100'
                    }`}
                  >
                    Paket anfragen
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-b from-[#05233b] to-[#031a2f]" id="ablauf">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Wie lauft das ab?</h2>
            <p className="text-white/70">Von der ersten Anfrage bis zum fliessenden weichen Wasser - so einfach ist es.</p>
          </AnimatedSection>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-aqua-500 to-aqua-900 hidden sm:block" />
            <div className="space-y-6">
              {serviceProcess.map((s, i) => (
                <AnimatedSection key={s.step} delay={i * 0.08} direction="left">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-aqua-500 to-aqua-600 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 z-10 shadow-glow">
                      {s.step}
                    </div>
                    <div className="flex-1 bg-white/8 border border-white/12 rounded-2xl p-5 hover:border-aqua-200/50 transition-colors backdrop-blur-md">
                      <h3 className="text-white font-bold text-lg mb-1">{s.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage area */}
      <section className="py-20 bg-gradient-to-b from-[#072742] to-[#042035]" id="wartung">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block bg-aqua-500/10 border border-aqua-200/30 text-aqua-200 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
                Einsatzgebiet
              </span>
              <h2 className="text-4xl font-black text-white mb-4">
                Direkt aus Babenhausen –<br />
                für ganz Deutschland
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Unser Team fährt zu Ihnen – egal ob in der Rhein-Main-Region oder in Bayern, 
                Nordrhein-Westfalen oder Hamburg. Wir sind deutschlandweit im Einsatz.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-5 h-5 text-aqua-500" />
                <div>
                  <div className="font-semibold text-white">AquaTime GmbH</div>
                  <div className="text-white/65 text-sm">Ziegelhuttenstrasse 30, 64832 Babenhausen</div>
                </div>
              </div>
              <a
                href="tel:060737433137"
                className="inline-flex items-center gap-2 bg-aqua-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-aqua-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                06073 743 3137 anrufen
              </a>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-white/8 rounded-3xl border border-white/12 p-7 shadow-card backdrop-blur-md">
                <h3 className="text-white font-bold mb-4">Regionen (Auswahl)</h3>
                <div className="flex flex-wrap gap-2">
                  {coverageAreas.map((area) => (
                    <span
                      key={area}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        area.startsWith('+')
                          ? 'bg-aqua-500 text-white'
                          : 'bg-white/10 border border-white/20 text-white/80'
                      }`}
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-5 p-4 bg-aqua-50 border border-aqua-100 rounded-2xl">
                  <div className="flex items-center gap-2 text-aqua-700 font-semibold text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Terminverfügbarkeit
                  </div>
                  <p className="text-aqua-600 text-sm">
                    In der Regel können wir innerhalb von 3–7 Werktagen einen Termin vereinbaren.
                    Für dringende Fälle auch kurzfristiger.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-3xl font-black text-white mb-3">Termin jetzt anfragen</h3>
          <p className="text-white/50 mb-8">Kostenlos und unverbindlich. Wir rufen Sie zurück.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:060737433137"
              className="inline-flex items-center justify-center gap-2 bg-white/12 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-colors"
            >
              <Phone className="w-4 h-4" />
              06073 743 3137
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-aqua-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-aqua-400 transition-colors"
            >
              Online anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
