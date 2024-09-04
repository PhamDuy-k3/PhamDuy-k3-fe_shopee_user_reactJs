import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Category(props) {
  const listProduct = props.list.slice(0, 20);
  const { t } = useTranslation(["home"]);
  const category = listProduct.map((product) => (
    <Link key={product._id} to={`/Product/${product._id}`}>
      <div className="category-product">
        <div className="category-product-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="category-product-text">
          <p>{t(`aside categories.${product.name}`)} </p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section className="category bg-white">
      <div className="category-title">
        <h1> {t("aside categories.categories")}</h1>
      </div>
      <div className="category-products d-flex flex-wrap text-align">
        {category}
        <div className="transport">
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
    </section>
  );
}

export default Category;
