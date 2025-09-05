import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInvitation, updateInvitation } from "../../services/invitationsApi";

import { AccordionSection } from "./AccordionSection";

export default function InvitationEdit() {
  const { ino } = useParams(); // /invitation-edit/:ino
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
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

  const change = (e) =>
    setForm((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErr("");
      await updateInvitation(ino, form);
      nav("/invitation-list");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  // const onDelete = async () => {
  //   if (!window.confirm("삭제하시겠어요?")) return;
  //   try {
  //     await deleteInvitation(ino);
  //     nav("/invitation-list");
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // };

  if (!form)
    return (
      <div className="p-6">
        불러오는 중… {err && <span className="text-red-600">{err}</span>}
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">청첩장 편집</h1>
      {err && <p className="text-red-600">{err}</p>}

      <AccordionSection title="기본 정보" defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="title"
            value={form.title || ""}
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price || 0}
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="groomName"
            value={form.groomName || ""}
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="brideName"
            value={form.brideName || ""}
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="date"
            type="date"
            value={form.date || ""}
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="time"
            type="time"
            value={form.time || ""}
            onChange={change}
            className="border p-2 rounded"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="디자인">
        <input
          name="cover"
          value={form.cover || ""}
          onChange={change}
          className="border p-2 rounded w-full"
        />
        <input
          name="bg"
          value={form.bg || ""}
          onChange={change}
          className="border p-2 rounded w-full mt-2"
        />
      </AccordionSection>

      <AccordionSection title="문구">
        <input
          name="title1"
          value={form.title1 || ""}
          onChange={change}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="content"
          value={form.content || ""}
          onChange={change}
          className="border p-2 rounded w-full mt-2"
        />
      </AccordionSection>

      <div className="flex gap-3">
        <button
          disabled={saving}
          className="rounded-xl bg-black text-white px-4 py-3"
        >
          {saving ? "저장중…" : "저장"}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-xl border px-4 py-3"
        >
          삭제
        </button>
      </div>
    </form>
  );
}
