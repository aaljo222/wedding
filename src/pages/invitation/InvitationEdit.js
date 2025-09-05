// src/components/InvitationEdit.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormatAll } from "./FormatAll";
import { Calendar } from "./Calendar";
import { FormSections } from "./FormSections";
import "../../css/InvitationAdd.css"; // ê¸°ì¡´ ?¤í????¬ì‚¬??
import { loadInvList, saveInvList } from "../../utils/invStore";

const InvitationEdit = () => {
  const { ino } = useParams();
  const inoNum = useMemo(() => Number(ino), [ino]);
  const navigate = useNavigate();

  // ?¨ì¼ ?ŒìŠ¤: ë¡œì»¬?¤í† ë¦¬ì??ì„œ ë¡œë“œ
  const [invData, setInvData] = useState(() => loadInvList());

  // ?¸ì§‘ ?€??ì°¾ê¸° (??ƒ invData?ì„œ find)
  const existing = useMemo(
    () => invData.find((card) => card.ino === inoNum),
    [invData, inoNum]
  );

  useEffect(() => {
    if (!existing) navigate("/invitation-list");
  }, [existing, navigate]);

  // ???íƒœ (existing ê¸°ë°˜ ì´ˆê¸°ê°?
  const [date, setDate] = useState(existing?.date || "2025-09-01");
  const [time, setTime] = useState(existing?.time || "12:00");
  const [groomName, setGroomName] = useState(existing?.groomName || "?ê¸¸??);
  const [brideName, setBrideName] = useState(existing?.brideName || "ê¹€?í¬");
  const [bg, setBg] = useState(existing?.bg || "#FFFFFF");
  const [title1, setTitle1] = useState(
    existing?.title1 || "?Œì¤‘??ë¶„ë“¤??ì´ˆë??©ë‹ˆ??
  );
  const [content, setContent] = useState(
    existing?.content ??
      `?€?????¬ëŒ???‘ì? ë§Œë‚¨??

?¬ë‘??ê²°ì‹¤???´ë£¨??

?Œì¤‘??ê²°í˜¼?ì„ ?¬ë¦¬ê²??˜ì—ˆ?µë‹ˆ??

?‰ìƒ ?œë¡œ ê·€?˜ê²Œ ?¬ê¸°ë©?
ì²?ë§ˆìŒ ê·¸ë?ë¡?ì¡´ì¤‘?˜ê³  ë°°ë ¤?˜ë©° ?´ê² ?µë‹ˆ??

?¤ë¡œì§€ ë¯¿ìŒê³??¬ë‘???½ì†?˜ëŠ” ??
?¤ì…”??ì¶•ë³µ??ì£¼ì‹œë©????†ëŠ” ê¸°ì¨?¼ë¡œ
ê°„ì§?˜ê² ?µë‹ˆ??`
  );

  const fmt = FormatAll(date, time);

  // ?€???…ë°?´íŠ¸)
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

  if (!existing) return null; // ì§§ì? ê°€??

  return (
    <div className="invitation-edit ie-page">
      {/* ?¼ìª½: ë¯¸ë¦¬ë³´ê¸° */}
      <div className="preview-pane ie-preview">
        <div className="phone-frame" aria-label="ëª¨ë°”??ì²?²©??ë¯¸ë¦¬ë³´ê¸°">
          <div className="phone-notch" aria-hidden="true" />
          <div
            className="phone-canvas"
            style={{ ["--preview-bg"]: bg }} // CSS ë³€??ì§€??
          >
            <div className="phone-scroll">
              {/* ?ë‹¨ ? ì§œ/?”ì¼ */}
              <div className="section section--tight text-center">
                <h2 className="meta meta--upper">{fmt.dateSlash}</h2>
                <h2 className="meta meta--upper">{fmt.weekdayUpperEn}</h2>
              </div>

              {/* ? ë‘/? ë? ?´ë¦„ */}
              <p className="names">
                <span className="name">{groomName}</span>
                <span className="dot">Â·</span>
                <span className="name">{brideName}</span>
              </p>

              {/* ?œêµ­??? ì§œ/?œê°„ */}
              <div className="text-center">
                <h2 className="meta">{fmt.koDateTimeFull}</h2>
              </div>

              {/* êµ¬ë¶„??*/}
              <div className="divider" aria-hidden="true" />

              {/* ?¸ì‚¬ë§?*/}
              <div className="intro">
                <p className="intro__tag">INVITATION</p>
                <p className="intro__title">{title1}</p>
                <p className="intro__body">{content}</p>
              </div>

              {/* ?˜ë‹¨ ?¬ë§· */}
              <div className="section text-center">
                <h2 className="meta meta--upper">{fmt.dateDot}</h2>
                <h2 className="meta">{fmt.koDateTimeTail}</h2>
              </div>

              {/* ?¬ë ¥ */}
              <div className="section section--calendar">
                <Calendar value={date} onChange={setDate} />
              </div>
            </div>
          </div>
          <div className="phone-homebar" aria-hidden="true" />
        </div>
      </div>

      {/* ?¤ë¥¸ìª? ?…ë ¥ ??*/}
      <div className="form-pane ie-form">
        <header className="form-header">
          <h2 className="form-title">ì²?²©???•ë³´ ?¸ì§‘</h2>
          <p className="form-sub">
            ?¤ë¥¸ìª½ì„ ?˜ì •?˜ë©´ ?¼ìª½ ë¯¸ë¦¬ë³´ê¸°??ì¦‰ì‹œ ë°˜ì˜?©ë‹ˆ??
          </p>
        </header>

        <FormSections
          // ?Œë§ˆ
          bg={bg}
          setBg={setBg}
          // ê¸°ë³¸ ?•ë³´
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          groomName={groomName}
          setGroomName={setGroomName}
          brideName={brideName}
          setBrideName={setBrideName}
          // ?¸ì‚¬ë§?
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
            ?˜ì •?˜ê¸°
          </button>
          <Link to="/InvitationList" className="btn btn-ghost">
            ëª©ë¡?¼ë¡œ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvitationEdit;
