// ./components/PurchaseModal.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartProvider";

function useLockBodyScroll(lock) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [lock]);
}

const currency = (n) => (n ?? 0).toLocaleString("ko-KR");

export default function PurchaseModal({
  open,
  onClose,
  product,
  designImages, // 선택된 디자인에 따른 이미지 맵 (선택)
}) {
  const navigate = useNavigate();
  useLockBodyScroll(open);
  const { addItem } = useCart();

  // 옵션 상태
  const [design, setDesign] = useState("");
  const [envelope, setEnvelope] = useState("");
  const [qty, setQty] = useState(1);
  const [agree, setAgree] = useState(false);

  // 모달 닫힐 때 초기화
  useEffect(() => {
    if (!open) {
      setDesign("");
      setEnvelope("");
      setQty(1);
      setAgree(false);
    }
  }, [open]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const unit = product.salePrice ?? product.price ?? 0;
  const shipping = product.shippingFee ?? 0;
  const subtotal = unit * qty;
  const total = subtotal + shipping;
  const canSubmit = design && envelope && agree;

  const currentImage = design
    ? designImages[design] || product.image
    : product.image;

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const addToCart = () => {
    if (!canSubmit) return;

    const keyBase = product.id || product.title || "product";
    const key = `${keyBase}__${design}__${envelope}`;
    console.log(key);

    addItem({
      key,
      productId: keyBase,
      title: product.title,
      unitPrice: unit,
      qty,
      options: { design, envelope },
      image: currentImage,
    });

    // 장바구니 담은 후 장바구니 페이지로 이동
    navigate("/cart-list"); // 라우트 경로/대소문자 일치 필수
    onClose?.();
    // alert("장바구니에 담겼습니다.");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className="relative w-full sm:w-[720px] max-h-[92vh] overflow-auto rounded-2xl bg-white shadow-xl"
        // onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {product.title || "모바일 청첩장"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
            aria-label="닫기"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="grid sm:grid-cols-[200px_1fr] gap-6 p-5">
          {/* Thumbnail (디자인 선택 시 변경) */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <img
              src={currentImage || "https://picsum.photos/seed/invite/600/800"}
              alt={
                (product.title || "상품 이미지") +
                (design ? ` - ${design}` : "")
              }
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            {/* Price */}
            <div className="mb-4">
              {product.salePrice ? (
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {currency(product.salePrice)}원
                  </div>
                  <div className="text-sm line-through text-gray-400">
                    {currency(product.price)}원
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  {currency(product.price)}원
                </div>
              )}
              {shipping > 0 ? (
                <div className="text-sm text-gray-500 mt-1">
                  배송비 {currency(shipping)}원
                </div>
              ) : (
                <div className="text-sm text-gray-500 mt-1">배송비 무료</div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  디자인 선택 <span className="text-rose-500">*</span>
                </label>
                <select
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                >
                  <option value="">옵션을 선택하세요</option>
                  <option value="classic">클래식</option>
                  <option value="blush">블러쉬</option>
                  <option value="minimal">미니멀</option>
                  <option value="modern">모던</option>
                </select>
                {design && (
                  <p className="mt-2 text-xs text-gray-500">
                    선택한 디자인 미리보기가 왼쪽 이미지에 반영됩니다.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  봉투 색상 <span className="text-rose-500">*</span>
                </label>
                <select
                  value={envelope}
                  onChange={(e) => setEnvelope(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                >
                  <option value="">옵션을 선택하세요</option>
                  <option value="white">화이트</option>
                  <option value="ivory">아이보리</option>
                  <option value="kraft">크라프트</option>
                </select>
              </div>

              {/* Qty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  수량
                </label>
                <div className="inline-flex items-center rounded-xl border border-gray-200">
                  <button
                    onClick={dec}
                    className="px-3 py-2 hover:bg-gray-50"
                    aria-label="수량 감소"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={qty}
                    onChange={(e) =>
                      setQty(
                        Math.min(99, Math.max(1, Number(e.target.value) || 1))
                      )
                    }
                    className="w-16 text-center border-x border-gray-200 py-2 focus:outline-none"
                  />
                  <button
                    onClick={inc}
                    className="px-3 py-2 hover:bg-gray-50"
                    aria-label="수량 증가"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>{currency(subtotal)}원</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>{currency(shipping)}원</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between font-semibold text-gray-900 text-base">
                  <span>결제 예상 금액</span>
                  <span>{currency(total)}원</span>
                </div>
              </div>

              {/* Agree */}
              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5"
                />
                주문 전 유의사항 및 교환·환불 규정을 확인했어요.
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-100 bg-white p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-40 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50"
            >
              취소
            </button>
            <button
              disabled={!canSubmit}
              onClick={addToCart}
              className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition
                ${
                  canSubmit
                    ? "bg-gray-900 hover:-translate-y-0.5 hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              title={
                !canSubmit
                  ? "필수 옵션 선택 및 동의가 필요합니다."
                  : "장바구니에 담기"
              }
            >
              장바구니에 담기
            </button>
          </div>
          <p className="mt-2 text-[12px] text-gray-500">
            장바구니는 브라우저에 저장되어 유지됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
