// src/components/InvitationAdd.jsx
import React, { useMemo, useState } from "react";
import { Calendar } from "./Calendar";
import "../../css/InvitationAdd.css";
import { Link, useNavigate } from "react-router-dom";
import { loadInvList, saveInvList } from "../../utils/invStore";
import { FormSections } from "./FormSections";
import { FormatAll } from "./FormatAll";

/* ================= ë©”ì¸: InvitationAdd ================= */
export default function InvitationAdd() {
  const navigate = useNavigate();

  // 1) ?¨ì¼ ?ŒìŠ¤: ë¡œì»¬?¤í† ë¦¬ì??ì„œ ê¸°ì¡´ ë¦¬ìŠ¤??ë¡œë“œ
  const [invData, setInvData] = useState(() => loadInvList());

  // 2) ? ê·œ ì¹´ë“œ??ino ê³„ì‚° (?„ì¬ invData ê¸°ì?)
  const nextIno = useMemo(() => {
    if (Array.isArray(invData) && invData.length > 0) {
      const maxIno = Math.max(...invData.map(({ ino }) => ino || 0));
      return maxIno + 1;
    }
    return 1;
  }, [invData]);

  // 3) ? ê·œ ì¹´ë“œ ?…ë ¥ ?íƒœ
  const [ino] = useState(nextIno);
  const [date, setDate] = useState("2025-09-01");
  const [time, setTime] = useState("12:00");
  const [groomName, setGroomName] = useState("?ê¸¸??);
  const [brideName, setBrideName] = useState("ê¹€?í¬");
  const [bg, setBg] = useState("#FFFFFF");
  const [title1, setTitle1] = useState("?Œì¤‘??ë¶„ë“¤??ì´ˆë??©ë‹ˆ??);
  const [content, setContent] = useState(
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

  // 4) ì¶”ê? ?¸ë“¤?? ë¡œì»¬ ?íƒœ + ë¡œì»¬?¤í† ë¦¬ì????€????ëª©ë¡?¼ë¡œ ?´ë™
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
    navigate("/invitation-list");
  };

  return (
    <div className="invitation-edit ie-page">
      {/* ?¼ìª½: ë¯¸ë¦¬ë³´ê¸° */}
      <div key={ino} className="preview-pane ie-preview">
        <div className="phone-frame" aria-label="ëª¨ë°”??ì²?²©??ë¯¸ë¦¬ë³´ê¸°">
          <div className="phone-notch" aria-hidden="true" />
          <div
            className="phone-canvas"
            style={{ ["--preview-bg"]: bg }} // CSS ë³€???ˆì „ ì§€??
          >
            <div className="phone-scroll">
              {/* ?ë‹¨ ? ì§œ/?”ì¼ */}
              <div className="section section--tight text-center">
                <h2 className="meta meta--upper">{fmt.dateSlash}</h2>
                <h2 className="meta meta--upper">{fmt.weekdayUpperEn}</h2>
              </div>

              {/* ?´ë¦„ */}
              <p className="names">
                <span className="name">{groomName}</span>
                <span className="dot">Â·</span>
                <span className="name">{brideName}</span>
              </p>

              {/* ?œêµ­??? ì§œ/?œê°„ ?¬ë§· */}
              <div className="text-center">
                <h2 className="meta">{fmt.koDateTimeFull}</h2>
              </div>

              {/* êµ¬ë¶„??*/}
              <div className="divider" aria-hidden="true" />

              {/* ?Œê°œ/ë³¸ë¬¸ */}
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
          <h2 className="form-title">ì²?²©???•ë³´ ?…ë ¥</h2>
          <p className="form-sub">
            ?´ìš©???…ë ¥?˜ë©´ ?¼ìª½ ë¯¸ë¦¬ë³´ê¸°??ì¦‰ì‹œ ë°˜ì˜?©ë‹ˆ??
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
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            ì¶”ê??˜ê¸°
          </button>
          <Link to="/InvitationList" className="btn btn-ghost">
            ëª©ë¡?¼ë¡œ
          </Link>
        </div>
      </div>
    </div>
  );
}
