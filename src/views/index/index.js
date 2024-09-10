import React, { useEffect, useState } from "react";
import ComponentHeader from "../../components/header/header";
import Banner from "../../components/banner/banner";
import { Sale } from "../../components/sale/sale";
import Category from "../../components/category/category";
import Advertisements from "../../components/advertisements/advertisements";
import FlastSale from "../../components/flast-sale/flast_sale";
import ShopeeMaill from "../../components/shopee-maill/shopee-maill";
import Suggest from "../../components/suggest/suggest";
import Footer from "../../components/footer/footer";
import Advertisement from "../../components/advertisement/advertisement";
import Chat from "../../components/chat/chat";
import "./scssIndex/index.scss";
import Phone from "../../components/advertisement/phone";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [listProduct, setListProduct] = useState([]);
  const [limit, setLimit] = useState(20); // Số lượng sản phẩm trên mỗi trang
  const [listProduct2, setListProduct2] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation(["home"]);

  useEffect(() => {
    if (!cookies.user_token) {
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5050/categories");
        const data = await response.json();
        setCategorys(data.data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setListProduct(data.products);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5050/products?&limit=${limit}`
        );
        const data = await response.json();
        setListProduct2(data.data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="box">
      <ComponentHeader />
      <Advertisement />
      {/* <Phone /> */}
      <Chat />
      <section className="context">
        <section className="banner-sale">
          <Banner />
          <Sale />
        </section>
        <Category list={categorys} />
        <FlastSale list={listProduct} />
        <Advertisements />
        <ShopeeMaill list={listProduct} />
        <section className="suggest">
          <div className="suggest-title text-align sticky-top">
            <h4>{t("suggest.today_suggestion")}</h4>
            <div className="gach"></div>
          </div>
          <div className="suggest-products d-flex flex-wrap">
            {" "}
            <Suggest list={listProduct2} />
          </div>

          <div className="see-more">
            <button>{t("suggest.see_more")}</button>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Index;
