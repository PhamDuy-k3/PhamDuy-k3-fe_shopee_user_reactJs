import { Link } from "react-router-dom";

function Suggest(props) {
  const VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  });
  const suggest = props?.list.map((product) => {
    return (
      <div key={product._id} className="suggest-product bg-white">
        <Link to={`/ProductDetail/${product.id}`}>
          <div className="suggest-product-img">
            <img src={product.image} alt="" />
          </div>
          <div className="suggest-product-text">
            <p>{product.name}</p>
          </div>
          <div className="suggest-product-sale">
            <p>
              Giảm đ <span>{product.discount}</span>k
            </p>
          </div>
          <div className="suggest-product-price-sold d-flex">
            <div className="suggest-product-price">
              <p>
                <span className="currency">đ</span>
                <span>{VND.format(product.prices)}</span>
              </p>
            </div>
            <div className="suggest-product-sold">
              <p>
                Đã bán <span>148</span> <span>k</span>
              </p>
            </div>
          </div>
          <div className="search-product text-align">
            <p>Tìm sản phẩm tương tự.</p>
          </div>
        </Link>
      </div>
    );
  });
  return suggest;
}

export default Suggest;
