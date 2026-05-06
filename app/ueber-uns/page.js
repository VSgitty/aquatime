'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Users, Award, Heart, Zap } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const timeline = [
  { year: '2014', title: 'Gründung', desc: 'AquaTime GmbH wird in Babenhausen gegründet. Erste Kunden in der Rhein-Main-Region.' },
  { year: '2016', title: 'Erweiterung', desc: 'Ausbau des Sortiments auf Premium-Enthärtungsanlagen und Osmosesysteme.' },
  { year: '2019', title: 'Expansion', desc: 'Deutschlandweiter Montageservice gestartet. 200+ Installationen erreicht.' },
  { year: '2022', title: 'NEO-Serie', desc: 'Launch der eigenen NEO-Produktlinie – kompakt, modern, erschwinglich.' },
  { year: '2024', title: 'Trinity', desc: 'Einführung der Trinity Osmoseanlage. 500+ zufriedene Kunden.' },
  { year: '2025', title: 'Heute', desc: 'Über 800 Installationen, 5-Sterne-Bewertungen, weiteres Wachstum.' },
];

const values = [
  {
    icon: '💎',
    title: 'Qualität',
    desc: 'Wir verbauen nur geprüfte Komponenten von renommierten Herstellern. Kein Kompromiss bei Qualität.',
  },
  {
    icon: '🤝',
    title: 'Ehrlichkeit',
    desc: 'Wir empfehlen nur, was Ihnen wirklich nützt. Keine überteuerten Angebote, keine unnötigen Extras.',
  },
  {
    icon: '⚡',
    title: 'Zuverlässigkeit',
    desc: 'Pünktliche Termine, saubere Arbeit, schneller Service. Auf uns können Sie sich verlassen.',
  },
  {
    icon: '❤️',
    title: 'Kundennähe',
    desc: 'Kein Callcenter, kein Skript. Echte Menschen mit echtem Interesse an Ihrer Zufriedenheit.',
  },
];

const team = [
  { name: 'Geschäftsführung', role: 'Beratung & Vertrieb', emoji: '👨‍💼', desc: 'Persönliche Kundenberatung und Unternehmensleitung.' },
  { name: 'Montage-Team', role: 'Installation & Service', emoji: '🔧', desc: 'Zertifizierte Techniker für fachgerechte Montage.' },
  { name: 'Support-Team', role: 'Kundenservice', emoji: '📞', desc: 'Immer erreichbar für Fragen und Nachsorge.' },
];

export default function UeberUnsPage() {
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
            Wer wir sind
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-black text-white mb-5"
          >
            Über AquaTime GmbH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/55 max-w-2xl mx-auto"
          >
            Seit 2014 helfen wir Familien und Hauseigentümern in ganz Deutschland,
            die Wasserqualität in ihrem Zuhause deutlich zu verbessern.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-b from-[#082d4b] to-[#06233c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-aqua-300 font-bold text-sm uppercase tracking-wider">Unsere Mission</span>
              <h2 className="text-4xl font-black text-white mt-2 mb-4">
                Wasser ist Leben –<br />
                machen Sie es rein.
              </h2>
              <p className="text-white/75 leading-relaxed mb-5">
                AquaTime GmbH wurde 2014 in Babenhausen, Hessen, mit einer klaren Vision gegründet:
                Jedem Haushalt in Deutschland Zugang zu professioneller Wasseraufbereitung zu ermöglichen –
                zu fairen Preisen und mit persönlichem Service.
              </p>
              <p className="text-white/75 leading-relaxed mb-8">
                Wir sind kein anonymes Online-Versandhaus. Wir sind ein lokales Unternehmen mit echten
                Menschen, die sich für Ihr Wohlbefinden und das Ihrer Familie einsetzen.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { val: '2014', label: 'Gegründet' },
                  { val: '500+', label: 'Kunden' },
                  { val: '800+', label: 'Installationen' },
                  { val: '4.9★', label: 'Bewertung' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 border border-white/12 rounded-2xl p-4 backdrop-blur-md">
                    <div className="text-3xl font-black text-aqua-600 mb-1">{s.val}</div>
                    <div className="text-white/65 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.15}>
              {/* Company card */}
              <div className="bg-navy-950 rounded-3xl overflow-hidden border border-white/8">
                <div className="bg-gradient-to-br from-aqua-800 to-navy-800 px-8 pt-8 pb-12 relative">
                  <div className="glow-orb w-40 h-40 bg-aqua-400/10 -top-5 -right-5" />
                  <div className="text-white font-black text-3xl mb-1">AquaTime GmbH</div>
                  <div className="text-aqua-300 text-sm font-medium">Wasseraufbereitung seit 2014</div>
                </div>
                <div className="px-8 py-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-aqua-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold">Standort</div>
                      <div className="text-white/50 text-sm">Ziegelhüttenstraße 30, 64832 Babenhausen</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-aqua-400 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">Telefon</div>
                      <a href="tel:060737433137" className="text-aqua-400 text-sm hover:text-aqua-300">06073 743 3137</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-aqua-400 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">E-Mail</div>
                      <a href="mailto:info@aquatimegmbh.de" className="text-aqua-400 text-sm hover:text-aqua-300">info@aquatimegmbh.de</a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-[#06253d] to-[#041c31]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Unsere Werte</h2>
            <p className="text-white/70">Das sind die Prinzipien, die uns taglich antreiben.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-white/8 rounded-2xl border border-white/12 p-6 text-center hover:border-aqua-200/40 hover:shadow-card transition-all hover:-translate-y-1 backdrop-blur-md">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="text-white font-black text-xl mb-2">{v.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Unsere Geschichte</h2>
            <p className="text-white/40">Von kleinen Anfängen zu einem der führenden Wasseraufbereiter in der Region.</p>
          </AnimatedSection>
          <div className="space-y-5">
            {timeline.map((t, i) => (
              <AnimatedSection key={t.year} delay={i * 0.08} direction="left">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-aqua-500 to-aqua-600 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {t.year}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-aqua-600 to-transparent mt-2 min-h-4" />
                    )}
                  </div>
                  <div className="bg-white/5 border border-white/8 rounded-2xl p-5 flex-1 mb-2">
                    <h3 className="text-white font-bold text-lg mb-1">{t.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-[#072a46] to-[#041f35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Unser Team</h2>
            <p className="text-white/70">Menschen mit Leidenschaft fur sauberes Wasser.</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.1}>
            {team.map((t) => (
              <StaggerItem key={t.name}>
                <div className="bg-white/8 rounded-3xl p-8 text-center border border-white/12 hover:border-aqua-200/40 hover:shadow-card transition-all backdrop-blur-md">
                  <div className="text-5xl mb-4">{t.emoji}</div>
                  <h3 className="text-white font-black text-xl mb-1">{t.name}</h3>
                  <div className="text-aqua-200 font-semibold text-sm mb-3">{t.role}</div>
                  <p className="text-white/70 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0b3f63] to-[#0b5f86] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-3xl font-black text-white mb-3">Lernen Sie uns kennen</h3>
          <p className="text-aqua-100 mb-8">
            Rufen Sie einfach an – wir nehmen uns Zeit für Sie. Keine Warteschleife, kein Callcenter.
          </p>
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
              className="inline-flex items-center justify-center gap-2 bg-navy-950/20 border border-white/30 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-navy-950/30 transition-colors"
            >
              Kontakt aufnehmen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
