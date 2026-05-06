'use client';

import { motion } from 'framer-motion';
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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-aqua-500 via-aqua-400 to-aqua-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16" delay={0}>
          <span className="inline-block bg-red-50 border border-red-100 text-red-500 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
            Erkennen Sie sich wieder?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4 leading-tight">
            Was hartes Wasser{' '}
            <span className="text-red-500">wirklich kostet</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Hartes Wasser verursacht in Deutschland jedes Jahr Milliardenschäden.
            Die meisten Menschen merken es erst, wenn es zu spät ist.
          </p>
        </AnimatedSection>

        {/* Problem cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {problems.map((p) => (
            <StaggerItem key={p.title}>
              <div
                className={`group relative bg-gradient-to-br ${p.color} border ${p.border} rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <p.icon className={`w-5 h-5 ${p.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black ${p.iconColor}`}>{p.stat}</div>
                    <div className="text-slate-500 text-xs">{p.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-navy-900 font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA hint */}
        <AnimatedSection className="text-center mt-14" delay={0.2}>
          <p className="text-slate-500 text-lg mb-2">
            Die gute Nachricht: <span className="font-semibold text-navy-900">All das lässt sich mit einer Enthärtungsanlage lösen.</span>
          </p>
          <p className="text-slate-400 text-sm">
            Einmalige Investition → dauerhafter Schutz für Ihr Zuhause
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
