'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export default function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#020814]">
      <div className="absolute inset-0 hero-mesh opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-[#020814] to-emerald-900/10" />
      <div className="glow-orb w-[700px] h-[700px] bg-aqua-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {[200, 350, 500, 650].map((size, i) => (
        <motion.div
          key={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aqua-500/10"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="inline-block bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-6 backdrop-blur-xl">
            Kostenlos & unverbindlich
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Bereit für weiches,{' '}
            <span className="gradient-text">reines Wasser?</span>
          </h2>
          <p className="text-xl text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed">
            Starten Sie noch heute. Unser Team berät Sie kostenlos, ermittelt Ihre
            optimale Anlage und macht Ihnen ein unverbindliches Angebot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 hover:from-white hover:via-aqua-200 hover:to-emerald-100 text-[#031828] px-10 py-5 rounded-2xl text-xl font-black transition-all duration-300 hover:-translate-y-1 shadow-[0_28px_80px_rgba(125,211,252,0.25)]"
            >
              Jetzt kostenlos beraten lassen
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:060737433137"
              className="inline-flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/12 text-white px-8 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-xl"
            >
              <Phone className="w-5 h-5 text-aqua-400" />
              06073 743 3137
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-white/35 text-sm">
            {[
              '✓ Kostenlos & unverbindlich',
              '✓ Keine Verkaufsgespräche',
              '✓ Antwort in 24h',
              '✓ 10 Jahre Garantie',
            ].map((t) => (
              <span key={t} className="font-medium rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">{t}</span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
