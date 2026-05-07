import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySlug } from '@/lib/shop';
import { calculateOrderTotals } from '@/lib/shipping';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2025-03-31.basil',
    })
  : null;

export async function POST(request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const customer = body?.customer || {};
    const consent = body?.consent || {};

    if (!items.length) {
      return NextResponse.json({ error: 'Keine Produkte im Warenkorb.' }, { status: 400 });
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'zip', 'city', 'country'];
    for (const field of requiredFields) {
      if (!String(customer[field] || '').trim()) {
        return NextResponse.json(
          { error: `Bitte Pflichtfeld ausfuellen: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!consent.acceptTerms || !consent.acceptPrivacy) {
      return NextResponse.json(
        { error: 'Bitte AGB und Datenschutz akzeptieren.' },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        {
          error:
            'Stripe ist noch nicht konfiguriert. Bitte STRIPE_SECRET_KEY in den Umgebungsvariablen setzen.',
        },
        { status: 500 }
      );
    }

    const origin = body?.origin || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const normalizedItems = [];
    for (const item of items) {
      const slug = String(item?.slug || '').trim();
      const quantity = Math.max(1, Math.min(99, Number.parseInt(item?.quantity || '1', 10) || 1));

      if (!slug) continue;

      const liveProduct = await getProductBySlug(slug);
      if (!liveProduct || !liveProduct.inStock) continue;

      normalizedItems.push({
        id: liveProduct.id,
        slug: liveProduct.slug,
        name: liveProduct.name,
        image: liveProduct.image,
        category: liveProduct.category,
        priceMinor: liveProduct.priceMinor,
        weightKg: liveProduct.weightKg || 0,
        quantity,
      });
    }

    if (!normalizedItems.length) {
      return NextResponse.json(
        { error: 'Keine verfuegbaren Produkte im Warenkorb.' },
        { status: 400 }
      );
    }

    const { shippingMinor } = calculateOrderTotals(normalizedItems);

    const line_items = normalizedItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: item.priceMinor,
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          metadata: {
            slug: item.slug || '',
            category: item.category || '',
          },
        },
      },
    }));

    if (shippingMinor > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: shippingMinor,
          product_data: {
            name: 'Versandkosten',
            metadata: {
              type: 'shipping',
            },
          },
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/abbruch`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
      customer_email: customer.email,
      phone_number_collection: {
        enabled: true,
      },
      consent_collection: {
        terms_of_service: 'required',
      },
      allow_promotion_codes: true,
      locale: 'de',
      metadata: {
        source: 'aquatime-next-shop',
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone || '',
        company: customer.company || '',
        addressStreet: customer.street,
        addressZip: customer.zip,
        addressCity: customer.city,
        addressCountry: customer.country,
        gdprTerms: String(Boolean(consent.acceptTerms)),
        gdprPrivacy: String(Boolean(consent.acceptPrivacy)),
        gdprRevocation: String(Boolean(consent.acceptRevocation)),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'Checkout konnte nicht erstellt werden.' },
      { status: 500 }
    );
  }
}
