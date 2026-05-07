'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Waves,
  Gauge,
  Droplets,
} from 'lucide-react';

const slides = [
  {
    id: 'neo-line',
    kicker: 'AQUATIME NEO SERIE',
    title: 'Wassertechnik\nmit ikonischer\nPraesenz.',
    text: 'NEO 40 bis NEO 120 bringt kompakte Enthartung, klare Linien und vollautomatische Performance in ein Premium-Setup fuer moderne Haushalte.',
    cta: { href: '/enthaertungsanlagen#neo', label: 'NEO Serie entdecken' },
    secondary: { href: '/kontakt', label: 'Beratung anfordern' },
    price: 'ab 559 EUR',
    productImage: 'https://aquatimegmbh.de/wp-content/uploads/2025/05/slider_neo40_120.webp',
    eyebrow: 'Soft water. Sharp design.',
    stats: ['5 Modellgroessen', 'BNT-Steuerung', 'Haushalte bis 12 Personen'],
  },
  {
    id: 'cosmosblue',
    kicker: 'COSMOSBLUE PREMIUM',
    title: 'Premium-Systeme\nmit souveraener\nLeistung.',
    text: 'CosmosBlue verbindet markante Form, intelligente Clack-Steuerung und kompromisslose Materialitaet fuer hohe Ansprueche und lange Lebensdauer.',
    cta: { href: '/enthaertungsanlagen#cosmosblue', label: 'CosmosBlue ansehen' },
    secondary: { href: '/service', label: 'Montage-Service' },
    price: 'ab 779 EUR',
    productImage: 'https://aquatimegmbh.de/wp-content/uploads/2025/02/Aquatime-Shooting-Neues-Kabinett01-scaled.jpg',
    eyebrow: 'Crafted for premium households.',
    stats: ['Clack CI / IA', 'Ressourcenschonend', 'Design-Kabinett'],
  },
  {
    id: 'trinity',
    kicker: 'TRINITY OSMOSE',
    title: 'Kristallklares\nTrinkwasser\non demand.',
    text: 'Trinity liefert gereinigtes Wasser mit technischem Feingefuehl, leisem Betrieb und einer Produktaesthetik, die in jede Premium-Kueche passt.',
    cta: { href: '/osmoseanlagen', label: 'Trinity entdecken' },
    secondary: { href: '/kontakt', label: 'Unverbindlich bestellen' },
    price: 'aktuell 378,97 EUR',
    productImage: 'https://aquatimegmbh.de/wp-content/uploads/2024/04/Osmose_02.jpg',
    eyebrow: 'Pure taste. Quiet confidence.',
    stats: ['0,0001 um Filterung', '1,6 L/min', 'TDS-Display'],
  },
];

const benefits = [
  { icon: Waves, text: 'Gefiltert, enthartet, spuerbar reiner' },
  { icon: ShieldCheck, text: 'Schuetzt Leitungen und Haushaltsgeraete' },
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020814]">
      <div className="absolute inset-0 hero-mesh" />
      <motion.div style={{ y: layerA }} className="absolute inset-0 hero-rings opacity-70" />
      <motion.div style={{ y: layerB }} className="absolute inset-0 water-flow-lines opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_32%),radial-gradient(circle_at_80%_28%,rgba(45,212,191,0.16),transparent_24%),linear-gradient(180deg,#020814_0%,#061526_54%,#020814_100%)]" />
      <div className="absolute inset-0 noise-overlay opacity-50" />
      <div className="absolute top-[14%] left-[8%] w-[32rem] h-[32rem] rounded-full bg-cyan-400/12 blur-[120px]" />
      <div className="absolute bottom-[6%] right-[10%] w-[28rem] h-[28rem] rounded-full bg-emerald-400/10 blur-[110px]" />

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 top-[14%] text-center pointer-events-none"
      >
        <div className="text-[18vw] sm:text-[15vw] font-black text-white/[0.045] tracking-[-0.08em] leading-none uppercase">
          AQUATIME
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 bg-white/8 border border-white/10 rounded-full px-4 py-2 text-aqua-100 text-sm font-semibold mb-7 backdrop-blur-xl shadow-[0_10px_40px_rgba(7,12,20,0.35)]"
            >
              <span className="w-2 h-2 rounded-full bg-aqua-300 animate-pulse" />
              Premium Wasseraufbereitung fuer Design-Haushalte
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${currentSlide.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-aqua-200/80 uppercase tracking-[0.35em] text-[11px] sm:text-xs font-semibold mb-4">
                  {currentSlide.eyebrow}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-[5.35rem] font-black text-white leading-[0.94] mb-6 tracking-[-0.05em] whitespace-pre-line text-balance">
                  {currentSlide.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/72 mb-8 leading-relaxed max-w-2xl">
                  {currentSlide.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-2xl">
              {currentSlide.stats.map((stat) => (
                <div
                  key={stat}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-4 shadow-[0_16px_50px_rgba(4,10,18,0.35)]"
                >
                  <div className="text-aqua-200 text-sm font-semibold leading-snug">{stat}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {benefits.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-[#081b2c]/72 border border-white/10 rounded-full px-4 py-2 text-aqua-50 text-sm backdrop-blur-xl"
                >
                  <Icon className="w-3.5 h-3.5 text-aqua-300" />
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href={currentSlide.cta.href}
                className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 hover:from-white hover:via-aqua-200 hover:to-emerald-100 text-[#031828] px-8 py-4 rounded-2xl text-lg font-extrabold transition-all duration-300 hover:shadow-[0_25px_80px_rgba(125,211,252,0.35)] hover:-translate-y-1"
              >
                {currentSlide.cta.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={currentSlide.secondary.href}
                className="inline-flex items-center justify-center gap-2 bg-white/7 hover:bg-white/12 border border-white/12 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 backdrop-blur-xl shadow-[0_18px_40px_rgba(2,8,20,0.35)]"
              >
                {currentSlide.secondary.label}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-white/68 text-sm">
              <div className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4 text-aqua-300" />
                Beratungshotline: <span className="font-bold text-white">06073 743 3137</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Gauge className="w-4 h-4 text-aqua-300" />
                Lieferung, Montage und Konfiguration deutschlandweit
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative min-h-[40rem] lg:min-h-[46rem]"
          >
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] backdrop-blur-[20px] shadow-[0_40px_140px_rgba(1,7,16,0.65)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(125,211,252,0.18),transparent_28%),radial-gradient(circle_at_70%_78%,rgba(52,211,153,0.18),transparent_22%)]" />
              <div className="absolute left-1/2 top-[14%] -translate-x-1/2 h-[62%] w-[62%] rounded-full border border-white/10 bg-white/[0.03] blur-[1px]" />
              <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[54%] w-[54%] rounded-full border border-aqua-200/12" />

              <motion.div
                key={`brand-stage-${currentSlide.id}`}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="absolute top-8 left-8 right-8 flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-white/7 border border-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(3,8,16,0.35)]">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-aqua-200/80 mb-1">Premium Series</div>
                    <div className="text-white font-bold text-lg">{currentSlide.kicker}</div>
                  </div>
                  <div className="rounded-2xl bg-white/7 border border-white/10 px-4 py-3 backdrop-blur-xl text-right shadow-[0_18px_50px_rgba(3,8,16,0.35)]">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-aqua-200/80 mb-1">Preisniveau</div>
                    <div className="text-white font-black text-xl">{currentSlide.price}</div>
                  </div>
                </div>

                <div className="absolute inset-x-0 top-[17%] bottom-[18%] mx-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,16,29,0.68),rgba(3,10,20,0.28))] backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.16),transparent_26%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]" />
                  <div className="absolute inset-x-10 bottom-6 h-16 rounded-full bg-cyan-300/12 blur-3xl" />

                  <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-14 lg:p-16">
                    <div className="relative w-full h-full max-w-[34rem] max-h-[34rem]">
                      <Image
                        src={currentSlide.productImage}
                        alt={currentSlide.kicker}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.48)]"
                      />
                    </div>
                  </div>

                  <div className="absolute left-5 bottom-5 rounded-2xl bg-[#071729]/72 border border-white/10 px-4 py-3 backdrop-blur-xl max-w-[14rem]">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-aqua-200/70 mb-1">AquaTime</div>
                    <div className="text-white text-sm font-semibold leading-snug">
                      Wassertechnik mit Designanspruch und professioneller Montage.
                    </div>
                  </div>

                  <div className="absolute right-5 top-5 rounded-2xl bg-[#071729]/72 border border-white/10 px-4 py-3 backdrop-blur-xl max-w-[13rem]">
                    <div className="text-white/65 text-xs uppercase tracking-[0.25em] mb-2">Signature Details</div>
                    <div className="space-y-2 text-sm text-white/85">
                      <div className="flex items-center gap-2"><Droplets className="w-3.5 h-3.5 text-aqua-300" /> Effiziente Regeneration</div>
                      <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-aqua-300" /> Premium Schutz fuers Zuhause</div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-8 right-8 bottom-8 flex items-end justify-between gap-4 flex-wrap">
                  <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,7,16,0.32)]">
                    <div className="text-white/55 text-[10px] uppercase tracking-[0.25em] mb-1">Brand Focus</div>
                    <div className="text-3xl font-black text-white tracking-[-0.05em]">
                      AQUA<span className="text-emerald-200">TIME</span>
                    </div>
                    <div className="text-aqua-100/70 text-xs mt-1">Wasseraufbereitung in Premium-Optik</div>
                  </div>

                  <Link
                    href={currentSlide.cta.href}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/8 border border-white/12 px-5 py-3 text-sm font-bold text-white hover:bg-white/12 transition-colors backdrop-blur-xl"
                  >
                    Zum Produkt
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="mt-5 flex items-center gap-2 justify-center lg:justify-start">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === active ? 'w-10 bg-aqua-200 shadow-[0_0_20px_rgba(125,211,252,0.55)]' : 'w-3 bg-white/25 hover:bg-white/50'
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
            <span className="text-xs font-medium uppercase tracking-[0.25em]">Mehr entdecken</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
