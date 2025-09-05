import React from "react";
import { Link } from "react-router-dom";
import { Petals } from "../../utils/Petals";
import logomain from "../../art/logomain.png"; // logo5 이미지 경로

function Header() {
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
      {/* 로고 영역 */}
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

      {/* 네비게이션 메뉴 */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          fontSize: "15px",
          fontWeight: "400",
          flexGrow: 1,
        }}
      >
        {[
          { to: "/", label: "Home" },
          { to: "/invitation-cards", label: "모바일 청첩장 디자인" },
          { to: "/ticket", label: "식권" },
          { to: "/letter", label: "편지봉투" },
          { to: "/frame", label: "액자" },
          { to: "/review", label: "고객후기" },
          { to: "/faq", label: "자주 묻는 질문" },
          { to: "/login", label: "로그인" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="menu-link"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "#000",
              paddingBottom: "5px",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 오른쪽 여백용 빈 div */}
      <div style={{ width: "60px", marginRight: "20px" }} />

      {/* Hover 애니메이션 스타일 */}
      <style>
        {`
          .menu-link::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0%;
            height: 2px;
            background-color: #ff7fa9;
            transition: width 0.3s ease;
          }

          .menu-link:hover::after {
            width: 100%;
          }

          .menu-link:hover {
            color: #ff7fa9;
          }
        `}
      </style>
    </header>
  );
}

export default Header;
