// src/pages/Invitation/CartList.jsx
import React from "react";
import { useCart } from "../invitation/CartProvider";
import { useNavigate } from "react-router-dom";

const currency = (n) => (n ?? 0).toLocaleString("ko-KR");

export default function CartList() {
  const { items, totals, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const handleOrder = () => {
    // 간단한 주문번호 생성
    const orderId = "OD-" + Date.now().toString(36).toUpperCase();

    // 완료 페이지에서 보여줄 최근 주문 정보 저장(안전용)
    const lastOrder = {
      orderId,
      count: totals.count,
      amount: totals.amount,
      items,
      ts: new Date().toISOString(),
    };
    try {
      localStorage.setItem("last_order", JSON.stringify(lastOrder));
    } catch {}

    // 장바구니 비우고 완료 페이지로 이동
    clear();
    navigate("/order-complete", { state: { orderId } });
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((it) => (
              <li
                key={it.key}
                className="flex gap-4 items-center rounded-xl border border-gray-200 p-4"
              >
                <img
                  src={it.image}
                  alt=""
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>

                  {/* 옵션이 있을 때만 보여주기 */}
                  {(it?.options?.design || it?.options?.envelope) && (
                    <div className="text-sm text-gray-500">
                      {it?.options?.design && <>디자인: {it.options.design} </>}
                      {it?.options?.envelope && (
                        <>/ 봉투: {it.options.envelope}</>
                      )}
                    </div>
                  )}

                  <div className="text-sm text-gray-500">수량: {it.qty}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {currency(it.unitPrice * it.qty)}원
                  </div>
                  <button
                    onClick={() => removeItem(it.key)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-600">총 {totals.count}개</div>
            <div className="text-xl font-bold">{currency(totals.amount)}원</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={clear}
              className="rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50"
            >
              비우기
            </button>
            <button
              onClick={handleOrder}
              className="flex-1 rounded-xl bg-gray-900 text-white px-4 py-3 font-semibold hover:-translate-y-0.5 hover:shadow"
            >
              주문하기
            </button>
          </div>
        </>
      )}
    </section>
  );
}
