import React, { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
      await login(form);
      nav("/"); // 로그인 후 이동 경로
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
          className="w-full border p-2 rounded"
          name="email"
          placeholder="이메일"
          onChange={onChange}
        />
        <input
          className="w-full border p-2 rounded"
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
        />
        <button className="w-full bg-black text-white rounded py-2">
          로그인
        </button>
      </form>
      <p className="mt-3 text-sm">
        아직 계정이 없나요?{" "}
        <Link to="/register" className="text-blue-600 underline">
          회원가입
        </Link>
      </p>
    </section>
  );
}
