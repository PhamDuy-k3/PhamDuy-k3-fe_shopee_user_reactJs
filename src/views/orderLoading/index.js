import { useDispatch } from "react-redux";
import "../cart/scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import { deleteCarts } from "../../redux/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import DiscountCode from "../cart/discountcode";
import ComponentHeader from "../../components/header/header";
import SelectPay from "./selectPay";
import { PaymentForm } from "../../payment";
import { VND } from "../../components/VND/vnd";
import { deleteToCartsAsync } from "../../api/delete";
import "./style.scss";
function OrderLoading() {
  const [sumSp, setSumSp] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalDiscountcode, setTotalDiscountcode] = useState(total);
  const [carts, setCarts] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [cookies, setCookie] = useCookies();
  const [note, setNote] = useState("");
  const [gmail, setGmail] = useState("duylaptrinh03@gmail.com");
  const [pay, setPay] = useState();
  const [orderInfo, setOrderInfo] = useState("pay with MoMo");
  const [valueVoucher, setValueVoucher] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDiscountCodes, setSelectedDiscountCodes] = useState([]);

  const ids_product = sessionStorage.getItem("ids_product");

  const fetchProducts = async () => {
    try {
      if (!cookies.user_token && !ids_product) {
        return;
      }
      const response = await fetch(
        `http://localhost:5050/carts/getCartsByUserIdAndIdProduct/?ids_product=${ids_product}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCarts(data.data || []);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // tính tổng tiền các sản phẩm có trong gio hàng
  useEffect(() => {
    setSumSp(carts.length);
    const totalSum = carts.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
    setTotal(totalSum);
    setTotalDiscountcode(totalSum);
  }, [carts]);

  //tạo đơn hàng
  const createCartOder = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/cartsOder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating cart order:", error);
      throw error;
    }
  };

  // xóa cart theo id người dùng
  const deleteCartsByUserId = async () => {
    const array = [];
    deleteToCartsAsync(fetchProducts, cookies.user_token);
    dispatch(deleteCarts(array));
  };
  // ghi chú
  const handleNote = (e) => {
    setNote(e.target.value);
  };

  // đặt hàng
  const handleBuy = () => {
    if (cookies.user_token !== "") {
      let total_prices = totalDiscountcode;
      const data = {
        carts,
        status,
        total_prices,
        note,
        gmail,
        selectedDiscountCodes,
      };

      let paymentPromise = Promise.resolve();

      // Kiểm tra hình thức thanh toán
      if (pay == 1) {
        paymentPromise = PaymentForm(total_prices, orderInfo);
      }

      // Xử lý promise cho PaymentForm
      paymentPromise
        .then(() => {
          return createCartOder(data); // Tạo đơn hàng
        })
        .then(() => {
          return deleteCartsByUserId();
        })
        .then(() => {
          navigate("/CartOder");
        })
        .catch((error) => {
          console.error("Error during the order process:", error);
        });
    }
  };

  return (
    <>
      <ComponentHeader />
      <div className="box_cart">
        <div className="body">
          {carts.length > 0 ? (
            <div className="container-fluid">
              <div className="d-flex colum-1">
                <i
                  style={{ color: "#00b9a0" }}
                  className="fas fa-shuttle-van"
                ></i>
                <p>
                  Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miến phí vận
                  chuyển bạn nhé!
                </p>
              </div>
              <div className="body-title d-flex">
                <p className="col-5">Sản phẩm</p>
                <p className="col-2">Đơn Giá</p>
                <p className="col-2">Số Lượng</p>
                <p className="col-2">Số Tiền</p>
                <p className="col-1">Thao Tác</p>
              </div>
              <div className="body-product bg-white mt-3">
                <div className="list-products">
                  {carts.map((cart, index) => {
                    return (
                      <div
                        key={index}
                        style={{ height: "13rem" }}
                        className="item-product"
                      >
                        <div className="store-name">
                          <input
                            className="slaveCheckbox"
                            type="checkbox"
                            name="check-store"
                            id="check-store"
                            checked={true}
                            disabled
                          />
                        Pham Duy Store
                        </div>

                        <div
                          style={{ height: "13rem" }}
                          className="d-flex product-infor"
                        >
                          <div
                            style={{ height: "8rem" }}
                            className="col-5 d-flex product"
                          >
                            <input
                              className="Checkbox"
                              type="checkbox"
                              name="check-sp"
                              checked={true}
                              disabled
                            />
                            <img
                              style={{ height: "7rem" }}
                              className="col-2"
                              src={cart.image}
                              alt=""
                            />
                            <p className="col-5 product-name">{cart.name}</p>
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
                                  value={cart.color}
                                >
                                  {cart.color}
                                </option>
                                <option value="white">Màu Trắng</option>
                              </select>
                              <p>Size : {cart.size}</p>
                            </div>
                          </div>
                          <div className="d-flex price-info col-2 pt-5 text-center">
                            <p>
                              {" "}
                              <sup>đ</sup>{" "}
                              <span className="price">
                                {VND.format(cart.price)}
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
                              value={cart.quantity}
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
                                {VND.format(cart.sum)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="d-flex" id="noteOder">
                  <label htmlFor="noteOders">Ghi chú :</label>
                  <textarea
                    rows={2}
                    cols={60}
                    placeholder="Nhập ghi chú"
                    onChange={(e) => handleNote(e)}
                    id="noteOders"
                  ></textarea>
                </div>

                <div className="d-flex mt-3 colum-4">
                  <div className="col-8 d-flex">
                    <div id="price_order">
                      <div className="d-flex">
                        <p>Tổng tiền</p>
                        <p>
                          <sup>đ</sup> {VND.format(total)}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p>Sử dụng mã giảm giá</p>
                        <div className="d-flex">
                          {valueVoucher.map((voucher, index) => (
                            <p key={index}>
                              {voucher.voucher_id.discountValue}
                              {voucher.voucher_id.discountType === "fixed"
                                ? "k"
                                : "%"}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="d-flex">
                        <p>Phí vận chuyển</p>
                        <p>Miễn phí</p>
                      </div>
                      <hr />
                      <p style={{ fontSize: "1.2rem" }}>
                        Tổng thanh toán (
                        <span className="quantityCart-two">{sumSp}</span>) sản
                        phẩm
                      </p>
                      <div className="d-flex">
                        <p>Tổng thanh toán</p>
                        <p>
                          <sup>đ</sup> {VND.format(totalDiscountcode)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DiscountCode
                      setValueVoucher={setValueVoucher}
                      setSelectedDiscountCodes={setSelectedDiscountCodes}
                      selectedDiscountCodes={selectedDiscountCodes}
                      total={total}
                      setTotalDiscountcode={setTotalDiscountcode}
                    />
                    <SelectPay setPay={setPay} />
                    <button onClick={handleBuy}>Đặt hàng</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="img-no-order">
              <img src={imgNoOder} alt="d" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default OrderLoading;
