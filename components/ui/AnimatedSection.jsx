'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const variants = {
  up: { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down: { hidden: { y: -50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left: { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  scale: { hidden: { scale: 0.85, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  margin = '-80px',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const v = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '', stagger = 0.1, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up' }) {
  const v = variants[direction];
  return (
    <motion.div
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
