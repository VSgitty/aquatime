import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listOrderEvents } from '@/lib/order-log';
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

function parseDateStart(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString();
}

function parseDateEnd(value) {
  if (!value) return '';
  const date = new Date(`${value}T23:59:59.999Z`);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString();
}

function buildQuery({ status, from, to, page, token }) {
  const params = new URLSearchParams();

  if (status && status !== 'all') params.set('status', status);
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  if (page && page > 1) params.set('page', String(page));
  if (token) params.set('token', token);

  const query = params.toString();
  return query ? `?${query}` : '';
}

export default async function AdminBestellungenPage({ searchParams }) {
  const params = await searchParams;
  const configuredToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const providedToken = String(params?.token || '');

  if (configuredToken && providedToken !== configuredToken) {
    notFound();
  }

  const status = params?.status ? String(params.status) : '';
  const from = params?.from ? String(params.from) : '';
  const to = params?.to ? String(params.to) : '';
  const page = Math.max(1, Number.parseInt(String(params?.page || '1'), 10) || 1);

  const fromIso = parseDateStart(from);
  const toIso = parseDateEnd(to);

  const pageSize = 40;
  const { events, reason, total } = await listOrderEvents({
    status: status || undefined,
    from: fromIso || undefined,
    to: toIso || undefined,
    page,
    limit: pageSize,
  });

  const activeStatus = status || 'all';
  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  const csvHref = `/admin/bestellungen/export${buildQuery({
    status: activeStatus,
    from,
    to,
    token: configuredToken ? providedToken : '',
  })}`;

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#051f36] to-[#031526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <p className="text-aqua-300 text-sm uppercase tracking-wide font-semibold mb-2">Admin Dashboard</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white">Bestell-Timeline</h1>
            <p className="text-white/60 mt-3 max-w-2xl">
              Webhook-Ereignisse aus Stripe inklusive Zahlungsstatus und Kundeninfos.
            </p>
          </div>
          <div className="text-white/60 text-sm">{total || events.length} Events gesamt</div>
        </div>

        <div className="glass rounded-2xl p-3 mb-4 flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'Alle' },
            { key: 'paid', label: 'Bezahlt' },
            { key: 'failed', label: 'Fehlgeschlagen' },
            { key: 'refunded', label: 'Erstattet' },
          ].map((item) => {
            const href = `/admin/bestellungen${buildQuery({
              status: item.key,
              from,
              to,
              page: 1,
              token: configuredToken ? providedToken : '',
            })}`;

            const active = activeStatus === item.key;

            return (
              <Link
                key={item.key}
                href={href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                  active
                    ? 'bg-aqua-500/20 text-aqua-200 border-aqua-300/30'
                    : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <a
            href={csvHref}
            className="ml-auto px-4 py-2 rounded-xl text-sm font-semibold border bg-emerald-500/20 text-emerald-200 border-emerald-300/30 hover:bg-emerald-500/30"
          >
            CSV Export
          </a>
        </div>

        <form method="get" className="glass rounded-2xl p-4 mb-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          {configuredToken && <input type="hidden" name="token" value={providedToken} />}
          {activeStatus !== 'all' && <input type="hidden" name="status" value={activeStatus} />}

          <label className="block">
            <span className="text-white/70 text-xs uppercase">Von</span>
            <input
              type="date"
              name="from"
              defaultValue={from}
              className="mt-1 w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
            />
          </label>

          <label className="block">
            <span className="text-white/70 text-xs uppercase">Bis</span>
            <input
              type="date"
              name="to"
              defaultValue={to}
              className="mt-1 w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white"
            />
          </label>

          <button
            type="submit"
            className="bg-aqua-500/20 text-aqua-200 border border-aqua-300/30 rounded-xl px-4 py-2.5 font-semibold"
          >
            Filter anwenden
          </button>

          <Link
            href={`/admin/bestellungen${configuredToken ? `?token=${encodeURIComponent(providedToken)}` : ''}`}
            className="text-center bg-white/5 text-white/70 border border-white/15 rounded-xl px-4 py-2.5 font-semibold hover:bg-white/10"
          >
            Reset
          </Link>
        </form>

        {reason === 'supabase_not_configured' && (
          <div className="mb-6 bg-amber-500/15 border border-amber-400/30 text-amber-200 rounded-2xl px-4 py-3 text-sm">
            Supabase ist nicht konfiguriert. Bitte SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY setzen.
          </div>
        )}

        {events.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center text-white/65">
            Keine Events gefunden.
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const ref = event.order_id || event.checkout_session_id || event.payment_intent_id || 'unbekannt';
              const detailHref = `/admin/bestellungen/${encodeURIComponent(ref)}${
                configuredToken ? `?token=${encodeURIComponent(providedToken)}` : ''
              }`;

              return (
                <article
                  key={event.id}
                  className="glass rounded-2xl p-5 border border-white/10"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="text-white font-bold text-lg break-all">{ref}</div>
                      <div className="text-white/50 text-sm mt-1">
                        {event.event_type} · {formatDate(event.occurred_at)}
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusClasses(event.status)}`}>
                      {STATUS_LABELS[event.status] || event.status || 'Unbekannt'}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-sm">
                    <div className="bg-white/5 rounded-xl px-3 py-2">
                      <div className="text-white/45 text-xs uppercase">Kunde</div>
                      <div className="text-white/85">{event.customer_name || '-'}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl px-3 py-2">
                      <div className="text-white/45 text-xs uppercase">E-Mail</div>
                      <div className="text-white/85 break-all">{event.customer_email || '-'}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl px-3 py-2">
                      <div className="text-white/45 text-xs uppercase">Betrag</div>
                      <div className="text-white/85">
                        {typeof event.amount_minor === 'number' ? formatEuro(event.amount_minor) : '-'}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl px-3 py-2">
                      <div className="text-white/45 text-xs uppercase">Waehrung</div>
                      <div className="text-white/85">{event.currency || '-'}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href={detailHref} className="text-aqua-300 hover:text-aqua-200 text-sm font-semibold">
                      Details ansehen
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-white/60 text-sm">
            Seite {page} von {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/bestellungen${buildQuery({
                status: activeStatus,
                from,
                to,
                page: prevPage,
                token: configuredToken ? providedToken : '',
              })}`}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                page <= 1
                  ? 'pointer-events-none opacity-50 bg-white/5 border-white/15 text-white/50'
                  : 'bg-white/5 border-white/15 text-white/75 hover:bg-white/10'
              }`}
            >
              Zurueck
            </Link>
            <Link
              href={`/admin/bestellungen${buildQuery({
                status: activeStatus,
                from,
                to,
                page: nextPage,
                token: configuredToken ? providedToken : '',
              })}`}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                page >= totalPages
                  ? 'pointer-events-none opacity-50 bg-white/5 border-white/15 text-white/50'
                  : 'bg-white/5 border-white/15 text-white/75 hover:bg-white/10'
              }`}
            >
              Weiter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
