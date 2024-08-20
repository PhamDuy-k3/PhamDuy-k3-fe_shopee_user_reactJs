import { useEffect, useState } from "react";
import CtspProductImg from "./ctsp-product-img/ctsp-product-img";
import CtspProductInfor from "./ctsp-product-infor/ctsp-product-infor";
function Product(props) {
  const title = props.product && props.product.name;

  return (
    <div className="product">
      <section className="ctsp-product-title">
        <ul className="d-flex">
          <li>
            <a href="">
              Shopee <i className="fas fa-angle-right"></i>
            </a>
          </li>
          <li>
            <a href="">
              Thời Trang Nam <i className="fas fa-angle-right"></i>
            </a>
          </li>
          <li>
            <a href="">
              Áo Khoác <i className="fas fa-angle-right"></i>
            </a>
          </li>
          <li>
            <a href="">
              Áo Khoác Mùa Đông & Áo Choàng{" "}
              <i className="fas fa-angle-right"></i>
            </a>
          </li>
          <li>{title}</li>
        </ul>
      </section>
      <section className="ctsp-product d-flex">
        <CtspProductImg product={props.product}/>
        <CtspProductInfor product={props.product} />
      </section>
    </div>
  );
}
export default Product;
