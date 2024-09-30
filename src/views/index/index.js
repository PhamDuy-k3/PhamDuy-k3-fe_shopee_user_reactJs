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
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [listProduct, setListProduct] = useState([]);
  const [limit] = useState(20); // Số lượng sản phẩm trên mỗi trang
  const [listProduct2, setListProduct2] = useState([]);
  const [cookies, , removeCookies] = useCookies(["user_token"]);
  const [categorys, setCategorys] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(null); // Trạng thái token
  const navigate = useNavigate();
  const { t } = useTranslation(["home"]);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const response = await fetch(`http://localhost:5050/auth/checkToken`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.user_token,
        },
      });
      if (!response.ok) {
        removeCookies("user_token", { path: "/" });
        setIsTokenValid(false);
        navigate("/login");
      } else {
        setIsTokenValid(true);
        await fetchCategories();
        await fetchUserProducts();
      }
    } catch (error) {
      console.error("Lỗi kiểm tra token:", error);
      setIsTokenValid(false); // Đặt trạng thái token thành không hợp lệ nếu có lỗi
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5050/categories");
      if (response.ok) {
        const data = await response.json();
        setCategorys(data.data);
      } else {
        console.error("Error fetching categories:", response.status);
      }
    } catch (error) {
      console.error("Error fetching categories API:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (response.ok) {
        const data = await response.json();
        setListProduct(data.products);
      } else {
        console.error("Error fetching products:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products API:", error);
    }
  };

  const fetchUserProducts = async () => {
    if (isTokenValid === false) return;
    try {
      const response = await fetch(
        `http://localhost:5050/products?&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setListProduct2(data.data);
      } else {
        console.error("Error fetching user products:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user products API:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {isTokenValid === true && ( // Kiểm tra nếu token hợp lệ
        <div className="box">
          <ComponentHeader />
          <Advertisement />
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
                <Suggest list={listProduct2} />
              </div>
              <div className="see-more">
                <button>{t("suggest.see_more")}</button>
              </div>
            </section>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
