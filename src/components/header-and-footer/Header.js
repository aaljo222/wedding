// src/components/header-and-footer/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Petals } from "../../utils/Petals";
import logomain from "../../art/logomain.png";
import { useAuth } from "../../features/auth/AuthContext"; // ✅ 여기!

function Header() {
  const { user, logout } = useAuth(); // ✅ 인증 상태
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/"); // 로그아웃 후 홈으로
  };

  // 공통 메뉴
  const menu = [
    { to: "/", label: "Home" },
    { to: "/invitation-cards", label: "모바일 청첩장 디자인" },
    { to: "/ticket", label: "식권" },
    { to: "/letter", label: "편지봉투" },
    { to: "/frame", label: "액자" },
    { to: "/review", label: "고객후기" },
    { to: "/faq", label: "자주 묻는 질문" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
        zIndex: 9999,
        padding: "15px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* 로고 */}
      <div style={{ marginLeft: "40px" }}>
        <Link to="/">
          <img src={logomain} alt="Logo" style={{ height: 40 }} />
        </Link>
      </div>

      <Petals />

      {/* 가운데 메뉴 */}
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
        {menu.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className="menu-link"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "#000",
              paddingBottom: 5,
            }}
          >
            {m.label}
          </Link>
        ))}
      </nav>

      {/* 우측: 로그인/회원가입 ↔ 사용자명/로그아웃 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginRight: 20,
        }}
      >
        {user ? (
          <>
            <span style={{ fontSize: 14, color: "#555" }}>
              {user.name || user.email} 님
            </span>
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "#ff7fa9",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="menu-link"
              style={{ textDecoration: "none", color: "#000" }}
            >
              로그인
            </Link>
            <Link
              to="/register"
              className="menu-link"
              style={{ textDecoration: "none", color: "#000" }}
            >
              회원가입
            </Link>
          </>
        )}
      </div>

      {/* hover 효과 (기존과 동일) */}
      <style>
        {`
          .menu-link::after {
            content: "";
            position: absolute;
            bottom: 0; left: 50%;
            transform: translateX(-50%);
            width: 0%; height: 2px;
            background-color: #ff7fa9;
            transition: width .3s ease;
          }
          .menu-link:hover::after { width: 100%; }
          .menu-link:hover { color: #ff7fa9; }
        `}
      </style>
    </header>
  );
}

export default Header;
