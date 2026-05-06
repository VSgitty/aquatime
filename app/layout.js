import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyContact from '@/components/StickyContact';

export const metadata = {
  title: {
    default: 'AquaTime – Nie wieder Kalk im Haus',
    template: '%s | AquaTime Wasseraufbereitung',
  },
  description:
    'AquaTime GmbH – Professionelle Wasserenthärtungsanlagen, Umkehrosmose & Wasseraufbereitung. Schützen Sie Ihre Geräte, sparen Sie Energie. Kostenlose Beratung: 06073 743 3137.',
  keywords: [
    'Wasserenthärtungsanlage', 'Enthärtungsanlage', 'Wasserenthärter',
    'Umkehrosmoseanlage', 'Osmoseanlage', 'Kalkschutz', 'weiches Wasser',
    'AquaTime', 'Babenhausen', 'Wasseraufbereitung',
  ],
  openGraph: {
    title: 'AquaTime – Nie wieder Kalk im Haus',
    description: 'Professionelle Wasserenthärtungsanlagen & Umkehrosmose von AquaTime GmbH.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyContact />
      </body>
    </html>
  );
}
