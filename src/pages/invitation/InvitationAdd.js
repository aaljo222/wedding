import React, { useState } from "react";
import { createInvitation } from "../../services/invitationsApi";
import { useNavigate } from "react-router-dom";

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
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      await createInvitation(form);
      alert("저장되었습니다");
      nav("/invitation-list");
    } catch (e) {
      setErr(e.message || "저장 실패");
    }
  };

  return (
    <form className="max-w-2xl mx-auto p-6 space-y-3" onSubmit={onSubmit}>
      <h1 className="text-xl font-bold">청첩장 추가</h1>
      {err && <p className="text-red-600">{err}</p>}
      <input
        name="title"
        placeholder="상품명(노출용)"
        className="input"
        onChange={onChange}
      />
      <input
        name="title1"
        placeholder="카드 제목"
        className="input"
        onChange={onChange}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="groomName"
          placeholder="신랑 이름"
          className="input"
          onChange={onChange}
        />
        <input
          name="brideName"
          placeholder="신부 이름"
          className="input"
          onChange={onChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="date" name="date" className="input" onChange={onChange} />
        <input type="time" name="time" className="input" onChange={onChange} />
      </div>
      <input
        name="cover"
        placeholder="커버 이미지 URL"
        className="input"
        onChange={onChange}
      />
      <input
        name="bg"
        placeholder="배경색 (예: #fff8f7)"
        className="input"
        onChange={onChange}
      />
      <textarea
        name="content"
        rows={3}
        placeholder="소개/본문"
        className="textarea"
        onChange={onChange}
      />
      <button className="btn-primary">저장</button>
    </form>
  );
}
