import React, { useState } from "react";
import "../../css/CustomerFAQ.css";
import { Petals } from "../../utils/Petals";
import { useNavigate } from "react-router-dom";
import { askData } from "../../data/FaqData";

const CustomerFAQ = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 필터
  const [titleMenu, setTiltleMenu] = useState(null); // 메뉴 필터
  const [selectId, setSelectId] = useState(false); // 질문 토글 상태
  const navigate = useNavigate(); // ✅ React Router navigate 이동 기능

  // 필터를 적용 시킨 데이터
  const filteredData = askData.filter(
    (askData) =>
      askData.comment.includes(searchKeyword) &&
      // 기존데이터 commeent에 includes를 사용해서 searchKeyword의 문자가 포함되어있는지를 확인 있으면 true 이고
      (!titleMenu || askData.title === titleMenu)
    // 다음으로 titleMenu가 Null이 아닐때는 searchKeyword만 filteredData에 저장되고
    // titleMune가 null이면 false 이므로 우측조건을 검증 => 기존데이터의 title값이 titleMenu의 값과 같은값만 filteredData에 저장
  );

  // 질문리스트 클릭
  const handleinquiryListClick = (askData) => {
    // 질문리스트를 클릭하면 해당 핸들러는  askData라는 데이터를 인자로 받고
    setSelectId(askData.id === selectId ? null : askData.id);
    // 해당 객체데이터의 키값인 id가 selectId와 동일하면 null값을, 그렇지 않으면 기존데이터값을 반환
  };

  // 메뉴 클릭
  const handleMenuClick = (title) => {
    // 해당 핸들러는 title 인자를 받을 것이고
    setTiltleMenu(title);
    // 그 title을 titleMenu라는 스테이트로 업데이트
  };

  // 문의하기 버튼 클릭
  const handleNavigateToInquiry = () => {
    navigate("/FAQquery");
  };

  const handleButtonTel = () => {
    alert("현재 구현중 입니다");
  };

  return (
    <>
      <Petals />
      {/* 좌우 고정 이미지 */}
      <img
        src="https://moiitee.com/Resource/mainasset/templates/DesignArch.png"
        alt="왼쪽 이미지"
        className="floating-image-left"
        draggable={false}
      />
      <img
        src="https://moiitee.com/Resource/mainasset/templates/DesignSimple_line_01.png"
        alt="오른쪽 이미지"
        className="floating-image-right"
        draggable={false}
      />

      {/* FAQ 영역 */}
      <div className="faq-container">
        <h2 className="faq-title">Q. 자주 묻는 질문</h2>
        <p className="faq-subtitle">궁금하신 내용을 찾을 수 있습니다.</p>

        {/* 메뉴 버튼 */}
        <div className="faq-menu-buttons">
          {["전체보기", "주문", "제품", "배송", "적립", "회원", "기타"].map(
            // 해당 배열을 Map을 사용해서 순회
            (title) => (
              // title이라는 인자를 받을 건데
              <button
                key={title} // 여기서 key값을 title로 준다 *안전성의 이유
                className={`faq-menu-button ${
                  title === titleMenu || // title가 titleMenu과 같으면 true 뒤에 조건은 실행하지않음
                  (title === "전체보기" && titleMenu === false) // 조건2 title이 전체보기와 같고, searchMenu가 null 이면 true
                    ? "active" // 버튼에 "active 클래스" 를 적용
                    : "" // 아무것도 일어나지않음
                }`}
                onClick={
                  () =>
                    handleMenuClick(titleMenu === "전체보기" ? false : title)
                  // 버튼을 누르면 titleMenu가 전체보기와 동일하면 false를 , 그렇지 않으면 title을 반환 여기서 title은 위 배열에 해당한다
                }
              >
                {title}
              </button>
            )
          )}

          {/* ✅ 문의하기 버튼만 navigate로 처리 */}
          <button
            className="faq-menu-button inquiry-button"
            onClick={handleNavigateToInquiry}
            // 해당 버튼을 클릭하면 Inquiry주소로 이동
          >
            문의하기
          </button>
        </div>

        {/* 검색창 */}
        <div className="faq-search">
          <input
            type="text"
            placeholder="궁금한 키워드를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            // 해당 이벤트는 serachKeyword의 값을 해당 입력창에 입력된 value로 업데이트한다.
          />
        </div>

        {/* 질문 리스트 */}
        <div className="faq-list">
          {filteredData.length === 0 ? (
            // filteredData에 문자열길이가 0이면 검색결과가없습니다 를 반환
            <div className="faq-empty">검색 결과가 없습니다.</div>
          ) : (
            // 그렇지 않다면, 0이 아닌 문자열의 길이가 존재한다면
            filteredData.map((askData) => (
              // 해당 필터된 데이터를 순회
              <div key={askData.id} className="faq-item">
                {/* key 값은 해당 데이터의 id로 지정 *안전성의 이유 */}
                <div
                  className="faq-question"
                  onClick={() => handleinquiryListClick(askData)}
                  // 해당 영역을 클릭하면 핸들이벤트가 발생하고 해당 데이터를 보냄
                  // selectId의 스테이트를 해당 데이터로 업데이트
                >
                  <span className="faq-q-icon">Q</span> {askData.comment}
                  <span className="faq-toggle-icon">
                    {selectId === askData.id ? "▲" : "▼"}
                    {/* selectId가 필터된 데이터의 id가 동일하면  ▲ 그렇지 않으면  ▼ 로 변경*/}
                  </span>
                </div>
                {selectId === askData.id && (
                  // 해당 영역을 클릭했을때 selectId의 데이터가 인자로받은 데이터의 id와 동일하면 새로운 영역을 보여줌
                  <div className="faq-answer">{askData.answer}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 문의 카드 영역 */}
      <div className="contact-cards">
        <div className="contact-card">
          <img
            src="https://img.hankyung.com/photo/202004/d744af8c6b5cbe6d52746566f5ccb4ed.jpg"
            alt="카카오톡 문의"
          />
          <h3>
            <strong>카카오톡 문의</strong>
          </h3>
          <p>
            담당자와 1:1 채팅으로 <br />
            친절하게 상담 해드립니다
          </p>
          <a href="https://www.kakao.com/notices?lang=ko">
            <span> 클릭 </span>
          </a>
        </div>

        <div className="contact-card">
          <img
            src="https://diverse-webstatic-files.s3.ap-northeast-2.amazonaws.com/cdn/itscard_upgrade/asset/image/main_notice_04_1.svg"
            alt="전화 문의"
          />
          <h3>
            <strong>전화 문의</strong>
          </h3>
          <p>
            1544-2637 <br />
            정확! 신속! 친절하게
          </p>
          <p>상담해드립니다.</p>
          <span onClick={handleButtonTel}> 클릭 </span>
        </div>

        <div className="contact-card">
          <img
            src="https://diverse-webstatic-files.s3.ap-northeast-2.amazonaws.com/cdn/itscard_upgrade/asset/image/main_notice_03_1.svg"
            alt="제휴 문의"
          />
          <h3>
            <strong>제휴 문의</strong>
          </h3>
          <p>새롭고 다양한 제휴 기회들을 기다리고 있습니다.</p>
          <span onClick={handleButtonTel}> 클릭 </span>
        </div>
      </div>
    </>
  );
};

export default CustomerFAQ;
