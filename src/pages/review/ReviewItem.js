import React from "react";
import { StarRating } from "../../utils/ReviewStarRating";

function ReviewItem({ review, onEdit, onDelete }) {
  return (
    <div className="cr-item">
      <div className="cr-item-header">
        <StarRating rating={review.rating} />
        <div className="cr-meta">
          <span className="cr-name">{review.name}</span>
          <span className="cr-date">{review.date}</span>
        </div>
      </div>
      <p className="cr-comment">{review.comment}</p>
      {review.photos.length > 0 && (
        <div className="cr-photo-grid">
          {review.photos.slice(0, 5).map((src, i) => (
            <div key={i} className="cr-photo-cell">
              <img src={src} alt={`리뷰${i}`} />
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

export default ReviewItem;
