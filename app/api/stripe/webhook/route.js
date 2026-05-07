import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { logOrderEvent } from '@/lib/order-log';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const adminEmail = process.env.ORDER_NOTIFICATION_EMAIL || 'info@aquatimegmbh.de';

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2025-03-31.basil',
    })
  : null;

function formatEuro(minorAmount = 0) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((minorAmount || 0) / 100);
}

function lineItemsToText(lineItems = []) {
  if (!lineItems.length) {
    return 'Keine Positionen gefunden.';
  }

  return lineItems
    .map((item) => {
      const name = item.description || item?.price?.product?.name || 'Produkt';
      const qty = item.quantity || 1;
      const amountMinor = item.amount_total || 0;
      return `- ${qty}x ${name}: ${formatEuro(amountMinor)}`;
    })
    .join('\n');
}

function normalizeLineItems(lineItems = []) {
  return lineItems.map((item) => ({
    name: item.description || item?.price?.product?.name || 'Produkt',
    quantity: item.quantity || 1,
    amount_minor: item.amount_total || 0,
    currency: item.currency || 'eur',
  }));
}

async function safeLogOrderEvent(payload) {
  try {
    await logOrderEvent(payload);
  } catch (error) {
    console.error('Order event log failed:', error?.message || error);
  }
}

async function handleCheckoutCompleted(session) {
  if (!stripe) {
    return;
  }

  const customerEmail = session.customer_details?.email || session.customer_email;
  const customerName =
    session.customer_details?.name ||
    `${session.metadata?.firstName || ''} ${session.metadata?.lastName || ''}`.trim() ||
    'Kunde';

  const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ['data.price.product'],
  });

  const lineItems = lineItemsResponse?.data || [];
  const normalizedLineItems = normalizeLineItems(lineItems);
  const total = formatEuro(session.amount_total || 0);
  const orderId = session.id;
  const itemsText = lineItemsToText(lineItems);

  await safeLogOrderEvent({
    event_type: 'checkout.session.completed',
    status: 'paid',
    order_id: orderId,
    checkout_session_id: session.id,
    payment_intent_id: session.payment_intent || null,
    amount_minor: session.amount_total || 0,
    currency: (session.currency || 'eur').toUpperCase(),
    customer_email: customerEmail || null,
    customer_name: customerName || null,
    metadata: session.metadata || {},
    line_items: normalizedLineItems,
    occurred_at: new Date().toISOString(),
  });

  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: `AquaTime Bestellbestaetigung (${orderId})`,
      text: [
        `Hallo ${customerName},`,
        '',
        'vielen Dank fuer deine Bestellung bei AquaTime.',
        `Bestellnummer: ${orderId}`,
        '',
        'Positionen:',
        itemsText,
        '',
        `Gesamt: ${total}`,
        '',
        'Wir melden uns, sobald deine Bestellung versendet wird.',
      ].join('\n'),
    });
  }

  await sendEmail({
    to: adminEmail,
    subject: `Neue bezahlte Bestellung: ${orderId}`,
    text: [
      'Eine Bestellung wurde erfolgreich bezahlt.',
      `Bestellnummer: ${orderId}`,
      `Kunde: ${customerName}`,
      `E-Mail: ${customerEmail || 'n/a'}`,
      `Gesamt: ${total}`,
      '',
      'Positionen:',
      itemsText,
    ].join('\n'),
  });
}

async function handlePaymentFailed(obj) {
  const orderId = obj.id || 'unbekannt';
  const customerEmail = obj.receipt_email || obj.customer_email || obj.customer_details?.email || '';

  await safeLogOrderEvent({
    event_type: 'payment.failed',
    status: 'failed',
    order_id: orderId,
    checkout_session_id: null,
    payment_intent_id: obj.id || null,
    amount_minor: obj.amount || obj.amount_total || 0,
    currency: (obj.currency || 'eur').toUpperCase(),
    customer_email: customerEmail || null,
    customer_name: obj.customer_details?.name || null,
    metadata: obj.metadata || {},
    line_items: [],
    occurred_at: new Date().toISOString(),
  });

  await sendEmail({
    to: adminEmail,
    subject: `Zahlung fehlgeschlagen: ${orderId}`,
    text: [
      'Eine Zahlung ist fehlgeschlagen.',
      `Referenz: ${orderId}`,
      `Kunden-E-Mail: ${customerEmail || 'n/a'}`,
      `Betrag: ${formatEuro(obj.amount || obj.amount_total || 0)}`,
    ].join('\n'),
  });

  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: `Zahlung fehlgeschlagen (${orderId})`,
      text: [
        'Deine Zahlung konnte leider nicht abgeschlossen werden.',
        `Referenz: ${orderId}`,
        '',
        'Bitte versuche es erneut oder kontaktiere unseren Support.',
      ].join('\n'),
    });
  }
}

async function handleRefunded(charge) {
  const refundAmount = formatEuro(charge.amount_refunded || 0);
  const chargeId = charge.id || 'unbekannt';
  const customerEmail = charge.billing_details?.email || '';

  await safeLogOrderEvent({
    event_type: 'charge.refunded',
    status: 'refunded',
    order_id: charge.payment_intent || chargeId,
    checkout_session_id: null,
    payment_intent_id: charge.payment_intent || null,
    amount_minor: charge.amount_refunded || 0,
    currency: (charge.currency || 'eur').toUpperCase(),
    customer_email: customerEmail || null,
    customer_name: charge.billing_details?.name || null,
    metadata: charge.metadata || {},
    line_items: [],
    occurred_at: new Date().toISOString(),
  });

  await sendEmail({
    to: adminEmail,
    subject: `Rueckerstattung erfolgt: ${chargeId}`,
    text: [
      'Eine Rueckerstattung wurde registriert.',
      `Charge: ${chargeId}`,
      `Rueckerstattet: ${refundAmount}`,
      `Kunde: ${customerEmail || 'n/a'}`,
    ].join('\n'),
  });

  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: `Rueckerstattung bestaetigt (${chargeId})`,
      text: [
        'Eine Rueckerstattung wurde fuer deine Zahlung verbucht.',
        `Referenz: ${chargeId}`,
        `Betrag: ${refundAmount}`,
        '',
        'Bei Fragen melde dich gerne bei unserem Support.',
      ].join('\n'),
    });
  }
}

export async function POST(request) {
  try {
    if (!stripe || !webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook ist nicht konfiguriert.' },
        { status: 500 }
      );
    }

    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
    }

    const rawBody = await request.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'checkout.session.async_payment_failed':
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      case 'charge.refunded':
        await handleRefunded(event.data.object);
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'Webhook processing failed.' },
      { status: 500 }
    );
  }
}
