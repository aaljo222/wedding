const WD_KO = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
const WD_EN_UP = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const pad2 = (n) => String(n).padStart(2, "0");
function toDate(ymd) {
  if (typeof ymd !== "string") return null;
  const parts = ymd.split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d))
    return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null; // 간단 검증
  return new Date(y, m - 1, d); // 로컬 자정
}

function parseHHmm(hhmm) {
  const parts = (hhmm || "").split(":");
  const H = Number(parts[0] ?? 0);
  const M = Number(parts[1] ?? 0);
  return { H: Number.isFinite(H) ? H : 0, M: Number.isFinite(M) ? M : 0 };
}

function labelKo(H) {
  if (H === 0) return { label: "자정", h12: 12 };
  if (H < 12) return { label: "오전", h12: H };
  if (H === 12) return { label: "낮", h12: 12 };
  return { label: "오후", h12: H - 12 };
}
/** 한 번에 필요한 문자열 전부 뽑기 */
export function FormatAll(dateStr, timeStr) {
  const d = toDate(dateStr);
  if (!d) {
    return {
      dateSlash: dateStr,
      dateDot: dateStr,
      weekdayUpperEn: "",
      koDateTimeFull: "",
      koDateTimeTail: "",
    };
  }
  const { H, M } = parseHHmm(timeStr);
  const { label, h12 } = labelKo(H);
  const minuteText = M > 0 ? ` ${M}분` : "";

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const wdIdx = d.getDay();

  return {
    dateSlash: `${yyyy} / ${mm} / ${dd}`,
    dateDot: `${yyyy}.${mm}.${dd}`,
    weekdayUpperEn: WD_EN_UP[wdIdx],
    koDateTimeFull: `${yyyy}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${
      WD_KO[wdIdx]
    }, ${label} ${h12}시${minuteText}`,
    koDateTimeTail: `${WD_KO[wdIdx]} ${label} ${h12}시${minuteText}`,
  };
}
