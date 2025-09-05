// src/pages/review/ReviewList.jsx
import React from "react";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews = [], onEdit, onDelete }) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p className="cr-empty">등록된 후기가 없습니다.</p>;
  }

  return (
    <div className="cr-list">
      {reviews.map((r, idx) => {
        const id = r?._id ?? r?.id ?? idx; // _id 우선, 없으면 id, 그래도 없으면 idx
        const key = typeof id === "string" ? id : String(id);
        return (
          <ReviewItem
            key={key}
            review={r}
            onEdit={() => onEdit(r)}
            onDelete={() => onDelete(id)}
          />
        );
      })}
    </div>
  );
}

export default ReviewList;
