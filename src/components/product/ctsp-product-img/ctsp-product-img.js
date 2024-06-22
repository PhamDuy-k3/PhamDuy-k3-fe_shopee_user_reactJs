import React, { useEffect, useState } from "react";
import FlyZoom from "./fly-zoom";
import imgBig2 from "..//..//../assets/images/img/imgctsp/banner-to-2.jpg";
import imgBig3 from "..//..//../assets/images/img/imgctsp/banner-to-3.jpg";
import imgBig4 from "..//..//../assets/images/img/imgctsp/banner-to-4.jpg";

import imgSmall2 from "..//..//../assets/images/img/imgctsp/banner-con-2.jpg";
import imgSmall3 from "..//..//../assets/images/img/imgctsp/banner-con-3.jpg";
import imgSmall4 from "..//..//../assets/images/img/imgctsp/banner-con-4.jpg";
import imgSmall5 from "..//..//../assets/images/img/imgctsp/banner-con-5.jpg";

import video from "../../../assets/audio/video.mp4";
import ZoomIn from "./zoom_in";

function CtspProductImg(props) {
  let img_one = props.product && props.product.image;
  const [imgBig, setImgBig] = useState();
  const [imgBigZomm, setImgBigZoom] = useState();
  const [isImgVideo, setIsImgVideo] = useState(true);
  const [isZoom, setIsZoom] = useState(false);

  useEffect(() => {
    setImgBig(img_one);
  }, [img_one]);
  
  function disPlayImgOrVideo(newImg) {
    if (newImg === video) {
      setIsImgVideo(false);
    } else {
      setIsImgVideo(true);
    }
  }
  const handelMouseOver = (newImg) => {
    setImgBig(newImg);
    setImgBigZoom(newImg);
    disPlayImgOrVideo(newImg);
  };

  const handelClick = (newImg) => {
    setImgBigZoom(newImg);
    disPlayImgOrVideo(newImg);
  };
  function handelIsZoom() {
    setIsZoom(!isZoom);
    document.body.style.overflow = "hidden";
  }
  const displayFlyZoom = () => {
    document.body.style.overflow = "auto";
    setIsZoom(!isZoom);
  };

  var arrayImgBig = [img_one, imgBig2, imgBig3, imgBig4, video];
  var arrayImgSmall = [img_one, imgSmall2, imgSmall3, imgSmall4, imgSmall5];

  var arrayImgSmallNewMouseOver = arrayImgSmall.map((item, index) => {
    return (
      <div
        key={item}
        onClick={handelIsZoom}
        onMouseOver={() => handelMouseOver(arrayImgBig[index])}
        className="item-img-small"
      >
        <img
          className={`${
            imgBig === arrayImgBig[index] ? "active-img-small" : ""
          }`}
          src={item}
          alt=""
        />
      </div>
    );
  });
  var arrayImgSmallNewOnClick = arrayImgSmall.map((item, index) => {
    return (
      <div
        key={item}
        onClick={() => handelClick(arrayImgBig[index])}
        className="item-img-small"
      >
        <img
          className={`${
            imgBigZomm === arrayImgBig[index] ? "active-img-small" : ""
          }`}
          src={item}
          alt=""
        />
      </div>
    );
  });

  return (
    <>
      <div className="ctsp-product-img col-5">
        <div className="ctsp-product-img-big active-img-big">
          {isImgVideo ? (
            <img src={img_one ? imgBig : imgSmall3} alt="" />
          ) : (
            <video controls poster="img/imgctsp/banner-con-5.jpg" loop>
              <source src={video} />
            </video>
          )}
        </div>

        <div className="ctsp-product-img-small d-flex col-12">
          {arrayImgSmallNewMouseOver}
        </div>
        <div className="chiase d-flex">
          <p>Chia sẻ:</p>
          <a href="https://www.facebook.com/duyphamk3">
            <i
              className="fab fa-facebook"
              style={{ color: "rgb(11, 11, 174)" }}
            ></i>
          </a>
          <a href="">
            <i
              className="fab fa-facebook-messenger"
              style={{ color: "blue" }}
            ></i>
          </a>
          <a href="">
            <i className="fab fa-instagram-square" style={{ color: "red" }}></i>
          </a>
          <a href="">
            <i
              className="fas fa-dove"
              style={{ color: "rgb(18, 217, 217)" }}
            ></i>
          </a>
          <i
            className="far fa-heart fa-heart-love"
            style={{ color: "red" }}
          ></i>
          <p>
            Đã Thích <span className="loves">0</span>
            <span className="loves-unit"></span>
          </p>
          <p></p>
        </div>
      </div>
      {isZoom && (
        <>
          <ZoomIn
            arrayImgSmallNewOnClick={arrayImgSmallNewOnClick}
            isImgVideo={isImgVideo}
            imgBigZomm={imgBigZomm}
          />{" "}
          <FlyZoom displayFlyZoom={displayFlyZoom} />
        </>
      )}
    </>
  );
}
export default CtspProductImg;
