# AquaTime Payments Setup

## 1) Environment variables

Set these variables in local `.env.local` and in your deployment platform:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `ORDER_NOTIFICATION_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SUPABASE_URL` (optional, for order history)
- `SUPABASE_SERVICE_ROLE_KEY` (optional, for order history)
- `SUPABASE_ORDERS_TABLE` (optional, default: `order_events`)
- `ADMIN_DASHBOARD_TOKEN` (optional, protect admin timeline route)

Use `.env.example` as template.

## 2) Stripe webhook endpoint

Create a webhook endpoint in Stripe Dashboard:

- URL: `https://YOUR_DOMAIN/api/stripe/webhook`
- Listen to events:
  - `checkout.session.completed`
  - `checkout.session.async_payment_failed`
  - `payment_intent.payment_failed`
  - `charge.refunded`

Copy Signing Secret into `STRIPE_WEBHOOK_SECRET`.

## 3) Local webhook testing

Install Stripe CLI and forward events:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the shown signing secret to `STRIPE_WEBHOOK_SECRET`.

## 4) Test purchase in Stripe test mode

1. Set `STRIPE_SECRET_KEY` to test key (`sk_test_...`).
2. Start app: `npm run dev`.
3. Add products to cart and start checkout.
4. Pay with card: `4242 4242 4242 4242`, any future date, any CVC/ZIP.
5. Verify redirect to `/checkout/erfolg` and webhook processing.
6. Verify emails (customer + admin) via SMTP inbox.

## 5) Live go-live checklist

1. Replace `STRIPE_SECRET_KEY` with live key (`sk_live_...`).
2. Configure production webhook endpoint and live `STRIPE_WEBHOOK_SECRET`.
3. Set `NEXT_PUBLIC_SITE_URL` to production domain.
4. Run one real low-value order as smoke test.
5. Confirm email delivery and Stripe event logs.

## 6) Optional order history in Supabase

Create table in Supabase SQL editor:

```sql
create table if not exists public.order_events (
  id bigserial primary key,
  event_type text not null,
  status text not null,
  order_id text,
  checkout_session_id text,
  payment_intent_id text,
  amount_minor bigint,
  currency text,
  customer_email text,
  customer_name text,
  metadata jsonb default '{}'::jsonb,
  line_items jsonb default '[]'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_order_events_order_id on public.order_events(order_id);
create index if not exists idx_order_events_event_type on public.order_events(event_type);
create index if not exists idx_order_events_occurred_at on public.order_events(occurred_at desc);
```

Then set:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ORDERS_TABLE=order_events`

## 7) Admin order timeline

Route:

- `/admin/bestellungen`

If `ADMIN_DASHBOARD_TOKEN` is set, call route with token:

- `/admin/bestellungen?token=YOUR_TOKEN`

Optional filter by status:

- `/admin/bestellungen?status=paid&token=YOUR_TOKEN`
- `/admin/bestellungen?status=failed&token=YOUR_TOKEN`
- `/admin/bestellungen?status=refunded&token=YOUR_TOKEN`

Optional date and pagination filters:

- `/admin/bestellungen?from=2026-05-01&to=2026-05-31&token=YOUR_TOKEN`
- `/admin/bestellungen?page=2&status=paid&token=YOUR_TOKEN`

CSV export:

- `/admin/bestellungen/export?status=paid&from=2026-05-01&to=2026-05-31&token=YOUR_TOKEN`

Order detail timeline:

- `/admin/bestellungen/ORDER_OR_SESSION_ID?token=YOUR_TOKEN`

## Notes

- Checkout API validates product prices against live WooCommerce data before creating Stripe session.
- Webhook handles paid, failed, and refunded payment notifications.
- Webhook can persist a full payment status history to Supabase (if configured).
- If SMTP is missing, email sending is skipped gracefully.
