'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'aquatime_cart_v1';

const CartContext = createContext(null);

function normalizeQty(quantity) {
  const num = Number.parseInt(quantity, 10);
  if (!Number.isFinite(num) || num < 1) return 1;
  if (num > 99) return 99;
  return num;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = (product, quantity = 1) => {
    const safeQty = normalizeQty(quantity);

    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: normalizeQty(item.quantity + safeQty) }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          priceMinor: product.priceMinor,
          category: product.category,
          weightKg: product.weightKg || 0,
          quantity: safeQty,
        },
      ];
    });
  };

  const updateQty = (slug, quantity) => {
    const safeQty = normalizeQty(quantity);
    setItems((prev) => prev.map((item) => (item.slug === slug ? { ...item, quantity: safeQty } : item)));
  };

  const removeItem = (slug) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalMinor = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
    return { itemsCount, subtotalMinor };
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, updateQty, removeItem, clearCart, isHydrated, ...totals }),
    [items, isHydrated, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart muss innerhalb von CartProvider genutzt werden.');
  }
  return ctx;
}
