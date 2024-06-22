import { useDispatch, useSelector } from "react-redux";
import "./scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import {
  deleteProductList,
  removeFromCart,
  updateProductList,
} from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// chưa chek trùng sản phẩm

function Cart() {
  const [productsFromLocalStorage, setProductsFromLocalStorage] = useState([]);
  const [sumSp, setSumSp] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    setProductsFromLocalStorage(cartItems);
    setSumSp(cartItems.length);
  }, [cartItems]);

  const VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  });

  // tính tổng tiền các sản phẩm có trong gio hàng
  useEffect(() => {
    const totalSum = productsFromLocalStorage.reduce((accumulator, product) => {
      return accumulator + parseFloat(product.sum);
    }, 0);
    setTotal(VND.format(totalSum * 1000));
  }, [productsFromLocalStorage]);

  // xóa sản phẩm
  const deleteProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  // xóa tất cả các sản phẩm
  const handelDeleteProductList = () => {
    const array = [];
    dispatch(deleteProductList(array));
  };

  // tăng số lượng sản phẩm
  const handleQuantity = (id, a) => {
    const updatedProducts = productsFromLocalStorage.map((product) => {
      if (product.id === id) {
        const quantity_new = product.quantity + parseFloat(a);
        if (quantity_new < 0) {
          return product;
        }
        return {
          ...product,
          quantity: quantity_new,
          sum: VND.format(quantity_new * +product.price * 1000),
        };
      }
      return product;
    });
    dispatch(updateProductList(updatedProducts));
  };

  // thay đổi số lượng khi khách hàng nhập tay
  const handleChangeQuantity = (id, event) => {
    const updatedProducts = productsFromLocalStorage.map((product) => {
      if (product.id === id) {
        if (product.quantity == "") {
          product.sum = 0;
        } else {
          return {
            ...product,
            quantity: parseFloat(event.target.value),
            sum: VND.format(
              parseFloat(event.target.value) * +product.price * 1000 || 0
            ),
          };
        }
      }
      return product;
    });
    dispatch(updateProductList(updatedProducts));
  };
  const acceptBuy = () => {
    alert("mua hàng thành công");
  };
  return (
    <div className="box_cart">
      <div className="body">
        <div className="container-fluid">
          <div className="d-flex colum-1">
            <i style={{ color: "#00b9a0" }} className="fas fa-shuttle-van"></i>
            <p>
              Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miến phí vận chuyển
              bạn nhé!
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
              {productsFromLocalStorage.map((product, index) => {
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
                          src={product.image}
                          alt=""
                        />
                        <p className="col-5 porduct-name">{product.name}</p>
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
                          {" "}
                          <sup>đ</sup>{" "}
                          <span className="price">{product.price}</span>
                        </p>
                      </div>
                      <div className="quantity col-2 pt-5">
                        <input
                          onClick={() => handleQuantity(product.id, -1)}
                          className="cart-down-quantity"
                          type="button"
                          value="-"
                        />
                        <input
                          onChange={(e) => handleChangeQuantity(product.id, e)}
                          className="quantity_value"
                          type="number"
                          min="1"
                          value={product.quantity}
                        />
                        <input
                          onClick={() => handleQuantity(product.id, 1)}
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
                      <div
                        onClick={() => deleteProduct(product.id)}
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
                  <span className="quantityCart-two">{sumSp}</span>) sản phẩm :
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
              <button onClick={acceptBuy}>Mua Hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
