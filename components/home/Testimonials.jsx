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
    <section className="py-28 bg-[#041526] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-45" />
      <div className="absolute top-8 right-[8%] w-80 h-80 rounded-full bg-yellow-300/10 blur-[130px]" />
      <div className="absolute bottom-0 left-[8%] w-96 h-96 rounded-full bg-cyan-400/8 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block bg-white/8 border border-white/10 text-yellow-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            ⭐ Kundenstimmen
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-white mb-4 leading-[0.95]">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg sm:text-xl text-white/68 max-w-2xl mx-auto leading-relaxed">
            Über 500 zufriedene Familien. Lesen Sie, was sie über AquaTime berichten.
          </p>
          <div className="flex items-center justify-center gap-2 mt-5 rounded-full border border-white/10 bg-white/5 px-5 py-3 w-fit mx-auto backdrop-blur-xl">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9</span>
            <span className="text-white/60">/ 5 (312 Bewertungen)</span>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {reviews.map((r) => (
            <StaggerItem key={r.name} direction="up">
              <div
                className={`rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] border shadow-[0_24px_90px_rgba(1,8,18,0.35)] ${
                  r.featured ? 'ring-1 ring-aqua-300/35 border-aqua-200/25' : 'border-white/10'
                }`}
              >
                {r.featured && (
                  <div className="inline-block bg-aqua-200 text-[#041423] text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-[0_12px_30px_rgba(125,211,252,0.25)]">
                    ✓ Top-Bewertung
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 ${r.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{r.name}</div>
                      <div className="flex items-center gap-1 text-white/60 text-xs">
                        <MapPin className="w-3 h-3" />
                        {r.location}
                      </div>
                    </div>
                  </div>
                  <span className="text-white/45 text-xs">{r.date}</span>
                </div>

                <StarRating rating={r.rating} />

                <p className="text-white/76 text-sm leading-relaxed mt-3 mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-xs text-aqua-200 font-semibold">
                    Gekauftes Produkt: {r.product}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="mt-14" delay={0.2}>
          <div className="rounded-[2rem] border border-white/10 p-8 backdrop-blur-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_24px_90px_rgba(1,8,18,0.35)]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
              {[
                { label: 'Google', rating: '4.9★', reviews: '180+' },
                { label: 'Trusted Shops', rating: '4.8★', reviews: '95+' },
                { label: 'ProvenExpert', rating: '4.9★', reviews: '37+' },
                { label: 'Empfehlungen', rating: '98%', reviews: 'der Kunden' },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className="text-2xl font-black tracking-[-0.04em] text-white">{b.rating}</div>
                  <div className="text-aqua-100 font-semibold text-sm">{b.label}</div>
                  <div className="text-white/55 text-xs">{b.reviews}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
