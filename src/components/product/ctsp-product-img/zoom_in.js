import video from "../../../assets/audio/video.mp4";
function ZoomIn({ arrayImgSmallNewOnClick, isImgVideo, imgBigZomm }) {
  return (
    <div className="zoom-in">
      <div className="ctsp-product-img d-flex">
        <div className="ctsp-product-img-bigs col-7">
          <div className="ctsp-product-img-big-zoom active-img-big-zoom">
            {isImgVideo ? (
              <img src={imgBigZomm} alt="" />
            ) : (
              <video controls poster="img/imgctsp/banner-con-5.jpg" loop>
                <source src={video} />
              </video>
            )}
          </div>
        </div>
        <div className="ctsp-product-img-small">
          <h1>
            Áo Sweater Nam Form Rộng Phối Layer Chất Nỉ Unisex Thời Trang Trẻ
            Trung VESCA M10
          </h1>
          <div className="item-img-smalls d-flex flex-wrap">
            {arrayImgSmallNewOnClick}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ZoomIn;
