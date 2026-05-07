import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';
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
    <div className="pt-24 bg-gradient-to-b from-[#04192c] to-[#031526] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/produkte"
          className="inline-flex items-center gap-2 text-aqua-300 hover:text-aqua-200 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Zuruck zur Produktubersicht
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-navy-900">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.imageAlt || product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-aqua-500/25 to-navy-950" />
            )}
          </div>

          <div>
            <span className="inline-flex bg-aqua-500/15 text-aqua-200 border border-aqua-400/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{product.name}</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              {product.description || 'Hochwertiges Produkt fur professionelle Wasseraufbereitung.'}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
              {product.onSale && product.regularPriceMinor > product.priceMinor && (
                <div className="text-white/35 text-base line-through mb-1">
                  {formatEuro(product.regularPriceMinor)}
                </div>
              )}
              <div className="text-5xl font-black text-white mb-2">{formatEuro(product.priceMinor)}</div>
              <p className="text-white/45 text-sm">inkl. MwSt. zzgl. Versandkosten</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <AddToCartButton product={product} className="w-full sm:w-auto px-8 py-3" />
              <Link
                href="/warenkorb"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-white/20 text-white hover:border-aqua-300 hover:text-aqua-200 transition-colors font-semibold"
              >
                Zum Warenkorb
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <ShieldCheck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Sicher einkaufen</div>
                <p className="text-white/50 text-xs mt-1">SSL-geschutzter Checkout</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <Truck className="w-5 h-5 text-aqua-300 mb-2" />
                <div className="text-white font-semibold text-sm">Schneller Versand</div>
                <p className="text-white/50 text-xs mt-1">Deutschlandweite Lieferung</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
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
