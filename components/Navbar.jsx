'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, Droplets } from 'lucide-react';
import MiniCartLink from '@/components/shop/MiniCartLink';

const navLinks = [
  { href: '/produkte', label: 'Shop' },
  {
    href: '/enthaertungsanlagen',
    label: 'Enthärtungsanlagen',
    sub: [
      { href: '/enthaertungsanlagen#neo', label: 'NEO Serie' },
      { href: '/enthaertungsanlagen#cosmosblue', label: 'CosmosBlue Serie' },
      { href: '/enthaertungsanlagen#doppel', label: 'Doppel-Anlagen' },
    ],
  },
  { href: '/osmoseanlagen', label: 'Osmoseanlagen' },
  { href: '/service', label: 'Service & Montage' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#04131d]/68 backdrop-blur-2xl border-b border-white/8 text-white py-1.5 text-center text-sm shadow-[0_10px_35px_rgba(1,8,18,0.35)]">
        <span className="hidden sm:inline text-white/75">Kostenlose Beratung & Angebote: </span>
        <a href="tel:060737433137" className="font-bold hover:underline">
          06073 743 3137
        </a>
        <span className="hidden md:inline text-white/50"> · Deutschlandweite Lieferung & Montage</span>
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#03111b]/78 backdrop-blur-2xl shadow-[0_18px_60px_rgba(1,8,18,0.55)] border-b border-white/8'
            : 'bg-[#03111b]/28 backdrop-blur-xl border-b border-white/6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-aqua-300 via-sky-400 to-emerald-300 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_16px_35px_rgba(56,189,248,0.28)]">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-lg tracking-[-0.04em]">
                  AQUA<span className="text-emerald-200">TIME</span>
                </span>
                <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-medium">
                  Wasseraufbereitung
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.sub && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-white/70 hover:text-white px-3 py-2 text-sm font-medium transition-colors rounded-xl hover:bg-white/6"
                  >
                    {link.label}
                    {link.sub && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          activeDropdown === link.href ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.sub && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-[#05131f]/96 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                      >
                        {link.sub.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/6 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <MiniCartLink />
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:060737433137"
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-aqua-400" />
                06073 743 3137
              </a>
              <Link
                href="/kontakt"
                className="bg-gradient-to-r from-aqua-300 via-cyan-300 to-emerald-200 hover:from-white hover:via-aqua-200 hover:to-emerald-100 text-[#031828] px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:shadow-[0_20px_55px_rgba(125,211,252,0.35)] hover:-translate-y-0.5"
              >
                Kostenlos beraten
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menü öffnen"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#03111b]/96 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block text-white/80 hover:text-white py-3 px-4 text-base font-medium rounded-xl hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <MiniCartLink mobile onClick={() => setIsMobileOpen(false)} />
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <a
                    href="tel:060737433137"
                    className="flex items-center justify-center gap-2 text-white/80 py-3 text-base"
                  >
                    <Phone className="w-4 h-4 text-aqua-400" />
                    06073 743 3137
                  </a>
                  <Link
                    href="/kontakt"
                    onClick={() => setIsMobileOpen(false)}
                    className="block bg-gradient-to-r from-aqua-500 to-aqua-600 text-white text-center py-3.5 rounded-xl font-bold text-base"
                  >
                    Kostenlos beraten lassen
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
