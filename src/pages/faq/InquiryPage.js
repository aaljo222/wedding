import React, { useState } from "react";
import Inquiry from "./Inquiry";
import "../../css/Inquiry.css";

// 문의목록을 수정하고, 삭제하는 Page
const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]); // 문의 목록
  const [editingInquiry, setEditingInquiry] = useState(null); // 수정 중인 문의
  const [isWriting, setIsWriting] = useState(true); // 새 문의 작성 화면 여부
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 선택된 문의 상세 내용

  const handleSubmit = (newInquiry) => {
    if (newInquiry.id !== null) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === newInquiry.id ? newInquiry : inq))
      );
    } else {
      const newId =
        inquiries.length > 0
          ? Math.max(...inquiries.map((inq) => inq.id)) + 1
          : 1;
      const createdAt = new Date().toLocaleDateString();
      setInquiries((prev) => [
        ...prev,
        { ...newInquiry, id: newId, createdAt },
      ]);
    }
    setEditingInquiry(null);
    setIsWriting(false);
  };

  const handleEdit = (inquiry) => {
    setEditingInquiry(inquiry);
    setIsWriting(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    }
  };

  return (
    <>
      {isWriting ? (
        <Inquiry
          onSubmit={handleSubmit}
          editData={editingInquiry}
          onMoveToList={() => setIsWriting(false)}
        />
      ) : (
        <div className="inquiry-page-container">
          <div className="inquiry-list-wrapper">
            <div className="inquiry-list">
              <div className="inquiry-header">
                <div className="inquiry-title-container">
                  <h2>문의 목록</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsWriting(true);
                    setSelectedInquiry(null);
                  }}
                  className="btn-primary"
                >
                  새 문의 작성하기
                </button>
              </div>
              <table className="inquiry-table">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>이메일</th>
                    <th>등록일</th>
                    <th>수정/삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length > 0 ? (
                    inquiries.map((inquiry, index) => (
                      <tr key={inquiry.id}>
                        <td>{index + 1}</td>
                        <td
                          className="title-click"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          {inquiry.title}
                        </td>
                        <td>{inquiry.name}</td>
                        <td>{inquiry.email}</td>
                        <td>{inquiry.createdAt}</td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(inquiry)}
                          >
                            수정
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(inquiry.id)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-inquiries">
                        현재 제출된 문의가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {selectedInquiry && (
              <div className="inquiry-detail">
                <h3>문의 내용</h3>
                <p>{selectedInquiry.comment}</p>
                <button
                  className="btn-secondary"
                  onClick={() => setSelectedInquiry(null)}
                >
                  닫기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryPage;
