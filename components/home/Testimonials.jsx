'use client';

import { Star, MapPin } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const reviews = [
  {
    name: 'Thomas K.',
    location: 'Frankfurt am Main',
    rating: 5,
    date: 'März 2025',
    text: 'Seit der Installation der NEO 80 ist unser Leben einfacher geworden. Keine Kalkflecken mehr, die Kaffeemaschine läuft wie neu, und das Wasser fühlt sich einfach anders an. Die Montage war super schnell und sauber.',
    product: 'NEO 80 Enthärtungsanlage',
    avatar: 'TK',
    color: 'bg-blue-500',
  },
  {
    name: 'Sandra M.',
    location: 'Darmstadt',
    rating: 5,
    date: 'Januar 2025',
    text: 'Endlich weiches Wasser! Meine Haut hat sich drastisch verbessert, die Neurodermitis meiner Tochter ist viel besser geworden. Das Team hat alles erklärt und sich viel Zeit genommen. Absolute Empfehlung!',
    product: 'CosmosBlue Pro',
    avatar: 'SM',
    color: 'bg-purple-500',
    featured: true,
  },
  {
    name: 'Michael B.',
    location: 'Offenbach',
    rating: 5,
    date: 'April 2025',
    text: 'Professionelle Beratung, faire Preise, schnelle Montage. Die Trinity Osmoseanlage liefert kristallklares Trinkwasser – das TDS-Display ist ein tolles Feature. Hätte die Anlage viel früher kaufen sollen.',
    product: 'Trinity Osmoseanlage',
    avatar: 'MB',
    color: 'bg-emerald-500',
  },
  {
    name: 'Familie Richter',
    location: 'Babenhausen',
    rating: 5,
    date: 'Februar 2025',
    text: 'Wir hatten massive Kalkprobleme. Nach dem Einbau der NEO 120 ist das Geschichte. Waschmaschine läuft effizienter, Heizung verbraucht weniger Strom. Die Anlage hat sich bereits jetzt amortisiert.',
    product: 'NEO 120 Enthärtungsanlage',
    avatar: 'FR',
    color: 'bg-orange-500',
  },
  {
    name: 'Andrea L.',
    location: 'Dieburg',
    rating: 5,
    date: 'Mai 2025',
    text: 'Super Service! Kurze Wartezeit, kompetente Monteure, klare Einweisung. Kaffee schmeckt jetzt deutlich besser und die Gläser werden endlich wieder klar. Sehr zu empfehlen!',
    product: 'NEO 60 + Trinity',
    avatar: 'AL',
    color: 'bg-pink-500',
  },
  {
    name: 'Bernd W.',
    location: 'Aschaffenburg',
    rating: 5,
    date: 'März 2025',
    text: 'Tolle Beratung per Telefon, faire Preise und der Montagetermin war pünktlich. Anlage läuft seit 3 Monaten einwandfrei. Kalk war gestern!',
    product: 'CosmosBlue Enthärtungsanlage',
    avatar: 'BW',
    color: 'bg-teal-500',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
            ⭐ Kundenstimmen
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-navy-900 mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-xl text-slate-500 max-w-xl mx-auto">
            Über 500 zufriedene Familien. Lesen Sie, was sie über AquaTime berichten.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-navy-900 font-bold text-lg">4.9</span>
            <span className="text-slate-500">/ 5 (312 Bewertungen)</span>
          </div>
        </AnimatedSection>

        {/* Reviews grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {reviews.map((r) => (
            <StaggerItem key={r.name} direction="up">
              <div
                className={`bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                  r.featured ? 'ring-2 ring-aqua-200 border-aqua-100' : 'border border-slate-100'
                }`}
              >
                {r.featured && (
                  <div className="inline-block bg-aqua-50 text-aqua-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    ✓ Top-Bewertung
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${r.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-navy-900">{r.name}</div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <MapPin className="w-3 h-3" />
                        {r.location}
                      </div>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs">{r.date}</span>
                </div>

                <StarRating rating={r.rating} />

                <p className="text-slate-600 text-sm leading-relaxed mt-3 mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="pt-3 border-t border-slate-50">
                  <span className="text-xs text-aqua-600 font-semibold">
                    Gekauftes Produkt: {r.product}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust badges */}
        <AnimatedSection className="mt-14" delay={0.2}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
              {[
                { label: 'Google', rating: '4.9★', reviews: '180+' },
                { label: 'Trusted Shops', rating: '4.8★', reviews: '95+' },
                { label: 'ProvenExpert', rating: '4.9★', reviews: '37+' },
                { label: 'Empfehlungen', rating: '98%', reviews: 'der Kunden' },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className="text-2xl font-black text-navy-900">{b.rating}</div>
                  <div className="text-aqua-600 font-semibold text-sm">{b.label}</div>
                  <div className="text-slate-400 text-xs">{b.reviews}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
