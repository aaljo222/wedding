import React, { useState } from "react";
import "../../css/Frame.css";
import { products } from "../../data/FrameData";
import { useCart } from "../invitation/CartProvider";
import { useNavigate } from "react-router-dom";

const currency = (n) => (n ?? 0).toLocaleString("ko-KR");
const QTY_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Frame() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qtyMap, setQtyMap] = useState({});

  const getKeyBase = (item) =>
    item.id ||
    (item.title ? item.title.replace(/\s+/g, "-").toLowerCase() : "frame"); // 정규표현식?

  const getQty = (key) => qtyMap[key] ?? 1;

  const changeQty = (key, val) => {
    const n = Math.max(1, Math.min(999, Number(val) || 1));
    setQtyMap((m) => ({ ...m, [key]: n }));
  };

  const addAndGo = (item) => {
    const keyBase = getKeyBase(item);
    const key = `frame__${keyBase}`;
    const unit = item.salePrice ?? item.originalPrice ?? 0;
    const qty = getQty(key);

    addItem({
      key,
      productId: keyBase,
      title: item.title || "액자",
      unitPrice: unit,
      qty,
      options: {},
      image: item.image,
    });

    navigate("/cartList");
  };

  return (
    <div className="frame-container">
      <div className="frame-header">
        <img
          src="https://cdn.imweb.me/thumbnail/20250529/4d1743d368a87.jpg"
          alt="프레임 메인 이미지"
        />
      </div>

      <div className="product-grid">
        {products.map((item) => {
          const keyBase = getKeyBase(item);
          const key = `frame__${keyBase}`;
          const qty = getQty(key);
          const unit = item.salePrice ?? item.originalPrice ?? 0;

          return (
            <div className="product-card" key={item.id ?? keyBase}>
              <img
                src={item.image}
                alt={item.title}
                className="product-image"
              />

              <div className="product-info">
                {/* 제목: CSS에서 2줄 말줄임 + 여백 축소 */}
                <p className="title clamp-2">{item.title}</p>

                {/* 가격: 여백/간격 축소 */}
                <div className="price tight">
                  {item.originalPrice != null && (
                    <span className="original">
                      {currency(item.originalPrice)}원
                    </span>
                  )}
                  <span className="sale">{currency(unit)}원</span>
                </div>

                {/* 수량: 가운데 정렬, 여백 축소 */}
                <div className="qty-wrap">
                  <label htmlFor={`qty-${key}`} className="qty-label">
                    수량
                  </label>
                  <select
                    id={`qty-${key}`}
                    value={qty}
                    onChange={(e) => changeQty(key, e.target.value)}
                    className="qty-select"
                  >
                    {QTY_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CTA: 위 여백 축소 */}
                <div className="cta-wrap">
                  <button
                    className="w-full rounded-xl bg-black text-white px-4 py-2 font-medium hover:opacity-90 transition"
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
