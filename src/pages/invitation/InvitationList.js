import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listInvitations, deleteInvitation } from "../../api/invitations";
import "../../css/InvitationList.css";
import logoImage from "../../art/logo.png";

export default function InvitationList() {
  const [invData, setInvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const list = await listInvitations();
      setInvData(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("삭제하시겠어요?")) return;
    try {
      await deleteInvitation(id);
      setInvData((v) => v.filter((i) => String(i._id) !== String(id)));
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div className="wl-page">불러오는 중…</div>;
  if (err) return <div className="wl-page text-red-600">{err}</div>;

  if (!Array.isArray(invData) || invData.length === 0) {
    return (
      <div className="wl-page">
        <div className="wl-empty">
          <h2>아직 청첩장이 없어요</h2>
          <p>첫 카드를 만들어보세요.</p>
          <Link to="/invitation-add" className="wl-btn wl-btn--primary">
            새 카드 만들기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wl-page">
      <div className="wl-grid">
        {invData.map((i) => {
          const id = i._id || i.id;
          const bg = i.bg || "#fff8f7";
          return (
            <article
              key={id}
              className="wl-card"
              style={{ backgroundColor: bg }}
            >
              <div className="wl-cover">
                {i.cover ? (
                  <img src={i.cover} alt="" />
                ) : (
                  <img src={logoImage} alt="THREE ORGANIC" />
                )}
              </div>

              <h1 className="wl-names">
                <span className="wl-name">{i.groomName}</span>
                <span className="wl-amp">&</span>
                <span className="wl-name">{i.brideName}</span>
              </h1>

              <footer className="wl-actions">
                <Link
                  to={`/invitation-edit/${id}`}
                  className="wl-btn wl-btn--primary"
                >
                  편집하기
                </Link>
                <button
                  onClick={() => onDelete(id)}
                  className="wl-btn wl-btn--ghost"
                >
                  삭제하기
                </button>
              </footer>
            </article>
          );
        })}
      </div>

      <div className="wl-add-container">
        <Link
          to="/invitation-add"
          className="wl-btn wl-btn--primary wl-btn--large"
        >
          청첩장 추가하기
        </Link>
      </div>
    </div>
  );
}
