import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../../css/CustomerReview.css";

// 초기 리뷰 목록 데이터입니다.
// 실제로는 서버나 DB에서 받아오지만, 처음에는 이 데이터를 보여줍니다.
const initialReviews = [
  {
    id: 1,
    name: "박종민",
    date: "2025-08-27",
    rating: 5,
    comment:
      "여기저기 많이 만들어봤는데 젤 깔끔하고 제작도 쉬워서 선택했어요 너무 이쁩니다💛",
    photos: [],
  },
  {
    id: 2,
    name: "강민석",
    date: "2025-08-27",
    rating: 5,
    comment:
      "저렴한 가격에 완전 고퀄리티! 여기 완전 추천드려요. 만들기 엄청 쉽고 문의도 빨랐어요. 부모님이 완전 만족!",
    photos: [],
  },
  {
    id: 3,
    name: "전재석",
    date: "2025-08-27",
    rating: 5,
    comment: "너무 이쁘네요 감사합니다!",
    photos: [],
  },
  {
    id: 4,
    name: "이재오",
    date: "2025-08-27",
    rating: 5,
    comment: "강추합니다!",
    photos: ["https://plus.unsplash.com/..."],
  },
];

function CustomerReview() {
  // 오늘 날짜를 'YYYY-MM-DD' 형태로 돌려주는 함수
  // split을 하지 않고 clg를 찍어보면 2025-09-04T08:00:22.061Z << 이런 형식으로 나오는데
  //split("T")를 하게 되면 T를 기준으로 앞 [2025-09-04 , 08:00:22.061Z] 배열 형식으로 나누어줌
  //날짜만 사용하기 위해 배열에서 0번째 데이터 사용 (2025-09-04)
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  // reviews 상태 초기화 및 관리
  // 초기에는 로컬스토리지에 저장된 데이터가 있으면 그것을 불러오고 없으면 초기값(initialReviews)을 사용합니다.
  // useState에 함수 형태로 전달하는 이유는 컴포넌트가 처음 렌더링될 때 한 번만 실행하기 위함입니다.
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem("customerReviews");
    return stored ? JSON.parse(stored) : initialReviews;
  });

  // 사진 필터 상태 관리 (포토리뷰만 보기)
  // 처음에는 로컬스토리지에 저장된 값을 불러옵니다.
  const [photoOnly, setPhotoOnly] = useState(
    () => localStorage.getItem("photoOnlyFilter") === "true"
  );

  // 편집 중인 리뷰 상태 관리 (수정모드에 쓰임)
  // null 이면 수정 모드가 아닙니다.
  const [editingReview, setEditingReview] = useState(null);

  // 리뷰 목록 상태가 바뀔 때마다 로컬스토리지에 새로 저장합니다.
  // 이렇게 하면 새로고침해도 데이터가 유지됩니다.
  useEffect(() => {
    localStorage.setItem("customerReviews", JSON.stringify(reviews));
  }, [reviews]);

  // 사진 필터 상태가 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("photoOnlyFilter", photoOnly);
  }, [photoOnly]);

  // 새로운 리뷰 추가 함수
  // 새 리뷰 객체에 고유 id와 날짜를 지정해서 reviews 배열에 추가합니다.
  const handleAdd = (newReview) => {
    setReviews([
      ...reviews,
      {
        ...newReview,
        id: Date.now(), // 고유id, 현재 타임스탬프로 생성
        date: newReview.date || getCurrentDate(), // 날짜가 없으면 오늘 날짜 기본값
      },
    ]);
  };

  // 리뷰 수정 함수
  // 기존 리뷰 중 수정한 id와 일치하는 리뷰를 수정 데이터로 교체합니다.
  // 수정 후 editingReview 상태를 초기화해서 수정 모드 해제
  const handleUpdate = (updated) => {
    setReviews(reviews.map((r) => (r.id === updated.id ? updated : r)));
    setEditingReview(null);
  };

  // 리뷰 삭제 함수
  // 필터를 사용해서 기존에 reviews안에 있는 review 중 input을 통해 들어온 id 와 같지 않은 것만
  // 골라내서 시각화함 review.id 와 input을 통해 들어온 id가 같은 것들은 필터에 갈려서 날아가서 사라진것처럼 표현
  const handleDelete = (id) => setReviews(reviews.filter((r) => r.id !== id));

  // 수정 버튼 클릭 시 해당 리뷰 데이터를 편집 상태로 설정해서 폼에 보여줌
  const handleEdit = (review) => setEditingReview(review);

  // 사진만 있는 리뷰 필터링: photoOnly가 true면 사진 있는 리뷰만 보여줌, 아니면 모두 보여줌
  const filtered = photoOnly
    ? reviews.filter((r) => r.photos.length > 0)
    : reviews;

  return (
    <div className="cr-container">
      {/* 타이틀: 고객후기와 전체 리뷰 개수 출력 */}
      <h2 className="cr-title">
        고객후기 <span className="cr-count">{reviews.length}</span>
      </h2>

      {/* 필터 컨트롤: 포토리뷰만 보기 체크박스 */}
      <div className="cr-controls">
        <label className="cr-photo-filter">
          <input
            type="checkbox"
            checked={photoOnly}
            // 체크 여부 반전 함수
            onChange={() => setPhotoOnly((v) => !v)}
          />
          포토리뷰만 보기
        </label>
      </div>

      {/* 리뷰 작성 및 수정 폼 컴포넌트 */}
      {/* editingReview 가 있으면 수정 모드, 없으면 새로 작성 모드 */}
      <ReviewForm
        key={editingReview ? editingReview.id : "new"} // key 값을 다르게 해 리렌더링 방지 및 상태 초기화
        initialData={editingReview} // 수정할 리뷰 데이터를 넘김
        onCancel={() => setEditingReview(null)} // 수정 취소 handler
        onSubmit={editingReview ? handleUpdate : handleAdd} // 제출 시 호출할 함수 분기
      />

      {/* 리뷰 목록 컴포넌트 */}
      {/* 필터된 리뷰 목록과 수정/삭제 핸들러 전달 */}
      <ReviewList
        reviews={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default CustomerReview;
