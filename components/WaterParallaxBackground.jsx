'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function WaterParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const deepLayerY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const midLayerY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const glowLayerY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y: deepLayerY }} className="water-parallax-layer water-parallax-deep" />
      <motion.div style={{ y: midLayerY }} className="water-parallax-layer water-parallax-mid" />
      <motion.div style={{ y: glowLayerY }} className="water-parallax-layer water-parallax-glow" />

      <div className="water-rings">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
