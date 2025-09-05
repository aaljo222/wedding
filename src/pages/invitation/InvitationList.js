import React, { useEffect, useState } from "react";
import {
  listInvitations,
  removeInvitation,
} from "../../services/invitationsApi";
import { Link } from "react-router-dom";

export default function InvitationList() {
  const [inv, setInv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const list = await listInvitations();
        setInv(list);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    try {
      await removeInvitation(id);
      setInv((prev) => prev.filter((d) => String(d._id) !== String(id)));
    } catch (e) {
      alert(e.message || "삭제 실패");
    }
  };

  if (loading) return <div className="wl-page">불러오는 중…</div>;
  if (err) return <div className="wl-page text-red-600">{err}</div>;

  if (!inv.length)
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

  return (
    <div className="wl-page">
      <div className="wl-grid">
        {inv.map((i) => (
          <article
            key={i._id}
            className="wl-card"
            style={{ background: i.bg || "#fff" }}
          >
            <div className="wl-cover">
              {i.cover ? (
                <img src={i.cover} alt="" />
              ) : (
                <div className="wl-cover--pattern" />
              )}
            </div>
            <h1 className="wl-names">
              <span className="wl-name">{i.groomName}</span>
              <span className="wl-amp">&</span>
              <span className="wl-name">{i.brideName}</span>
            </h1>
            <section className="wl-intro">
              {i.title1 && <h2 className="wl-title">{i.title1}</h2>}
              {i.content && <p className="wl-body">{i.content}</p>}
            </section>
            <footer className="wl-actions">
              <Link
                to={`/invitation-edit/${i._id}`}
                className="wl-btn wl-btn--primary"
              >
                편집하기
              </Link>
              <button
                className="wl-btn wl-btn--ghost"
                onClick={() => onDelete(i._id)}
              >
                삭제하기
              </button>
            </footer>
          </article>
        ))}
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
