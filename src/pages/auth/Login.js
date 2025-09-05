import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const user = await login(form); // ✅ user 반환 받음
      const display =
        user?.name || (user?.email ? user.email.split("@")[0] : "사용자");
      alert(`${display}님, 로그인되었습니다.`); // ✅ 알림
      nav("/"); // 원하는 경로로 이동
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <section className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="email"
          placeholder="이메일"
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-black text-white rounded py-2">
          로그인
        </button>
      </form>
      <p className="mt-3 text-sm">
        계정이 없나요?{" "}
        <Link to="/register" className="text-blue-600 underline">
          회원가입
        </Link>
      </p>
    </section>
  );
}
