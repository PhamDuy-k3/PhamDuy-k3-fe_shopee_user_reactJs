import FeedBackHeader from "./feed-back-header";
import imgUser from "../../assets/images/img/imgctsp/img-product.png";
import imgFbackSmaill from "../../assets/images/img/imgctsp/img-fback-con.jpg";
import imgFbackBig from "../../assets/images/img/imgctsp/img-fback-to.jpg";
import imgVideo from "../../assets/images/img/product-4.jpg";
import video from "../../assets/audio/video.mp4";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import FormComment from "./form";

function FeedBack() {
  const [isImgOrVideo, setIsImgOrVideo] = useState(true);
  const [isDisplay, setIsDisplay] = useState(false);
  const [imgFb, setImgFb] = useState("");
  const [cookies, setCookie, removeCookies] = useCookies();
  const [comments, setComments] = useState([]);

  const urlProductID = useParams();

  const handleOnClick = (value) => {
    if (value === "video") {
      setIsImgOrVideo(false);
    } else {
      setIsImgOrVideo(true);
    }
    setImgFb(value);
    setIsDisplay(true);
  };

  const fetchDataComment = async () => {
    try {
      if (!urlProductID.product_id) {
        return;
      }
      const response = await axios.get(
        `http://localhost:5050/comments?productId=${urlProductID.product_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.user_token,
          },
        }
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataComment();
  }, []);
  return (
    <section id="feedBack" className="feed-back">
      <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
      <FeedBackHeader />
      <FormComment
        setComments={setComments}
        fetchDataComment={fetchDataComment}
        productID={urlProductID.product_id}
      />
      <div className="feed-back-content">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="feed-back-content-products">
              <div className="item-feed-back-product d-flex">
                <div className="img-product col-1">
                  <img src={imgUser} alt="" />
                </div>
                <div className="col-11">
                  <p className="name-product">{comment.name_user}</p>
                  <div className="d-flex">
                    {[...Array(comment.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>

                  <div className="fback d-flex mt-3">
                    <p>Chất liệu:</p>
                    {comment.material}
                  </div>
                  <div className="fback d-flex">
                    <p>Màu sắc:</p>
                    {comment.color}
                  </div>
                  <div className="fback d-flex">
                    <p>Đúng với mô tả:</p>
                    {comment.describe}
                  </div>
                  <p className="product-cmt">{comment.content}</p>
                  <div className="feed-back-img-video">
                    {/* <div className="feed-back-img-video-noClick d-flex flex-wrap">
                        <img
                          onClick={() => handleOnClick("imgFbackSmaill")}
                          className={`img-video-one ${
                            imgFb === "imgFbackSmaill"
                              ? "active-img-video-one"
                              : ""
                          }`}
                          src={imgFbackSmaill}
                          alt=""
                        />
                        <div
                          onClick={() => handleOnClick("video")}
                          className={`img-video-one ${
                            imgFb === "video" ? "active-img-video-one" : ""
                          }`}
                        >
                          <img src={imgVideo} alt="" />
                          <div className="d-flex icon-video">
                            <i className="fas fa-video"></i>
                            <p>0.21</p>
                          </div>
                        </div>
                      </div>
                      {isDisplay && (
                        <div className="feed-back-video-onClick">
                          {isImgOrVideo ? (
                            <img
                              className="img-video-two "
                              src={imgFbackBig}
                              alt=""
                            />
                          ) : (
                            <video className="img-video-two" controls loop>
                              <source src={video} />
                            </video>
                          )}
                        </div>
                      )} */}
                    <img src={comment.image} alt="anh" />
                  </div>
                  <div className="shop-feed-back">
                    <p>Phản Hồi Của Người Bán</p>
                    <p>
                      LEVENTS cảm ơn bạn đã đồng hành và tin dùng sản phẩm của
                      brand.Levents hi vọng sẽ được cùng bạn trải nghiệm nhiều
                      sản phẩm mới hơn
                    </p>
                  </div>
                  <div className="fback-like">
                    <i className="far fa-thumbs-up"></i> <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </section>
  );
}
export default FeedBack;
