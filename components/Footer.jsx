import Link from 'next/link';
import { Droplets, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  produkte: [
    { href: '/produkte', label: 'Alle Produkte' },
    { href: '/enthaertungsanlagen', label: 'Enthärtungsanlagen' },
    { href: '/enthaertungsanlagen#neo', label: 'NEO Serie' },
    { href: '/enthaertungsanlagen#cosmosblue', label: 'CosmosBlue Serie' },
    { href: '/osmoseanlagen', label: 'Osmoseanlagen' },
    { href: '/produkte', label: 'Anlagenzubehör' },
  ],
  service: [
    { href: '/service', label: 'Montage & Installation' },
    { href: '/service#wartung', label: 'Wartungsservice' },
    { href: '/service#beratung', label: 'Kostenlose Beratung' },
    { href: '/kontakt#rechner', label: 'Wasserhärte-Rechner' },
    { href: '/kontakt', label: 'Kontakt aufnehmen' },
  ],
  info: [
    { href: '/artikel', label: 'Artikel & Ratgeber' },
    { href: '/ueber-uns', label: 'Über AquaTime' },
    { href: '/versand', label: 'Versand & Lieferung' },
    { href: '/faq', label: 'FAQ' },
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/agb', label: 'AGB' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA Band */}
      <div className="bg-gradient-to-r from-aqua-700 to-aqua-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Bereit für weiches, reines Wasser?
            </h3>
            <p className="text-aqua-100">
              Kostenlose Beratung – kein Druck, kein Verkaufsgespräch.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:060737433137"
              className="inline-flex items-center justify-center gap-2 bg-white text-aqua-700 px-6 py-3 rounded-xl font-bold hover:bg-aqua-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              06073 743 3137
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-navy-950/30 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-950/50 transition-colors"
            >
              Formular ausfüllen
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-aqua-400 to-aqua-600 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-black text-xl tracking-tight">
                  AQUA<span className="text-aqua-400">TIME</span>
                </div>
                <div className="text-white/40 text-[9px] uppercase tracking-widest">
                  Wasseraufbereitung
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Ihr Spezialist für professionelle Wasserenthärtung und Wasseraufbereitung.
              Seit 2014 aus Babenhausen für ganz Deutschland.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a
                href="tel:060737433137"
                className="flex items-center gap-2.5 text-white/60 hover:text-aqua-400 text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-aqua-500 flex-shrink-0" />
                06073 743 3137
              </a>
              <a
                href="mailto:info@aquatimegmbh.de"
                className="flex items-center gap-2.5 text-white/60 hover:text-aqua-400 text-sm transition-colors"
              >
                <Mail className="w-4 h-4 text-aqua-500 flex-shrink-0" />
                info@aquatimegmbh.de
              </a>
              <div className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-aqua-500 flex-shrink-0 mt-0.5" />
                <span>
                  Ziegelhüttenstraße 30<br />
                  64832 Babenhausen
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-aqua-500/20 border border-white/10 hover:border-aqua-500/30 rounded-lg flex items-center justify-center text-white/50 hover:text-aqua-400 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Produkte
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.produkte.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-aqua-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Service
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-aqua-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Informationen
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-aqua-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} AquaTime GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-2">
            {/* Payment icons placeholder */}
            {['PayPal', 'Klarna', 'VISA', 'MC'].map((p) => (
              <span
                key={p}
                className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-white/40 text-xs font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
