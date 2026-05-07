const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ORDERS_TABLE = process.env.SUPABASE_ORDERS_TABLE || 'order_events';

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

function getOrderReferenceFilter(orderId) {
  const trimmed = String(orderId || '').trim();
  if (!trimmed) {
    return '';
  }

  return `order_id.eq.${trimmed},checkout_session_id.eq.${trimmed},payment_intent_id.eq.${trimmed}`;
}

export async function logOrderEvent(payload) {
  if (!hasSupabaseConfig()) {
    return { logged: false, reason: 'supabase_not_configured' };
  }

  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_ORDERS_TABLE}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Order log insert failed (${res.status}): ${text}`);
  }

  return { logged: true };
}

export async function listOrderEvents({ status, limit = 100, page = 1, from, to } = {}) {
  if (!hasSupabaseConfig()) {
    return { events: [], total: 0, page: 1, pageSize: 0, reason: 'supabase_not_configured' };
  }

  const safeLimit = Math.max(1, Math.min(200, Number.parseInt(limit, 10) || 100));
  const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
  const offset = (safePage - 1) * safeLimit;
  const params = new URLSearchParams({
    select: '*',
    order: 'occurred_at.desc',
    limit: String(safeLimit),
    offset: String(offset),
  });

  if (status) {
    params.set('status', `eq.${status}`);
  }

  if (from) {
    params.set('occurred_at', `gte.${from}`);
  }

  if (to) {
    params.set('occurred_at', `lte.${to}`);
  }

  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_ORDERS_TABLE}?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(),
      Prefer: 'count=exact',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Order log query failed (${res.status}): ${text}`);
  }

  const events = await res.json();
  const contentRange = res.headers.get('content-range') || '';
  const total = Number.parseInt(contentRange.split('/')[1] || '0', 10) || 0;

  return {
    events: Array.isArray(events) ? events : [],
    total,
    page: safePage,
    pageSize: safeLimit,
  };
}

export async function listOrderEventsByOrderId(orderId, { limit = 200 } = {}) {
  if (!hasSupabaseConfig()) {
    return { events: [], reason: 'supabase_not_configured' };
  }

  const refFilter = getOrderReferenceFilter(orderId);
  if (!refFilter) {
    return { events: [] };
  }

  const safeLimit = Math.max(1, Math.min(500, Number.parseInt(limit, 10) || 200));
  const params = new URLSearchParams({
    select: '*',
    order: 'occurred_at.desc',
    limit: String(safeLimit),
    or: `(${refFilter})`,
  });

  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_ORDERS_TABLE}?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Order log detail query failed (${res.status}): ${text}`);
  }

  const events = await res.json();
  return { events: Array.isArray(events) ? events : [] };
}
