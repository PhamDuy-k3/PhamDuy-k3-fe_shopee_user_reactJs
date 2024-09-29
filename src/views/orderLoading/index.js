import { useDispatch, useSelector } from "react-redux";
import "../cart/scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import {
  deleteCarts,
  deleteToCartsAsync,
  removeFromCart,
  updateProductList,
} from "../../redux/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import DiscountCode from "../cart/discountcode";
import ComponentHeader from "../../components/header/header";
import SelectPay from "./selectPay";
import { PaymentForm } from "../../payment";

// chưa chek trùng sản phẩm

function OrderLoading() {
  const [sumSp, setSumSp] = useState(0);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [status, setStatus] = useState("unconfirmed");
  const [cookies, setCookie] = useCookies();
  const [id_user_oder, setIdUserOder] = useState();
  const [note, setNote] = useState("");
  const [gmail, setGmail] = useState("duylaptrinh03@gmail.com");
  const [pay, setPay] = useState();
  const [orderInfo, setOrderInfo] = useState("pay with MoMo");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/carts/?id_user=${cookies.id_user}`,
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
      console.log(data.data);
      
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setIdUserOder(cookies.id_user);
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  });

  // tính tổng tiền các sản phẩm có trong gio hàng
  useEffect(() => {
    setSumSp(carts.length);
    const totalSum = carts.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
    setTotal(totalSum);
  }, [carts]);
  console.log(total);

  const updateToCartsAsync = async (_id, quantity, sum) => {
    try {
      const response = await axios.put(`http://localhost:5050/carts/${_id}`, {
        quantity,
        sum,
      });
      console.log("Update successful:", response.data);
      fetchProducts();
      return response.data;
    } catch (error) {
      console.error("Error updating cart:", error.message);
      return null;
    }
  };

  // Tăng số lượng sản phẩm
  const handleQuantity = (id, a) => {
    const updatedProducts = carts.map((product) => {
      if (product._id === id) {
        const quantity_new = product.quantity + parseFloat(a);
        if (quantity_new < 0) {
          return product;
        }
        const quantity = quantity_new;
        const _id = product._id;
        const sum = quantity_new * +product.price;
        updateToCartsAsync(_id, quantity, sum);
        return {
          ...product,
          quantity: quantity,
          sum: sum,
        };
      }
      return product;
    });
    dispatch(updateProductList(updatedProducts));
  };

  // Thay đổi số lượng khi khách hàng nhập tay
  const handleChangeQuantity = (id, event) => {
    const newQuantity = parseFloat(event.target.value) || 0;
    const updatedProducts = carts.map((product) => {
      if (product._id === id) {
        const quantity = newQuantity;
        const _id = product._id;
        const sum = quantity * +product.price;
        updateToCartsAsync(_id, quantity, sum);
        return {
          ...product,
          quantity: quantity,
          sum: sum,
        };
      }
      return product;
    });
    dispatch(updateProductList(updatedProducts));
  };

  const deleteToCartAsync = async (cartId) => {
    try {
      await axios.delete(`http://localhost:5050/carts/${cartId}`);
      dispatch(removeFromCart(cartId));
      fetchProducts();
    } catch (error) {}
  };
  // xóa sản phẩm
  const deleteProduct = (id) => {
    deleteToCartAsync(id);
  };

  const deleteToCartsAsync = async (array) => {
    try {
      await axios.delete("http://localhost:5050/carts");
      fetchProducts();
      dispatch(deleteCarts(array));
    } catch (error) {}
  };
  // xóa tất cả các sản phẩm
  const handelDeleteProductList = () => {
    const array = [];
    deleteToCartsAsync(array);
  };

  const createCartOder = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/cartsOder",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error creating cart order:", error);
      throw error;
    }
  };
  // xóa cart
  const deleteCartsByUserId = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5050/carts/deleteCartsByUserId/${userId}`
      );
    } catch (error) {
      console.error("Error deleting carts:", error);
    }
  };
  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleBuy = () => {
    if (id_user_oder !== "") {
      let total_prices = total;
      const data = { carts, status, id_user_oder, total_prices, note, gmail };

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
          return deleteCartsByUserId(id_user_oder); // Xóa giỏ hàng sau khi đặt hàng thành công
        })
        .then(() => {
          // Điều hướng về trang "CartOder"
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
                          />
                          Name-store
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
                              onClick={() => handleQuantity(cart._id, -1)}
                              className="cart-down-quantity"
                              type="button"
                              value="-"
                            />
                            <input
                              onChange={(e) =>
                                handleChangeQuantity(cart._id, e)
                              }
                              className="quantity_value"
                              type="number"
                              min="1"
                              value={cart.quantity}
                            />
                            <input
                              onClick={() => handleQuantity(cart._id, 1)}
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
                          <div
                            onClick={() => deleteProduct(cart._id)}
                            className="remove-item col-1 pt-5"
                          >
                            <p>Xóa</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <DiscountCode total={VND.format(total)} />
                <SelectPay setPay={setPay} />
                <div id="noteOder">
                  <label htmlFor="noteOders">Ghi chú :</label>
                  <input
                    onChange={(e) => handleNote(e)}
                    id="noteOders"
                    placeholder="Nhập..."
                  />
                </div>

                <div className="d-flex mt-3 colum-4">
                  <div className="col-2">
                    <input type="checkbox" id="masterCheckbox" /> Chọn tất Cả (
                    <span className="quantityCart-one">{sumSp}</span>)
                  </div>

                  <div className="col-1">
                    <p
                      onClick={handelDeleteProductList}
                      style={{ cursor: " pointer" }}
                    >
                      Xóa Tất Cả
                    </p>
                  </div>
                  <div className="col-2">
                    <p style={{ color: "#ee4d2d" }}>Lưu vào mục Đã Th...</p>
                  </div>
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
                        {VND.format(total)}
                      </p>
                    </div>
                  </div>
                  <button onClick={handleBuy}>Đặt hàng</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="img-no-order">
              <img src={imgNoOder} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default OrderLoading;
