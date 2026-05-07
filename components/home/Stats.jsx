'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const stats = [
  { value: 500, suffix: '+', label: 'Zufriedene Kunden', desc: 'Weiterempfehlungen aus echten Projekten' },
  { value: 10, suffix: '+', label: 'Jahre Erfahrung', desc: 'Expertise in Wassertechnik seit 2014' },
  { value: 800, suffix: '+', label: 'Installationen', desc: 'Gelieferte und montierte Systeme' },
  { value: 98, suffix: '%', label: 'Zufriedenheit', desc: 'Rueckmeldung aus Kundenbefragungen' },
];

function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={0}
        animate={isInView ? target : 0}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        {(v) => `${Math.floor(v)}${suffix}`}
      </motion.span>
    </motion.span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 bg-[#041526] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-45" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-cyan-400/8 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-aqua-100 font-semibold text-sm uppercase tracking-[0.28em] mb-3">
            Zahlen, die überzeugen
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] text-white mb-3">
            Vertrauen durch Ergebnisse
          </h2>
          <p className="text-white/58 max-w-2xl mx-auto leading-relaxed">
            Premium-Anspruch braucht belastbare Resultate: Installation, Beratung und Kundenzufriedenheit muessen messbar sein.
          </p>
        </AnimatedSection>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl p-6 text-center shadow-[0_24px_80px_rgba(1,8,18,0.32)]"
            >
              <div className="text-white/40 text-[10px] uppercase tracking-[0.28em] mb-3">AquaTime Metric</div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, type: 'spring', stiffness: 120 }}
                className="text-5xl sm:text-6xl font-black counter-text mb-3 tracking-[-0.05em]"
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={isInView ? { opacity: 1 } : {}}
                >
                  {isInView ? (
                    <motion.span
                      animate={{ value: s.value }}
                      initial={{ value: 0 }}
                      transition={{ duration: 2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {({ value }) => `${Math.floor(value)}${s.suffix}`}
                    </motion.span>
                  ) : (
                    `0${s.suffix}`
                  )}
                </motion.span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.4 }}
              >
                <div className="text-white font-bold text-lg mb-1">{s.label}</div>
                <div className="text-white/48 text-sm leading-relaxed">{s.desc}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
