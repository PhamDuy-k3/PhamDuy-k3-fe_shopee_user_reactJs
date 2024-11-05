import React, { useCallback, useEffect, useState } from "react";
import FeedBackHeader from "./feed-back-header";
import imgUser from "../../assets/images/img/imgctsp/img-product.png";
import imgFbackSmaill from "../../assets/images/img/imgctsp/img-fback-con.jpg";
import imgFbackBig from "../../assets/images/img/imgctsp/img-fback-to.jpg";
import imgVideo from "../../assets/images/img/product-4.jpg";
import video from "../../assets/audio/video.mp4";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import FormComment from "./form";
import { jwtDecode } from "jwt-decode";
import LoadingFb from "./loadingFb";

function FeedBack() {
  const [isImgOrVideo, setIsImgOrVideo] = useState(true);
  const [isDisplay, setIsDisplay] = useState(false);
  const [imgFb, setImgFb] = useState("");
  const [cookies, setCookie, removeCookies] = useCookies();
  const [comments, setComments] = useState([]);
  const [showActions, setShowActions] = useState([]);
  const [editCommentData, setEditCommentData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [rating, setRating] = useState("");
  const [commentsRating, setCommentsRating] = useState([]);
  const urlProductID = useParams();

  useEffect(() => {
    if (cookies.user_token) {
      const decoded = jwtDecode(cookies.user_token);
      setUserId(decoded.id);
    }
  }, [cookies.user_token]);

  const toggleAction = (id) => {
    if (showActions.includes(id)) {
      setShowActions(showActions.filter((item) => item !== id));
    } else {
      setShowActions([...showActions, id]);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/comments/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      setComments(comments.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const editComment = (comment) => {
    setEditCommentData(comment);
  };

  const handleOnClick = (value) => {
    setIsImgOrVideo(value !== "video");
    setImgFb(value);
    setIsDisplay(true);
  };

  const fetchDataComment = useCallback(async () => {
    try {
      if (!urlProductID.product_id) return;
      const response = await axios.get(
        `http://localhost:5050/comments?productId=${urlProductID.product_id}&rating=${rating}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      if (rating || rating === 0) {
        if (response.data.data.length > 0) {
          setCommentsRating(response.data.data);
        } else {
          setCommentsRating([""]);
        }
        return;
      }
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [urlProductID.product_id, rating, cookies.user_token]);

  useEffect(() => {
    fetchDataComment();
  }, [fetchDataComment]);
  return (
    <section id="feedBack" className="feed-back">
      <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
      <FeedBackHeader setRating={setRating} comments={comments} />
      <FormComment
        setEditCommentData={setEditCommentData}
        setComments={setComments}
        fetchDataComment={fetchDataComment}
        productID={urlProductID.product_id}
        editCommentData={editCommentData}
      />
      <div className="feed-back-content">
        {isLoading ? (
          <LoadingFb />
        ) : comments.length > 0 ? (
          (commentsRating.length > 0
            ? commentsRating[0] === ""
              ? []
              : commentsRating
            : comments
          ).map((comment) => (
            <div key={comment._id} className="feed-back-content-products">
              <div
                onClick={() => toggleAction(comment._id)}
                className="icon-edit-comment"
              >
                <i className="fas fa-ellipsis-v"></i>
              </div>
              {showActions.includes(comment._id) && (
                <div className="content-edit-comment">
                  {comment.userId === userId ? (
                    <>
                      <p onClick={() => editComment(comment)}>Chỉnh sửa</p>
                      <p onClick={() => deleteComment(comment._id)}>Xóa</p>
                    </>
                  ) : (
                    <p>Báo cáo</p>
                  )}
                </div>
              )}
              <div className="item-feed-back-product d-flex">
                <div className="img-product col-1">
                  <img src={imgUser} alt="User" />
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
                    {comment.image && <img src={comment.image} alt="Comment" />}
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
