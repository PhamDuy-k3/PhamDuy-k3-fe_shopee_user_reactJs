import "../cart/scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import { VND, VND_currency } from "../../components/VND/vnd";
import "./styleListOrder.scss";
import { useParams } from "react-router-dom";

function OrderDatail() {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [cookies, setCookie] = useCookies();
  const id_order = useParams();

  const fetchOderById = async () => {
    try {
      if (!cookies.user_token || !id_order.orderId) {
        return;
      }
      const response = await fetch(
        `http://localhost:5050/cartsOder/${id_order.orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      const data = await response.json();
      if (!data) return;
      setOrder(data.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchOderById();
  }, [id_order]);

  console.log(order);

  return (
    <>
      <div id="box_cartOder" className="box_cart ">
        <div className="body">
          <div className="container-fluid">
            <div className="container-fluid">
              {order ? (
                <div className="body-product ">
                  <div className="d-flex colum-1">
                    <p className="col-7">Thông tin chi tiết đơn hàng của bạn !</p>
                    <div className="d-flex">
                      {" "}
                      <p>Mã Đơn Hàng : {order.orderId}</p>
                      <p>|</p>
                      {order.paymentStatus === "paid" ? (
                        <p style={{ color: "green" }}>ĐƠN HÀNG ĐÃ HOÀN THÀNH</p>
                      ) : (
                        <p style={{ color: "red" }}>ĐƠN HÀNG CHƯA HOÀN THÀNH</p>
                      )}
                    </div>
                  </div>
                  <div className="body-title d-flex">
                    <p className="col-7">Sản phẩm</p>
                    <p className="col-2">Đơn Giá</p>
                    <p className="col-2">Số Lượng</p>
                    <p className="col-1">Số Tiền</p>
                  </div>
                  <div className="list-products">
                    {order.carts?.length > 0 ? (
                      order.carts.map((product, index) => (
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
                              className="col-7 d-flex product"
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
                                disabled
                                className="cart-down-quantity"
                                type="button"
                                value="-"
                              />
                              <input
                                disabled
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
                            <div className="total-price col-1 pt-5">
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
                  <div className="info-order-fee">
                    <div className="d-flex">
                      <p className="col-8">Tổng tiền hàng</p>
                      <p className="info-order-fee__text">
                        {VND_currency.format(order.subTotal)}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="col-8">Phi vận chuyển</p>
                      <p className="info-order-fee__text">
                        {VND_currency.format(order.shippingFee)}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="col-8">Giảm giá phí vận chuyển</p>
                      <div className="info-order-fee__text">
                        {order.shippingDiscount > 0 ? (
                          <p>
                            <span>-</span>
                            {VND_currency.format(order.shippingDiscount)}
                          </p>
                        ) : (
                          VND_currency.format(order.shippingDiscount)
                        )}{" "}
                      </div>
                    </div>
                    <div className="d-flex sum-price">
                      <p className="col-8">Thành tiền </p>
                      <p className="info-order-fee__text">
                        {VND_currency.format(order.orderTotal)}
                      </p>
                    </div>
                    {order.paymentMethod === "COD" && (
                      <div id="payment-upon-receipt" className="d-flex ">
                        <i class="fas fa-bell"></i>
                        <p>
                          Vui lòng thanh toán
                          <span className="mx-2" style={{ color: "red" }}>
                            {VND_currency.format(order.orderTotal)}
                          </span>
                          khi nhận hàng
                        </p>
                      </div>
                    )}
                    <div id="payment-method" className="d-flex ">
                      <p className="col-6">
                        {" "}
                        <i class="far fa-money-bill-alt"></i>Phương thức thanh
                        toán
                      </p>
                      {order.paymentMethod === "COD" ? (
                        <p>Thanh Toán Khi Nhận Hàng</p>
                      ) : (
                        <p>{order.paymentMethod}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDatail;
