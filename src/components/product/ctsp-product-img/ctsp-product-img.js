import React, { useContext, useEffect, useState } from "react";
import FlyZoom from "./fly-zoom";
import imgBig2 from "../../../assets/images/img/imgctsp/banner-to-2.jpg";
import imgBig3 from "../../../assets/images/img/imgctsp/banner-to-3.jpg";
import imgBig4 from "../../../assets/images/img/imgctsp/banner-to-4.jpg";

import imgSmall2 from "../../../assets/images/img/imgctsp/banner-con-2.jpg";
import imgSmall3 from "../../../assets/images/img/imgctsp/banner-con-3.jpg";
import imgSmall4 from "../../../assets/images/img/imgctsp/banner-con-4.jpg";
import imgSmall5 from "../../../assets/images/img/imgctsp/banner-con-5.jpg";

import video from "../../../assets/audio/video.mp4";
import ZoomIn from "./zoom_in";
import { useCookies } from "react-cookie";
import { ProductContext } from "../../../views/product details/product details";
import { Link } from "react-router-dom";

function CtspProductImg(props) {
  const productContext = useContext(ProductContext);
  const [imgBig, setImgBig] = useState();
  const [imgBigZoom, setImgBigZoom] = useState();
  const [isImgVideo, setIsImgVideo] = useState(true);
  const [isZoom, setIsZoom] = useState(false);
  const [cookies] = useCookies();
  const [product, setProduct] = useState();
  const [isLike, setIsLike] = useState(false);

  const img_one = props.product?.image;
  const likes = product?.likedBy || [];
  const productId = props.product?._id;

  const fetchProducts = async () => {
    try {
      if (!productId) {
        return;
      }
      const res = await fetch(`http://localhost:5050/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const likedBy = data?.data?.likedBy || [];

      if (likedBy.length === 0) {
        setIsLike(false);
      }

      if (data.status_code === 201) {
        setIsLike(false);
      } else {
        setIsLike(true);
      }

      if (data?.data) {
        setProduct(data.data);
      } else {
        console.error("Product data is undefined");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProducts();
      setImgBig(img_one);
    }
  }, [img_one, productId]);

  const handleMouseOver = (newImg) => {
    setImgBig(newImg);
    setImgBigZoom(newImg);
    setIsImgVideo(newImg !== video);
  };

  const handleClick = (newImg) => {
    setImgBigZoom(newImg);
    setIsImgVideo(newImg !== video);
  };

  const handleIsZoom = () => {
    setIsZoom(!isZoom);
    document.body.style.overflow = isZoom ? "auto" : "hidden";
  };

  const handleLike = async (action) => {
    try {
      const res = await fetch(
        `http://localhost:5050/products/${action}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setIsLike(data.success);
      setIsLike(action === "increaseLike");
      fetchProducts();
    } catch (error) {
      console.error(`Error ${action} like:`, error);
    }
  };
  useEffect(() => {
    handleLike("increaseLike");
  }, []);

  const handleLikeChange = () => {
    handleLike(isLike ? "decreaseLike" : "increaseLike");
  };

  const arrayImgBig = [img_one, imgBig2, imgBig3, imgBig4, video];
  const arrayImgSmall = [img_one, imgSmall2, imgSmall3, imgSmall4, imgSmall5];

  const arrayImgSmallComponents = arrayImgSmall.map((item, index) => (
    <div
      key={item}
      onMouseOver={() => handleMouseOver(arrayImgBig[index])}
      className="item-img-small"
    >
      <img
        className={`${imgBig === arrayImgBig[index] ? "active-img-small" : ""}`}
        src={item}
        alt=""
      />
    </div>
  ));

  return (
    <>
      <div className="ctsp-product-img col-5">
        <div className="ctsp-product-img-big active-img-big">
          {isImgVideo ? (
            <img src={imgBig || imgSmall3} alt="" />
          ) : (
            <video controls poster="img/imgctsp/banner-con-5.jpg" loop>
              <source src={video} />
            </video>
          )}
        </div>

        <div className="ctsp-product-img-small d-flex col-12">
          {arrayImgSmallComponents}
        </div>
        <div className="chiase d-flex">
          <p>Chia sẻ:</p>
          <Link to="https://www.facebook.com/duyphamk3">
            <i
              className="fab fa-facebook"
              style={{ color: "rgb(11, 11, 174)" }}
            ></i>
          </Link>
          <Link to="#">
            <i
              className="fab fa-facebook-messenger"
              style={{ color: "blue" }}
            ></i>
          </Link>
          <Link to="#">
            <i className="fab fa-instagram-square" style={{ color: "red" }}></i>
          </Link>
          <Link to="#">
            <i
              className="fas fa-dove"
              style={{ color: "rgb(18, 217, 217)" }}
            ></i>
          </Link>
          <input
            id="like"
            type="checkbox"
            checked={isLike}
            onChange={handleLikeChange}
            style={{ display: "none" }}
          />
          <label htmlFor="like">
            {isLike ? (
              <i
                className="fas fa-heart fa-heart-love"
                style={{ color: "red" }}
              ></i>
            ) : (
              <i className="far fa-heart" style={{ color: "red" }}></i>
            )}
          </label>
          <p>
            Đã Thích <span className="loves">{likes.length}</span>
            <span className="loves-unit"></span>
          </p>
        </div>
      </div>
      {isZoom && (
        <>
          <ZoomIn
            arrayImgSmallNewOnClick={arrayImgSmallComponents}
            isImgVideo={isImgVideo}
            imgBigZoom={imgBigZoom}
          />
          <FlyZoom displayFlyZoom={handleIsZoom} />
        </>
      )}
    </>
  );
}

export default CtspProductImg;
