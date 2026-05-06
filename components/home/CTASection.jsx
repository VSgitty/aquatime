'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-aqua-900/30 via-navy-950 to-navy-900" />
      <div className="glow-orb w-[700px] h-[700px] bg-aqua-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Animated rings */}
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
          <span className="inline-block bg-aqua-500/10 border border-aqua-500/20 text-aqua-400 text-sm font-semibold rounded-full px-4 py-1.5 mb-6">
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
              className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white px-10 py-5 rounded-2xl text-xl font-black transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-1"
            >
              Jetzt kostenlos beraten lassen
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:060737433137"
              className="inline-flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/15 border border-white/15 text-white px-8 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 text-aqua-400" />
              06073 743 3137
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/35 text-sm">
            {[
              '✓ Kostenlos & unverbindlich',
              '✓ Keine Verkaufsgespräche',
              '✓ Antwort in 24h',
              '✓ 10 Jahre Garantie',
            ].map((t) => (
              <span key={t} className="font-medium">{t}</span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
