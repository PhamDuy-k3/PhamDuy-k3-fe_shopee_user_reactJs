import { useState, useEffect } from "react";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import Footer from "../../components/footer/footer";
import ComponentHeader from "../../components/header/header";
import "../../views/product/scssSp/styleSP.scss";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import "./search.scss";
import SuggestSP from "../product/suggest-sp";

function Search() {
  const [textSearch, setTextSearch] = useState("");
  const [sumPage, setSumtPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // Lấy giá trị từ localStorage

  useEffect(() => {
    const storedTextSearch = JSON.parse(localStorage.getItem("text_search"));
    setTextSearch(storedTextSearch);
  }, []);
  const urlApi = `http://localhost:5050/products?&page=${currentPage}&name=${textSearch}`;
  return (
    <div className="box-search">
      <AutoLoadPage />
      <ComponentHeader />
      <div className="context-product">
        <section className="category-all d-flex col-12">
          <SearchFilters />
          <div className="items-category col-10">
            <div style={{ paddingLeft: "2rem" }}>
              <h1>
                SHOP LIÊN QUAN ĐẾN "<span>{textSearch}</span>"
              </h1>
              <div style={{ height: "10rem", backgroundColor: "white" }}></div>
              <p>
                Kết quả tìm kiếm cho từ khoá '
                <span style={{ color: "red" }}>{textSearch}</span>'
              </p>
            </div>

            <div className="items-category-title">
              <ul className="d-flex col-12">
                <li>Sắp xếp theo</li>
                <li className="active">Phổ Biến</li>
                <li>Mới Nhất</li>
                <li>Bán chạy</li>
                <select style={{ border: "navajowhite" }} name="gia" id="price">
                  <option disabled value="gia">
                    Giá
                  </option>
                  <option value="giaUp">Giá : Từ thấp đến cao</option>
                  <option value="giaDown">Giá : Từ cao đến thấp</option>
                </select>
              </ul>
            </div>
            <SuggestSP
              urlApi={urlApi}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              textSearch={textSearch}
            ></SuggestSP>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
export default Search;
