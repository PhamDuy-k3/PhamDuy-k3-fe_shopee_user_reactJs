import { useCallback, useEffect, useState } from "react";
import { memo } from "react";

function FeedBackHeader({ comments, setRating }) {
  const [evaluate, setEvaluate] = useState("Tất cả");
  const [medium, setMedium] = useState(0);
  const [stars, setStars] = useState([0, 0, 0, 0, 0, 0]);
  const [numberVotes, setNumberVotes] = useState({
    cmt: 123,
    imgVideo: 124,
  });

  const handleEvaluate = (value) => {
    setEvaluate(value);
    if (value === "Tất cả") {
      setRating(0);
      return;
    }
    setRating(value.slice(0, 1));
  };

  const calculateRatings = useCallback(() => {
    const counts = [0, 0, 0, 0, 0]; // [5 sao, 4 sao, 3 sao, 2 sao, 1 sao]
    let totalRating = 0;

    comments.forEach((comment) => {
      if (comment.rating >= 1 && comment.rating <= 5) {
        counts[5 - comment.rating] += 1;
        totalRating += comment.rating;
      }
    });

    const totalRatings = counts.reduce((acc, count) => acc + count, 0);
    const average = totalRatings > 0 ? totalRating / totalRatings : 0;

    setStars([totalRatings, ...counts]);
    setMedium(average);
  }, [comments]);

  useEffect(() => {
    calculateRatings();
  }, [comments, calculateRatings]);

  const ratingLabels = ["Tất cả", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"];
  return (
    <div className="feed-back-header p-5 d-flex">
      <div className="col-3">
        <p>
          <span>{medium.toFixed(1)}</span> trên <span>5</span>
        </p>
        <br />
        <div className="d-flex">
          {[1, 2, 3, 4, 5].map((index) => (
            <i key={index} className="fas fa-star"></i>
          ))}
        </div>
      </div>
      <div className="col-9">
        <div className="d-flex flex-wrap">
          {ratingLabels.map((label, index) => (
            <p
              key={label}
              onClick={() => handleEvaluate(label)}
              className={`product-op ${evaluate === label ? "active-op" : ""}`}
            >
              {label} (<span>{stars[index]}</span>
              {stars[index] > 999 ? <span>k</span> : ""})
            </p>
          ))}
          <p
            onClick={() => handleEvaluate("cmted")}
            className={`product-op ${
              evaluate === "cmted" ? "active-op" : "disabled"
            }`}
          >
            Có Bình Luận (<span>{numberVotes.cmt}</span> <span>k</span>)
          </p>
          <p
            onClick={() => handleEvaluate("ImageVideo")}
            className={`product-op ${
              evaluate === "ImageVideo" ? "active-op" : "disabled"
            }`}
          >
            Có Hình Ảnh / Video (<span>{numberVotes.imgVideo}</span>{" "}
            <span>k</span>)
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(FeedBackHeader);
