// FloatingBanner.jsx
import React, { useState, useEffect } from "react";
import "../css/FloatingBanner.css";

const bannerImages = [
  "https://marketplace.canva.com/EAGfoeeDufE/1/0/1143w/canva-%ED%95%91%ED%81%AC-%ED%9D%B0%EC%83%89-%EA%B7%80%EC%97%AC%EC%9A%B4-%EA%B2%B0%ED%98%BC-%EC%B4%88%EB%8C%80%EC%9E%A5-oENsHkXiA6w.jpg",
  "https://marketplace.canva.com/EAGfnjiD8As/1/0/1143w/canva-%EC%B4%88%EB%A1%9D-%EB%85%B8%EB%9E%91-%EC%9A%B0%EC%95%84%ED%95%9C-%EA%B2%B0%ED%98%BC-%EC%B4%88%EB%8C%80%EC%9E%A5-DGqTFjlKP4Q.jpg",
  "https://marketplace.canva.com/EAGfnjiD8As/1/0/1143w/canva-%EC%B4%88%EB%A1%9D-%EB%85%B8%EB%9E%91-%EC%9A%B0%EC%95%84%ED%95%9C-%EA%B2%B0%ED%98%BC-%EC%B4%88%EB%8C%80%EC%9E%A5-DGqTFjlKP4Q.jpg",
  "https://marketplace.canva.com/EAF6kkVk2VA/3/0/1143w/canva-%EB%B8%8C%EB%9D%BC%EC%9A%B4-%EA%B0%90%EC%84%B1%EC%A0%81%EC%9D%B8-%EC%98%81%ED%99%94-%ED%8F%AC%EC%8A%A4%ED%84%B0-%EA%B2%B0%ED%98%BC%EC%8B%9D-%EC%B2%AD%EC%B2%A9%EC%9E%A5-YTPnv60dvZQ.jpg",
];

// slideTop props 추가
function FloatingBanner({ slideTop }) {
  const [current, setCurrent] = useState(0);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    const handleScroll = () => {
      // 스크롤 위치가 500px을 초과하고, 슬라이드 영역 상단보다 작을 때만 배너 표시
      const bannerHeight = 350; // 배너의 고정된 높이
      const startPoint = 500;
      const endPoint = slideTop - bannerHeight;

      if (window.scrollY > startPoint && window.scrollY < endPoint) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slideTop]); // slideTop이 변경될 때마다 useEffect 재실행

  if (!showBanner) {
    return null;
  }

  return (
    <div className="floating-banner-container">
      <div className="banner-image-wrapper">
        <img
          src={bannerImages[current]}
          alt={`배너 ${current + 1}`}
          className="banner-image"
        />
      </div>
      <a href="/InvitationCards" className="banner-link-button">
        디자인 보러가기
      </a>
    </div>
  );
}

export default FloatingBanner;
