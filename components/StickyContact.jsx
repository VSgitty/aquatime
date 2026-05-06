'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function StickyContact() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Expanded menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="flex flex-col gap-2 items-end"
              >
                <a
                  href="tel:060737433137"
                  className="flex items-center gap-3 bg-navy-950 border border-white/10 text-white px-4 py-3 rounded-2xl shadow-2xl hover:bg-navy-800 transition-colors"
                >
                  <span className="text-sm font-semibold">06073 743 3137</span>
                  <div className="w-9 h-9 bg-aqua-500 rounded-xl flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                </a>
                <Link
                  href="/kontakt"
                  className="flex items-center gap-3 bg-navy-950 border border-white/10 text-white px-4 py-3 rounded-2xl shadow-2xl hover:bg-navy-800 transition-colors"
                >
                  <span className="text-sm font-semibold">Nachricht schreiben</span>
                  <div className="w-9 h-9 bg-gradient-to-br from-aqua-400 to-aqua-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={() => setOpen(!open)}
            className="relative w-14 h-14 bg-gradient-to-br from-aqua-500 to-aqua-600 rounded-2xl shadow-2xl shadow-aqua-500/40 flex items-center justify-center hover:from-aqua-400 hover:to-aqua-500 transition-all hover:-translate-y-1"
            aria-label="Kontakt"
          >
            {/* Pulse ring */}
            {!open && (
              <span className="absolute inset-0 rounded-2xl bg-aqua-500 animate-ping opacity-30" />
            )}
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div key="phone" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Phone className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
