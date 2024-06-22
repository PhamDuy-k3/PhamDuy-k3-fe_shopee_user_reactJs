import React from "react";
import { Link } from "react-router-dom";
function Category(props) {
  const listProduct = props.list.slice(0, 20);

  const category = listProduct.map((product) => (
    <Link key={product._id} to={`/Product/${product._id}`}>
      <div className="category-product">
        <div className="category-product-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="category-product-text">
          <p>{product.name}</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section className="category bg-white">
      <div className="category-title">
        <h1>DANH MUC</h1>
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
