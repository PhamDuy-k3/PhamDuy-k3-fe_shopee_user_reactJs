import { useDispatch } from "react-redux";
import "./scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import Menu from "./menu";
import ComponentHeader from "../../components/header/header";
import { VND } from "../../components/VND/vnd";

function CartOder() {
  const [sumSp, setSumSp] = useState(0);
  const [cartsOder, setCartsOrder] = useState([]);
  const [res, setRes] = useState([]);
  const [status, setStatus] = useState("");
  const [cookies, setCookie] = useCookies();

  //xóa các query ko cần thiết trong url

  useEffect(() => {
    if (window.location.search || window.location.hash.includes("?")) {
      const queryParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(
        window.location.hash.split("?")[1]
      );
      window.history.replaceState(null, null, "/#/CartOder");
    }
  }, []);

  //danh sách sản phẩm người dùng order
  const fetchCartsOder = async () => {
    try {
      if (!cookies.user_token && !status) {
        return;
      }
      const response = await fetch(
        `http://localhost:5050/cartsOder/?status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      const data = await response.json();
      const sortedOrders = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setRes(sortedOrders);

      setCartsOrder(data.data[0]?.carts || []);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchCartsOder();
  }, [status]);

  return (
    <>
      <ComponentHeader />
      <div className="box_cart">
        <div className="body">
          <Menu status={status} setStatus={setStatus} />
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
                          <div className="store-name">Pham Duy Store</div>

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
                              <p className="col-5 product-name">
                                {product.name}
                              </p>
                              <div className="d-flex flex-column">
                                <select
                                  className="mt-3"
                                  style={{ height: "1.3rem" }}
                                  name="product-category"
                                  id="product-category"
                                >
                                  <option
                                    style={{ color: "red" }}
                                    value={product.color}
                                  >
                                    {product.color}
                                  </option>
                                </select>
                                <p>Size : {product.size}</p>
                              </div>
                            </div>
                            <div className="d-flex price-info col-2 pt-5 text-center">
                              <p>
                                <sup>đ</sup>{" "}
                                <span className="price">
                                  {VND.format(product.price)}
                                </span>
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
                                <span className="sum">
                                  {VND.format(product.sum)}
                                </span>
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
                        <p
                          style={{ paddingLeft: "1rem" }}
                          className="sum-price"
                        >
                          {VND.format(item.total_prices)}
                        </p>
                      </div>
                    </div>
                    {item.status === "confirmed" ? (
                      <button style={{ marginLeft: "40%" }}>
                        Chờ thanh toán
                      </button>
                    ) : item.status === "processing" ? (
                      <button style={{ marginLeft: "40%" }}>Đang xử lý</button>
                    ) : item.status === "shipped" ? (
                      <button style={{ marginLeft: "40%" }}>
                        Đang giao hàng
                      </button>
                    ) : item.status === "delivered" ? (
                      <button
                        style={{ backgroundColor: "gray", marginLeft: "40%" }}
                      >
                        Đã thanh toán
                      </button>
                    ) : item.status === "canceled" ? (
                      <button
                        style={{ backgroundColor: "gray", marginLeft: "40%" }}
                      >
                        Đã hủy
                      </button>
                    ) : item.status === "returned" ? (
                      <button
                        style={{ backgroundColor: "gray", marginLeft: "40%" }}
                      >
                        Trả hàng
                      </button>
                    ) : (
                      <button style={{ marginLeft: "40%" }}>
                        Chờ xác nhận
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="img-no-order">
                <img src={imgNoOder} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartOder;
