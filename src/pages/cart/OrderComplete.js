// src/pages/Order/OrderComplete.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const currency = (n) => (n ?? 0).toLocaleString("ko-KR");

export default function OrderComplete() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 라우팅 상태 없을 때를 대비해서 localStorage에서 복구
  let orderId = state?.orderId;
  let lastOrder = null;
  try {
    const raw = localStorage.getItem("last_order");
    lastOrder = raw ? JSON.parse(raw) : null;
    if (!orderId) orderId = lastOrder?.orderId;
  } catch {}

  return (
    <section className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2">주문이 완료되었습니다</h1>
      {orderId && (
        <p className="text-gray-600 mb-1">
          주문번호 <span className="font-mono font-semibold">{orderId}</span>
        </p>
      )}
      {lastOrder?.amount != null && (
        <p className="text-gray-600 mb-6">
          총 결제 예정 금액{" "}
          <span className="font-semibold">{currency(lastOrder.amount)}원</span>{" "}
          · 상품 {lastOrder.count}개
        </p>
      )}

      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() => navigate("/")}
          className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
        >
          홈으로 가기
        </button>
        <button
          onClick={() => navigate("/InvitationList")}
          className="rounded-xl bg-gray-900 text-white px-5 py-3 font-semibold hover:-translate-y-0.5 hover:shadow"
        >
          계속 쇼핑하기
        </button>
      </div>
    </section>
  );
}
