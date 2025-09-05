export const StarRating = ({ rating, setRating }) => {
  return (
    <div
      style={{
        color: "#faaf08",
        cursor: setRating ? "pointer" : "default",
        fontSize: "20px",
        margin: "3px 0",
        display: "flex",
        gap: "2px"
      }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => setRating && setRating(num)}
          style={{ userSelect: "none" }}
        >
          {rating >= num ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};
