import { useEffect, useState } from "react";

export function Calendar({ value, onChange }) {
  // "YYYY-MM-DD" → Date (비어있으면 오늘)
  const parse = (v) => {
    const [y, m, d] = (v || "").split("-").map(Number);
    const t = new Date();
    return new Date(
      Number.isFinite(y) ? y : t.getFullYear(),
      Number.isFinite(m) ? m - 1 : t.getMonth(),
      Number.isFinite(d) ? d : t.getDate()
    );
  };

  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const [view, setView] = useState(() => {
    const d = parse(value);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // 외부 value가 바뀌면 그 달로 이동
  useEffect(() => {
    const d = parse(value);
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [value]);

  const prevMonth = () =>
    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  const nextMonth = () =>
    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));

  // 달력 시작일: 해당 달 1일에서 요일만큼 뒤로
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay()); // 일요일 시작

  // 6주(42칸) 날짜 만들기
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const today = ymd(new Date());
  const selected = value;
  const inView = (d) =>
    d.getFullYear() === view.getFullYear() && d.getMonth() === view.getMonth();

  return (
    <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="h-8 w-8 rounded-full hover:bg-white/70"
          aria-label="이전 달"
        >
          ‹
        </button>
        <div className="text-sm font-medium tracking-wide text-rose-700">
          {view.getFullYear()}년 {view.getMonth() + 1}월
        </div>
        <button
          onClick={nextMonth}
          className="h-8 w-8 rounded-full hover:bg-white/70"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[12px] tracking-wider text-rose-400">
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {cells.map((d, i) => {
          const inMonth = inView(d);
          // console.log(inMonth);
          const isToday = inMonth && ymd(d) === today;
          const isSelected = inMonth && ymd(d) === selected;

          const base =
            "mx-auto my-1 flex h-9 w-9 items-center justify-center rounded-full text-sm";
          const tone = inMonth ? "text-rose-900" : "text-rose-300";
          const state = isSelected
            ? "bg-rose-300 text-white"
            : isToday
            ? "ring-2 ring-rose-300"
            : "hover:bg-white/70";

          return (
            <button
              key={i}
              onClick={() => onChange(ymd(d))}
              className={`${base} ${tone} ${state}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
