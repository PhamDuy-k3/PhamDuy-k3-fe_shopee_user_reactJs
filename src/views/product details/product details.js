import "./scssCtsp/styleCtsp.scss";
import Product from "../../components/product/product";
import ComponentHeader from "../../components/header/header";
import InforShop from "../../components/infor-shop/infor-shop";
import ProductDetailsDescribe from "../../components/product-details-describe/product-details-describe";
import FeedBack from "../../components/feed-back/feed-back";
import Footer from "../../components/footer/footer";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ProductContext = createContext();

function ProductDetails() {
  const [product, setProduct] = useState();
  const url_id = useParams();
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (!url_id.product_id) {
      return;
    }
    fetch(`http://localhost:5050/products/${url_id.product_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.data);
      });
  }, [url_id.product_id, cookies.user_token]);
  return (
    <ProductContext.Provider value={product}>
      <div className="maxWidth">
        <ComponentHeader />
        <AutoLoadPage />
        <div className="context-detal-product">
          <Product product={product} />
          <InforShop />
          <ProductDetailsDescribe product={product} />
          <FeedBack />
        </div>
        <Footer></Footer>
      </div>
    </ProductContext.Provider>
  );
}

export default ProductDetails;
