import ProductGrid from '@/components/shop/ProductGrid';
import { getAllProducts, getUniqueCategories } from '@/lib/shop';

export const metadata = {
  title: 'Produkte',
  description:
    'Alle AquaTime Produkte dynamisch aus dem Shop: Wasserenthärtungsanlagen, Osmoseanlagen und Zubehör.',
};

export default async function ProduktePage() {
  const products = await getAllProducts();
  const categories = getUniqueCategories(products);

  return (
    <div className="pt-24">
      <section className="py-20 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="glow-orb w-[520px] h-[520px] bg-aqua-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-aqua-500/10 border border-aqua-500/20 text-aqua-300 text-sm font-semibold rounded-full px-4 py-1.5 mb-5">
            AquaTime Shop
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Alle Produkte</h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            Moderne Wassertechnik fur Haus, Gewerbe und Industrie. Alle Artikel werden automatisch
            aus dem Live-Shop geladen.
          </p>
        </div>
      </section>

      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
