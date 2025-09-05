import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
      nav("/"); // 가입 후 이동
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <section className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          name="name"
          placeholder="이름"
          onChange={onChange}
        />
        <input
          className="w-full border p-2 rounded"
          name="email"
          placeholder="이메일"
          onChange={onChange}
        />
        <input
          className="w-full border p-2 rounded"
          name="password"
          type="password"
          placeholder="비밀번호(6자 이상)"
          onChange={onChange}
        />
        <button className="w-full bg-black text-white rounded py-2">
          가입하기
        </button>
      </form>
      <p className="mt-3 text-sm">
        이미 계정이 있나요?{" "}
        <Link to="/login" className="text-blue-600 underline">
          로그인
        </Link>
      </p>
    </section>
  );
}
