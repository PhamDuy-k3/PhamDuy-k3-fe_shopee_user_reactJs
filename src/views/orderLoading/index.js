import { useDispatch } from "react-redux";
import "../cart/scssCart/styleCart.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteCarts } from "../../redux/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import DiscountCode from "../cart/discountcode";
import ComponentHeader from "../../components/header/header";
import SelectPay from "./selectPay";
import { PaymentForm } from "../../payment";
import { VND, VND_currency } from "../../components/VND/vnd";
import { deleteToCartsAsync } from "../../api/delete";
import "./style.scss";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";
import ModelAddAddress from "./modelAddAddress";
import NoteShippingFee from "./note_shippingFee";
import Footer from "../../components/footer/footer";

function OrderLoading() {
  const [sumSp, setSumSp] = useState(0);
  const [carts, setCarts] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [cookies, setCookie] = useCookies();
  const [note, setNote] = useState("");
  const [gmail, setGmail] = useState("duylaptrinh03@gmail.com");
  const [pay, setPay] = useState("2");
  const [orderInfo, setOrderInfo] = useState("pay with MoMo");
  const [valueVoucher, setValueVoucher] = useState([]);
  const [selectedDiscountCodes, setSelectedDiscountCodes] = useState([]);
  const [
    selectedDiscountCodesFreeShip,
    setSelectedDiscountCodesFreeShip,
  ] = useState({ code: null, maxShippingFee: null });
  const [shipping_fee_new, setShipping_fee_new] = useState(0);
  const [address, setAddress] = useState("");
  const [shippingfee, setShippingfee] = useState({});
  const [showModelAddress, setShowModelAddress] = useState(false);
  const [total, setTotal] = useState(0); // số tiền ban đầu
  const [totalDiscountcode, setTotalDiscountcode] = useState(0); // số tiền sau khi chọn mã giảm giá
  const [totalAmout, setTotalAmout] = useState(0); // thành tiền cuối cùng
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ids_product = sessionStorage.getItem("ids_product");

  //tính thành tiền sau khi có phí vận chuyển
  const total_shipping_fee = useCallback(() => {
    if (selectedDiscountCodesFreeShip.maxShippingFee > shippingfee.fee) {
      return 0;
    } else if (selectedDiscountCodesFreeShip.maxShippingFee !== null) {
      return shippingfee.fee - selectedDiscountCodesFreeShip.maxShippingFee;
    } else if (selectedDiscountCodesFreeShip.maxShippingFee === null) {
      return shippingfee.fee;
    }
  }, [selectedDiscountCodesFreeShip, shippingfee.fee]);

  useEffect(() => {
    const newShippingFee = total_shipping_fee();
    setShipping_fee_new(newShippingFee);
  }, [total_shipping_fee]);

  const fetchProducts = useCallback(async () => {
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
  }, [ids_product, cookies.user_token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // tính tổng tiền các sản phẩm có trong gio hàng
  useEffect(() => {
    setSumSp(carts.length);

    const totalSum = carts.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
    setTotal(totalSum);
    setTotalDiscountcode(totalSum);
  }, [carts, shippingfee]);

  // tính thành tiền cần thành toán
  useEffect(() => {
    const newTotalAmount =
      totalDiscountcode === total
        ? total + +shipping_fee_new
        : totalDiscountcode + +shipping_fee_new;

    if (newTotalAmount !== totalAmout) {
      setTotalAmout(newTotalAmount);
    }
  }, [totalDiscountcode, shipping_fee_new, total, totalAmout]);

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
      navigate("/CartOder");
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
    if (address?.length <= 8 || address === null) {
      setShowModelAddress(true);
      return;
    }
    if (cookies.user_token === "") {
      alert("Vui lòng đăng nhập để đặt hàng!");
      return;
    }
    if (!shippingfee) {
      return;
    }
    const amount = totalDiscountcode;
    const paymentMethod = "pay";
    const data = {
      carts,
      status,
      amount,
      note,
      gmail,
      selectedDiscountCodes,
      orderInfo,
      paymentMethod,
      shippingAddress: address,
      deliveryMethod: shippingfee.type,
      shippingFee: shippingfee.fee,
    };
    const newOrder = {
      carts,
      status: "unconfirmed",
      orderTotal: amount,
      note: note,
      gmail,
      selectedDiscountCodes,
      shippingAddress: address,
      paymentMethod: "Thanh toán khi nhận hàng",
      deliveryMethod: shippingfee.type,
      shippingFee: shippingfee.fee,
    };

    let paymentPromise = Promise.resolve();

    // Kiểm tra hình thức thanh toán
    if (pay === "1") {
      paymentPromise = PaymentForm(data, cookies.user_token, navigate);
    }
    if (pay === "2") {
      paymentPromise = createCartOder(newOrder);
    }

    // Xử lý promise cho PaymentForm
    paymentPromise
      .then(() => {
        return deleteCartsByUserId();
      })
      .catch((error) => {
        console.error("Error during the order process:", error);
      });
  };
  return (
    <>
      <div id="container-cart">
        <ComponentHeader />
        <div className="box_cart">
          <div className="body">
            {carts.length > 0 ? (
              <div className="container-fluid">
                <div className="address-transport">
                  <div></div>
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    Địa Chỉ Nhận Hàng
                  </p>
                  <div className="d-flex">
                    <p>
                      {address || <p>Vui lòng thêm địa chỉ nhận hàng !!!</p>}
                    </p>
                    <div className="model-add-address">
                      <ModelAddAddress
                        showModelAddress={showModelAddress}
                        setShowModelAddress={setShowModelAddress}
                        setAddress={setAddress}
                      />
                    </div>
                  </div>
                </div>
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
                  <p className="col-7">Sản phẩm</p>
                  <p className="col-2">Đơn Giá</p>
                  <p className="col-2">Số Lượng</p>
                  <p className="col-1">Số Tiền</p>
                </div>
                <div className="body-product  mt-3">
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
                              className="col-7 d-flex product"
                            >
                              <input
                                className="Checkbox"
                                type="checkbox"
                                name="check-sp"
                                checked={true}
                                disabled
                              />
                              <div className="col-2 img">
                                <img src={cart.image} alt="" />
                              </div>

                              <p className="col-5 product-name">{cart.name}</p>
                              <div className="d-flex flex-column">
                                <select
                                  className="mt-3"
                                  style={{ height: "1.3rem" }}
                                  name="product-category"
                                  id="product-category"
                                  disabled
                                >
                                  <option
                                    style={{ color: "red" }}
                                    value={cart.color}
                                  >
                                    {cart.color}
                                  </option>
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
                            <div className="total-price col-1 pt-5">
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
                  <NoteShippingFee
                    setShippingfee={setShippingfee}
                    shippingfee={shippingfee}
                    total={total}
                    handleNote={handleNote}
                  />
                  <DiscountCode
                    setValueVoucher={setValueVoucher}
                    setSelectedDiscountCodes={setSelectedDiscountCodes}
                    setSelectedDiscountCodesFreeShip={
                      setSelectedDiscountCodesFreeShip
                    }
                    total={total}
                    setTotalDiscountcode={setTotalDiscountcode}
                  />
                  <div className="d-flex mt-3 flex-column payment ">
                    <div className="payment__header d-flex">
                      <p className="col-9">Phương thức thanh toán</p>
                      <SelectPay setPay={setPay} />
                    </div>
                    <div className="payment__content d-flex flex-column">
                      <div>
                        <div id="price_order">
                          <div className="d-flex">
                            <p>Tổng tiền</p>
                            <p>{VND_currency.format(total)}</p>
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
                            {selectedDiscountCodesFreeShip.code !== null ? (
                              <p>
                                <del style={{ marginRight: "1rem" }}>
                                  {VND_currency.format(shippingfee.fee)}
                                </del>
                                {VND_currency.format(shipping_fee_new)}
                              </p>
                            ) : (
                              <p>{VND_currency.format(shippingfee.fee)}</p>
                            )}
                          </div>
                          <div className="d-flex">
                            <p>Tổng thanh toán</p>
                            <p>{VND_currency.format(totalAmout)}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button id="paymnet__order" onClick={handleBuy}>
                          Đặt hàng
                        </button>
                      </div>
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
        <Footer />
      </div>
    </>
  );
}
export default OrderLoading;
