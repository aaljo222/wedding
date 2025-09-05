import { AccordionSection } from "./AccordionSection";
import "../../css/FormSections.css";

/** 폼 섹션 (InvitationEdit에서 그대로 꽂아 쓰면 됨) */
export function FormSections({
  // 테마
  bg,
  setBg,

  // 기본 정보
  date,
  setDate,
  time,
  setTime,
  groomName,
  setGroomName,
  brideName,
  setBrideName,

  // 메인 화면
  title1,
  setTitle1,
  content,
  setContent,
}) {
  const presets = ["#FFFFFF", "#F7F3EE", "#FFF0F6", "#E6F7FF", "#F0FFF4"];

  return (
    <div className="form-sections">
      {/* 테마 */}
      <AccordionSection title="테마" defaultOpen>
        <div className="section-grid">
          <div className="row">
            <label className="label">배경 색상</label>
          </div>

          <div className="color-swatch-list">
            {presets.map((c) => (
              <button
                key={c}
                type="button"
                className="color-swatch"
                style={{ "--swatch-color": c }}
                onClick={() => setBg(c)}
                title={c}
                aria-label={`배경색 ${c}`}
              />
            ))}
          </div>
        </div>
      </AccordionSection>

      {/* 기본 정보 */}
      <AccordionSection title="기본 정보" defaultOpen>
        <div className="section-grid">
          <div className="row">
            <label className="label" htmlFor="date">
              날짜
            </label>
            <input
              id="date"
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="row">
            <label className="label" htmlFor="time">
              시간
            </label>
            <input
              id="time"
              type="time"
              className="input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="row">
            <label className="label" htmlFor="groom">
              신랑
            </label>
            <input
              id="groom"
              className="input"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              placeholder="신랑 이름"
            />
          </div>

          <div className="row">
            <label className="label" htmlFor="bride">
              신부
            </label>
            <input
              id="bride"
              className="input"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              placeholder="신부 이름"
            />
          </div>
        </div>
      </AccordionSection>

      {/* 인사말 */}
      <AccordionSection title="인사말" defaultOpen>
        <div className="section-grid">
          <div className="row">
            <label className="label" htmlFor="title1">
              제목
            </label>
            <input
              id="title1"
              className="input"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
              placeholder="예: INVITATION"
            />
          </div>

          <div className="row">
            <label className="label" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              className="input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />
          </div>
        </div>
      </AccordionSection>
    </div>
  );
}
