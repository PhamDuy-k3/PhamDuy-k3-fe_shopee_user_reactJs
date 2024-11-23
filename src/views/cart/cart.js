import { useDispatch, useSelector } from "react-redux";
import "./scssCart/styleCart.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  deleteCarts,
  removeFromCart,
  updateProductList,
} from "../../redux/action";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import imgNoOder from "..//..//assets/images/img/no-order.jpg";
import ComponentHeader from "../../components/header/header";
import { VND, VND_currency } from "../../components/VND/vnd";
import { deleteToCartAsync, deleteToCartsAsync } from "../../api/delete";
import { updateToCarts, updateToCartsAsync } from "../../api/update";
import { FetchCartsByIdUser } from "../../api/fetchCartByIdUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";
import Footer from "../../components/footer/footer";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
// chưa chek trùng sản phẩm

function Cart() {
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const [cookies, setCookie] = useCookies();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [idProductChooses, setIdProductChooses] = useState([]);
  const [idsProductInCarts, setIdIdProductInCarts] = useState([]);
  const [idsProductNeedUpdate, setIdIdProductNeedUpdate] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkboxRef = useRef(null);
  // lấy danh sách cart trog store

  // Chọn từng checkbox
  const handleChosesCheckbox = (id) => {
    const updatedChoices = idProductChooses.includes(id)
      ? idProductChooses.filter((item) => item !== id)
      : [...idProductChooses, id];

    setIdProductChooses(updatedChoices);

    if (updatedChoices.length !== carts.length) {
      checkboxRef.current.checked = false;
    } else {
      checkboxRef.current.checked = true;
    }
  };

  // Chọn tất cả checkbox
  const handleChosesCheckboxAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const allProductIds = carts.map((cart) => cart._id);
      setIdProductChooses(allProductIds);
    } else {
      setIdProductChooses([]);
    }
  };

  //danh sách sản phẩm người dùng chọn
  const fetchProducts = async () => {
    FetchCartsByIdUser(setCarts, setIdIdProductInCarts, cookies.user_token);
  };

  // lấy các sản phẩm có trong giở hàng trong bảng sản phẩm để check giá
  const getProductsInCarts = async (products) => {
    if (!idsProductInCarts || idsProductInCarts.length === 0) return;
    try {
      const response = await fetch(
        `http://localhost:5050/products/carts?ids=${idsProductInCarts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      const data = await response.json();
      products.push(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // tính tổng tiền các sản phẩm có trong gio hàng

  useMemo(() => {
    const cartsChoses = carts.filter((cart) =>
      idProductChooses.includes(cart._id)
    );
    setTotal(
      cartsChoses.reduce((accumulator, product) => {
        const sum = parseFloat(product.sum);
        return accumulator + (isNaN(sum) ? 0 : sum);
      }, 0)
    );
  }, [carts, idProductChooses]);

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
          updateToCartsAsync(_id, quantity, sum, fetchProducts);
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
          updateToCartsAsync(_id, quantity, sum, fetchProducts);
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
  const deleteProduct = async (id) => {
    await deleteToCartAsync(id, fetchProducts);
    dispatch(removeFromCart(id));
  };

  //xóa tất cả các sản phẩm trong giỏ hàng dựa vào id khách hàng
  const handelDeleteProductList = async () => {
    const array = [];
    await deleteToCartsAsync(fetchProducts, cookies.user_token);
    dispatch(deleteCarts(array));
    setDeleteModal(false);
  };

  // Hàm kiểm tra giá sản phẩm
  const checkPriceProduct = (cart, products_update, products) => {
    const updatedProducts = products
      .filter(
        (product) =>
          product._id === cart.product_id &&
          product.prices - (product.prices * cart.discount_code) / 100 !==
            cart.price
      )
      .map((product) => ({
        _id: product._id,
        price: product.prices - (product.prices * cart.discount_code) / 100,
        sum:
          cart.quantity *
          (product.prices - (product.prices * cart.discount_code) / 100),
      }));

    // check sự tồn tại trước khi push vào mảng cần update
    updatedProducts.forEach((product) => {
      const exists = products_update.some(
        (prevProduct) => prevProduct._id === product._id
      );

      if (!exists) {
        products_update.push(product);
      }
    });
  };
  //update cart vào trong database
  const updateProductInCartDatabase = async (updatedCarts) => {
    try {
      for (const cart of updatedCarts) {
        await updateToCarts(cart._id, cart.price, cart.sum);
      }
      toast.success(() => (
        <p style={{ paddingTop: "1rem" }}>Cập nhật giỏ hàng thành công!</p>
      ));
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
  };

  //update thông tin mới cho cart
  const updateProductIncart = async () => {
    if (!idsProductNeedUpdate.length) return;
    let cartsChange = [];
    const updatedCarts = carts.map((cart) => {
      const updatedProduct = idsProductNeedUpdate.find(
        (product) => product._id === cart.product_id
      );
      if (updatedProduct) {
        cartsChange.push({
          ...cart,
          price: updatedProduct.price,
          sum: updatedProduct.sum,
        });
        return {
          ...cart,
          price: updatedProduct.price,
          sum: updatedProduct.sum,
        };
      }
      return cart;
    });
    setCarts(updatedCarts);
    setUpdateModal(false);
    if (cartsChange.length > 0) {
      await updateProductInCartDatabase(cartsChange);
    }

    setIdIdProductNeedUpdate([]);
  };

  const check = (products) => {
    const products_update = [];
    carts.forEach((cart) => {
      checkPriceProduct(cart, products_update, products);
    });

    setIdIdProductNeedUpdate(products_update);

    if (products_update.length > 0) {
      setUpdateModal(true);
      return;
    }
    //chuyển trang
    sessionStorage.setItem("ids_product", idProductChooses);
    if (idProductChooses.length === 0) {
      toast.error(() => (
        <p style={{ paddingTop: "1rem" }}>Vui lòng chọn ít nhất 1 sản phẩm!</p>
      ));
      return;
    }
    navigate("/OrderLoading");
  };

  const handleBuy = async () => {
    const products = [];
    await getProductsInCarts(products);
    if (products.length > 0) {
      check(products[0]);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px" }}
      />
      <AutoLoadPage />
      <ComponentHeader />
      <div className="box_cart">
        {deleteModal && (
          <>
            <FlyZoom />
            <div className="model-delete">
              <div className="title">
                <p>Bạn có chắc muốn xóa các sản phẩm đã chọn?</p>
              </div>
              <div className="button-group">
                <button onClick={() => setDeleteModal(false)}>Trở lại</button>
                <button onClick={handelDeleteProductList}>OK</button>
              </div>
            </div>
          </>
        )}
        {updateModal && (
          <>
            <FlyZoom />
            <div className="model-update">
              <div className="title">
                <p>Sản phẩm có sự thay đổi , xin hãy cập nhật lại?</p>
              </div>
              <div className="button-group">
                <button onClick={() => setUpdateModal(false)}>Trở lại</button>
                <button onClick={updateProductIncart}>OK</button>
              </div>
            </div>
          </>
        )}

        <div className="body">
          {carts.length > 0 ? (
            <div className="container-fluid">
              <div className="d-flex colum-1">
                <i
                  style={{ color: "#00b9a0" }}
                  className="fas fa-shuttle-van"
                ></i>
                <p>Danh sách sản phẩm bạn đã thêm vào giỏ hàng!</p>
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
                              checked={idProductChooses.includes(cart._id)}
                              onChange={() => handleChosesCheckbox(cart._id)}
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

                <div className="d-flex colum-4">
                  <div className="col-2 pt-1">
                    <input
                      onChange={handleChosesCheckboxAll}
                      type="checkbox"
                      id="masterCheckbox"
                      ref={checkboxRef}
                      style={{ marginRight: "1rem" }}
                    />
                    Chọn tất Cả (
                    <span className="quantityCart-one">{carts.length}</span>)
                  </div>

                  <div className="col-1 pt-1">
                    <p
                      onClick={() => setDeleteModal(true)}
                      style={{ cursor: " pointer" }}
                    >
                      Xóa Tất Cả
                    </p>
                  </div>
                  <div className="col-2 pt-1">
                    <p style={{ color: "#ee4d2d" }}>Lưu vào mục Đã Th...</p>
                  </div>
                  <div className="col-4 d-flex">
                    <p>
                      Tổng thanh toán (
                      <span className="quantityCart-two">{carts.length}</span>)
                      sản phẩm :{" "}
                      <span className="cart_total">
                        {" "}
                        {VND_currency.format(total)}
                      </span>
                    </p>
                  </div>
                  <button
                    style={
                      idProductChooses.length === 0
                        ? { backgroundColor: "gray", cursor: "no-drop" }
                        : {}
                    }
                    onClick={handleBuy}
                  >
                    Mua Hàng
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="img-no-order">
              <img src={imgNoOder} alt="" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Cart;
