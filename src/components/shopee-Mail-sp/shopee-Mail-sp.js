import { memo } from "react";

function ShopeeMailSp(props) {
  const listProduct = props?.listSp.slice(0, 12);
  const items_shopee_mail =
    listProduct.length > 0 ? (
      listProduct.map((product) => (
        <div key={product.id} className="item-shopee-mail">
          <img src={product.thumbnail} alt={product.title || "Sản phẩm"} />
        </div>
      ))
    ) : (
      <p>Không có sản phẩm</p>
    );
  return (
    <section className="shopee-mail-sp">
      <div className="item-shopee-mail-title">
        <h1>SHOPEE MAIL</h1>
      </div>
      <div className="items-shopee-mail d-flex flex-wrap">
        {items_shopee_mail}
      </div>
    </section>
  );
}

 export default memo(ShopeeMailSp);
