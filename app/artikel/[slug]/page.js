import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock3, Tag } from 'lucide-react';
import { getAllArticles, getArticleBySlug } from '@/data/articles';

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Artikel nicht gefunden',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArtikelDetailPage({ params }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-24 bg-gradient-to-b from-[#072b49] via-[#05233b] to-[#031a2e] min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 text-aqua-200 hover:text-aqua-100 text-sm font-semibold pt-8 pb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurueck zu allen Artikeln
        </Link>

        <header className="mb-8">
          <span className="inline-block bg-aqua-500/12 border border-aqua-200/30 text-aqua-200 text-xs font-semibold rounded-full px-3 py-1 mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-6">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString('de-DE')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="w-4 h-4" />
              {article.readingTime}
            </span>
          </div>

          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031a2e]/45 via-transparent to-transparent" />
          </div>
        </header>

        <div className="bg-white/8 border border-white/12 rounded-3xl p-7 sm:p-10 backdrop-blur-md">
          <p className="text-lg text-white/80 leading-relaxed mb-8">{article.excerpt}</p>

          <div className="space-y-8">
            {article.content.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-black text-white mb-3">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-white/75 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <Tag className="w-4 h-4 text-aqua-300" />
              {article.tags.map((tag) => (
                <span key={tag} className="bg-white/10 border border-white/15 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
