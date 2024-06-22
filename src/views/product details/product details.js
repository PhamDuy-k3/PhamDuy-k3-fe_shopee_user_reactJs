import "./scssCtsp/styleCtsp.scss";
import Product from "../../components/product/product";
import ComponentHeader from "../../components/header/header";
import InforShop from "../../components/infor-shop/infor-shop";
import ProductDetailsDescribe from "../../components/product-details-describe/product-details-describe";
import FeedBack from "../../components/feed-back/feed-back";
import Footer from "../../components/footer/footer";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function ProductDetails() {
  const [product, setProduct] = useState();
  const url_id = useParams();

  useEffect(() => {
    fetch(`http://localhost:5050/products/${url_id.product_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + cookies.Products_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.data);
      });
  }, [url_id.product_id]);

  return (
    <div style={{ maxWidth: "1280px", margin: "auto" }}>
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
  );
}

export default ProductDetails;
