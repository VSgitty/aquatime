import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { getAllArticles } from '@/data/articles';

export const metadata = {
  title: 'Artikel',
  description:
    'Fachartikel und Ratgeber zu Wasserhaerte, Osmose, Wartung und Kosten rund um moderne Wasseraufbereitung.',
};

export default function ArtikelPage() {
  const articles = getAllArticles();

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#072c4a] via-[#062640] to-[#041c31]">
        <div className="absolute inset-0 water-flow-lines opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-aqua-500/12 border border-aqua-200/30 text-aqua-200 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
              AquaTime Magazin
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Artikel, Guides und Praxiswissen
            </h1>
            <p className="text-lg text-white/70">
              Alle Beitraege rund um Wasseraufbereitung, Trinkwasserqualitaet und langfristige Einsparpotenziale.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#06243d] to-[#041a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 gap-7" stagger={0.08}>
            {articles.map((article) => (
              <StaggerItem key={article.slug}>
                <article className="h-full bg-white/8 border border-white/12 rounded-3xl overflow-hidden backdrop-blur-md hover:border-aqua-200/45 hover:-translate-y-1 transition-all">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041a2e]/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-aqua-500/25 border border-aqua-200/40 text-aqua-100 text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-white/55 mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(article.date).toLocaleDateString('de-DE')}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="w-3.5 h-3.5" />
                        {article.readingTime}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-white/70 leading-relaxed mb-5">{article.excerpt}</p>

                    <Link
                      href={`/artikel/${article.slug}`}
                      className="inline-flex items-center gap-2 text-aqua-200 hover:text-aqua-100 font-semibold transition-colors"
                    >
                      Artikel lesen
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
