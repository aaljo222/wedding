// src/components/header-and-footer/Header.jsx  (핵심만 교체)
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";
import { Petals } from "../../utils/Petals";
import logomain from "../../art/logomain.png";

export default function Header() {
  const { user, logout } = useAuth(); // ✅ 컨텍스트 사용
  const nav = useNavigate();
  const display = user?.name || (user?.email ? user.email.split("@")[0] : "");

  const onLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
    nav("/");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#fff",
        borderBottom: "1px solid #eee",
        zIndex: 9999,
        padding: "15px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginLeft: "40px" }}>
        <Link to="/">
          <img
            src={logomain}
            alt="Logo"
            style={{ height: "40px", cursor: "pointer" }}
          />
        </Link>
      </div>

      <Petals />

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          fontSize: "15px",
          fontWeight: 400,
          flexGrow: 1,
        }}
      >
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/invitation-cards" className="menu-link">
          모바일 청첩장 디자인
        </Link>
        <Link to="/ticket" className="menu-link">
          식권
        </Link>
        <Link to="/letter" className="menu-link">
          편지봉투
        </Link>
        <Link to="/frame" className="menu-link">
          액자
        </Link>
        <Link to="/review" className="menu-link">
          고객후기
        </Link>
        <Link to="/faq" className="menu-link">
          자주 묻는 질문
        </Link>

        {/* ✅ 오른쪽 로그인/로그아웃 영역 */}
        {!user ? (
          <Link to="/login" className="menu-link">
            로그인
          </Link>
        ) : (
          <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "#666" }}>{display}님</span>
            <button
              onClick={onLogout}
              className="menu-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              로그아웃
            </button>
          </span>
        )}
      </nav>

      <div style={{ width: "60px", marginRight: "20px" }} />

      <style>{`
        .menu-link{ position:relative; text-decoration:none; color:#000; padding-bottom:5px; }
        .menu-link::after{ content:""; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          width:0%; height:2px; background-color:#ff7fa9; transition:width .3s ease; }
        .menu-link:hover::after{ width:100%; }
        .menu-link:hover{ color:#ff7fa9; }
      `}</style>
    </header>
  );
}
