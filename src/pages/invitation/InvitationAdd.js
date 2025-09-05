// src/components/InvitationAdd.jsx
import React, { useMemo, useState } from "react";
import { FormSections } from "./FormSections";
import { Calendar } from "./Calendar";
import "../../css/InvitationAdd.css";
import { FormatAll } from "./FormatAll";
import { Link, useNavigate } from "react-router-dom";
import { loadInvList, saveInvList } from "../../utils/invStore";

/* ================= 메인: InvitationAdd ================= */
export default function InvitationAdd() {
  const navigate = useNavigate();

  // 1) 단일 소스: 로컬스토리지에서 기존 리스트 로드
  const [invData, setInvData] = useState(() => loadInvList());

  // 2) 신규 카드의 ino 계산 (현재 invData 기준)
  const nextIno = useMemo(() => {
    if (Array.isArray(invData) && invData.length > 0) {
      const maxIno = Math.max(...invData.map(({ ino }) => ino || 0));
      return maxIno + 1;
    }
    return 1;
  }, [invData]);

  // 3) 신규 카드 입력 상태
  const [ino] = useState(nextIno);
  const [date, setDate] = useState("2025-09-01");
  const [time, setTime] = useState("12:00");
  const [groomName, setGroomName] = useState("홍길동");
  const [brideName, setBrideName] = useState("김영희");
  const [bg, setBg] = useState("#FFFFFF");
  const [title1, setTitle1] = useState("소중한 분들을 초대합니다");
  const [content, setContent] = useState(
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

  // 4) 추가 핸들러: 로컬 상태 + 로컬스토리지에 저장 후 목록으로 이동
  const handleAdd = () => {
    const newItem = {
      ino,
      date,
      time,
      groomName,
      brideName,
      bg,
      title1,
      content,
    };
    const addedData = [...(invData || []), newItem];
    setInvData(addedData);
    saveInvList(addedData);
    navigate("/InvitationList");
  };

  return (
    <div className="invitation-edit ie-page">
      {/* 왼쪽: 미리보기 */}
      <div key={ino} className="preview-pane ie-preview">
        <div className="phone-frame" aria-label="모바일 청첩장 미리보기">
          <div className="phone-notch" aria-hidden="true" />
          <div
            className="phone-canvas"
            style={{ ["--preview-bg"]: bg }} // CSS 변수 안전 지정
          >
            <div className="phone-scroll">
              {/* 상단 날짜/요일 */}
              <div className="section section--tight text-center">
                <h2 className="meta meta--upper">{fmt.dateSlash}</h2>
                <h2 className="meta meta--upper">{fmt.weekdayUpperEn}</h2>
              </div>

              {/* 이름 */}
              <p className="names">
                <span className="name">{groomName}</span>
                <span className="dot">·</span>
                <span className="name">{brideName}</span>
              </p>

              {/* 한국어 날짜/시간 포맷 */}
              <div className="text-center">
                <h2 className="meta">{fmt.koDateTimeFull}</h2>
              </div>

              {/* 구분선 */}
              <div className="divider" aria-hidden="true" />

              {/* 소개/본문 */}
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
          <h2 className="form-title">청첩장 정보 입력</h2>
          <p className="form-sub">
            내용을 입력하면 왼쪽 미리보기에 즉시 반영됩니다.
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
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            추가하기
          </button>
          <Link to="/InvitationList" className="btn btn-ghost">
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
