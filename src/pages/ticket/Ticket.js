// src/pages/Ticket/Ticket.jsx
import React, { useState } from "react";
import "../../css/Ticket.css";
import { ticketImages } from "../../data/TicketData";
import { useCart } from "../invitation2/CartProvider";
import { useNavigate } from "react-router-dom";

const parsePrice = (v) => Number(String(v).replace(/[^\d]/g, "")) || 0;

// 일반 상품: 100 ~ 500, 50단위
const QTY_OPTIONS = Array.from({ length: 9 }, (_, i) => 100 + i * 50);
const MIN_QTY = 100;
const MAX_QTY = 500;

/** 🔒 단일구매(1개 제한) 규칙 */
const SINGLE_ONLY_KEYWORDS = [/포스터/i];
const SINGLE_ONLY_TITLES = ["츄 & 조유리"];
// 3) 데이터에 ticket.singleOnly === true 면 무조건 단일구매

const isSingleOnly = (ticket) => {
  const title = ticket?.title?.trim() || "";
  return (
    ticket?.singleOnly === true ||
    SINGLE_ONLY_TITLES.includes(title) ||
    SINGLE_ONLY_KEYWORDS.some((rx) => rx.test(title))
  );
};

export default function Ticket() {
  const { items, addItem } = useCart();
  const navigate = useNavigate();

  const [qtyMap, setQtyMap] = useState({});

  const getKeyBase = (ticket) =>
    ticket.id ||
    (ticket.title ? ticket.title.replace(/\s+/g, "-").toLowerCase() : "ticket");

  const getQty = (key) => qtyMap[key] ?? MIN_QTY;

  const changeQty = (key, val) => {
    let n = Number(val) || MIN_QTY;
    n = Math.max(MIN_QTY, Math.min(MAX_QTY, n));
    setQtyMap((m) => ({ ...m, [key]: n }));
  };

  const addAndGo = (ticket) => {
    const unit = parsePrice(ticket.price);
    const keyBase = getKeyBase(ticket);
    const key = `ticket__${keyBase}`;
    const singleOnly = isSingleOnly(ticket);

    if (singleOnly) {
      // 이미 담겨있으면 추가 증가 없이 그대로 이동 (수량 1 유지)
      const exists = items.some((it) => it.key === key);
      if (!exists) {
        addItem({
          key,
          productId: keyBase,
          title: ticket.title || "상품",
          unitPrice: unit,
          qty: 1, // 🔒 항상 1개
          options: { singleOnly: true },
          image: ticket.image,
        });
      }
      navigate("/cartList");
      return;
    }

    // 일반 상품: 선택 수량(100~500, 50단위)으로 담기
    const qty = getQty(key);
    addItem({
      key,
      productId: keyBase,
      title: ticket.title || "식권",
      unitPrice: unit,
      qty,
      options: {},
      image: ticket.image,
    });

    navigate("/cart-list"); // ✅
  };

  return (
    <div className="meal-container">
      <div className="ticket-list">
        {ticketImages.map((ticket, index) => {
          const keyBase = getKeyBase(ticket);
          const key = `ticket__${keyBase}`;
          const singleOnly = isSingleOnly(ticket);

          const qty = singleOnly ? 1 : getQty(key);
          const options = singleOnly ? [1] : QTY_OPTIONS;

          return (
            <div className="ticket-card" key={ticket.id ?? index}>
              <img src={ticket.image} alt={ticket.title} />
              <div className="ticket-info">
                <h3 className="ticket-title">{ticket.title}</h3>

                <div className="price-container compact">
                  <p className="price">
                    {ticket.price}
                    {ticket.originalPrice && (
                      <span className="original">{ticket.originalPrice}</span>
                    )}
                  </p>
                  <span className="sale-tag">SALE</span>
                </div>

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
                      onChange={(e) =>
                        singleOnly ? null : changeQty(key, e.target.value)
                      }
                      disabled={singleOnly}
                      className={`w-24 h-9 rounded-lg border px-2.5 text-sm leading-5 ${
                        singleOnly
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                          : "border-gray-300"
                      }`}
                    >
                      {options.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  {singleOnly && (
                    <p className="mt-1 text-[11px] text-gray-500 text-right">
                      이 상품은 1개만 구매할 수 있어요.
                    </p>
                  )}
                </div>

                <div className="mt-3 cta-row w-full">
                  <button
                    className="w-full rounded-xl bg-black text-white px-4 py-2 font-medium hover:opacity-90 transition"
                    onClick={() => addAndGo(ticket)}
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
