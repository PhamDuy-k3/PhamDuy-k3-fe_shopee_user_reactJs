import { HashRouter as Router, Routes, Route } from "react-router-dom";
import IndexProduct from "../views/product/index-product";
import Index from "../views/index/index";
import ProductDetails from "../views/product details/product details";
import Search from "../views/search/search";
import Cart from "../views/cart/cart";
import Login from "../views/login/login";
import { Register } from "../views/register/register";
import CartOder from "../views/cart/cartOder";
import Profile from "../views/infoAccount/infoAcc";
import OrderLoading from "../views/orderLoading";
import ComfirmCode from "../views/register/comfirmCode";

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Product/:category_id" element={<IndexProduct />} />
          <Route
            path="/ProductDetail/:product_id"
            element={<ProductDetails />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/CartOder" element={<CartOder />} />
          <Route path="/OrderLoading" element={<OrderLoading />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Register/confirmCode/:id_user"
            element={<ComfirmCode />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
