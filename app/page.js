import Hero from '@/components/home/Hero';
import ProblemSection from '@/components/home/ProblemSection';
import SolutionSection from '@/components/home/SolutionSection';
import ProductsPreview from '@/components/home/ProductsPreview';
import WhyUs from '@/components/home/WhyUs';
import Stats from '@/components/home/Stats';
import Testimonials from '@/components/home/Testimonials';
import HardnessCalculator from '@/components/home/HardnessCalculator';
import ServicePreview from '@/components/home/ServicePreview';
import CTASection from '@/components/home/CTASection';

export const metadata = {
  title: 'AquaTime – Nie wieder Kalk im Haus | Wasserenthärtung Experten',
  description:
    'AquaTime GmbH – Professionelle Wasserenthärtungsanlagen & Osmoseanlagen. Kein Kalk, günstigere Energiekosten, längere Gerätelebensdauer. Kostenlose Beratung: 06073 743 3137.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ProductsPreview />
      <Stats />
      <WhyUs />
      <Testimonials />
      <HardnessCalculator />
      <ServicePreview />
      <CTASection />
    </>
  );
}
