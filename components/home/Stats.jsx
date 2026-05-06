'use client';

import { useRef } from 'react';
import { motion, useInView, useCountUp } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const stats = [
  { value: 500, suffix: '+', label: 'Zufriedene Kunden', desc: 'Die uns weiterempfehlen' },
  { value: 10,  suffix: '+', label: 'Jahre Erfahrung',  desc: 'Expertise seit 2014' },
  { value: 800, suffix: '+', label: 'Installationen',   desc: 'Deutschlandweit' },
  { value: 98,  suffix: '%', label: 'Zufriedenheit',    desc: 'Laut Kundenbefragung' },
];

function CounterNumber({ value, suffix, isInView }) {
  const count = useRef(0);
  const displayRef = useRef(null);

  if (isInView && displayRef.current) {
    const start = performance.now();
    const duration = 2000;
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      count.current = Math.floor(eased * value);
      if (displayRef.current) {
        displayRef.current.textContent = count.current + suffix;
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  return (
    <span ref={displayRef} className="tabular-nums">
      0{suffix}
    </span>
  );
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numRef = useRef(null);

  // Simple counter via useEffect-like approach with motion
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="text-center"
    >
      <motion.div
        className="text-5xl sm:text-6xl font-black counter-text mb-2 tabular-nums"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.2 }}
      >
        <motion.span
          initial={{ opacity: 1 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {isInView ? (
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
          ) : (
            `0${stat.suffix}`
          )}
        </motion.span>
      </motion.div>
      <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
      <div className="text-white/40 text-sm">{stat.desc}</div>
    </motion.div>
  );
}

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
    <section className="py-20 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Bg pattern */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="glow-orb w-[500px] h-[500px] bg-aqua-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-aqua-400 font-semibold text-sm uppercase tracking-widest mb-2">
            Zahlen, die überzeugen
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Vertrauen durch Ergebnisse
          </h2>
        </AnimatedSection>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative"
        >
          {/* Dividers */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-px bg-white/8 -translate-y-1/2" />

          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, type: 'spring', stiffness: 120 }}
                className="text-5xl sm:text-6xl font-black counter-text mb-2"
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
                <div className="text-white/40 text-sm">{s.desc}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
