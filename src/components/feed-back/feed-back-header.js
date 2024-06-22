import { useState } from "react";
function FeedBackHeader() {
  const [evaluate, setEvaluate] = useState("Tất cả");
  const [star, setStar] = useState([150, 50, 40, 30, 20, 10]);
  const [numberVotes, setNumberVotes] = useState({
    cmt: 123,
    imgVideo: 124,
  });
  const HandelEvaluate = (value) => {
    setEvaluate(value);
  };
  var array = ["Tất cả", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"];
  var array_new = array.map((item, index) => {
    return (
      <p
        key={item}
        onClick={() => HandelEvaluate(item)}
        className={`product-op ${evaluate === item ? "active-op" : ""}`}
      >
        {item} (<span>{star[index]}</span> <span>k</span>)
      </p>
    );
  });

  const handleClick = () => {
    var countCmt = 120;
    const updatedStar = [...star];
    updatedStar[0] = countCmt;
    setStar(updatedStar);
  };
  return (
    <div className="feed-back-header p-5 d-flex">
      <div className="col-3">
        <p>
          <span>4.8</span> trên <span> 5</span>
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
          {array_new}
          <p
            onClick={() => HandelEvaluate("cmted")}
            className={`product-op ${evaluate === "cmted" ? "active-op" : ""}`}
          >
            Có Bình Luận (<span>{numberVotes.cmt}</span> <span>k</span>)
          </p>
          <p
            onClick={() => HandelEvaluate("ImageVideo")}
            className={`product-op ${
              evaluate === "ImageVideo" ? "active-op" : ""
            }`}
          >
            Có Hình Ảnh / Video (<span>{numberVotes.imgVideo}</span>{" "}
            <span>k</span>)
          </p>
        </div>
      </div>
      {/* <button onClick={handleClick}>CliCK</button> */}
    </div>
  );
}
export default FeedBackHeader;
