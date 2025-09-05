// src/pages/invitation/InvitationAdd.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccordionSection } from "./AccordionSection";
import { createInvitation } from "../../services/invitationsApi";

export default function InvitationAdd() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    title1: "",
    groomName: "",
    brideName: "",
    date: "",
    time: "",
    cover: "",
    bg: "#fff8f7",
    content: "",
    price: 0,
    options: {},
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const change = (e) => {
    const { name, value, type } = e.target;
    setForm((v) => ({
      ...v,
      [name]: name === "price" ? Number(value || 0) : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSaving(true);
    try {
      // 서버는 title 필수 → 비어있으면 기본값 생성
      const safeTitle =
        (form.title || "").trim() ||
        [form.groomName, form.brideName].filter(Boolean).join(" & ") ||
        "모바일 청첩장";

      const payload = {
        ...form,
        title: safeTitle,
        price: Number(form.price) || 0,
      };

      await createInvitation(payload);
      alert("저장되었습니다.");
      nav("/invitation-list");
    } catch (e) {
      setErr(e.message || "저장 중 오류가 발생했습니다.");
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
            value={form.title}
            placeholder="제목"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            placeholder="가격"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="groomName"
            value={form.groomName}
            placeholder="신랑 이름"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="brideName"
            value={form.brideName}
            placeholder="신부 이름"
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={change}
            className="border p-2 rounded"
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={change}
            className="border p-2 rounded"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="디자인">
        <input
          name="cover"
          value={form.cover}
          placeholder="커버 이미지 URL"
          onChange={change}
          className="border p-2 rounded w-full"
        />
        <input
          name="bg"
          value={form.bg}
          placeholder="배경색 (예: #fff8f7)"
          onChange={change}
          className="border p-2 rounded w-full mt-2"
        />
      </AccordionSection>

      <AccordionSection title="문구">
        <input
          name="title1"
          value={form.title1}
          placeholder="부제(예: INVITATION)"
          onChange={change}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="content"
          value={form.content}
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
