'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Droplets, ChevronDown, CheckCircle, Zap, Phone } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const neoProducts = [
  {
    model: 'NEO 40',
    slug: 'neo-40',
    persons: '4',
    price: '559',
    badge: null,
    color: 'from-slate-700 to-navy-800',
    accent: '#94a3b8',
    specs: { harz: '9,5L', salz: '~3kg', flow: '1,2 m³/h', connections: 'G¾"' },
    features: ['BNT-Steuerventil', 'Kabinettgehäuse', 'Vollautomatisch', 'Einfache Bedienung'],
    desc: 'Kompakter Einstieg für kleine Haushalte. Platzsparend und effizient.',
  },
  {
    model: 'NEO 60',
    slug: 'neo-60',
    persons: '6',
    price: '598',
    badge: null,
    color: 'from-blue-800 to-navy-800',
    accent: '#60a5fa',
    specs: { harz: '14L', salz: '~4,5kg', flow: '1,4 m³/h', connections: 'G¾"' },
    features: ['BNT-Steuerventil', 'Kabinettgehäuse', 'Vollautomatisch', 'Salzsparsam'],
    desc: 'Ideal für Familien mit bis zu 6 Personen. Das beliebteste Modell in dieser Größe.',
  },
  {
    model: 'NEO 80',
    slug: 'neo-80',
    persons: '7',
    price: '619',
    badge: '🔥 Bestseller',
    badgeColor: 'bg-orange-500',
    color: 'from-aqua-800 to-navy-700',
    accent: '#38bdf8',
    specs: { harz: '17L', salz: '~5,5kg', flow: '1,6 m³/h', connections: 'G¾"' },
    features: ['BNT-Steuerventil', 'Kabinettgehäuse', 'Vollautomatisch', 'Intelligente Regeneration'],
    desc: 'Unser Bestseller! Perfekte Balance aus Kapazität, Größe und Preis.',
    highlight: true,
  },
  {
    model: 'NEO 100',
    slug: 'neo-100',
    persons: '10',
    price: '639',
    badge: null,
    color: 'from-purple-800 to-navy-800',
    accent: '#c084fc',
    specs: { harz: '21L', salz: '~7kg', flow: '1,8 m³/h', connections: 'G¾"' },
    features: ['BNT-Steuerventil', 'Kabinettgehäuse', 'Vollautomatisch', 'Großkapazität'],
    desc: 'Für größere Familien oder Häuser mit hohem Wasserverbrauch.',
  },
  {
    model: 'NEO 120',
    slug: 'neo-120',
    persons: '12',
    price: '659',
    badge: 'Für Großfamilien',
    badgeColor: 'bg-purple-600',
    color: 'from-indigo-800 to-navy-800',
    accent: '#818cf8',
    specs: { harz: '26L', salz: '~8,5kg', flow: '2,0 m³/h', connections: 'G¾"' },
    features: ['BNT-Steuerventil', 'Kabinettgehäuse', 'Vollautomatisch', 'Maximale Kapazität'],
    desc: 'Unsere leistungsstärkste NEO-Anlage für große Haushalte und Villen.',
  },
];

const cosmosProducts = [
  {
    model: 'CosmosBlue',
    price: '779–1.073',
    badge: 'Clack CI',
    color: 'from-cyan-800 to-navy-800',
    accent: '#22d3ee',
    desc: 'Professionelle Enthärtungsanlage mit hochwertiger Clack CI Steuerung. Für anspruchsvolle Haushalte.',
    features: ['Clack CI Steuerventil', 'Große Kapazität', 'Lautlos', 'Langlebig'],
  },
  {
    model: 'CosmosBlue Pro',
    price: '809–1.072',
    badge: 'Clack IA',
    color: 'from-teal-800 to-navy-800',
    accent: '#2dd4bf',
    desc: 'Profi-Version mit Clack IA Steuerventil. Maximale Effizienz, minimaler Salzverbrauch.',
    features: ['Clack IA Steuerventil', 'Maximale Effizienz', 'App-Kompatibel', 'Premium Qualität'],
    highlight: true,
  },
  {
    model: 'CosmosBlue Premium',
    price: 'Auf Anfrage',
    badge: 'Pallas CK',
    color: 'from-sky-800 to-navy-800',
    accent: '#38bdf8',
    desc: 'Das Flaggschiff. Pallas CK Steuerventil für höchste Ansprüche – ideal für Gewerbe und Großhaushalte.',
    features: ['Pallas CK Steuerventil', 'Gewerbe-geeignet', 'Maximale Kapazität', 'Premium Service'],
  },
];

const faqs = [
  {
    q: 'Was ist eine Wasserenthärtungsanlage?',
    a: 'Eine Wasserenthärtungsanlage entfernt Kalk (Kalzium- und Magnesium-Ionen) aus dem Leitungswasser durch das Ionenaustauschverfahren. Das Ergebnis: weiches, kalkfreies Wasser für den gesamten Haushalt.',
  },
  {
    q: 'Wie funktioniert der Ionenaustausch?',
    a: 'Im Harz der Anlage tauschen Kalzium- und Magnesium-Ionen gegen Natrium-Ionen aus. Das Wasser wird dadurch „weich". Wenn das Harz erschöpft ist, regeneriert die Anlage automatisch mit Salz.',
  },
  {
    q: 'Ist das Wasser nach der Enthärtung noch trinkbar?',
    a: 'Ja. Die enthärtete Wasser ist vollkommen trinktauglich. Für besonders pures Trinkwasser empfehlen wir ergänzend unsere Trinity Osmoseanlage für den Küchenbereich.',
  },
  {
    q: 'Wie viel Salz verbraucht die Anlage?',
    a: 'Der Salzverbrauch hängt von Wasserhärte und Verbrauch ab. Bei einer Familie mit 4 Personen und 20°dH sind es ca. 2–3 kg Salz pro Woche.',
  },
  {
    q: 'Brauche ich Wartung?',
    a: 'Die Anlage arbeitet vollautomatisch. Sie müssen nur regelmäßig Salz nachfüllen. Eine professionelle Wartung alle 1–2 Jahre ist empfehlenswert, die wir gerne übernehmen.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/12 bg-[#082f4d]/70 rounded-2xl overflow-hidden backdrop-blur-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-aqua-300 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-white/70 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EnthaertungsanlagenPage() {
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
            Unsere Produktpalette
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white mb-5"
          >
            Enthärtungsanlagen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/55 max-w-2xl mx-auto mb-8"
          >
            Von der kleinen Wohnung bis zur Villa – die richtige Enthärtungsanlage für jeden Bedarf.
            Vollautomatisch, effizient, langlebig.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href="#neo" className="bg-aqua-500/10 border border-aqua-500/20 text-aqua-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-aqua-500/20 transition-colors">
              NEO Serie
            </a>
            <a href="#cosmosblue" className="bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
              CosmosBlue Serie
            </a>
            <a href="#zubehoer" className="bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
              Zubehör
            </a>
          </motion.div>
        </div>
      </section>

      {/* NEO Serie */}
      <section id="neo" className="py-20 bg-gradient-to-b from-[#0a3558] to-[#082b46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-aqua-300 font-bold text-sm uppercase tracking-wider">AquaTime NEO</span>
                <h2 className="text-4xl font-black text-white mt-1">Die NEO Produktlinie</h2>
                <p className="text-white/70 mt-2 max-w-xl">
                  Kompaktes Kabinettgehäuse mit BNT-Steuerventil. Vollautomatisch, platzsparend und für jeden Haushalt erhältlich.
                </p>
              </div>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-aqua-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-aqua-500 transition-colors text-sm"
              >
                Beratung anfordern
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {neoProducts.map((p, i) => (
              <AnimatedSection key={p.model} delay={i * 0.08} direction="up">
                <div
                  className={`product-card bg-navy-950 rounded-3xl overflow-hidden border ${
                    p.highlight ? 'border-aqua-500/40 ring-2 ring-aqua-500/15' : 'border-white/8'
                  } h-full flex flex-col`}
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${p.color} px-5 pt-5 pb-8 relative`}>
                    {p.badge && (
                      <span className={`inline-block ${p.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3`}>
                        {p.badge}
                      </span>
                    )}
                    <div className="text-white font-black text-3xl mb-1">{p.model}</div>
                    <div className="flex items-center gap-1.5" style={{ color: p.accent }}>
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-sm font-semibold">bis {p.persons} Personen</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-white/55 text-xs leading-relaxed mb-4">{p.desc}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.entries(p.specs).map(([k, v]) => (
                        <div key={k} className="bg-white/4 rounded-xl p-2.5 text-center">
                          <div className="text-white text-sm font-bold">{v}</div>
                          <div className="text-white/35 text-xs capitalize">{k === 'salz' ? 'Salzbed.' : k === 'flow' ? 'Durchfluss' : k === 'connections' ? 'Anschluss' : 'Harz'}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5 mb-5 flex-1">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-white/60 text-xs">
                          <CheckCircle className="w-3 h-3 text-aqua-400 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="border-t border-white/8 pt-4">
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-2xl font-black text-white">ab {p.price}</span>
                        <span className="text-aqua-400 font-bold">€</span>
                      </div>
                      <Link
                        href="/kontakt"
                        className="block w-full text-center bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-glow"
                      >
                        Anfragen
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CosmosBlue Serie */}
      <section id="cosmosblue" className="py-20 bg-gradient-to-b from-[#072742] to-[#052138]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="text-aqua-300 font-bold text-sm uppercase tracking-wider">AquaTime CosmosBlue</span>
            <h2 className="text-4xl font-black text-white mt-1 mb-2">Premium Enthartungsanlagen</h2>
            <p className="text-white/70 max-w-xl">
              Für höchste Ansprüche. Mit hochwertigen Clack-Steuerventilen, maximaler Effizienz und langer Lebensdauer.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6" stagger={0.1}>
            {cosmosProducts.map((p) => (
              <StaggerItem key={p.model}>
                <div className={`product-card bg-navy-950 rounded-3xl overflow-hidden border ${p.highlight ? 'border-aqua-500/40 ring-2 ring-aqua-500/15' : 'border-white/8'}`}>
                  <div className={`bg-gradient-to-br ${p.color} px-7 pt-7 pb-10 relative`}>
                    <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {p.badge}
                    </span>
                    <div className="text-white font-black text-3xl mb-2">{p.model}</div>
                    {p.highlight && (
                      <span className="inline-block bg-aqua-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Empfohlen
                      </span>
                    )}
                  </div>
                  <div className="p-7">
                    <p className="text-white/60 text-sm leading-relaxed mb-5">{p.desc}</p>
                    <div className="space-y-2 mb-6">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-white/70 text-sm">
                          <Zap className="w-3.5 h-3.5 text-aqua-400" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/8 pt-5 flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-black text-white">ab {p.price} €</div>
                        <div className="text-white/35 text-xs">inkl. MwSt.</div>
                      </div>
                      <Link
                        href="/kontakt"
                        className="inline-flex items-center gap-1.5 bg-aqua-500 hover:bg-aqua-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                      >
                        Angebot
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-[#06243d] to-[#031a2f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">Haufige Fragen</h2>
            <p className="text-white/70">Alles was Sie uber Enthartungsanlagen wissen mussen.</p>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-navy-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-3xl font-black text-white mb-3">
            Nicht sicher, welche Anlage passt?
          </h3>
          <p className="text-white/50 mb-8">
            Unser Team berät Sie kostenlos und unverbindlich. Einfach anrufen oder Formular ausfüllen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:060737433137"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-900 px-6 py-3.5 rounded-xl font-bold hover:bg-aqua-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              06073 743 3137
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-aqua-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-aqua-400 transition-colors"
            >
              Kontaktformular
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
