import React from "react";
import { Link } from "react-router-dom";
import { Petals } from "../../utils/Petals";
import logomain from "../../art/logomain.png"; // logo5 ?´ë?ì§€ ê²½ë¡œ

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
      {/* ë¡œê³  ?ì—­ */}
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

      {/* ?¤ë¹„ê²Œì´??ë©”ë‰´ */}
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
          { to: "/InvitationCards", label: "ëª¨ë°”??ì²?²©???”ì?? },
          { to: "/ticket", label: "?ê¶Œ" },
          { to: "/letter", label: "?¸ì?ë´‰íˆ¬" },
          { to: "/frame", label: "?¡ì" },
          { to: "/Review", label: "ê³ ê°?„ê¸°" },
          { to: "/FAQ", label: "?ì£¼ ë¬»ëŠ” ì§ˆë¬¸" },
          { to: "/login", label: "ë¡œê·¸?? },
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

      {/* ?¤ë¥¸ìª??¬ë°±??ë¹?div */}
      <div style={{ width: "60px", marginRight: "20px" }} />

      {/* Hover ? ë‹ˆë©”ì´???¤í???*/}
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
