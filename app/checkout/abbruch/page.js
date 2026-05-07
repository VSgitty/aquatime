import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function CheckoutAbbruchPage() {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#072947] to-[#031a2f]">
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-16 h-16 text-amber-300 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Zahlung wurde abgebrochen</h1>
        <p className="text-white/70 text-lg mb-8">
          Kein Problem. Deine Produkte liegen weiterhin im Warenkorb und du kannst jederzeit fortfahren.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-aqua-500 text-white px-7 py-3 rounded-xl font-semibold"
          >
            Erneut zur Kasse
          </Link>
          <Link
            href="/warenkorb"
            className="inline-flex items-center justify-center border border-white/25 text-white px-7 py-3 rounded-xl font-semibold hover:border-aqua-300 hover:text-aqua-200"
          >
            Warenkorb pruefen
          </Link>
        </div>
      </div>
    </div>
  );
}
