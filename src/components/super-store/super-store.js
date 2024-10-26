import { useTranslation } from "react-i18next";
import { memo } from "react";

function SuperStore(props) {
  const { t } = useTranslation(["product"]);

  const listProduct = props?.listSp.slice(13, 18);
  const item_super_shop =
    listProduct.length > 0 ? (
      listProduct.map((product) => {
        return (
          <div key={product.id} className="item-super-shop">
            <div className="item-super-shop-img">
              <img src={product.thumbnail} alt="" />
            </div>
            <div className="item-super-shop-text">
              <p>SHOP XU HƯỚNG</p>
            </div>
            <div className="item-super-shop-price">
              <p>
                Tư : <sup>đ</sup> <span>1.500</span>
              </p>
            </div>
          </div>
        );
      })
    ) : (
      <p>Không có sản phẩm</p>
    );
  return (
    <section className="super-store">
      <div className="super-store-titel">
        <h1>{t("super store.TRENDING_SUPER_SHOP_BUNNING_SUPER_PRODUCTS")}</h1>
      </div>
      <div className="items-super-shop d-flex flex-wrap text-align">
        {item_super_shop}
      </div>
    </section>
  );
}
export default memo(SuperStore);
