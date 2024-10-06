import { Link } from "react-router-dom";
import CtspProductImg from "./ctsp-product-img/ctsp-product-img";
import CtspProductInfor from "./ctsp-product-infor/ctsp-product-infor";
function Product(props) {
  let title = props.product?.name || "";

  return (
    <div className="product">
      <section className="ctsp-product-title">
        <ul className="d-flex">
          <li>
            <Link to="">
              Shopee <i className="fas fa-angle-right"></i>
            </Link>
          </li>
          <li>
            <Link to="">
              Thời Trang Nam <i className="fas fa-angle-right"></i>
            </Link>
          </li>
          <li>
            <Link to="">
              Áo Khoác <i className="fas fa-angle-right"></i>
            </Link>
          </li>
          <li>
            <Link to="">
              Áo Khoác Mùa Đông & Áo Choàng{" "}
              <i className="fas fa-angle-right"></i>
            </Link>
          </li>
          {title.length > 65 ? (
            <td>{title.substring(0, 65)} ...</td>
          ) : (
            <td>{title}</td>
          )}
        </ul>
      </section>
      <section className="ctsp-product d-flex">
        <CtspProductImg product={props.product} />
        <CtspProductInfor product={props.product} />
      </section>
    </div>
  );
}
export default Product;
