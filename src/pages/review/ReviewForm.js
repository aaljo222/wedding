// src/pages/review/ReviewForm.jsx
import React, { useState, useEffect } from "react";
import { StarRating } from "../../utils/ReviewStarRating";

function ReviewForm({ initialData, onSubmit, onCancel }) {
  const isEdit = Boolean(initialData);
  const [submitting, setSubmitting] = useState(false);

  const toDateInput = (v) => (v ? new Date(v).toISOString().split("T")[0] : "");
  const today = () => new Date().toISOString().split("T")[0];

  const [review, setReview] = useState({
    // 서버/클라 모두 호환되는 id 키 유지
    id: null, // 프론트에서 쓰는 id
    _id: undefined, // 서버가 준 Mongo _id
    name: "",
    date: "",
    rating: 5,
    comment: "",
    photos: [],
  });

  // initialData 들어오면 폼 채우기 (+ 날짜/ID 정규화)
  useEffect(() => {
    if (!initialData) {
      setReview({
        id: null,
        _id: undefined,
        name: "",
        date: "",
        rating: 5,
        comment: "",
        photos: [],
      });
      return;
    }
    setReview({
      id: initialData.id ?? String(initialData._id ?? ""),
      _id: initialData._id, // 서버 수정 시 필요
      name: initialData.name ?? "",
      date: toDateInput(initialData.date) || "",
      rating: Number(initialData.rating ?? 5),
      comment: initialData.comment ?? "",
      photos: Array.isArray(initialData.photos) ? initialData.photos : [],
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setReview((prev) => ({ ...prev, rating }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    const readPromises = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readPromises).then((urls) => {
      setReview((prev) => ({
        ...prev,
        photos: [...prev.photos, ...urls].slice(0, 5), // 최대 5장
      }));
    });
  };

  const handlePhotoRemove = (idx) => {
    setReview((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!review.name.trim() || !review.comment.trim()) return;

    setSubmitting(true);
    try {
      // API 형식에 맞게 페이로드 정리
      const payload = {
        ...review,
        // input용 YYYY-MM-DD → 서버에서도 바로 Date 변환 가능
        date: review.date || today(),
        rating: Number(review.rating || 0),
      };
      await onSubmit(payload);
      if (!isEdit) {
        // 추가 모드면 폼 리셋
        setReview({
          id: null,
          _id: undefined,
          name: "",
          date: "",
          rating: 5,
          comment: "",
          photos: [],
        });
      }
    } finally {
      setSubmitting(false);
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
        max={today()}
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

      <button type="submit" className="cr-btn add" disabled={submitting}>
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
