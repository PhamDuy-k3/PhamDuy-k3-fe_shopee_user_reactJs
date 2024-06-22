import sale_time from "../../assets/images/img/sale-time.jpg";
import sale_free_ship from "../../assets/images/img/sale-free-ship.jpg";
import sale_giam_gia from "../../assets/images/img/sale-giam-gia.jpg";
import sale_deal from "../../assets/images/img/sale-deal.jpg";
import sale_re from "../../assets/images/img/sale-re.jpg";
import sale_deal_soc from "../../assets/images/img/sale-deal-soc.jpg";
import sale_outlet from "../../assets/images/img/sale-outlet.jpg";
import sale_nap from "../../assets/images/img/sale-nap.jpg";
import sale_quoc_te from "../../assets/images/img/sale-quoc-te.jpg";
export function Sale() {
  return (
    <div className="sale bg-white d-flex">
      <div className="sale-item text-align">
        <a href="https://shopee.vn/m/khung-gio-san-sale">
          <div className="sale-item-image">
            <img src={sale_time} alt="" />
          </div>
          <div className="sale-item-text">
            <p>Khung Giờ Săn Sale</p>
          </div>
        </a>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_free_ship} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Miễn Phí Ship - Có Shopee</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_giam_gia} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Voucher Giảm Đến 500.000Đ</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_deal} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Gì Cung Rẻ - Deal Sốc 9.000Đ</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_re} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Mã Giảm Giá</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_deal_soc} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Bắt Trend - Giá Sốc</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_outlet} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Hàng Hiệu Outlet Giảm 50%</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_nap} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Nạp Thẻ , Dịch Vụ & Data</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_quoc_te} alt="" />
        </div>
        <div className="sale-item-text">
          <p>Hàng Quốc Tế</p>
        </div>
      </div>
    </div>
  );
}
