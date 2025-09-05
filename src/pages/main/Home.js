// Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FloatingBanner from "../../utils/FloatingBanner";

function Home() {
  const handleButtonClick = () => {
    alert("영상 애니메이션 버튼이 클릭되었습니다!");
  };

  const SLIDE_IMG_WIDTH = 243;
  const SLIDE_IMG_HEIGHT = 324;
  const SLIDE_IMG_GAP = 16;
  const slideSectionRef = useRef(null); // useRef 훅으로 슬라이드 섹션 ref 생성
  const [slideTop, setSlideTop] = useState(0); // 슬라이드 섹션의 Y 위치 상태

  useEffect(() => {
    // 컴포넌트가 마운트되면 슬라이드 섹션의 Y 위치를 측정하여 상태에 저장
    if (slideSectionRef.current) {
      setSlideTop(slideSectionRef.current.offsetTop);
    }
  }, []); // 마운트 시 한 번만 실행

  const slideImages = [
    "https://d38fyys32noduv.cloudfront.net/commons/card_sample/XiWvmigDIO.png",
    "https://d38fyys32noduv.cloudfront.net/commons/card_sample/BgIftGNgps.png",
    "https://d38fyys32noduv.cloudfront.net/commons/card_sample/dXHF8IHgPT.png",
    "https://d38fyys32noduv.cloudfront.net/commons/card_sample/IhMIUxYKKt.png",
    // 원하는 이미지를 추가하세요
  ];

  // 끊김 없는 순환을 위해 3배 반복
  const repeatedImages = [...slideImages, ...slideImages, ...slideImages];

  return (
    <div>
      {/* ===== Hero Section (영상 + 텍스트) ===== */}
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
        >
          <source
            src="https://hellomybrand.com/video/landing-2.webm"
            type="video/webm"
          />
          <source
            src="https://hellomybrand.com/video/landing-1.mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div
            className="bg-black bg-opacity-50 p-6 rounded-lg max-w-xl"
            style={{ lineHeight: 1.5 }}
          >
            <h1 className="text-3xl font-bold mb-4">그린 아카데미</h1>
            <p className="text-lg mb-1">2025년 9월 8일 (월) 오후 2시</p>
            <p className="text-lg">505호 노코드 3기</p>
          </div>
          <div className="mt-10 space-y-4">
            <div className="text-sm">10분만에 자유롭게 완성하는</div>
            <div className="text-sm">가장 섬세하고 특별한 웨딩 초대</div>
            <Link
              href="http://localhost:3000/invitation-add"
              className="inline-flex items-center justify-center gap-2 text-tog-444 rounded-full px-6 py-3 bg-tog-pink shadow-lg hover:brightness-110"
            >
              <span>청첩장 꾸미기 시작</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 청첩장 링크 이미지 섹션 ===== */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          청첩장 미리보기
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/invitation-cards">
            <img
              src="https://media.istockphoto.com/id/2200796955/ko/%EC%82%AC%EC%A7%84/wedding-portraits-of-a-young-man-and-woman-shot-indoors.jpg?s=2048x2048&w=is&k=20&c=qKApoYi5FxBBjMlwNPjzDE0Xjg9Ea-Ua_Py9LDTbcOU="
              alt="청첩장 샘플 목록으로 이동"
              style={{
                cursor: "pointer",
                width: "300px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </Link>
          <Link to="/invitation-cards">
            <img
              src="https://cdn.pixabay.com/photo/2015/02/13/00/15/wedding-634526_640.jpg"
              alt="청첩장 샘플 목록으로 이동"
              style={{
                cursor: "pointer",
                width: "300px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </Link>
        </div>
      </section>

      {/* ===== 영상 + 텍스트 Section 1 ===== */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          padding: "40px 20px",
          backgroundColor: "#fff",
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: "400px", flex: "1 1 300px" }}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            오프닝 애니메이션 A
          </h3>
          <p style={{ marginBottom: "16px" }}>
            열리는 순간, 시선을 사로잡는 감각적인 연출
          </p>
          <button
            onClick={handleButtonClick}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#f06",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            영상 보기
          </button>
        </div>
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          width="320"
          height="560"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <source
            src="https://theirmood.com/app/landing/mcards/images/opening_a.mp4?v=1754274493"
            type="video/mp4"
          />
          <source
            src="https://hellomybrand.com/video/landing-2.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* ===== 영상 + 텍스트 Section 2 ===== */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          padding: "40px 20px",
          backgroundColor: "#fff",
          flexWrap: "wrap-reverse",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          width="320"
          height="560"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <source
            src="https://theirmood.com/app/landing/mcards/images/opening_b.mp4?v=1754274494"
            type="video/mp4"
          />
          <source
            src="https://hellomybrand.com/video/landing-2.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        <div style={{ maxWidth: "400px", flex: "1 1 300px" }}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            오프닝 애니메이션 B
          </h3>
          <p style={{ marginBottom: "16px" }}>
            감각적이고 세련된 영상 연출을 경험해 보세요.
          </p>
          <button
            onClick={handleButtonClick}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#06a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            영상 보기
          </button>
        </div>
      </section>

      {/* === 이미지 슬라이드 섹션 === */}
      <section
        ref={slideSectionRef} // useRef로 생성한 ref 할당
        style={{
          position: "relative",
          marginTop: "120px",
          overflow: "hidden",
          background: "#f4f2ee",
          width: "100vw",
          height: `${SLIDE_IMG_HEIGHT + 24}px`,
          borderTop: "1px solid #e0ddd6",
          boxShadow: "0 -8px 32px rgba(200, 190, 170, 0.09)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100vw",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: `${SLIDE_IMG_GAP}px`,
              alignItems: "center",
              height: `${SLIDE_IMG_HEIGHT}px`,
              animation: `slideX 32s linear infinite`,
            }}
          >
            {repeatedImages.map((url, i) => (
              <img
                key={i}
                src={url}
                style={{
                  width: `${SLIDE_IMG_WIDTH}px`,
                  height: `${SLIDE_IMG_HEIGHT}px`,
                  objectFit: "cover",
                  borderRadius: "18px",
                  border: "5px solid #fff",
                  boxShadow: "0 4px 18px rgba(160,140,120,0.14)",
                  flex: "0 0 auto",
                  transition: "box-shadow 0.2s",
                }}
                alt=""
                draggable={false}
              />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes slideX {
            0% { transform: translateX(0);}
            100% { transform: translateX(-${
              (SLIDE_IMG_WIDTH + SLIDE_IMG_GAP) * slideImages.length
            }px);}
          }
        `}</style>
      </section>

      {/* FloatingBanner 컴포넌트를 이 위치로 이동 */}
      {/* slideTop props 추가 */}
      <FloatingBanner slideTop={slideTop} />
    </div>
  );
}

export default Home;
