export function parseWeightKg(value) {
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

function estimateWeightKg(item) {
  if (item.weightKg && item.weightKg > 0) {
    return item.weightKg;
  }

  const text = `${item.category || ''} ${item.name || ''}`.toLowerCase();

  if (text.includes('gewerbe') || text.includes('industrie')) return 35;
  if (text.includes('enthaert') || text.includes('osmose') || text.includes('uv')) return 25;
  if (text.includes('kartusche') || text.includes('membran')) return 2;
  if (text.includes('zubehoer') || text.includes('filter')) return 3;

  if ((item.priceMinor || 0) >= 60000) return 20;
  if ((item.priceMinor || 0) >= 20000) return 8;
  return 4;
}

export function calculateShippingMinor(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  const subtotalMinor = items.reduce(
    (sum, item) => sum + (item.priceMinor || 0) * (item.quantity || 0),
    0
  );

  if (subtotalMinor >= 120000) {
    return 0;
  }

  const totalWeightKg = items.reduce((sum, item) => {
    const qty = item.quantity || 0;
    return sum + estimateWeightKg(item) * qty;
  }, 0);

  let shipping = 790;

  if (totalWeightKg > 15) shipping += 1490;
  if (totalWeightKg > 40) shipping += 2990;

  const hasBulkySystem = items.some((item) => {
    const text = `${item.category || ''} ${item.name || ''}`.toLowerCase();
    return text.includes('enthaert') || text.includes('osmose');
  });

  if (hasBulkySystem) {
    shipping += 1200;
  }

  return Math.min(shipping, 9900);
}

export function calculateOrderTotals(items = []) {
  const subtotalMinor = (items || []).reduce(
    (sum, item) => sum + (item.priceMinor || 0) * (item.quantity || 0),
    0
  );
  const shippingMinor = calculateShippingMinor(items);
  const totalMinor = subtotalMinor + shippingMinor;

  return { subtotalMinor, shippingMinor, totalMinor };
}
