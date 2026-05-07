import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listOrderEventsByOrderId } from '@/lib/order-log';
import { formatEuro } from '@/lib/shop';

export const dynamic = 'force-dynamic';

const STATUS_LABELS = {
  paid: 'Bezahlt',
  failed: 'Fehlgeschlagen',
  refunded: 'Erstattet',
};

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function statusClasses(status) {
  if (status === 'paid') return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25';
  if (status === 'failed') return 'bg-rose-500/15 text-rose-300 border-rose-400/25';
  if (status === 'refunded') return 'bg-amber-500/15 text-amber-300 border-amber-400/25';
  return 'bg-white/10 text-white/70 border-white/20';
}

export default async function AdminBestellungDetailPage({ params, searchParams }) {
  const routeParams = await params;
  const query = await searchParams;
  const orderId = decodeURIComponent(routeParams.orderId || '');

  const configuredToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const providedToken = String(query?.token || '');

  if (configuredToken && providedToken !== configuredToken) {
    notFound();
  }

  const { events, reason } = await listOrderEventsByOrderId(orderId, { limit: 300 });

  const backHref = `/admin/bestellungen${
    configuredToken ? `?token=${encodeURIComponent(providedToken)}` : ''
  }`;

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#051f36] to-[#031526]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href={backHref} className="text-aqua-300 hover:text-aqua-200 text-sm font-semibold">
            Zurueck zur Timeline
          </Link>
          <h1 className="text-4xl font-black text-white mt-2">Bestellung {orderId}</h1>
          <p className="text-white/60 mt-2">Status-Historie aller Stripe-Webhook-Ereignisse.</p>
        </div>

        {reason === 'supabase_not_configured' && (
          <div className="mb-6 bg-amber-500/15 border border-amber-400/30 text-amber-200 rounded-2xl px-4 py-3 text-sm">
            Supabase ist nicht konfiguriert. Bitte SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY setzen.
          </div>
        )}

        {events.length === 0 ? (
          <div className="glass rounded-3xl p-10 text-center text-white/65">
            Keine Events fuer diese Bestellung gefunden.
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <article key={event.id} className="glass rounded-2xl p-5 border border-white/10">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-white font-bold text-lg">{event.event_type}</div>
                    <div className="text-white/50 text-sm mt-1">{formatDate(event.occurred_at)}</div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusClasses(event.status)}`}>
                    {STATUS_LABELS[event.status] || event.status || 'Unbekannt'}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-sm">
                  <div className="bg-white/5 rounded-xl px-3 py-2">
                    <div className="text-white/45 text-xs uppercase">Betrag</div>
                    <div className="text-white/85">
                      {typeof event.amount_minor === 'number' ? formatEuro(event.amount_minor) : '-'}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl px-3 py-2">
                    <div className="text-white/45 text-xs uppercase">Kunde</div>
                    <div className="text-white/85">{event.customer_name || '-'}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl px-3 py-2">
                    <div className="text-white/45 text-xs uppercase">E-Mail</div>
                    <div className="text-white/85 break-all">{event.customer_email || '-'}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl px-3 py-2">
                    <div className="text-white/45 text-xs uppercase">Waehrung</div>
                    <div className="text-white/85">{event.currency || '-'}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
