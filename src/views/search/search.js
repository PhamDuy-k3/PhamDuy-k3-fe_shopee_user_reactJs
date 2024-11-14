import { useState, useEffect } from "react";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import Footer from "../../components/footer/footer";
import ComponentHeader from "../../components/header/header";
import "../../views/product/scssSp/styleSP.scss";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import "./search.scss";
import SuggestSP from "../product/suggest-sp";
import { useLocation } from "react-router-dom";
import logoshop from "../../assets/images/img/goiy-4.jpg";
import CategoryTitleSp from "../../components/category-title-sp/category-title-sp";
import { useTranslation } from "react-i18next";

function Search() {
  const location = useLocation();
  const [textSearch, setTextSearch] = useState("");
  const [sumPage, setSumtPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("Phổ Biến");
  const [productWithBrands, setProductWithBrands] = useState([]);
  const [limit, setLimit] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [createdAt, setCreatedAt] = useState();
  const { t } = useTranslation(["product"]);

  const urlApi = `http://localhost:5050/products?limit=${limit}&name=${textSearch}&page=${currentPage}&sortOrder=${sortOrder}&idsBrand=${productWithBrands}&createdAt=${createdAt}`;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keywordParam = searchParams.get("keyword");
    if (keywordParam) {
      setTextSearch(keywordParam);
    }
  }, [location]);

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

  return (
    <div className="box-search">
      <AutoLoadPage />
      <ComponentHeader />
      <div className="context-product">
        <section className="category-all d-flex col-12">
          
          <CategoryTitleSp setProductWithBrands={setProductWithBrands} />
          <div className="items-category col-10">
            <div style={{ paddingLeft: "2rem" }}>
              <h1>
                SHOP LIÊN QUAN ĐẾN "<span>{textSearch}</span>"
              </h1>
              <div className="d-flex" id="shope_search">
                <div className="shope_search__info  col-3">
                  <img src={logoshop} alt="logoshop" />
                  <div className="shope_search__info-text">
                    <p>PhamDuy_Store_Limited</p>
                    <p style={{ color: "gray" }}>Follower : 12k</p>
                    <p>Xem shop</p>
                  </div>
                </div>
                <div className="shope_search__products col-9">
                  <div className="shope_search__products-item">
                    <div className="shope_search__products-item-img">
                      <img src={logoshop} alt="logoshop" />
                    </div>
                    <div>
                      <h5>Tên sản phẩm</h5>
                      <p>Giá : 1.500đ</p>
                    </div>
                  </div>
                  <div className="shope_search__products-item">
                    <div className="shope_search__products-item-img">
                      <img src={logoshop} alt="logoshop" />
                    </div>
                    <div>
                      <h5>Tên sản phẩm</h5>
                      <p>Giá : 1.500đ</p>
                    </div>
                  </div>{" "}
                  <div className="shope_search__products-item">
                    <div className="shope_search__products-item-img">
                      <img src={logoshop} alt="logoshop" />
                    </div>
                    <div>
                      <h5>Tên sản phẩm</h5>
                      <p>Giá : 1.500đ</p>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{marginTop:'1rem' , fontSize:'1.2rem'}}>
                Kết quả tìm kiếm cho từ khoá '
                <span style={{ color: "red" }}>{textSearch}</span>'
              </p>
            </div>

            <div className="items-category-title">
              <ul className="d-flex col-12">
                <li>Sắp xếp theo</li>
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
  );
}

export default Search;
