// Inquiry.jsx
import React, { useState, useEffect } from "react";
import "../../css/Inquiry.css";

// InquiryPage 부모컴포넌트
const Inquiry = ({ onSubmit, editData, onMoveToList }) => {
  //InquiryPage에서 해당 기능을 디스트럭쳐링 해서 value(값)을 받아옴
  const [userName, setUserName] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    if (editData) {
      setUserName(editData.name || "");
      setUserTitle(editData.title || "");
      setUserEmail(editData.email || "");
      setUserComment(editData.comment || "");
    } else {
      setUserName("");
      setUserTitle("");
      setUserEmail("");
      setUserComment("");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. 이벤트의 기본 동작을 막습니다.
    // 'e'는 '이벤트(event)'의 약자로, 여기서 'e.preventDefault()'는
    // '보내기' 버튼을 눌렀을 때 웹페이지가 자동으로 새로고침되는 것을 막아줍니다.
    // 이렇게 하면 우리가 만든 코드가 정상적으로 실행될 시간을 벌 수 있어요.

    const newInquiry = {
      // 2. 새로운 문의 정보를 담을 상자를 만듭니다.
      // 이 상자(객체)에 사용자가 입력한 모든 데이터를 담을 거예요.
      id: editData?.id ?? null,
      // 'id'는 문의글의 고유한 번호표입니다.
      // 'editData?.id'는 '만약 수정 중이라면(editData가 있다면) 그 번호표를 가져와줘'라는 뜻입니다.
      // '?? null'은 '만약 수정하는 게 아니라 새로 쓰는 거라면 번호표를 일단 비워둬(null)'라는 뜻입니다
      name: userName,
      title: userTitle,
      email: userEmail,
      comment: userComment,
    };
    onSubmit(newInquiry);
    // 3. 만든 상자를 부모 컴포넌트로 보냅니다.
    // 'onSubmit'은 부모 컴포넌트(InquiryPage.js)로부터 받은 특별한 함수입니다.
    // 이 함수에 'newInquiry' 상자를 전달하면, 부모 컴포넌트가 이 데이터를 받아서
    // 목록에 추가하거나 기존 데이터를 업데이트하는 작업을 처리
  };

  return (
    <div className="inquiry-container">
      <h2>1:1 문의하기</h2>
      <p>궁금한 점이나 요청 사항을 남겨주세요.</p>
      {/* 폼과 버튼 그룹을 하나로 묶기 위해 form 태그 제거 */}
      <div className="inquiry-form" onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </label>
        <label>
          문의종류:
          <input
            type="text"
            name="title"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            placeholder="문의 종류를 입력하세요"
          />
        </label>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </label>
        <label>
          문의 내용:
          <textarea
            name="comment"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="문의 내용을 입력하세요"
            rows="5"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </label>
        <div className="button-group">
          {/* button type을 submit으로 유지하여 form 제출 기능 활용 */}
          <button type="submit" onClick={handleSubmit}>
            {editData ? "문의 수정하기" : "문의 보내기"}
          </button>
          {/* a 태그 대신 button 태그를 사용하고 props로 받은 onMoveToList 함수 호출 */}
          <button
            type="button"
            className="btn-secondary"
            onClick={onMoveToList}
          >
            문의목록으로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
