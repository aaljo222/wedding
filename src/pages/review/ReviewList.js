import React from "react";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, onEdit, onDelete }) {
  if (reviews.length === 0) {
    return <p className="cr-empty">등록된 후기가 없습니다.</p>;
  }

  return (
    <div className="cr-list">
      {reviews.map((r) => (
        <ReviewItem
          key={r.id}
          review={r}
          onEdit={() => onEdit(r)}
          onDelete={() => onDelete(r.id)}
        />
      ))}
    </div>
  );
}

export default ReviewList;
