import sale_time from "../../assets/images/img/sale-time.jpg";
import sale_free_ship from "../../assets/images/img/sale-free-ship.jpg";
import sale_giam_gia from "../../assets/images/img/sale-giam-gia.jpg";
import sale_deal from "../../assets/images/img/sale-deal.jpg";
import sale_re from "../../assets/images/img/sale-re.jpg";
import sale_deal_soc from "../../assets/images/img/sale-deal-soc.jpg";
import sale_outlet from "../../assets/images/img/sale-outlet.jpg";
import sale_nap from "../../assets/images/img/sale-nap.jpg";
import sale_quoc_te from "../../assets/images/img/sale-quoc-te.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export function Sale() {
  const { t } = useTranslation(["home"]);

  return (
    <div className="sale bg-white d-flex">
      <div className="sale-item text-align">
        <Link to="https://shopee.vn/m/khung-gio-san-sale">
          <div className="sale-item-image">
            <img src={sale_time} alt="" />
          </div>
          <div className="sale-item-text">
            <p>{t("aside sale.flash_sale_hours")}</p>
          </div>
        </Link>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_free_ship} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.free_shipping_shopee")}</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <Link to="/voucher">
          <div className="sale-item-image">
            <img src={sale_giam_gia} alt="" />
          </div>
          <div className="sale-item-text">
            <p>{t("aside sale.voucher_discount")}</p>
          </div>
        </Link>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_deal} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.cheap_deals")}</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_re} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.discount_code")}</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_deal_soc} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.trend_alert")}</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_outlet} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.branded_outlet_discount")}</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_nap} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.top_up_services")}</p>
        </div>
      </div>
      <div className="sale-item text-align">
        <div className="sale-item-image">
          <img src={sale_quoc_te} alt="" />
        </div>
        <div className="sale-item-text">
          <p>{t("aside sale.International_products")}</p>
        </div>
      </div>
    </div>
  );
}
