import React, { useState, useEffect } from "react";
import { StarRating } from "../../utils/ReviewStarRating";

function ReviewForm({ initialData, onSubmit, onCancel }) {
  // initialData가 존재하면 수정 모드, 없으면 새 리뷰 추가 모드로 설정
  const isEdit = Boolean(initialData);

  // 폼에서 입력한 리뷰 데이터 상태 관리
  const [review, setReview] = useState({
    id: null, // 리뷰 고유 식별자 (추가 시 null → 부모 컴포넌트에서 Date.now()로 설정)
    name: "", // 리뷰 작성자 이름
    date: "", // 리뷰 작성 날짜 (YYYY-MM-DD 형식)
    rating: 5, // 별점 (1~5)
    comment: "", // 리뷰 내용
    photos: [], // 첨부 이미지들의 Base64 데이터 URL 배열 (최대 5개)
  });

  // initialData가 바뀔 때 리뷰 상태를 초기화 혹은 수정 데이터로 채워 줌
  useEffect(() => {
    if (initialData) {
      // 수정 모드 진입 시 기존 리뷰 데이터를 폼에 채워 줌
      setReview(initialData);
    } else {
      // 추가 모드로 돌아갈 때는 빈 폼으로 초기화
      setReview({
        id: null,
        name: "",
        date: "",
        rating: 5,
        comment: "",
        photos: [],
      });
    }
  }, [initialData]);

  // 오늘 날짜를 YYYY-MM-DD 문자열로 반환하는 함수
  // date input의 max 속성에 사용 → 미래 날짜 선택 방지
  const getCurrentDate = () => {
    // ISO 문자열 포맷 "2025-09-04T06:27:00.000Z" 에서 날짜 부분만 취함
    return new Date().toISOString().split("T")[0];
  };

  // 텍스트(input, textarea) 변경 시 호출
  // e.target.name에 해당하는 속성 (name, date, comment)에 값을 설정
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev, // 기존 상태 유지
      [name]: value, // 변경된 필드만 덮어쓰기
    }));
  };

  // StarRating 컴포넌트에서 별점 클릭 시 호출
  // rating 값을 review 상태에 반영
  const handleRating = (rating) => {
    setReview((prev) => ({
      ...prev,
      rating, // 클릭한 별점으로 업데이트
    }));
  };

  // 사진 파일 선택 시 호출
  // FileReader를 이용해 파일을 Base64 URL로 변환 후 photos 배열에 추가
  const handlePhotoChange = (e) => {
    // 다중 파일 선택 지원: FileList → 배열
    const files = Array.from(e.target.files);

    // 각 파일을 읽어 Base64 URL 문자열로 변환하는 Promise 배열 생성
    const readPromises = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          // 파일 읽기가 완료되면 Base64 문자열(reader.result)을 resolve
          reader.onloadend = () => resolve(reader.result);
          // 파일을 Data URL(Base64)로 읽기 시작
          reader.readAsDataURL(file);
        })
    );

    // 모든 파일 읽기가 끝나면 then() 블록 실행
    Promise.all(readPromises).then((urls) => {
      setReview((prev) => ({
        ...prev,
        // 기존 photos에 신규 photos를 합친 후 최대 5개로 자름
        photos: [...prev.photos, ...urls].slice(0, 5),
      }));
    });
  };

  // 특정 인덱스의 사진을 제거할 때 호출
  const handlePhotoRemove = (idx) => {
    setReview((prev) => ({
      ...prev,
      // filter로 idx와 다른 항목만 남김
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  };

  // 폼 제출 시 호출
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출(페이지 리로드) 방지
    // 작성자 이름과 댓글 내용이 없으면 제출하지 않음
    if (!review.name.trim() || !review.comment.trim()) {
      // 필요 시 사용자에게 경고 메시지 표시 가능
      return;
    }
    // 부모 컴포넌트에 onSubmit 콜백으로 리뷰 객체 전달
    onSubmit(review);
    // 추가 모드인 경우 폼 초기화 (수정 모드면 initialData 변경에 의해 useEffect가 처리)
    if (!isEdit) {
      setReview({
        id: null,
        name: "",
        date: "",
        rating: 5,
        comment: "",
        photos: [],
      });
    }
  };

  return (
    <form className="cr-form" onSubmit={handleSubmit}>
      <input
        name="name"
        value={review.name}
        onChange={handleChange}
        className="cr-input name"
        placeholder="이름"
      />
      <input
        name="date"
        type="date"
        value={review.date}
        onChange={handleChange}
        max={getCurrentDate()}
        className="cr-input date"
      />
      <StarRating rating={review.rating} setRating={handleRating} />
      <textarea
        name="comment"
        value={review.comment}
        onChange={handleChange}
        rows={2}
        className="cr-textarea"
        placeholder="후기 작성"
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoChange}
        className="cr-file-input"
      />
      {review.photos.length > 0 && (
        <div className="cr-thumb-preview">
          {review.photos.map((src, i) => (
            <div key={i} className="cr-thumb-item">
              <img src={src} alt={`미리보기${i}`} />
              <button
                type="button"
                className="cr-thumb-remove"
                onClick={() => handlePhotoRemove(i)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <button type="submit" className="cr-btn add">
        {isEdit ? "수정" : "추가"}
      </button>
      {isEdit && (
        <button type="button" className="cr-btn cancel" onClick={onCancel}>
          취소
        </button>
      )}
    </form>
  );
}

export default ReviewForm;
