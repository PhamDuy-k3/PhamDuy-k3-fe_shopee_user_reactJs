import { useTranslation } from "react-i18next";
import sidebar from "../../assets/images/img/sidebar.jpg";

function ShopeeMaill(props) {
  const listProduct = props.list.slice(20, 28);
  const { t } = useTranslation(["home"]);

  const shopee_maill = listProduct.map((product) => {
    return (
      <div key={product.id} className="shopee-maill-poduct">
        <a href="">
          <div className="shopee-maill-poduct-img">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="shopee-maill-poduct-logo">
            <img src={product.thumbnail} alt={product.title} />
          </div>
        </a>
        <div className="shopee-maill-poduct-text">
          <p>Mua là có quà</p>
        </div>
      </div>
    );
  });

  return (
    <section className="shopee-maill col-12 bg-white">
      <div className="shopee-maill-title d-flex">
        <h1>SHOPEE MAIL</h1>
        <p>
          <i className="fas fa-reply"></i>{" "}
          {t("shopee mail.7_days_free_returns")}
        </p>
        <p>
          <i className="fas fa-check-circle"></i>{" "}
          {t("shopee mail.100%_genuine_product")}
        </p>
        <p>
          <i className="fas fa-truck"></i>
          {t("shopee mail.free_shipping")}
        </p>
        <p>
          {t("shopee mail.see_all")} <i className="fas fa-angle-right"></i>
        </p>
      </div>
      <div className="shopee-maill-sidebar-poducts d-flex">
        <div className="shopee-maill-sidebar col-4">
          <img src={sidebar} alt="sidebar" />
        </div>
        <div className="shopee-maill-poducts d-flex flex-wrap text-align">
          {shopee_maill}
        </div>
      </div>
    </section>
  );
}
export default ShopeeMaill;
