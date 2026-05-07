'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
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
      <div className="pt-24 min-h-screen bg-gradient-to-b from-[#072947] to-[#031a2f]">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-black text-white mb-3">Keine Artikel im Warenkorb</h1>
          <p className="text-white/65 mb-8">Bitte zuerst Produkte in den Warenkorb legen.</p>
          <Link
            href="/produkte"
            className="inline-flex items-center justify-center bg-gradient-to-r from-aqua-500 to-aqua-600 text-white px-7 py-3 rounded-xl font-semibold"
          >
            Zum Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#072947] to-[#031a2f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_360px] gap-6">
        <section className="glass rounded-3xl p-6 md:p-8">
          <h1 className="text-4xl font-black text-white mb-2">Checkout</h1>
          <p className="text-white/65 mb-8">
            Sichere Zahlung via Stripe Checkout. Pflichtangaben und DSGVO-Einwilligungen sind integriert.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Vorname *</span>
              <input
                value={form.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Nachname *</span>
              <input
                value={form.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
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
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Telefon</span>
              <input
                value={form.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-white/75 text-sm">Firma (optional)</span>
              <input
                value={form.company}
                onChange={(e) => onChange('company', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-white/75 text-sm">Strasse und Hausnummer *</span>
              <input
                value={form.street}
                onChange={(e) => onChange('street', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">PLZ *</span>
              <input
                value={form.zip}
                onChange={(e) => onChange('zip', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-white/75 text-sm">Ort *</span>
              <input
                value={form.city}
                onChange={(e) => onChange('city', e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
              />
            </label>
          </div>

          <label className="space-y-1.5 block mb-6">
            <span className="text-white/75 text-sm">Land *</span>
            <select
              value={form.country}
              onChange={(e) => onChange('country', e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white"
            >
              <option value="DE">Deutschland</option>
              <option value="AT">Oesterreich</option>
              <option value="CH">Schweiz</option>
            </select>
          </label>

          <div className="space-y-3 mb-6 text-sm">
            <label className="flex items-start gap-2 text-white/80">
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
            <label className="flex items-start gap-2 text-white/80">
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
            <label className="flex items-start gap-2 text-white/80">
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
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-aqua-500 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-60"
          >
            {isLoading ? 'Weiterleitung...' : 'Jetzt sicher bezahlen'}
          </button>
        </section>

        <aside className="glass rounded-3xl p-6 h-max">
          <h2 className="text-white text-2xl font-bold mb-5">Bestelluebersicht</h2>
          <div className="space-y-3 mb-5">
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between gap-3 text-sm">
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
        </aside>
      </div>
    </div>
  );
}
