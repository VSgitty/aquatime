'use client';

import { motion } from 'framer-motion';
import { Droplets, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import Link from 'next/link';

const steps = [
  {
    num: '01',
    icon: Droplets,
    title: 'Hartes Wasser fließt ein',
    desc: 'Das Leitungswasser enthält gelöste Kalzium- und Magnesium-Ionen – die Verursacher von Kalk.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    num: '02',
    icon: Zap,
    title: 'Ionenaustausch',
    desc: 'Im Ionenaustauschharz werden die Härtebildner durch Natrium-Ionen ersetzt – ohne Chemikalien, vollautomatisch.',
    color: 'text-aqua-400',
    bg: 'bg-aqua-500/10',
    border: 'border-aqua-500/20',
    highlight: true,
  },
  {
    num: '03',
    icon: CheckCircle,
    title: 'Weiches Wasser',
    desc: 'Reines, weiches Wasser fließt zu Ihren Haushaltsgeräten, Dusche, Küche – komplett kalkfrei.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
];

const comparisons = [
  { label: 'Kalkflecken', before: '✗', after: '✓' },
  { label: 'Geräte-Lebensdauer', before: 'Kurz', after: '2× länger' },
  { label: 'Energieverbrauch', before: '+15%', after: 'Normal' },
  { label: 'Hautgefühl', before: 'Trocken', after: 'Seidig' },
  { label: 'Wasserqualität', before: 'Hart / kalkig', after: 'Weich / rein' },
  { label: 'Wartungskosten', before: 'Hoch', after: 'Minimal' },
];

export default function SolutionSection() {
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="glow-orb w-[600px] h-[600px] bg-aqua-700/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-aqua-500/10 border border-aqua-500/20 text-aqua-400 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
            So einfach funktioniert es
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Von hartem Wasser zu{' '}
            <span className="gradient-text">reinem Genuss</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Unsere Enthärtungsanlagen arbeiten vollautomatisch und 24/7 – ohne Aufwand für Sie.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20" stagger={0.15}>
          {steps.map((step, i) => (
            <StaggerItem key={step.num}>
              <div
                className={`relative bg-white/4 border ${step.border} rounded-3xl p-8 ${
                  step.highlight ? 'ring-1 ring-aqua-500/40 bg-aqua-500/8' : ''
                }`}
              >
                {step.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-aqua-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Kernprozess
                  </div>
                )}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 ${step.bg} rounded-2xl flex items-center justify-center`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <span className={`text-5xl font-black ${step.color} opacity-20`}>{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-white/55 leading-relaxed">{step.desc}</p>

                {/* Arrow between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-navy-800 border border-white/10 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white/40" />
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Before / After Comparison */}
        <AnimatedSection delay={0.2}>
          <div className="bg-white/4 border border-white/10 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3">
              <div className="bg-red-500/10 border-r border-white/10 px-6 py-4 text-center">
                <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Vorher</span>
                <p className="text-white/40 text-xs mt-1">Mit hartem Wasser</p>
              </div>
              <div className="px-6 py-4 text-center border-r border-white/10">
                <span className="text-white/40 font-medium text-sm">Vergleich</span>
              </div>
              <div className="bg-emerald-500/10 px-6 py-4 text-center">
                <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Nachher</span>
                <p className="text-white/40 text-xs mt-1">Mit AquaTime</p>
              </div>
            </div>
            {comparisons.map((c, i) => (
              <div
                key={c.label}
                className={`grid grid-cols-3 border-t border-white/6 ${
                  i % 2 === 0 ? 'bg-white/1' : ''
                }`}
              >
                <div className="px-6 py-4 text-center">
                  <span className="text-red-400/80 font-semibold">{c.before}</span>
                </div>
                <div className="px-6 py-4 text-center border-x border-white/6">
                  <span className="text-white/50 text-sm">{c.label}</span>
                </div>
                <div className="px-6 py-4 text-center">
                  <span className="text-emerald-400 font-semibold">{c.after}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12" delay={0.3}>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
          >
            Jetzt kostenlos beraten lassen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
