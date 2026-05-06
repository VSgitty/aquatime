'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, ArrowRight, Clock, Send } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const topics = [
  { value: 'beratung', label: 'Kostenlose Beratung' },
  { value: 'angebot', label: 'Angebot anfordern' },
  { value: 'montage', label: 'Montagetermin anfragen' },
  { value: 'service', label: 'Wartung / Reparatur' },
  { value: 'sonstiges', label: 'Sonstiges' },
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'beratung',
    message: '',
    persons: '',
    hardness: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Nachricht gesendet!</h3>
        <p className="text-white/70 mb-6">
          Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-aqua-600 font-semibold hover:text-aqua-500 transition-colors text-sm"
        >
          Neue Anfrage senden
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Topic selection */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">Ihr Anliegen *</label>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setFormData((p) => ({ ...p, topic: t.value }))}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                formData.topic === t.value
                  ? 'bg-aqua-500 text-white shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/15'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Name & Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-1.5">Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Max Mustermann"
            className="w-full border border-white/20 bg-[#e9f7ff] rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-1.5">E-Mail *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="max@beispiel.de"
            className="w-full border border-white/20 bg-[#e9f7ff] rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-white mb-1.5">Telefon</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+49 ..."
          className="w-full border border-white/20 bg-[#e9f7ff] rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 outline-none transition-all text-sm"
        />
      </div>

      {/* Optional: Persons & Hardness */}
      <div className="bg-white/8 border border-white/15 rounded-2xl p-4 backdrop-blur-md">
        <p className="text-aqua-200 font-semibold text-sm mb-3">
          Optional: Für eine bessere Empfehlung
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-white/75 mb-1">Personen im Haushalt</label>
            <input
              type="number"
              name="persons"
              min="1"
              max="20"
              value={formData.persons}
              onChange={handleChange}
              placeholder="z.B. 4"
              className="w-full border border-white/20 bg-[#e9f7ff] rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/75 mb-1">Wasserhaerte (dH)</label>
            <input
              type="number"
              name="hardness"
              min="1"
              max="50"
              value={formData.hardness}
              onChange={handleChange}
              placeholder="z.B. 20"
              className="w-full border border-white/20 bg-[#e9f7ff] rounded-xl px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-white mb-1.5">Nachricht *</label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Beschreiben Sie kurz Ihr Anliegen ..."
          className="w-full border border-white/20 bg-[#e9f7ff] rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 outline-none transition-all text-sm resize-none"
        />
      </div>

      {/* Privacy */}
      <p className="text-white/60 text-xs leading-relaxed">
        Mit dem Absenden stimmen Sie zu, dass Ihre Daten zur Bearbeitung Ihrer Anfrage gespeichert werden.
        Keine Weitergabe an Dritte.{' '}
        <Link href="/datenschutz" className="text-aqua-500 hover:underline">
          Datenschutz
        </Link>
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-aqua-500 to-aqua-600 hover:from-aqua-400 hover:to-aqua-500 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Wird gesendet...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Anfrage absenden
          </>
        )}
      </button>
    </form>
  );
}

export default function KontaktPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-navy-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-black text-white mb-4"
          >
            Kontakt
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/55 max-w-xl mx-auto"
          >
            Haben Sie Fragen? Brauchen Sie eine Empfehlung? Wir sind für Sie da.
          </motion.p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-gradient-to-b from-[#082f4f] to-[#06253f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection direction="left">
                <h2 className="text-3xl font-black text-white mb-2">Sprechen Sie uns an</h2>
                <p className="text-white/70 leading-relaxed mb-6">
                  Wir beantworten alle Fragen rund um Wasserenthärtung, Osmoseanlagen und Service.
                  Persönlich und ohne Wartezeiten.
                </p>

                {/* Quick contact options */}
                <div className="space-y-3">
                  <a
                    href="tel:060737433137"
                    className="flex items-center gap-4 bg-white/8 border border-white/12 hover:border-aqua-200/40 rounded-2xl p-4 group transition-all hover:shadow-card backdrop-blur-md"
                  >
                    <div className="w-12 h-12 bg-aqua-500/20 group-hover:bg-aqua-500/30 rounded-xl flex items-center justify-center transition-colors">
                      <Phone className="w-5 h-5 text-aqua-600" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Telefon</div>
                      <div className="text-aqua-200 font-semibold text-sm">06073 743 3137</div>
                      <div className="text-white/55 text-xs">Mo-Fr 9-17 Uhr</div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@aquatimegmbh.de"
                    className="flex items-center gap-4 bg-white/8 border border-white/12 hover:border-aqua-200/40 rounded-2xl p-4 group transition-all hover:shadow-card backdrop-blur-md"
                  >
                    <div className="w-12 h-12 bg-aqua-500/20 group-hover:bg-aqua-500/30 rounded-xl flex items-center justify-center transition-colors">
                      <Mail className="w-5 h-5 text-aqua-600" />
                    </div>
                    <div>
                      <div className="font-bold text-white">E-Mail</div>
                      <div className="text-aqua-200 font-semibold text-sm">info@aquatimegmbh.de</div>
                      <div className="text-white/55 text-xs">Antwort innerhalb 24h</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 bg-white/8 border border-white/12 rounded-2xl p-4 backdrop-blur-md">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Adresse</div>
                      <div className="text-white/70 text-sm">Ziegelhuttenstrasse 30</div>
                      <div className="text-white/70 text-sm">64832 Babenhausen</div>
                    </div>
                  </div>
                </div>

                {/* Opening hours */}
                <div className="bg-navy-950 rounded-2xl p-5 mt-5">
                  <div className="flex items-center gap-2 text-aqua-400 font-semibold text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    Erreichbarkeit
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Montag – Freitag', time: '9:00 – 17:00 Uhr' },
                      { day: 'Samstag', time: '10:00 – 14:00 Uhr (nach Vereinbarung)' },
                      { day: 'Sonntag', time: 'Geschlossen' },
                    ].map((h) => (
                      <div key={h.day} className="flex justify-between">
                        <span className="text-white/60">{h.day}</span>
                        <span className="text-white/90 font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promise */}
                <div className="bg-emerald-500/10 border border-emerald-300/30 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-200 text-sm">Unser Versprechen</div>
                      <p className="text-emerald-100/85 text-xs leading-relaxed mt-1">
                        Keine Hotlines, keine Skripte. Ein echter Mensch beantwortet Ihre Anfrage
                        persönlich und innerhalb von 24 Stunden.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Form */}
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-white/8 rounded-3xl border border-white/12 shadow-card p-8 backdrop-blur-md">
                <h3 className="text-2xl font-black text-white mb-1">Anfrage senden</h3>
                <p className="text-white/70 text-sm mb-6">Kostenlos & unverbindlich. Wir antworten innerhalb von 24h.</p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-14 bg-gradient-to-b from-[#072741] to-[#041f36] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              { emoji: '🏆', text: '500+ Kunden', sub: 'Zufrieden' },
              { emoji: '⭐', text: '4.9 / 5', sub: 'Bewertung' },
              { emoji: '🔒', text: 'TÜV Geprüft', sub: 'Zertifiziert' },
              { emoji: '🚀', text: 'Seit 2014', sub: 'Erfahrung' },
            ].map((t) => (
              <div key={t.text} className="text-center">
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="text-white font-black text-lg">{t.text}</div>
                <div className="text-white/60 text-sm">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
