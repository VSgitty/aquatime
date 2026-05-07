import { NextResponse } from 'next/server';
import { listOrderEvents } from '@/lib/order-log';

function parseIsoStart(value) {
  if (!value) return '';
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString();
}

function parseIsoEnd(value) {
  if (!value) return '';
  const d = new Date(`${value}T23:59:59.999Z`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString();
}

function csvEscape(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token') || '';
    const status = url.searchParams.get('status') || '';
    const fromDate = url.searchParams.get('from') || '';
    const toDate = url.searchParams.get('to') || '';

    const configuredToken = process.env.ADMIN_DASHBOARD_TOKEN;
    if (configuredToken && token !== configuredToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fromIso = parseIsoStart(fromDate);
    const toIso = parseIsoEnd(toDate);

    const { events } = await listOrderEvents({
      status: status || undefined,
      from: fromIso || undefined,
      to: toIso || undefined,
      page: 1,
      limit: 500,
    });

    const headers = [
      'id',
      'event_type',
      'status',
      'order_id',
      'checkout_session_id',
      'payment_intent_id',
      'amount_minor',
      'currency',
      'customer_email',
      'customer_name',
      'occurred_at',
      'created_at',
    ];

    const lines = [headers.join(',')];

    for (const event of events) {
      const row = headers.map((key) => csvEscape(event?.[key] ?? ''));
      lines.push(row.join(','));
    }

    const csv = lines.join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="order-events-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'CSV export failed' },
      { status: 500 }
    );
  }
}
