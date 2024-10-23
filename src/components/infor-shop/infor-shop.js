import { Link } from "react-router-dom";
import imgShop from "../../assets/images/img/imgctsp/logo-shop.jpg";
function InforShop() {
  return (
    <section className="infor-shop d-flex col-12">
      <div className="infor-shop-logo-title d-flex col-5">
        <div className="infor-shop-logo-img col-5">
          <img src={imgShop} alt="img-shop" />
        </div>
        <div className="infor-shop-title">
          <p>CK STORE</p>
          <p>
            Online <span>8</span>
            <span> Phút</span> Trước
          </p>
          <div className="list-btn-shop">
            <button>
              <i className="fas fa-comments"></i> Chat Ngay
            </button>
            <Link href="https://www.facebook.com/duyphamk3">
              <button style={{ marginLeft: "1rem" }}>
                <i className="far fa-eye"></i> Xem Shope
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="infor-shop-text d-flex flex-wrap">
        <div className="infor-shop-text-item d-flex">
          <p>Đánh Giá</p>
          <p>
            96,6 <span>k</span>
          </p>
        </div>
        <div className="infor-shop-text-item d-flex">
          <p>Tỷ Lệ Phản Hồi</p>
          <p>
            96,6 <span>%</span>
          </p>
        </div>
        <div className="infor-shop-text-item d-flex">
          <p>Tham Gia</p>
          <p>
            4 <span>năm</span>
            <span>trước</span>
          </p>
        </div>
        <div className="infor-shop-text-item d-flex">
          <p>Sản Phẩm</p>
          <p>96</p>
        </div>
        <div className="infor-shop-text-item d-flex">
          <p>Thời Gian Phản Hồi</p>
          <p>trong vài giờ</p>
        </div>
        <div className="infor-shop-text-item d-flex">
          <p>Người Theo Dõi</p>
          <p>
            96,6 <span>k</span>
          </p>
        </div>
      </div>
    </section>
  );
}
export default InforShop;
