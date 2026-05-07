const STORE_API_BASE = 'https://aquatimegmbh.de/wp-json/wc/store/v1';

function parseWeightKg(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value > 0 ? value : 0;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const normalized = value.replace(',', '.').trim();
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return parsed;
}

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugToLabel(slug = '') {
  return slug
    .replace(/aquatime-/g, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function mapProduct(raw) {
  const category = raw.categories?.[0];
  const image = raw.images?.[0];
  const priceMinor = Number.parseInt(raw.prices?.price || '0', 10);
  const regularMinor = Number.parseInt(raw.prices?.regular_price || '0', 10);

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    permalink: raw.permalink,
    description: stripHtml(raw.short_description || raw.description || ''),
    shortDescription: stripHtml(raw.short_description || ''),
    category: category?.name?.replace(/&amp;/g, '&') || slugToLabel(category?.slug || 'Produkt'),
    categorySlug: category?.slug || 'allgemein',
    image: image?.src || image?.thumbnail || '',
    imageAlt: image?.alt || raw.name,
    priceMinor,
    regularPriceMinor: regularMinor,
    onSale: Boolean(raw.on_sale),
    inStock: Boolean(raw.is_in_stock),
    hasOptions: Boolean(raw.has_options),
    rating: Number.parseFloat(raw.average_rating || '0') || 0,
    reviewCount: raw.review_count || 0,
    sku: raw.sku || '',
    weightKg: parseWeightKg(raw.weight),
    addToCartText: raw.add_to_cart?.text || 'In den Warenkorb',
  };
}

export function formatEuro(minorAmount = 0) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((minorAmount || 0) / 100);
}

async function fetchPage(page = 1, perPage = 100) {
  const url = `${STORE_API_BASE}/products?per_page=${perPage}&page=${page}`;
  const res = await fetch(url, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error(`Produktabfrage fehlgeschlagen: ${res.status}`);
  }

  return res.json();
}

export async function getAllProducts() {
  const perPage = 24;
  let page = 1;
  const all = [];

  while (true) {
    const chunk = await fetchPage(page, perPage);
    if (!Array.isArray(chunk) || chunk.length === 0) {
      break;
    }

    all.push(...chunk.map(mapProduct));

    if (chunk.length < perPage) {
      break;
    }

    page += 1;
    if (page > 100) {
      break;
    }
  }

  return all;
}

export async function getProductBySlug(slug) {
  const url = `${STORE_API_BASE}/products?slug=${encodeURIComponent(slug)}&per_page=1`;
  const res = await fetch(url, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    return null;
  }

  const items = await res.json();
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return mapProduct(items[0]);
}

export async function getFeaturedProducts(limit = 6) {
  const products = await getAllProducts();

  return products
    .filter((p) => p.inStock)
    .sort((a, b) => {
      if (a.onSale !== b.onSale) return a.onSale ? -1 : 1;
      return b.priceMinor - a.priceMinor;
    })
    .slice(0, limit);
}

export function getUniqueCategories(products) {
  return [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b, 'de'));
}
