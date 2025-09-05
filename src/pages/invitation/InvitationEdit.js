// src/components/InvitationEdit.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormatAll } from "./FormatAll";
import { Calendar } from "./Calendar";
import { FormSections } from "./FormSections";
import "../../css/InvitationAdd.css"; // 기존 스타일 재사용
import { loadInvList, saveInvList } from "../../utils/invStore";

const InvitationEdit = () => {
  const { ino } = useParams();
  const inoNum = useMemo(() => Number(ino), [ino]);
  const navigate = useNavigate();

  // 단일 소스: 로컬스토리지에서 로드
  const [invData, setInvData] = useState(() => loadInvList());

  // 편집 대상 찾기 (항상 invData에서 find)
  const existing = useMemo(
    () => invData.find((card) => card.ino === inoNum),
    [invData, inoNum]
  );

  useEffect(() => {
    if (!existing) navigate("/InvitationList");
  }, [existing, navigate]);

  // 폼 상태 (existing 기반 초기값)
  const [date, setDate] = useState(existing?.date || "2025-09-01");
  const [time, setTime] = useState(existing?.time || "12:00");
  const [groomName, setGroomName] = useState(existing?.groomName || "홍길동");
  const [brideName, setBrideName] = useState(existing?.brideName || "김영희");
  const [bg, setBg] = useState(existing?.bg || "#FFFFFF");
  const [title1, setTitle1] = useState(
    existing?.title1 || "소중한 분들을 초대합니다"
  );
  const [content, setContent] = useState(
    existing?.content ??
      `저희 두 사람의 작은 만남이

사랑의 결실을 이루어

소중한 결혼식을 올리게 되었습니다.

평생 서로 귀하게 여기며
첫 마음 그대로 존중하고 배려하며 살겠습니다.

오로지 믿음과 사랑을 약속하는 날
오셔서 축복해 주시면 더 없는 기쁨으로
간직하겠습니다.`
  );

  const fmt = FormatAll(date, time);

  // 저장(업데이트)
  const handleUpdate = () => {
    setInvData((prev) => {
      const updatedData = (prev || []).map((card) =>
        card.ino === inoNum
          ? { ...card, date, time, groomName, brideName, bg, title1, content }
          : card
      );
      saveInvList(updatedData);
      return updatedData;
    });
    navigate("/InvitationList");
  };

  if (!existing) return null; // 짧은 가드

  return (
    <div className="invitation-edit ie-page">
      {/* 왼쪽: 미리보기 */}
      <div className="preview-pane ie-preview">
        <div className="phone-frame" aria-label="모바일 청첩장 미리보기">
          <div className="phone-notch" aria-hidden="true" />
          <div
            className="phone-canvas"
            style={{ ["--preview-bg"]: bg }} // CSS 변수 지정
          >
            <div className="phone-scroll">
              {/* 상단 날짜/요일 */}
              <div className="section section--tight text-center">
                <h2 className="meta meta--upper">{fmt.dateSlash}</h2>
                <h2 className="meta meta--upper">{fmt.weekdayUpperEn}</h2>
              </div>

              {/* 신랑/신부 이름 */}
              <p className="names">
                <span className="name">{groomName}</span>
                <span className="dot">·</span>
                <span className="name">{brideName}</span>
              </p>

              {/* 한국어 날짜/시간 */}
              <div className="text-center">
                <h2 className="meta">{fmt.koDateTimeFull}</h2>
              </div>

              {/* 구분선 */}
              <div className="divider" aria-hidden="true" />

              {/* 인사말 */}
              <div className="intro">
                <p className="intro__tag">INVITATION</p>
                <p className="intro__title">{title1}</p>
                <p className="intro__body">{content}</p>
              </div>

              {/* 하단 포맷 */}
              <div className="section text-center">
                <h2 className="meta meta--upper">{fmt.dateDot}</h2>
                <h2 className="meta">{fmt.koDateTimeTail}</h2>
              </div>

              {/* 달력 */}
              <div className="section section--calendar">
                <Calendar value={date} onChange={setDate} />
              </div>
            </div>
          </div>
          <div className="phone-homebar" aria-hidden="true" />
        </div>
      </div>

      {/* 오른쪽: 입력 폼 */}
      <div className="form-pane ie-form">
        <header className="form-header">
          <h2 className="form-title">청첩장 정보 편집</h2>
          <p className="form-sub">
            오른쪽을 수정하면 왼쪽 미리보기에 즉시 반영됩니다.
          </p>
        </header>

        <FormSections
          // 테마
          bg={bg}
          setBg={setBg}
          // 기본 정보
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          groomName={groomName}
          setGroomName={setGroomName}
          brideName={brideName}
          setBrideName={setBrideName}
          // 인사말
          title1={title1}
          setTitle1={setTitle1}
          content={content}
          setContent={setContent}
        />

        <div className="sticky-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            수정하기
          </button>
          <Link to="/InvitationList" className="btn btn-ghost">
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvitationEdit;
