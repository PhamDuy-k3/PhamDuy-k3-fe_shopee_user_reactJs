import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import { addToCart, addToCartAsync } from "../../../redux/action";
import { useCookies } from "react-cookie";

function CtspProductInfor(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [colorProduct, setColorProduct] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [priceSaleFormatted, setPriceSaleFormatted] = useState("");
  const url_id = useParams();
  const [cookies, setCookie] = useCookies();
  const [carts, setCarts] = useState([]);

  let img_one = props.product && props.product.image;
  let title = props.product && props.product.name;

  const cartItems = useSelector((state) => state.cart.items);

  const VND = new Intl.NumberFormat("vi-VN", {
    // style: 'currency',
    currency: "VND",
  });

  // tổng tiền
  const total = quantity * priceSaleFormatted;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5050/carts`);
        const data = await response.json();
        setCarts(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, []);

  // data product
  const data = () => {
    // navigate("/ProductDetail/:id");

    const newProduct = {
      id_user: cookies.id_user,
      name: title.toLocaleUpperCase(),
      color: colorProduct,
      image: "",
      quantity: quantity,
      price: priceSaleFormatted,
      size: selectSize,
      sum: VND.format(total * 1000),
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
    // check khi user ko chọn thì sẽ cho mặc định

    if (newProduct.color == "") {
      newProduct.color = "Màu Trắng";
    }
    if (newProduct.size == "") {
      newProduct.size = "X";
    }
    // kiểm tra sản phẩm đã có trong giỏ hàng chua

    const isProductInCart = carts.some(
      (pd) => pd.image === "http://localhost:5050/" + newProduct.image
    );

    if (isProductInCart) {
      toast.error(() => (
        <p style={{ paddingTop: "1rem" }}>Sản phẩm này đã có trong giỏ hàng!</p>
      ));
    } else {
      toast.success(() => (
        <p style={{ paddingTop: "1rem" }}>Đã thêm vào giỏ hàng!</p>
      ));
      
      dispatch(addToCartAsync(newProduct));
    }
  };
  const buy = () => {
    data();
    navigate("/Cart");
  };
  return (
    <div className="ctsp-product-infor col-7">
      <section className="ctsp-product-infor-title">
        <h1>{title}</h1>
      </section>
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
      <section className="ctsp-product-infor-star d-flex">
        <p>
          2.3 <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </p>

        <p>
          <a style={{ color: "#9b9997" }} href="#feedBack">
            <span>565</span>&nbsp; Đánh Giá
          </a>
        </p>
        <p>
          <span>3,2</span>
          <span>k</span> Đã Bán
        </p>
        <p>Tố cáo</p>
      </section>
      <section className="ctsp-product-infor-price">
        <div className="Flash-shale d-flex">
          <div className="logo-flash-sale col-5">
            <img src={imgFlastSale} alt="" />
          </div>
          <div className="fl-sale-end d-flex">
            <p>
              <i className="far fa-clock"></i>KẾT THÚC TRONG &nbsp;
            </p>
            <div className="mt-2">
              <Time />
            </div>
          </div>
        </div>
        <PriceSaleProduct
          priceSaleFormatted={priceSaleFormatted}
          setPriceSaleFormatted={setPriceSaleFormatted}
        />
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
        <ColorProduct
          colorProduct={colorProduct}
          setColorProduct={setColorProduct}
        />
        <SizeProduct selectSize={selectSize} setSelectSize={setSelectSize} />
        <section className="number d-flex">
          <div className="number-title col-2">
            <p>Số Lượng</p>
          </div>
          <UpDownQuantity quantity={quantity} setQuantity={setQuantity} />
        </section>
        <section className="cart d-flex">
          <div className="cart-insert">
            <p onClick={data}>
              <i className="fas fa-cart-plus"></i> Thêm Vào Giỏ Hàng
            </p>
          </div>
          <div onClick={buy} className="mua">
            <p>Mua Ngay</p>
          </div>
        </section>
      </div>
    </div>
  );
}
export default CtspProductInfor;
