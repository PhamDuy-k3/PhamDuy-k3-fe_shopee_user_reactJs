import { useDispatch, useSelector } from "react-redux";
import "./scssCart/styleCart.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteCarts,
  removeFromCart,
  updateProductList,
} from "../../redux/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import ComponentHeader from "../../components/header/header";
import { VND } from "../../components/VND/vnd";
import { deleteToCartAsync, deleteToCartsAsync } from "../../api/delete";

// chưa chek trùng sản phẩm

function Cart() {
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [id_user_oder, setIdUserOder] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // lấy danh sách cart trog store
  const carts_store = useSelector((state) => state.cart.items);

  //danh sách sản phẩm người dùng chọn
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/carts/?id_user=${cookies.id_user}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.data) {
        setCarts(data.data);
        console.log(data.data);
      } else {
        console.warn("No data found:", data);
      }
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

  // tính tổng tiền các sản phẩm có trong gio hàng

  const totalSum = useMemo(() => {
    return carts.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
  }, [carts]);

  useEffect(() => {
    setTotal(totalSum);
  }, [carts]);

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

  const handleQuantity = useCallback(
    (id, a) => {
      if (!Array.isArray(carts) || carts.length === 0) {
        return;
      }

      const updatedProducts = carts.map((product) => {
        if (product._id === id) {
          const quantity_new = product.quantity + parseFloat(a);
          if (quantity_new < 1) {
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
    },
    [carts, dispatch]
  );

  // Thay đổi số lượng khi khách hàng nhập tay
  const handleChangeQuantity = useCallback(
    (id, event) => {
      if (!Array.isArray(carts) || carts.length === 0) {
        return;
      }
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
    },
    [carts, dispatch]
  );

  // xóa sản phẩm theo id
  const deleteProduct = (id) => {
    deleteToCartAsync(id, fetchProducts);
    dispatch(removeFromCart(id));
  };

  //xóa tất cả các sản phẩm trong giỏ hàng dựa vào id khách hàng
  const handelDeleteProductList = () => {
    const array = [];
    deleteToCartsAsync(fetchProducts, cookies.id_user);
    dispatch(deleteCarts(array));
  };

  const handleBuy = async () => {
    navigate("/OrderLoading");
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

                <div className="d-flex mt-3 colum-4">
                  <div className="col-2">
                    <input type="checkbox" id="masterCheckbox" /> Chọn tất Cả (
                    <span className="quantityCart-one">
                      {carts_store.length}
                    </span>
                    )
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
                      <span className="quantityCart-two">
                        {carts_store.length}
                      </span>
                      ) sản phẩm :
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
                  <button onClick={handleBuy}>Mua Hàng</button>
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
export default Cart;
