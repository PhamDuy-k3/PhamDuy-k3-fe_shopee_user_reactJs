import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgFlastSale from "../../../assets/images/img/imgctsp/logo-sale.jpg";
import Time from "../../timer/time";
import ColorProduct from "./color-product";
import PriceSaleProduct from "./price_sale_product";
import SizeProduct from "./size-product";
import TranSport from "./transport";
import UpDownQuantity from "./up_down_quantity";
import imgSmall2 from "..//..//../assets/images/img/imgctsp/banner-con-2.jpg";
import imgSmall3 from "..//..//../assets/images/img/imgctsp/banner-con-3.jpg";
import imgSmall4 from "..//..//../assets/images/img/imgctsp/banner-con-4.jpg";
import { addToCart } from "../../../redux/action";
import { useCookies } from "react-cookie";
import axios from "axios";
import Button from "../../button/button";

function CtspProductInfor(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [colorProduct, setColorProduct] = useState();
  const [selectSize, setSelectSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [priceSaleFormatted, setPriceSaleFormatted] = useState("");
  const [cookies, setCookie] = useCookies();
  const [stockRTime, setStockRTime] = useState(0);
  const [modelAddCart, setModelAddCart] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [ischeckSizeColor, setCheckSizeColor] = useState(true);
  const productId = useParams();
  const carts_store = useSelector((state) => state.cart.items);

  let img_one = props.product?.image;
  let title = props.product?.name || "";
  const stock = props.product?.stock;
  console.log(stock);

  useEffect(() => {
    if (props.product) {
      setStockRTime(stock);
    }
  }, [stock, props.product]);

  // tổng tiền
  const total = quantity * priceSaleFormatted;

  // thêm cart
  const addToCartAsync = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/carts",
        product,
        {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status_code === 200) {
        setModelAddCart(true);

        setInterval(() => {
          setModelAddCart(false);
        }, 3000);
      } else {
        toast.error(() => <p style={{ paddingTop: "1rem" }}>Thêm thất bại!</p>);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (colorProduct && selectSize) {
      setCheckSizeColor(true);
    }
  }, [colorProduct, selectSize]);

  // data product
  const data = () => {
    // navigate("/ProductDetail/:id");

    const newProduct = {
      _id: productId.product_id,
      name: title.toLocaleUpperCase(),
      color: colorProduct,
      image: "",
      quantity: quantity,
      price: priceSaleFormatted,
      size: selectSize,
      sum: total,
    };
    switch (colorProduct) {
      case "Màu Trắng":
        newProduct.image = img_one;
        break;
      case "Màu Đen":
        newProduct.image = imgSmall2;
        break;
      case "Màu Xám":
        newProduct.image = imgSmall3;
        break;
      case "Màu Xanh Da Trời":
        newProduct.image = imgSmall4;
        break;
      default:
        newProduct.image = img_one;
        break;
    }

    if (!newProduct.color && !newProduct.size) {
      setCheckSizeColor(false);
      return;
    }

    // kiểm tra sản phẩm đã có trong giỏ hàng chua
    const isProductInCart = carts_store.some(
      (pd) => pd.image === newProduct.image
    );

    if (isProductInCart) {
      toast.error(() => (
        <p style={{ paddingTop: "1rem" }}>Sản phẩm này đã có trong giỏ hàng!</p>
      ));
    } else {
      dispatch(addToCart(newProduct));
      addToCartAsync(newProduct);
    }
  };
  const buy = () => {
    data();
    navigate("/Cart");
  };

  return (
    <div className="ctsp-product-infor col-7">
      {modelAddCart && (
        <div onMouseOver={() => setModelAddCart(false)} id="model-addcart">
          <div className="model-addcartz__icon">
            <i class="fas fa-check"></i>
          </div>
          <p>Sản phẩm đã được thêm vào giỏ hàng</p>
        </div>
      )}

      <section className="ctsp-product-infor-title">
        <h1>{title}</h1>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={400}
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
      <section className="ctsp-product-infor-star d-flex">
        <p>
          2.3 <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </p>

        <p>
          <Link style={{ color: "#9b9997" }} to="#feedBack">
            <span>565</span>&nbsp; Đánh Giá
          </Link>
        </p>
        <p>
          <span>3,2</span>
          <span>k</span> Đã Bán
        </p>
        <p>Tố cáo</p>
      </section>
      <section className="ctsp-product-infor-price">
        {isTimeUp === false ? (
          <>
            <div className="Flash-shale d-flex">
              <div className="logo-flash-sale col-5">
                <img src={imgFlastSale} alt="" />
              </div>
              <div className="fl-sale-end d-flex">
                <p>
                  <i className="far fa-clock"></i>KẾT THÚC TRONG &nbsp;
                </p>
                <div className="mt-2">
                  <Time setIsTimeUp={setIsTimeUp} />
                </div>
              </div>
            </div>
            <PriceSaleProduct
              isTimeUp={isTimeUp}
              product={props.product}
              priceSaleFormatted={priceSaleFormatted}
              setPriceSaleFormatted={setPriceSaleFormatted}
            />
          </>
        ) : (
          <div style={{ paddingTop: "1.2rem" }}>
            <PriceSaleProduct
              isTimeUp={isTimeUp}
              product={props.product}
              priceSaleFormatted={priceSaleFormatted}
              setPriceSaleFormatted={setPriceSaleFormatted}
            />
          </div>
        )}
      </section>
      <div className="infor-detail-product">
        <section className="insurance d-flex">
          <div className="insurance-title col-2">
            <p>Bảo Hiểm</p>
          </div>
          <div className="insurance-text d-flex">
            <p>Bảo hiểm Thời trang</p>
            <p>Mới</p>
            <p>Tìm hiểu thêm</p>
          </div>
        </section>
        <TranSport></TranSport>
        <div style={ischeckSizeColor ? {} : { backgroundColor: "#FFF5F5" }}>
          <ColorProduct
            colorProduct={colorProduct}
            setColorProduct={setColorProduct}
          />
          <SizeProduct selectSize={selectSize} setSelectSize={setSelectSize} />
        </div>
        <section className="number d-flex">
          <div className="number-title col-2">
            <p>Số Lượng</p>
          </div>
          <UpDownQuantity
            setStockRTime={setStockRTime}
            product={props.product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </section>
        {stockRTime !== 0 ? (
          <section className="cart d-flex">
            <div className="cart-insert">
              <p onClick={data}>
                <i className="fas fa-cart-plus"></i> Thêm Vào Giỏ Hàng
              </p>
            </div>
            <Button buy={buy} />
          </section>
        ) : (
          <section className="cart d-flex">
            <div className="cart-insert">
              <p style={{ cursor: "no-drop" }}>
                <i className="fas fa-cart-plus"></i> Đã hết hàng !
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
export default CtspProductInfor;
