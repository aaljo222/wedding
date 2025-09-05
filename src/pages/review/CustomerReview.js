// src/pages/review/CustomerReview.jsx
import React, { useEffect, useMemo, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../../css/CustomerReview.css";

function CustomerReview() {
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  // 서버에서 불러온 원본
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoOnly, setPhotoOnly] = useState(
    () => localStorage.getItem("photoOnlyFilter") === "true"
  );
  const [editingReview, setEditingReview] = useState(null);
  const [err, setErr] = useState("");

  // 서버에서 목록 로드
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch("/api/reviews");
      const list = await res.json();
      if (!res.ok)
        throw new Error(list?.error || "목록을 불러오지 못했습니다.");
      setReviews(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr(e.message || "에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 토글 상태 저장
  useEffect(() => {
    localStorage.setItem("photoOnlyFilter", photoOnly);
  }, [photoOnly]);

  // ReviewList/ReviewForm 호환용: _id가 오면 id로도 복사
  const normalized = useMemo(
    () => reviews.map((r) => ({ ...r, id: r.id ?? String(r._id ?? "") })),
    [reviews]
  );

  // 클라이언트 필터(필요하면 서버 쿼리 ?photoOnly=1 로 바꿔도 됨)
  const filtered = photoOnly
    ? normalized.filter((r) => Array.isArray(r.photos) && r.photos.length > 0)
    : normalized;

  // 추가
  const handleAdd = async (newReview) => {
    try {
      setErr("");
      const payload = {
        name: newReview.name,
        rating: newReview.rating ?? 0,
        comment: newReview.comment ?? "",
        photos: newReview.photos ?? [],
        date: newReview.date || getCurrentDate(),
      };
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const doc = await res.json();
      if (!res.ok) throw new Error(doc?.error || "리뷰 추가 실패");
      setReviews((prev) => [doc, ...prev]);
    } catch (e) {
      setErr(e.message || "에러가 발생했습니다.");
    }
  };

  // 수정
  const handleUpdate = async (updated) => {
    try {
      setErr("");
      const id = updated._id || updated.id;
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "리뷰 수정 실패");

      setReviews((prev) =>
        prev.map((r) =>
          String(r._id || r.id) === String(id) ? { ...r, ...updated } : r
        )
      );
      setEditingReview(null);
    } catch (e) {
      setErr(e.message || "에러가 발생했습니다.");
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    try {
      setErr("");
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "리뷰 삭제 실패");
      setReviews((prev) =>
        prev.filter((r) => String(r._id || r.id) !== String(id))
      );
    } catch (e) {
      setErr(e.message || "에러가 발생했습니다.");
    }
  };

  const handleEdit = (review) => setEditingReview(review);

  return (
    <div className="cr-container">
      <h2 className="cr-title">
        고객후기 <span className="cr-count">{normalized.length}</span>
      </h2>

      <div className="cr-controls">
        <label className="cr-photo-filter">
          <input
            type="checkbox"
            checked={photoOnly}
            onChange={() => setPhotoOnly((v) => !v)}
          />
          포토리뷰만 보기
        </label>
      </div>

      {err && <p className="text-red-600 mb-2">{err}</p>}
      {loading && <p className="text-gray-500 mb-2">불러오는 중…</p>}

      <ReviewForm
        key={editingReview ? editingReview.id : "new"}
        initialData={editingReview}
        onCancel={() => setEditingReview(null)}
        onSubmit={editingReview ? handleUpdate : handleAdd}
      />

      <ReviewList
        reviews={filtered}
        onEdit={handleEdit}
        onDelete={(id) => handleDelete(id)}
      />
    </div>
  );
}

export default CustomerReview;
