import { useState } from "react";

/** 공통 아코디언 섹션 (이해 쉬운 버전)
 * - props: title, defaultOpen=false, children
 * - 내부에서 isOpen 상태를 직접 들고 <details>의 open에 연결합니다.
 * - 요약: summary를 클릭하면 <details>가 토글되고, onToggle으로 isOpen을 동기화합니다.
 */
export function AccordionSection({ title, defaultOpen = false, children }) {
  // 1) "지금 열림 여부"를 눈으로 확인 가능한 state로 관리
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      // 2) <details>는 open 속성으로 열림/닫힘 상태를 가집니다.
      //    summary 클릭 → 브라우저가 open을 토글 → onToggle 이벤트 발생
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
      className="group rounded-2xl bg-white shadow-sm border border-gray-200"
    >
      {/* 3) summary는 토글 버튼 역할 */}
      <summary
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none
                   font-medium text-gray-800 rounded-2xl
                   [&::-webkit-details-marker]:hidden"
      >
        <span>{title}</span>

        {/* 4) 아이콘은 isOpen에 따라 회전 (Tailwind로 단순화) */}
        <svg
          className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>

      {/* 5) 본문 */}
      <div className="border-t border-gray-100 px-4 py-4">{children}</div>
    </details>
  );
}
