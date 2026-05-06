'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { getAllArticles } from '@/data/articles';

export default function ArticlesPreview() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-b from-[#06253d] to-[#041b2f] relative overflow-hidden">
      <div className="absolute inset-0 water-flow-lines opacity-55" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block bg-aqua-500/12 border border-aqua-200/30 text-aqua-200 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
            Wissen & Praxis
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Aktuelle Artikel
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Kompakte Antworten auf die wichtigsten Fragen zu Wasserhaerte, Osmose und Anlagenbetrieb.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" stagger={0.08}>
          {articles.map((article) => (
            <StaggerItem key={article.slug}>
              <article className="h-full bg-white/8 border border-white/12 rounded-3xl overflow-hidden backdrop-blur-md hover:border-aqua-200/45 hover:-translate-y-1 transition-all">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041a2e]/55 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <div className="text-xs text-white/55 flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(article.date).toLocaleDateString('de-DE')}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="w-3.5 h-3.5" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white leading-tight mb-2">{article.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>

                  <Link
                    href={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-aqua-200 hover:text-aqua-100 text-sm font-semibold"
                  >
                    Weiterlesen
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-10" delay={0.2}>
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 text-aqua-100 hover:text-white font-semibold text-lg transition-colors"
          >
            Alle Artikel anzeigen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
