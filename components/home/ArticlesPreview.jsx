'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { getAllArticles } from '@/data/articles';

export default function ArticlesPreview() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <section className="py-28 bg-[#041526] relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh opacity-45" />
      <div className="absolute inset-0 water-flow-lines opacity-18" />
      <div className="absolute top-8 right-[8%] w-80 h-80 rounded-full bg-cyan-400/8 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block bg-white/8 border border-white/10 text-aqua-100 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 backdrop-blur-xl">
            Wissen & Praxis
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-white mb-4 leading-[0.95]">
            Aktuelle Artikel
          </h2>
          <p className="text-white/68 max-w-2xl mx-auto text-lg leading-relaxed">
            Kompakte Antworten auf die wichtigsten Fragen zu Wasserhaerte, Osmose und Anlagenbetrieb.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" stagger={0.08}>
          {articles.map((article) => (
            <StaggerItem key={article.slug}>
              <article className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] border border-white/10 rounded-[1.75rem] overflow-hidden backdrop-blur-2xl hover:border-white/18 hover:-translate-y-1.5 transition-all shadow-[0_24px_90px_rgba(1,8,18,0.35)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041a2e]/78 via-[#041a2e]/18 to-transparent" />
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
                    className="inline-flex items-center gap-1.5 text-aqua-100 hover:text-white text-sm font-semibold"
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
            className="inline-flex items-center gap-2 text-aqua-100 hover:text-white font-semibold text-lg transition-colors bg-white/6 border border-white/10 rounded-full px-6 py-3 backdrop-blur-xl"
          >
            Alle Artikel anzeigen
            <ArrowRight className="w-5 h-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
