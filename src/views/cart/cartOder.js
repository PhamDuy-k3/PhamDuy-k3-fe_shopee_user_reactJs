import { useDispatch } from "react-redux";
import "./scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function CartOder() {
  const [sumSp, setSumSp] = useState(0);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [res, setRes] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder/?id_user_oder=${cookies.id_user}`
      );
      const data = await response.json();
      setRes(data.data);
      setCarts(data.data[0]?.carts || []);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    setSumSp(carts.length);
    setCookie("length_cart", carts.length);
    const totalSum = carts.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
    setTotal(VND.format(totalSum * 1000));
  }, [carts]);

  return (
    <div className="box_cart">
      <div className="body">
        <div className="container-fluid">
          {res.length > 0 ? (
            res.map((item, index) => (
              <div key={index} className="body-product bg-white mt-3">
                <div className="d-flex colum-1">
                  <i
                    style={{ color: "#00b9a0" }}
                    className="fas fa-shuttle-van"
                  ></i>
                  {item.status != "unconfirmed" ? (
                    <p>Đơn hàng của bạn đã được người bán xác nhận !!!</p>
                  ) : (
                    <p>Đơn hàng của bạn đang chờ người bán xác nhận !!!</p>
                  )}
                </div>
                <div className="body-title d-flex">
                  <p className="col-5">Sản phẩm</p>
                  <p className="col-2">Đơn Giá</p>
                  <p className="col-2">Số Lượng</p>
                  <p className="col-2">Số Tiền</p>
                  <p className="col-1">Thao Tác</p>
                </div>
                <div className="list-products">
                  {item.carts.length > 0 ? (
                    item.carts.map((product, index) => (
                      <div
                        key={index}
                        style={{ height: "13rem" }}
                        className="item-product"
                      >
                        <div className="store-name">Name-store</div>

                        <div
                          style={{ height: "13rem" }}
                          className="d-flex product-infor"
                        >
                          <div
                            style={{ height: "8rem" }}
                            className="col-5 d-flex product"
                          >
                            <img
                              style={{ height: "7rem" }}
                              className="col-2"
                              src={product.image}
                              alt=""
                            />
                            <p className="col-5 product-name">{product.name}</p>
                            <div className="d-flex flex-column">
                              <select
                                className="mt-3"
                                style={{ height: "1.3rem" }}
                                name="product-category"
                                id="product-category"
                              >
                                <option value="Phân Loại Hàng">
                                  Phân Loại Hàng
                                </option>
                                <option
                                  style={{ color: "red" }}
                                  value={product.color}
                                >
                                  {product.color}
                                </option>
                                <option value="white">Màu Trắng</option>
                              </select>
                              <p>Size : {product.size}</p>
                            </div>
                          </div>
                          <div className="d-flex price-info col-2 pt-5 text-center">
                            <p style={{ color: "gray" }}>
                              <sup>đ</sup> <del>100000</del>
                            </p>
                            <p>
                              <sup>đ</sup>{" "}
                              <span className="price">{product.price}</span>
                            </p>
                          </div>
                          <div className="quantity col-2 pt-5">
                            <input
                              className="cart-down-quantity"
                              type="button"
                              value="-"
                            />
                            <input
                              className="quantity_value"
                              type="number"
                              min="1"
                              value={product.quantity}
                            />
                            <input
                              className="cart-up-quantity"
                              type="button"
                              value="+"
                            />
                          </div>
                          <div className="total-price col-2 pt-5">
                            <p>
                              <sup>đ</sup>{" "}
                              <span className="sum">{product.sum}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in cart</p>
                  )}
                </div>
                <div className="d-flex mt-3 colum-4">
                  <div className="col-4 d-flex">
                    <p>
                      Tổng thanh toán (
                      <span className="quantityCart-two">{sumSp}</span>) sản
                      phẩm :
                    </p>
                    <div
                      style={{ color: "#ee4d2d", fontSize: "1.5rem" }}
                      className=""
                    >
                      <sub>đ</sub>
                      <p style={{ paddingLeft: "1rem" }} className="sum-price">
                        {total}
                      </p>
                    </div>
                  </div>
                  {item.status == "confirmed" ? (
                    <button style={{ marginLeft: "40%" }}>Chuẩn bị hàng</button>
                  ) : item.status == "delivered" ? (
                    <button
                      style={{ backgroundColor: "gray", marginLeft: "40%" }}
                    >
                      Đã thanh toán
                    </button>
                  ) : (
                    <button
                      style={{ backgroundColor: "gray", marginLeft: "40%" }}
                    >
                      Chờ xác nhận
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "2rem", color: "red" }}>
              Chưa có đơn hàng nào
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartOder;
