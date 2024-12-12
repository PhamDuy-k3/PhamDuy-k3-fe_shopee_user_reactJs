import { useDispatch } from "react-redux";
import "../cart/scssCart/styleCart.scss";
import { useCallback, useEffect, useState } from "react";
import { deleteCarts } from "../../redux/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import ComponentHeader from "../../components/header/header";
import SelectPay from "./selectPay";
import { PaymentForm } from "../../payment";
import { VND, VND_currency } from "../../components/VND/vnd";
import { deleteToCartsAsync } from "../../api/delete";
import "./style.scss";
import ModelAddAddress from "./modelAddAddress";
import NoteShippingFee from "./note_shippingFee";
import Footer from "../../components/footer/footer";
import Discountcode from "./discountcode";
import { generateOrderCode } from "../../utils/generateOrderCode";

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
  const [discountCodes, setDiscountCodes] = useState([]);
  const [freeShipCode, setFreeShipCode] = useState({
    code: null,
    maxShippingFee: null,
  });
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
    if (freeShipCode.maxShippingFee > shippingfee.fee) {
      return 0;
    } else if (freeShipCode.maxShippingFee !== null) {
      return shippingfee.fee - freeShipCode.maxShippingFee;
    } else if (freeShipCode.maxShippingFee === null) {
      return shippingfee.fee;
    }
  }, [freeShipCode, shippingfee.fee]);

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
      if (response.data.status_code === 200) {
      }
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
    // Kiểm tra địa chỉ
    if (!address || address.length <= 8) {
      setShowModelAddress(true);
      return;
    }

    // Kiểm tra người dùng đã đăng nhập chưa
    if (!cookies.user_token) {
      alert("Vui lòng đăng nhập để đặt hàng!");
      return;
    }

    // Kiểm tra phí vận chuyển
    if (!shippingfee) {
      alert("Phí vận chuyển không hợp lệ!");
      return;
    }

    // Chuẩn bị mã giảm giá và mã freeship
    const DiscountCodesAndFreeShip = [
      ...discountCodes,
      ...(freeShipCode.code ? [freeShipCode.code] : []),
    ];

    // Chuẩn bị dữ liệu thanh toán Momo
    const data_momo = {
      carts,
      status,
      amount: totalAmout,
      subTotal: total,
      note,
      gmail,
      discountCodes: DiscountCodesAndFreeShip,
      orderInfo,
      paymentMethod: "pay",
      shippingAddress: address,
      deliveryMethod: shippingfee.type,
      shippingFee: shippingfee.fee,
      shippingDiscount: shippingfee.fee - shipping_fee_new,
    };

    // Chuẩn bị dữ liệu thanh toán COD
    const data_cod = {
      orderId: generateOrderCode(),
      carts,
      status: "unconfirmed",
      subTotal: total,
      orderTotal: totalAmout,
      note,
      gmail,
      discountCodes: DiscountCodesAndFreeShip,
      shippingAddress: address,
      paymentMethod: "COD",
      deliveryMethod: shippingfee.type,
      shippingFee: shippingfee.fee,
      shippingDiscount: shippingfee.fee - shipping_fee_new,
    };

    // Xử lý hình thức thanh toán
    let paymentPromise;
    if (pay === "1") {
      paymentPromise = PaymentForm(data_momo, cookies.user_token, navigate);
    } else if (pay === "2") {
      paymentPromise = createCartOder(data_cod);
    } else {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    // Thực hiện thanh toán và xóa giỏ hàng
    paymentPromise
      .then(() => {
        return deleteCartsByUserId();
      })
      .then(() => {
        navigate("/CartOder");
      })
      .then(() => {
        console.log("Đơn hàng đã được xử lý và giỏ hàng đã được xóa.");
      })
      .catch((error) => {
        console.error("Lỗi trong quá trình đặt hàng:", error);
      });
  };

  return (
    <>
      <div className="maxWidth" id="container-cart">
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
                  <Discountcode
                    setValueVoucher={setValueVoucher}
                    setDiscountCodes={setDiscountCodes}
                    setFreeShipCode={setFreeShipCode}
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
                        <div id="price-order">
                          <div className="d-flex">
                            <p>Tổng tiền</p>
                            <p className="price-order__text">
                              {VND_currency.format(total)}
                            </p>
                          </div>
                          <div className="d-flex">
                            <p>Sử dụng mã giảm giá</p>
                            <div className="d-flex price-order__text voucher">
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
                            {freeShipCode.code !== null ? (
                              <p className="price-order__text">
                                <del style={{ marginRight: "1rem" }}>
                                  {VND_currency.format(shippingfee.fee)}
                                </del>
                                {VND_currency.format(shipping_fee_new)}
                              </p>
                            ) : (
                              <p className="price-order__text">
                                {VND_currency.format(shippingfee.fee)}
                              </p>
                            )}
                          </div>
                          <div className="d-flex">
                            <p>Tổng thanh toán</p>
                            <p className="price-order__text">
                              {VND_currency.format(totalAmout)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button id="btn-paymnet-order" onClick={handleBuy}>
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
