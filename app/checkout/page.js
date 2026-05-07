'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lock, BadgeCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { calculateOrderTotals } from '@/lib/shipping';

function formatEuro(minor) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((minor || 0) / 100);
}

export default function CheckoutPage() {
  const { items } = useCart();
  const { subtotalMinor, shippingMinor, totalMinor } = useMemo(
    () => calculateOrderTotals(items),
    [items]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    street: '',
    zip: '',
    city: '',
    country: 'DE',
  });
  const [consent, setConsent] = useState({
    acceptTerms: false,
    acceptPrivacy: false,
    acceptRevocation: false,
  });

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onConsentChange = (key, checked) => {
    setConsent((prev) => ({ ...prev, [key]: checked }));
  };

  const validate = () => {
    const required = [
      ['firstName', 'Vorname'],
      ['lastName', 'Nachname'],
      ['email', 'E-Mail'],
      ['street', 'Strasse und Hausnummer'],
      ['zip', 'PLZ'],
      ['city', 'Ort'],
      ['country', 'Land'],
    ];

    for (const [key, label] of required) {
      if (!String(form[key] || '').trim()) {
        return `Bitte Pflichtfeld ausfuellen: ${label}`;
      }
    }

    if (!consent.acceptTerms || !consent.acceptPrivacy) {
      return 'Bitte AGB und Datenschutz akzeptieren.';
    }

    return '';
  };

  const startCheckout = async () => {
    if (items.length === 0) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: form,
          consent,
          origin: window.location.origin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Checkout konnte nicht gestartet werden.');
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }
    } catch (err) {
      setError(err.message || 'Checkout fehlgeschlagen.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-[#020814] relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh opacity-60" />
        <div className="absolute top-24 left-[10%] w-72 h-72 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-16 right-[10%] w-80 h-80 rounded-full bg-emerald-400/8 blur-[130px]" />
        <div className="relative max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Keine Artikel im Warenkorb</h1>
          <p className="text-white/65 mb-8">Bitte zuerst Produkte in den Warenkorb legen.</p>
          <Link
            href="/produkte"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 text-[#031828] px-7 py-3 rounded-2xl font-bold shadow-[0_20px_55px_rgba(125,211,252,0.25)]"
          >
            Zum Shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-[#020814] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-60" />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <div className="absolute top-20 left-[8%] w-72 h-72 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute bottom-16 right-[6%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_360px] gap-6">
        <section className="glass rounded-[2rem] p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_28%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 text-aqua-100 text-xs font-semibold uppercase tracking-[0.24em] mb-5 backdrop-blur-xl">
              Secure Checkout
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.05em] text-white mb-2">Checkout</h1>
            <p className="text-white/65 mb-8 max-w-2xl">
            Sichere Zahlung via Stripe Checkout. Pflichtangaben und DSGVO-Einwilligungen sind integriert.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                <ShieldCheck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Verifiziert</div>
                <p className="text-white/50 text-xs mt-1">Transparente Pflichtangaben und sauberer Ablauf</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                <Lock className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Verschluesselt</div>
                <p className="text-white/50 text-xs mt-1">Stripe Checkout mit sicherer Weiterleitung</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                <BadgeCheck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Professionell</div>
                <p className="text-white/50 text-xs mt-1">Beratung, Versand und Auftragsabwicklung aus einer Hand</p>
              </div>
            </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Vorname *</span>
              <input
                value={form.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                className="premium-input"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Nachname *</span>
              <input
                value={form.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                className="premium-input"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">E-Mail *</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onChange('email', e.target.value)}
                className="premium-input"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Telefon</span>
              <input
                value={form.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="premium-input"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-white/75 text-sm">Firma (optional)</span>
              <input
                value={form.company}
                onChange={(e) => onChange('company', e.target.value)}
                className="premium-input"
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-white/75 text-sm">Strasse und Hausnummer *</span>
              <input
                value={form.street}
                onChange={(e) => onChange('street', e.target.value)}
                className="premium-input"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">PLZ *</span>
              <input
                value={form.zip}
                onChange={(e) => onChange('zip', e.target.value)}
                className="premium-input"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Ort *</span>
              <input
                value={form.city}
                onChange={(e) => onChange('city', e.target.value)}
                className="premium-input"
              />
            </label>
          </div>

          <label className="space-y-1.5 block mb-6">
            <span className="text-white/75 text-sm">Land *</span>
            <select
              value={form.country}
              onChange={(e) => onChange('country', e.target.value)}
              className="premium-input"
            >
              <option value="DE">Deutschland</option>
              <option value="AT">Oesterreich</option>
              <option value="CH">Schweiz</option>
            </select>
          </label>

          <div className="space-y-3 mb-6 text-sm">
            <label className="flex items-start gap-3 text-white/80 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <input
                type="checkbox"
                checked={consent.acceptTerms}
                onChange={(e) => onConsentChange('acceptTerms', e.target.checked)}
                className="mt-1"
              />
              <span>
                Ich akzeptiere die <Link href="/agb" className="text-aqua-300 hover:text-aqua-200 underline">AGB</Link> *
              </span>
            </label>
            <label className="flex items-start gap-3 text-white/80 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <input
                type="checkbox"
                checked={consent.acceptPrivacy}
                onChange={(e) => onConsentChange('acceptPrivacy', e.target.checked)}
                className="mt-1"
              />
              <span>
                Ich akzeptiere die <Link href="/datenschutz" className="text-aqua-300 hover:text-aqua-200 underline">Datenschutzerklaerung</Link> *
              </span>
            </label>
            <label className="flex items-start gap-3 text-white/80 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <input
                type="checkbox"
                checked={consent.acceptRevocation}
                onChange={(e) => onConsentChange('acceptRevocation', e.target.checked)}
                className="mt-1"
              />
              <span>
                Ich habe die Widerrufsbelehrung gelesen
              </span>
            </label>
          </div>

          {error && <p className="text-rose-300 text-sm mb-4">{error}</p>}

          <button
            type="button"
            onClick={startCheckout}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 text-[#031828] px-8 py-3.5 rounded-2xl font-bold disabled:opacity-60 shadow-[0_20px_55px_rgba(125,211,252,0.25)]"
          >
            {isLoading ? 'Weiterleitung...' : 'Jetzt sicher bezahlen'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
          </div>
        </section>

        <aside className="glass rounded-[2rem] p-6 h-max sticky top-28">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-5 backdrop-blur-xl">
            <div className="text-aqua-100 text-xs font-semibold uppercase tracking-[0.24em] mb-2">Order Review</div>
            <h2 className="text-white text-2xl font-black tracking-[-0.04em]">Bestelluebersicht</h2>
          </div>
          <div className="space-y-3 mb-5">
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between gap-3 text-sm rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                <span className="text-white/75">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-white font-semibold">
                  {formatEuro(item.priceMinor * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="flex justify-between text-white/75">
              <span>Zwischensumme</span>
              <span>{formatEuro(subtotalMinor)}</span>
            </div>
            <div className="flex justify-between text-white/75">
              <span>Versand</span>
              <span>{shippingMinor > 0 ? formatEuro(shippingMinor) : 'Kostenlos'}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-white pt-2">
              <span>Gesamt</span>
              <span>{formatEuro(totalMinor)}</span>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-aqua-300" />
              Sichere Weiterleitung zum Stripe Checkout
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-aqua-300" />
              Auftragsdaten werden vor Zahlungsstart validiert
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
