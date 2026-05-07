'use client';

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
    <section className="py-28 bg-[#020814] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-55" />
      <div className="absolute top-8 left-[8%] w-80 h-80 rounded-full bg-cyan-400/8 blur-[130px]" />
      <div className="absolute bottom-0 right-[6%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            So einfach funktioniert es
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-[0.95] tracking-[-0.05em]">
            Von hartem Wasser zu{' '}
            <span className="gradient-text">reinem Genuss</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/58 max-w-2xl mx-auto leading-relaxed">
            Unsere Enthärtungsanlagen arbeiten vollautomatisch und 24/7 – ohne Aufwand für Sie.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20" stagger={0.15}>
          {steps.map((step, i) => (
            <StaggerItem key={step.num}>
              <div
                className={`relative rounded-[2rem] p-8 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_28px_100px_rgba(1,8,18,0.35)] ${
                  step.highlight ? 'ring-1 ring-aqua-300/35' : ''
                }`}
              >
                <div className={`absolute inset-0 rounded-[2rem] ${step.bg} opacity-60`} />
                <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(3,10,18,0.08),rgba(3,10,18,0.26))]" />
                {step.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-aqua-300 text-[#041423] text-xs font-bold px-3 py-1 rounded-full shadow-[0_12px_30px_rgba(125,211,252,0.35)]">
                    Kernprozess
                  </div>
                )}
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-white/90 rounded-2xl flex items-center justify-center shadow-sm">
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <span className={`text-5xl font-black tracking-[-0.05em] ${step.color} opacity-25`}>{step.num}</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-white/62 leading-relaxed">{step.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-7 h-7 bg-[#081523] border border-white/10 rounded-full flex items-center justify-center backdrop-blur-xl">
                      <ArrowRight className="w-3 h-3 text-white/40" />
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.2}>
          <div className="rounded-[2rem] border border-white/10 overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_28px_100px_rgba(1,8,18,0.38)]">
            <div className="grid grid-cols-3">
              <div className="bg-red-500/10 border-r border-white/10 px-4 sm:px-6 py-4 text-center">
                <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Vorher</span>
                <p className="text-white/40 text-xs mt-1">Mit hartem Wasser</p>
              </div>
              <div className="px-4 sm:px-6 py-4 text-center border-r border-white/10">
                <span className="text-white/40 font-medium text-sm">Vergleich</span>
              </div>
              <div className="bg-emerald-500/10 px-4 sm:px-6 py-4 text-center">
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
                <div className="px-4 sm:px-6 py-4 text-center">
                  <span className="text-red-400/80 font-semibold">{c.before}</span>
                </div>
                <div className="px-4 sm:px-6 py-4 text-center border-x border-white/6">
                  <span className="text-white/50 text-sm">{c.label}</span>
                </div>
                <div className="px-4 sm:px-6 py-4 text-center">
                  <span className="text-emerald-400 font-semibold">{c.after}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center mt-12" delay={0.3}>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 hover:from-white hover:via-aqua-200 hover:to-emerald-100 text-[#031828] px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-[0_24px_65px_rgba(125,211,252,0.25)]"
          >
            Jetzt kostenlos beraten lassen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
