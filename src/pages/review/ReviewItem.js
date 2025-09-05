// src/pages/review/ReviewItem.jsx
import React from "react";
import { StarRating } from "../../utils/ReviewStarRating";

export default function ReviewItem({ review, onEdit, onDelete }) {
  const date = review?.date
    ? new Date(review.date).toISOString().split("T")[0]
    : "";

  return (
    <div className="cr-item">
      <div className="cr-item-header">
        <StarRating rating={Number(review.rating || 0)} />
        <div className="cr-meta">
          <span className="cr-name">{review.name}</span>
          <span className="cr-date">{date}</span>
        </div>
      </div>

      <p className="cr-comment">{review.comment}</p>

      {Array.isArray(review.photos) && review.photos.length > 0 && (
        <div className="cr-photo-grid">
          {review.photos.slice(0, 5).map((src, i) => (
            <div key={i} className="cr-photo-cell">
              <img src={src} alt={`리뷰이미지 ${i + 1}`} />
            </div>
          ))}
        </div>
      )}

      <div className="cr-actions">
        <button onClick={onEdit} className="cr-btn edit">
          수정
        </button>
        <button onClick={onDelete} className="cr-btn delete">
          삭제
        </button>
      </div>
    </div>
  );
}
