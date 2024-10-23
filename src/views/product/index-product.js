import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ComponentHeader from "../../components/header/header";
import banner from "../../assets/images/img/imgSp/banner1.jpg";
import ShopeeMaillSp from "../../components/shopee-Mail-sp/shopee-Mail-sp";
import SuperStore from "../../components/super-store/super-store";
import CategoryTitleSp from "../../components/category-title-sp/category-title-sp";
import Footer from "../../components/footer/footer";
import "./scssSp/styleSP.scss";
import SuggestSP from "./suggest-sp";
import { useTranslation } from "react-i18next";

function IndexProduct() {
  const productList = useSelector((state) => state.product.products);
  const [limit, setLimit] = useState(1); // Số lượng sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const url_id = useParams();
  const { t } = useTranslation(["product"]);
  const [filter, setFilter] = useState(t("nav.popular"));
  const [createdAt, setCreatedAt] = useState();
  const [productWithBrands, setProductWithBrands] = useState([]);

  const urlApi = `http://localhost:5050/products?limit=${limit}&page=${currentPage}&category_id=${url_id.category_id}&sortOrder=${sortOrder}&idsBrand=${productWithBrands}&createdAt=${createdAt}`;

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  const handleCreatedAt = (item) => {
    setFilter(item);
    if (item === t("nav.latest")) {
      setCreatedAt("new");
    } else {
      setCreatedAt("");
    }
  };
  const array = [t("nav.popular"), t("nav.latest"), t("nav.selling_well")];

  const list_filter = array.map((item, index) => {
    return (
      <li
        style={{ cursor: "pointer" }}
        key={index}
        className={item === filter ? "active" : ""}
        onClick={() => handleCreatedAt(item)}
      >
        {item}
      </li>
    );
  });
  //console.log(filter === t("nav.latest"));

  return (
    <>
      <div className="box-product">
        <ComponentHeader />
        <div className="context-product">
          <section className="banner col-12">
            <img className="col-12" src={banner} alt="" />
          </section>
          <ShopeeMaillSp listSp={productList} />
          <SuperStore listSp={productList} />
          <SuperStore listSp={productList} />

          <section className="category-all d-flex col-12">
            <CategoryTitleSp setProductWithBrands={setProductWithBrands} />
            <div className="items-category col-10">
              <div className="items-category-title">
                <ul className="d-flex col-12">
                  <li>{t("nav.sort_by")}</li>
                  {list_filter}
                  <select
                    style={{ border: "navajowhite" }}
                    name="gia"
                    id="price"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option disabled value="">
                      {t("nav.price")}
                    </option>
                    <option value="asc">
                      {" "}
                      {t("nav.price")} : {t("nav.from_low_to_high")}
                    </option>
                    <option value="desc">
                      {" "}
                      {t("nav.price")} : {t("nav.from_high_to_low")}
                    </option>
                  </select>
                </ul>
              </div>
              <SuggestSP
                urlApi={urlApi}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                sortOrder={sortOrder}
                productWithBrands={productWithBrands}
                filter={filter}
              ></SuggestSP>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default IndexProduct;
