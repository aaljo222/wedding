import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInvitation } from "../../api/invitations";
import { AccordionSection } from "./AccordionSection";

export default function InvitationAdd() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    groomName: "",
    brideName: "",
    date: "",
    time: "",
    price: 0,
    options: {},
    cover: "",
    bg: "#fff8f7",
    content: "",
    title1: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const change = (e) =>
    setForm((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErr("");
      await createInvitation(form);
      nav("/invitation-list");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">새 청첩장</h1>
      {err && <p className="text-red-600">{err}</p>}

      <AccordionSection title="기본 정보" defaultOpen>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="title"
            placeholder="제목"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            placeholder="가격"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="groomName"
            placeholder="신랑 이름"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="brideName"
            placeholder="신부 이름"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="date"
            type="date"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="time"
            type="time"
            onChange={change}
            className="border p-2 rounded"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="디자인">
        <input
          name="cover"
          placeholder="커버 이미지 URL"
          onChange={change}
          className="border p-2 rounded w-full"
        />
        <input
          name="bg"
          placeholder="배경색 (예: #fff8f7)"
          onChange={change}
          className="border p-2 rounded w-full mt-2"
        />
      </AccordionSection>

      <AccordionSection title="문구">
        <input
          name="title1"
          placeholder="부제(예: INVITATION)"
          onChange={change}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="content"
          placeholder="소개 문구"
          onChange={change}
          className="border p-2 rounded w-full mt-2"
        />
      </AccordionSection>

      <button
        disabled={saving}
        className="rounded-xl bg-black text-white px-4 py-3"
      >
        {saving ? "저장중…" : "저장"}
      </button>
    </form>
  );
}
