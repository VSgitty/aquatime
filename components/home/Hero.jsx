'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle, ChevronDown, Star, Shield, Zap } from 'lucide-react';

const drops = [
  { id: 1, x: 8,  y: 20, size: 50, dur: 5,   delay: 0 },
  { id: 2, x: 82, y: 15, size: 30, dur: 6,   delay: 1.2 },
  { id: 3, x: 18, y: 72, size: 65, dur: 7,   delay: 0.5 },
  { id: 4, x: 72, y: 65, size: 38, dur: 5.5, delay: 2.1 },
  { id: 5, x: 48, y: 8,  size: 22, dur: 8,   delay: 1.7 },
  { id: 6, x: 92, y: 78, size: 48, dur: 6.5, delay: 0.8 },
  { id: 7, x: 5,  y: 50, size: 28, dur: 7.5, delay: 3.1 },
  { id: 8, x: 58, y: 88, size: 20, dur: 4.5, delay: 2.6 },
  { id: 9, x: 35, y: 40, size: 16, dur: 9,   delay: 1.0 },
  { id: 10, x: 65, y: 30, size: 42, dur: 5.8, delay: 3.5 },
];

const benefits = [
  { icon: Zap, text: 'Bis zu 50% Energieeinsparung' },
  { icon: Shield, text: 'Geräte 2× länger haltbar' },
  { icon: Star, text: '10 Jahre Garantie' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0d1e3a]" />
      <div className="absolute inset-0 grid-pattern opacity-100" />

      {/* Glow orbs */}
      <div className="glow-orb w-[700px] h-[700px] bg-aqua-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb w-[400px] h-[400px] bg-aqua-500/6 top-1/4 right-1/4" />
      <div className="glow-orb w-[300px] h-[300px] bg-blue-700/8 bottom-1/4 left-1/6" />

      {/* Floating drops */}
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full border border-aqua-400/15 bg-gradient-to-br from-aqua-400/5 to-aqua-600/8"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -25, 0], opacity: [0.25, 0.55, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-aqua-500/10 border border-aqua-500/20 rounded-full px-4 py-2 text-aqua-400 text-sm font-semibold mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-aqua-400 animate-pulse" />
              Deutschlands Wasserenthärtungs-Experten
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
            >
              Nie wieder{' '}
              <span className="gradient-text">Kalk</span>
              <br />
              in Ihrem Haus.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-xl text-white/65 mb-8 leading-relaxed max-w-lg"
            >
              Schützen Sie Ihre Geräte, senken Sie Energiekosten und genießen
              Sie weiches, reines Wasser – jeden Tag, in jedem Raum.
            </motion.p>

            {/* Benefit chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-9"
            >
              {benefits.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white/80 text-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-aqua-400" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-7"
            >
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-aqua-500/35 hover:-translate-y-1"
              >
                Kostenlose Beratung
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/enthaertungsanlagen"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/14 border border-white/15 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                Produkte entdecken
              </Link>
            </motion.div>

            {/* Phone */}
            <motion.a
              href="tel:060737433137"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="inline-flex items-center gap-2 text-white/50 hover:text-aqua-400 transition-colors text-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Direkt anrufen:{' '}
              <strong className="text-white/80 font-semibold">06073 743 3137</strong>
            </motion.a>
          </div>

          {/* RIGHT: Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main glass card */}
            <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 overflow-hidden">
              {/* Inner glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-aqua-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { val: '500+', label: 'Zufriedene Kunden' },
                  { val: '10+', label: 'Jahre Erfahrung' },
                  { val: '800+', label: 'Installationen' },
                  { val: '4.9★', label: 'Bewertung' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/5 rounded-2xl p-4 text-center border border-white/5"
                  >
                    <div className="text-2xl font-black counter-text mb-1">{s.val}</div>
                    <div className="text-white/50 text-xs font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bestseller card */}
              <div className="bg-gradient-to-br from-aqua-900/50 to-navy-800/50 rounded-2xl p-5 text-center border border-aqua-700/30">
                <div className="text-aqua-400 text-xs font-bold uppercase tracking-wider mb-2">
                  🔥 Bestseller
                </div>
                <div className="text-white font-black text-2xl mb-1">NEO 80</div>
                <div className="text-white/60 text-sm mb-3">
                  Optimal für Haushalte bis 7 Personen
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-3xl font-black text-white">619</span>
                  <span className="text-aqua-400 text-xl font-bold">€</span>
                </div>
                <div className="text-white/35 text-xs">inkl. 19% MwSt.</div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
              className="absolute -left-6 top-1/4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl px-4 py-3 shadow-2xl shadow-green-500/20"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-bold">TÜV Geprüft</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
              className="absolute -right-4 bottom-1/4 bg-gradient-to-r from-aqua-500 to-aqua-600 text-white rounded-2xl px-4 py-3 shadow-2xl shadow-aqua-500/20"
            >
              <div className="text-xs font-medium mb-0.5">⭐⭐⭐⭐⭐</div>
              <div className="text-sm font-bold">„Absolut empfehlenswert"</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5 text-white/30"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Mehr entdecken</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
