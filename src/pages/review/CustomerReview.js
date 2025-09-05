// src/pages/review/CustomerReview.jsx
import React, { useEffect, useMemo, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../../css/CustomerReview.css";

export default function CustomerReview() {
  const today = () => new Date().toISOString().split("T")[0];

  const [reviews, setReviews] = useState([]); // 서버 원본
  const [loading, setLoading] = useState(true);
  const [photoOnly, setPhotoOnly] = useState(
    () => localStorage.getItem("photoOnlyFilter") === "true"
  );
  const [editingReview, setEditingReview] = useState(null);
  const [err, setErr] = useState("");

  // 목록 읽기
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

  // 포토 필터 저장
  useEffect(() => {
    localStorage.setItem("photoOnlyFilter", photoOnly);
  }, [photoOnly]);

  // _id → id 동시 제공(하위 컴포넌트 호환)
  const normalized = useMemo(
    () =>
      (Array.isArray(reviews) ? reviews : []).map((r) => ({
        ...r,
        id: r.id ?? String(r._id ?? ""),
      })),
    [reviews]
  );

  // 필터링
  const filtered = photoOnly
    ? normalized.filter((r) => Array.isArray(r.photos) && r.photos.length > 0)
    : normalized;

  // 추가
  const handleAdd = async (newReview) => {
    try {
      setErr("");
      const payload = {
        name: newReview.name,
        rating: Number(newReview.rating ?? 0),
        comment: newReview.comment ?? "",
        photos: Array.isArray(newReview.photos) ? newReview.photos : [],
        date: newReview.date || today(),
      };
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const doc = await res.json();
      if (!res.ok) throw new Error(doc?.error || "리뷰 추가 실패");

      // 방법 A) 방금 항목만 앞에 붙이기
      setReviews((prev) => [doc, ...prev]);

      // 방법 B) 서버 정합성 우선이면 전체 재조회
      // await fetchReviews();
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
        onEdit={setEditingReview}
        onDelete={handleDelete}
      />
    </div>
  );
}
