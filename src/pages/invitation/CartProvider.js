// ./cart/CartContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart_items")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      // 동일 상품 + 동일 옵션(디자인/봉투)은 수량만 증가
      const idx = prev.findIndex((x) => x.key === item.key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
  };

  const removeItem = (key) =>
    setItems((prev) => prev.filter((i) => i.key !== key));
  const clear = () => setItems([]);

  const totals = useMemo(
    () => ({
      count: items.reduce((a, b) => a + b.qty, 0),
      amount: items.reduce((a, b) => a + b.unitPrice * b.qty, 0),
    }),
    [items]
  );

  const value = { items, addItem, removeItem, clear, totals };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
