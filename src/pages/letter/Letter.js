// src/pages/Letter/Letter.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Ticket.css";
import { ticketImages } from "../../data/LetterData";
import { useCart } from "../invitation2/CartProvider";

// "12,900원" → 12900
const parsePrice = (v) => Number(String(v).replace(/[^\d]/g, "")) || 0;

// ✅ 수량: 10 ~ 100, 10개 단위
const QTY_OPTIONS = Array.from({ length: 10 }, (_, i) => (i + 1) * 10); // [10,20,...,100]
const MIN_QTY = 10;
const MAX_QTY = 100;

export default function Letter() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  // 각 상품별 선택 수량 저장
  const [qtyMap, setQtyMap] = useState({});

  const getKeyBase = (item) =>
    item.id ||
    (item.title ? item.title.replace(/\s+/g, "-").toLowerCase() : "letter");

  const getQty = (key) => qtyMap[key] ?? MIN_QTY;

  const changeQty = (key, val) => {
    let n = Number(val) || MIN_QTY;
    n = Math.max(MIN_QTY, Math.min(MAX_QTY, n));
    setQtyMap((m) => ({ ...m, [key]: n }));
  };

  const addAndGo = (item) => {
    if (item.soldOut) return;

    const unit = parsePrice(item.price);
    const keyBase = getKeyBase(item);
    const key = `letter__${keyBase}`;
    const qty = getQty(key);

    addItem({
      key,
      productId: keyBase,
      title: item.title || "편지봉투",
      unitPrice: unit,
      qty, // ✅ 선택한 수량(10~100, 10단위)
      options: {},
      image: item.image,
    });

    navigate("/cartList");
  };

  return (
    <div className="meal-container">
      <div className="ticket-list">
        {ticketImages.map((item, index) => {
          const keyBase = getKeyBase(item);
          const key = `letter__${keyBase}`;
          const qty = getQty(key);

          return (
            <div
              className="ticket-card"
              key={item.id ?? index}
              style={{ opacity: item.soldOut ? 0.5 : 1 }}
            >
              <img src={item.image} alt={item.title || `letter-${index}`} />
              <div className="ticket-info">
                {/* 제목 */}
                <h3 className="ticket-title">{item.title}</h3>

                {/* 가격 + 태그 */}
                <div className="price-container compact">
                  <p className="price">
                    {item.price}
                    {item.originalPrice && (
                      <span className="original">{item.originalPrice}</span>
                    )}
                  </p>
                  {item.soldOut ? (
                    <span className="soldout-tag">SOLD OUT</span>
                  ) : (
                    <span className="sale-tag">SALE</span>
                  )}
                </div>

                {/* 수량: 좌측 라벨 / 우측 셀렉트 (작게) */}
                <div className="mt-2 qty-row">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <label
                      htmlFor={`qty-${key}`}
                      className="text-[13px] text-gray-700 whitespace-nowrap"
                    >
                      수량
                    </label>
                    <select
                      id={`qty-${key}`}
                      value={qty}
                      onChange={(e) => changeQty(key, e.target.value)}
                      disabled={item.soldOut}
                      className={`w-24 h-9 rounded-lg border px-2.5 text-sm leading-5 ${
                        item.soldOut
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                          : "border-gray-300"
                      }`}
                    >
                      {QTY_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-3 cta-row w-full">
                  <button
                    disabled={item.soldOut}
                    className={`w-full rounded-xl px-4 py-2 font-medium transition ${
                      item.soldOut
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-black text-white hover:opacity-90"
                    }`}
                    onClick={() => addAndGo(item)}
                  >
                    담고 이동
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
