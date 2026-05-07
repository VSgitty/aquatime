import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, BadgeCheck, Sparkles, Gauge, Droplets } from 'lucide-react';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { formatEuro, getProductBySlug } from '@/lib/shop';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Produkt nicht gefunden' };
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160) || 'Produktdetails bei AquaTime',
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160) || 'Produktdetails bei AquaTime',
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default async function ProduktDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen bg-[#020814] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-70" />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <div className="absolute top-20 left-[8%] w-80 h-80 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute bottom-10 right-[8%] w-96 h-96 rounded-full bg-emerald-400/8 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/produkte"
          className="inline-flex items-center gap-2 text-aqua-200 hover:text-white font-medium mb-6 bg-white/6 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Zuruck zur Produktubersicht
        </Link>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
          <div className="relative aspect-[0.95] rounded-[2rem] overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_35px_110px_rgba(1,8,18,0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(125,211,252,0.15),transparent_22%),radial-gradient(circle_at_70%_78%,rgba(52,211,153,0.14),transparent_24%),linear-gradient(180deg,rgba(4,10,18,0.2),rgba(4,10,18,0.5))]" />
            <div className="absolute left-1/2 top-[14%] -translate-x-1/2 h-[58%] w-[58%] rounded-full border border-white/10 bg-white/[0.03]" />
            <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[50%] w-[50%] rounded-full border border-aqua-200/10" />

            <div className="absolute inset-0 p-8 sm:p-10 flex items-center justify-center">
              {product.image ? (
                <div className="relative w-full h-full max-w-[34rem] max-h-[34rem]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain drop-shadow-[0_35px_80px_rgba(0,0,0,0.42)]"
                  />
                </div>
              ) : (
                <div className="absolute inset-10 rounded-[1.75rem] bg-gradient-to-br from-aqua-500/25 to-navy-950" />
              )}
            </div>

            <div className="absolute left-5 bottom-5 rounded-2xl bg-[#071729]/72 border border-white/10 px-4 py-3 backdrop-blur-xl max-w-[15rem]">
              <div className="text-[10px] uppercase tracking-[0.24em] text-aqua-200/70 mb-1">AquaTime Premium</div>
              <div className="text-white text-sm font-semibold leading-snug">Wassertechnik mit professioneller Montage und klarer Produktaesthetik.</div>
            </div>

            <div className="absolute right-5 top-5 rounded-2xl bg-white/8 border border-white/10 px-4 py-3 backdrop-blur-xl text-right">
              <div className="text-[10px] uppercase tracking-[0.24em] text-aqua-200/70 mb-1">Kategorie</div>
              <div className="text-white font-bold">{product.category}</div>
            </div>
          </div>

          <div>
            <span className="inline-flex bg-white/8 text-aqua-100 border border-white/10 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] mb-5 backdrop-blur-xl">
              Signature Product
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-white mb-4 leading-[0.95]">{product.name}</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-2xl">
              {product.description || 'Hochwertiges Produkt fur professionelle Wasseraufbereitung.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                <Gauge className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Effiziente Technik</div>
                <p className="text-white/50 text-xs mt-1">Zuverlaessig fuer anspruchsvolle Haushalte</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                <Sparkles className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Premium-Finish</div>
                <p className="text-white/50 text-xs mt-1">Designsprache passend zum modernen Interior</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
                <Droplets className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Wasserkomfort</div>
                <p className="text-white/50 text-xs mt-1">Sauberer Geschmack und geschuetzte Technik</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 mb-6 backdrop-blur-2xl shadow-[0_24px_90px_rgba(1,8,18,0.38)]">
              <div className="text-white/45 text-xs uppercase tracking-[0.26em] mb-3">Preis und Kaufoption</div>
              {product.onSale && product.regularPriceMinor > product.priceMinor && (
                <div className="text-white/35 text-base line-through mb-1">
                  {formatEuro(product.regularPriceMinor)}
                </div>
              )}
              <div className="text-5xl lg:text-6xl font-black tracking-[-0.05em] text-white mb-2">{formatEuro(product.priceMinor)}</div>
              <p className="text-white/45 text-sm">inkl. MwSt. zzgl. Versandkosten</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <AddToCartButton product={product} className="w-full sm:w-auto px-8 py-3.5 text-base" />
              <Link
                href="/warenkorb"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl border border-white/14 bg-white/6 text-white hover:border-aqua-300/40 hover:text-aqua-100 hover:bg-white/10 transition-colors font-semibold backdrop-blur-xl"
              >
                Zum Warenkorb
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                <ShieldCheck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Sicher einkaufen</div>
                <p className="text-white/50 text-xs mt-1">SSL-geschutzter Checkout</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                <Truck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Schneller Versand</div>
                <p className="text-white/50 text-xs mt-1">Deutschlandweite Lieferung</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                <BadgeCheck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">AquaTime Qualitat</div>
                <p className="text-white/50 text-xs mt-1">Persoenliche Fachberatung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
