import React, { useEffect, useState } from "react";
import { getInvitation, updateInvitation } from "../../services/invitationsApi";
import { useNavigate, useParams } from "react-router-dom";

export default function InvitationEdit() {
  const { ino } = useParams(); // App에서 /invitation-edit/:ino 로 잡혀 있음
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const doc = await getInvitation(ino);
        setForm(doc);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [ino]);

  if (!form)
    return (
      <div className="p-6">
        불러오는 중… {err && <span className="text-red-600">{err}</span>}
      </div>
    );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInvitation(ino, form);
      alert("수정 완료");
      nav("/invitation-list");
    } catch (e) {
      alert(e.message || "수정 실패");
    }
  };

  return (
    <form className="max-w-2xl mx-auto p-6 space-y-3" onSubmit={onSubmit}>
      <h1 className="text-xl font-bold">청첩장 수정</h1>
      <input
        name="title"
        value={form.title || ""}
        onChange={onChange}
        className="input"
      />
      <input
        name="title1"
        value={form.title1 || ""}
        onChange={onChange}
        className="input"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="groomName"
          value={form.groomName || ""}
          onChange={onChange}
          className="input"
        />
        <input
          name="brideName"
          value={form.brideName || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          name="date"
          value={form.date || ""}
          onChange={onChange}
          className="input"
        />
        <input
          type="time"
          name="time"
          value={form.time || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <input
        name="cover"
        value={form.cover || ""}
        onChange={onChange}
        className="input"
      />
      <input
        name="bg"
        value={form.bg || ""}
        onChange={onChange}
        className="input"
      />
      <textarea
        name="content"
        value={form.content || ""}
        onChange={onChange}
        className="textarea"
      />
      <button className="btn-primary">저장</button>
    </form>
  );
}
