'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, ChevronDown, Shield, Sparkles, Waves } from 'lucide-react';

const slides = [
  {
    id: 'neo-line',
    kicker: 'AQUATIME NEO SERIE',
    title: 'Nie wieder Kalk in\nIhrem Zuhause.',
    text: 'NEO 40 bis NEO 120: Kompakte Enthartung mit BNT-Steuerventil, vollautomatisch und passend fur jeden Haushalt.',
    cta: { href: '/enthaertungsanlagen#neo', label: 'NEO Serie entdecken' },
    secondary: { href: '/kontakt', label: 'Beratung anfordern' },
    price: 'ab 559 EUR',
    image:
      'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'cosmosblue',
    kicker: 'COSMOSBLUE PREMIUM',
    title: 'Technik, die Wasser\nspuerbar verbessert.',
    text: 'Clack CI, IA oder Pallas CK: Premium-Enthartung fur hohe Anspruche mit effizienter Regeneration und langer Lebensdauer.',
    cta: { href: '/enthaertungsanlagen#cosmosblue', label: 'CosmosBlue ansehen' },
    secondary: { href: '/service', label: 'Montage-Service' },
    price: 'ab 779 EUR',
    image:
      'https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'trinity',
    kicker: 'TRINITY OSMOSE',
    title: 'Kristallklares\nTrinkwasser on demand.',
    text: '0,0001 um Filtration, 1,6 L/min und TDS-Display: Frisches Wasser direkt aus dem Hahn, ganz ohne Kistenschleppen.',
    cta: { href: '/osmoseanlagen', label: 'Trinity entdecken' },
    secondary: { href: '/kontakt', label: 'Unverbindlich bestellen' },
    price: 'aktuell 378,97 EUR',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1800&q=80',
  },
];

const benefits = [
  { icon: Waves, text: 'Gefiltert, enthartet, spuerbar reiner' },
  { icon: Shield, text: 'Schuetzt Leitungen und Haushaltsgeraete' },
  { icon: Sparkles, text: 'Frischer Geschmack, seidig weiches Wasser' },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const layerA = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const layerB = useTransform(scrollYProgress, [0, 1], [0, -90]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[active];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      <motion.div style={{ y: layerA }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#021224]/95 via-[#08253f]/84 to-[#04243f]/88" />
      <div className="absolute inset-0 water-flow-lines" />

      <motion.div style={{ y: layerB }} className="absolute inset-x-0 bottom-0 h-[46vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041428] via-[#06263f]/70 to-transparent" />
        <div className="absolute left-[14%] bottom-0 h-full w-5 waterfall" />
        <div className="absolute left-[42%] bottom-0 h-[88%] w-3 waterfall opacity-70" />
        <div className="absolute right-[22%] bottom-0 h-[92%] w-4 waterfall opacity-80" />
      </motion.div>

      {Array.from({ length: 12 }).map((_, idx) => (
        <motion.span
          key={`drop-${idx}`}
          className="absolute rounded-full border border-aqua-200/20 bg-aqua-200/10"
          style={{
            width: 8 + ((idx * 7) % 20),
            height: 8 + ((idx * 7) % 20),
            left: `${8 + ((idx * 9) % 84)}%`,
            top: `${6 + ((idx * 13) % 56)}%`,
          }}
          animate={{ y: [0, 28, 0], opacity: [0.2, 0.75, 0.2] }}
          transition={{ duration: 5 + (idx % 4), repeat: Infinity, delay: idx * 0.45 }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 bg-aqua-500/15 border border-aqua-400/30 rounded-full px-4 py-2 text-aqua-200 text-sm font-semibold mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-aqua-300 animate-pulse" />
              Wasseraufbereitung fur gesunde Haushalte
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${currentSlide.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.03] mb-6 tracking-tight whitespace-pre-line">
                  {currentSlide.title}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                  {currentSlide.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-3 mb-8">
              {benefits.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-[#062742]/65 border border-aqua-300/15 rounded-full px-4 py-1.5 text-aqua-50 text-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-aqua-300" />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href={currentSlide.cta.href}
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-aqua-400 to-cyan-400 hover:from-aqua-300 hover:to-cyan-300 text-[#01223c] px-8 py-4 rounded-2xl text-lg font-extrabold transition-all duration-300 hover:shadow-2xl hover:shadow-aqua-500/30 hover:-translate-y-1"
              >
                {currentSlide.cta.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={currentSlide.secondary.href}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/16 border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {currentSlide.secondary.label}
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 text-white/70 text-sm">
              <Phone className="w-4 h-4 text-aqua-300" />
              Beratungshotline: <span className="font-bold text-white">06073 743 3137</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-white/20 bg-[#05233c]/70 backdrop-blur-xl p-7 overflow-hidden shadow-[0_20px_80px_rgba(6,31,51,0.5)]">
              <div className="absolute -top-16 -right-12 w-52 h-52 rounded-full bg-aqua-400/20 blur-3xl" />
              <div className="relative z-10">
                <p className="text-aqua-300 text-xs uppercase tracking-[0.24em] font-semibold mb-3">
                  Aktuelles Angebot
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`card-${currentSlide.id}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-3xl font-black text-white mb-2">{currentSlide.kicker}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{currentSlide.text}</p>
                    <div className="flex items-end justify-between border-t border-white/10 pt-4">
                      <div>
                        <div className="text-aqua-300 text-xs uppercase font-semibold mb-1">Preisniveau</div>
                        <div className="text-2xl font-black text-white">{currentSlide.price}</div>
                      </div>
                      <Link
                        href={currentSlide.cta.href}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-aqua-400/20 border border-aqua-300/35 text-aqua-100 px-4 py-2 text-sm font-bold hover:bg-aqua-400/30 transition-colors"
                      >
                        Zum Angebot
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 justify-center lg:justify-start">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === active ? 'w-10 bg-aqua-300' : 'w-3 bg-white/35 hover:bg-white/50'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

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
