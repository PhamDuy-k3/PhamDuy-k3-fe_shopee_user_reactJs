import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { fetchAllProducts } from "../../redux/action";
import { Outlet, useParams } from "react-router-dom";
import ComponentHeader from "../../components/header/header";
import banner from "../../assets/images/img/imgSp/banner1.jpg";
import ShopeeMaillSp from "../../components/shopee-Mail-sp/shopee-Mail-sp";
import SuperStore from "../../components/super-store/super-store";
import CategoryTitleSp from "../../components/category-title-sp/category-title-sp";
import Footer from "../../components/footer/footer";
import Suggest from "../../components/suggest/suggest";
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

  const urlApi = `http://localhost:5050/products?limit=${limit}&page=${currentPage}&category_id=${url_id.category_id}&sortOrder=${sortOrder}`;

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };



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
            <CategoryTitleSp />
            <div className="items-category col-10">
              <div className="items-category-title">
                <ul className="d-flex col-12">
                  <li>{t("nav.sort_by")}</li>
                  <li className="active">{t("nav.popular")}</li>
                  <li>{t("nav.latest")}</li>
                  <li>{t("nav.selling_well")}</li>
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
