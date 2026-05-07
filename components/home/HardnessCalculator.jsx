'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Users, Droplets, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import Link from 'next/link';

const models = [
  { name: 'NEO 40', persons: 4,  price: 559, desc: 'Kompakter Einstieg' },
  { name: 'NEO 60', persons: 6,  price: 598, desc: 'Beliebt für Familien' },
  { name: 'NEO 80', persons: 7,  price: 619, desc: 'Bestseller' },
  { name: 'NEO 100', persons: 10, price: 639, desc: 'Für große Haushalte' },
  { name: 'NEO 120', persons: 12, price: 659, desc: 'Maximale Kapazität' },
  { name: 'CosmosBlue Pro', persons: 99, price: 809, desc: 'Premium Lösung' },
];

function getRecommendation(persons, hardness) {
  if (!persons || !hardness) return null;
  // Approx daily L = persons * 150, need capacity (L*°dH) / regeneration
  const dailyL = persons * 150;
  const load = (dailyL * hardness) / 1000; // m³ * °dH equivalent factor

  // Capacity thresholds (resin capacity in dH°*m³ roughly):
  // NEO 40 → 14000 / hardness (daily m³ before regen ~daily calc)
  // Simplified: just use persons + hardness multiplier
  let rec;
  if (persons <= 3 && hardness <= 20) rec = models[0];
  else if (persons <= 4) rec = models[0];
  else if (persons <= 6 && hardness <= 25) rec = models[1];
  else if (persons <= 6) rec = models[2];
  else if (persons <= 7) rec = models[2];
  else if (persons <= 10 && hardness <= 20) rec = models[3];
  else if (persons <= 10) rec = models[4];
  else rec = models[5];

  // Bump up if very hard water
  if (hardness > 30 && rec.persons < 10) {
    const idx = models.findIndex((m) => m.name === rec.name);
    rec = models[Math.min(idx + 1, models.length - 1)];
  }
  return rec;
}

const hardnessLevels = [
  { label: 'Weich', range: '0–7°dH', color: 'text-emerald-500' },
  { label: 'Mittel', range: '7–14°dH', color: 'text-yellow-500' },
  { label: 'Hart', range: '14–21°dH', color: 'text-orange-500' },
  { label: 'Sehr hart', range: '21+°dH', color: 'text-red-500' },
];

export default function HardnessCalculator() {
  const [persons, setPersons] = useState(4);
  const [hardness, setHardness] = useState(20);
  const [showResult, setShowResult] = useState(false);

  const rec = getRecommendation(persons, hardness);

  const hardnessLabel =
    hardness < 7
      ? hardnessLevels[0]
      : hardness < 14
      ? hardnessLevels[1]
      : hardness < 21
      ? hardnessLevels[2]
      : hardnessLevels[3];

  return (
    <section className="py-28 bg-[#020814] relative overflow-hidden" id="rechner">
      <div className="absolute inset-0 hero-mesh opacity-45" />
      <div className="absolute top-8 left-[8%] w-80 h-80 rounded-full bg-cyan-400/8 blur-[130px]" />
      <div className="absolute bottom-0 right-[8%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            <Calculator className="w-4 h-4" />
            Interaktiver Rechner
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-[-0.05em] leading-[0.95]">
            Welche Anlage passt<br />
            <span className="gradient-text">zu Ihrem Haushalt?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/58 max-w-2xl mx-auto leading-relaxed">
            Geben Sie einfach Ihren Wasserverbrauch und die Wasserhärte ein –
            wir empfehlen die optimale Anlage.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-[2rem] p-8 sm:p-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_28px_100px_rgba(1,8,18,0.4)]">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4 text-aqua-400" />
                      Personen im Haushalt
                    </label>
                    <span className="text-3xl font-black text-aqua-400">{persons}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    value={persons}
                    onChange={(e) => { setPersons(Number(e.target.value)); setShowResult(false); }}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aqua-500 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-white/30 text-xs mt-1">
                    <span>1 Person</span>
                    <span>12 Personen</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg transition-all ${i < persons ? 'opacity-100' : 'opacity-20'}`}
                      >
                        👤
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white font-semibold flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-aqua-400" />
                      Wasserhärte (°dH)
                    </label>
                    <div className="text-right">
                      <span className="text-3xl font-black text-aqua-400">{hardness}</span>
                      <span className="text-white/40 text-sm ml-1">°dH</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={hardness}
                    onChange={(e) => { setHardness(Number(e.target.value)); setShowResult(false); }}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #f59e0b ${(hardness/40)*50}%, #ef4444 ${(hardness/40)*100}%, rgba(255,255,255,0.1) ${(hardness/40)*100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-white/30 text-xs mt-1">
                    <span>Weich (1°)</span>
                    <span>Sehr hart (40°)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`font-semibold text-sm ${hardnessLabel.color}`}>
                      {hardnessLabel.label}
                    </span>
                    <span className="text-white/40 text-xs">({hardnessLabel.range})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {hardnessLevels.map((h) => (
                    <div key={h.label} className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2 backdrop-blur-xl">
                      <span className={`w-2 h-2 rounded-full ${h.color.replace('text-', 'bg-')}`} />
                      <span className={`text-xs font-medium ${h.color}`}>{h.label}</span>
                      <span className="text-white/30 text-xs">{h.range}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowResult(true)}
                  className="w-full bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 hover:from-white hover:via-aqua-200 hover:to-emerald-100 text-[#031828] py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-[0_24px_65px_rgba(125,211,252,0.25)]"
                >
                  <Calculator className="w-5 h-5" />
                  Anlage berechnen
                </button>
              </div>

              <div className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10"
                    >
                      <div className="w-20 h-20 bg-white/6 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xl">
                        <Calculator className="w-10 h-10 text-white/20" />
                      </div>
                      <p className="text-white/30 text-sm">
                        Stellen Sie die Regler ein und klicken Sie auf „Anlage berechnen"
                      </p>
                      <div className="mt-6 space-y-2">
                        <p className="text-white/20 text-xs">
                          💡 Wasserhärte per PLZ ermitteln:{' '}
                          <a
                            href="https://www.wasserhaerte.net"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-aqua-500/50 hover:text-aqua-400 underline"
                          >
                            wasserhaerte.net
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="bg-[linear-gradient(180deg,rgba(8,25,42,0.75),rgba(5,16,29,0.75))] border border-aqua-300/25 rounded-[1.75rem] p-6 mb-5 shadow-[0_24px_80px_rgba(1,8,18,0.35)]">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold text-sm">Empfehlung für Sie</span>
                        </div>

                        <div className="text-4xl font-black text-white mb-1">{rec.name}</div>
                        <div className="text-aqua-400 font-semibold mb-4">{rec.desc}</div>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="bg-white/5 border border-white/8 rounded-xl p-3 text-center backdrop-blur-xl">
                            <div className="text-aqua-400 font-black text-xl">{rec.persons === 99 ? '12+' : `bis ${rec.persons}`}</div>
                            <div className="text-white/50 text-xs">Personen</div>
                          </div>
                          <div className="bg-white/5 border border-white/8 rounded-xl p-3 text-center backdrop-blur-xl">
                            <div className="text-aqua-400 font-black text-xl">{rec.price} €</div>
                            <div className="text-white/50 text-xs">inkl. MwSt.</div>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/8 rounded-xl p-3 mb-4 backdrop-blur-xl">
                          <p className="text-white/60 text-xs leading-relaxed">
                            Basierend auf <strong className="text-white">{persons} {persons === 1 ? 'Person' : 'Personen'}</strong> und{' '}
                            <strong className={hardnessLabel.color}>{hardness}°dH ({hardnessLabel.label}em Wasser)</strong> empfehlen wir diese Anlage für optimale Leistung.
                          </p>
                        </div>

                        <Link
                          href="/kontakt"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 text-[#031828] py-3 rounded-xl font-bold transition-all text-sm"
                        >
                          Unverbindlich anfragen
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>

                      <p className="text-white/30 text-xs text-center">
                        * Diese Empfehlung basiert auf Durchschnittswerten. Für eine individuelle Beratung rufen Sie uns an.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
