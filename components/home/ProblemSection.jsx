'use client';

import { AlertTriangle, Droplets, Euro, HeartCrack, Scale, Wrench } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const problems = [
  {
    icon: Scale,
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/20',
    iconColor: 'text-orange-400',
    title: 'Kalkreste überall',
    desc: 'Weißliche Flecken auf Armaturen, Gläsern und Fliesen, die sich kaum entfernen lassen.',
    stat: '78%',
    statLabel: 'der Deutschen betroffen',
  },
  {
    icon: Wrench,
    color: 'from-red-500/20 to-pink-500/20',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
    title: 'Geräte gehen kaputt',
    desc: 'Kaffeemaschine, Waschmaschine, Durchlauferhitzer – Kalk verkürzt ihre Lebensdauer drastisch.',
    stat: '2×',
    statLabel: 'kürzere Gerätelebensdauer',
  },
  {
    icon: Euro,
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    title: 'Hohe Energiekosten',
    desc: 'Bereits 1 mm Kalkschicht im Boiler erhöht den Energieverbrauch um bis zu 15%.',
    stat: '+15%',
    statLabel: 'Stromkosten durch Kalk',
  },
  {
    icon: HeartCrack,
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
    title: 'Trockene Haut & Haare',
    desc: 'Hartes Wasser reizt die Haut, trocknet Haare aus und verschlimmert Neurodermitis.',
    stat: '60%',
    statLabel: 'weniger Hautirritationen',
  },
  {
    icon: Droplets,
    color: 'from-blue-500/20 to-sky-500/20',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    title: 'Schlechter Kaffee & Tee',
    desc: 'Hartes Wasser überlagert Aromen. Weiches Wasser macht Getränke merklich besser.',
    stat: '100%',
    statLabel: 'besserer Geschmack',
  },
  {
    icon: AlertTriangle,
    color: 'from-purple-500/20 to-indigo-500/20',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    title: 'Verstopfte Rohre',
    desc: 'Kalkablagerungen verengen Rohre, reduzieren den Wasserdruck und verursachen teure Reparaturen.',
    stat: '€€€',
    statLabel: 'Kosten für Rohrsanierung',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-28 bg-[#03101d] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-55" />
      <div className="absolute inset-0 water-flow-lines opacity-20" />
      <div className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-red-400/8 blur-[130px]" />
      <div className="absolute bottom-0 left-[8%] w-96 h-96 rounded-full bg-aqua-400/8 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" delay={0}>
          <span className="inline-block bg-white/8 border border-white/10 text-red-200 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            Erkennen Sie sich wieder?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-white mb-4 leading-[0.95]">
            Was hartes Wasser{' '}
            <span className="bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent">wirklich kostet</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/68 max-w-3xl mx-auto leading-relaxed">
            Hartes Wasser verursacht in Deutschland jedes Jahr Milliardenschäden.
            Die meisten Menschen merken es erst, wenn es zu spät ist.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-10" delay={0.05}>
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl p-6 md:p-7 shadow-[0_28px_100px_rgba(1,8,18,0.42)]">
            <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
              <div>
                <div className="text-white/45 text-xs uppercase tracking-[0.28em] mb-3">Kalk ist kein Detailproblem</div>
                <h3 className="text-2xl md:text-3xl font-black tracking-[-0.04em] text-white mb-3">
                  Unsichtbare Belastung fuer Technik, Energieverbrauch und Alltag.
                </h3>
                <p className="text-white/64 leading-relaxed max-w-2xl">
                  Die sichtbaren Flecken sind nur der Anfang. Die eigentlichen Kosten entstehen in Leitungen, Haushaltsgeraeten, Wartung und Komfortverlust.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                  <div className="text-3xl font-black text-red-200 tracking-[-0.05em]">78%</div>
                  <div className="text-white/60 text-sm mt-1">betroffen von hartem Wasser</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                  <div className="text-3xl font-black text-orange-200 tracking-[-0.05em]">+15%</div>
                  <div className="text-white/60 text-sm mt-1">mehr Stromkosten durch Kalk</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {problems.map((p) => (
            <StaggerItem key={p.title}>
              <div
                className={`group relative rounded-[1.75rem] p-6 cursor-default border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_24px_90px_rgba(1,8,18,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/18`}
              >
                <div className={`absolute inset-0 rounded-[1.75rem] bg-gradient-to-br ${p.color} opacity-70`} />
                <div className="absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(3,10,18,0.12),rgba(3,10,18,0.32))]" />
                <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-sm">
                    <p.icon className={`w-5 h-5 ${p.iconColor}`} />
                  </div>
                  <div className="text-right rounded-2xl border border-white/10 bg-white/8 px-3 py-2 backdrop-blur-xl">
                    <div className={`text-2xl font-black tracking-[-0.04em] ${p.iconColor}`}>{p.stat}</div>
                    <div className="text-white/55 text-xs max-w-[7rem]">{p.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-white/76 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-14" delay={0.2}>
          <div className="inline-flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-2xl shadow-[0_24px_80px_rgba(1,8,18,0.35)]">
            <p className="text-white/75 text-lg mb-1">
              Die gute Nachricht: <span className="font-semibold text-white">All das laesst sich mit einer Enthartungsanlage loesen.</span>
            </p>
            <p className="text-white/45 text-sm">
              Einmalige Investition -&gt; dauerhafter Schutz fuer Ihr Zuhause
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
