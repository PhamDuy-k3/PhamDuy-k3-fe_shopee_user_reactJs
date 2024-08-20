import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/img/logo.png";
import imgTb from "../../assets/images/img/tbao.jpg";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

function ComponentHeader() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies();
  const [isInfor, setIsInfor] = useState(false);
  const [user, setUser] = useState();
  const [length_cart, setLength_cart] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const searchProduct = (data) => {
    //console.log(data);
    localStorage.setItem("text_search", JSON.stringify(data.search));
    navigate(`/search?keyword=${data.search}`);
  };

  useEffect(() => {
    setLength_cart(cookies.length_cart);
  }, [cookies.length_cart]);

  // lấy user qua phone
  useEffect(() => {
    fetch(`http://localhost:5050/users?phone=${cookies.phone_user}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data[0]);
      });
  }, [cookies.phone_user]);

  // đăng xuất
  const logout = (e) => {
    e.preventDefault();
    removeCookies("user_token");
    removeCookies("phone_user");
    window.location.href = "http://localhost:3000/login";
  };
  //handel info
  const handleIsInfo = () => {
    setIsInfor(true);
  };
  const handleIsInfoDisplay = () => {
    setIsInfor(false);
  };

  return (
    <header className="col-12">
      <div className="infor d-flex">
        <nav className="nav-one col-6">
          <ul className="d-flex">
            <li>
              <a href="">
                Kênh Người Bán <span className="vertical"></span>
              </a>
            </li>
            <li>
              <a href="">
                Trở thành Người bán Shopee <span className="vertical"></span>
              </a>
            </li>
            <li>
              <a href="">
                Tải ứng dụng <span className="vertical"></span>{" "}
              </a>
              <div style={{ position: "absolute" }} className="download">
                <img style={{ width: "10px" }} src="img/downlload.jpg" alt="" />
                <p>appStore</p>
                <p>fackbook</p>
              </div>
            </li>
            <li>
              <a href="">Kết nối</a>
              &nbsp;
              <Link to="https://www.facebook.com/duyphamk3">
                <i className="fab fa-facebook" style={{ color: "#ffffff" }}></i>
              </Link>
              &nbsp;
              <Link to="https://www.instagram.com/duypham7381">
                <i
                  className="fab fa-instagram"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="nav-two col-6">
          <ul className="d-flex">
            <li>
              <a href="">
                <p className="far fa-bell"></p>
                &nbsp; Thông báo
              </a>
              <div className="Notification-triangle">
                <div id="triangle-up"></div>

                <div className="Notification">
                  {!cookies.user_token ? (
                    <div>
                      <div className="Notification-img col-12">
                        <img src={imgTb} alt="" />
                      </div>
                      <div className="Notification-text">
                        <p>Đăng nhập để xem thông báo</p>
                      </div>
                      <div className="Notification-button col-12">
                        <ul className="d-flex">
                          <li className="col-6">
                            <Link to="/Login">Đăng Nhập</Link>
                          </li>
                          <li className="col-6">
                            <Link to="/Register">Đăng Ký</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>Thông báo</p>
                    </>
                  )}
                </div>
              </div>
            </li>
            <li>
              <a href="">
                <i className="far fa-question-circle"></i> Hỗ trợ
              </a>
            </li>
            <li>
              <a href="">
                <i className="fas fa-globe"></i> Tiếng Việt
              </a>
              <i
                className="fas fa-chevron-down"
                style={{ marginLeft: "3px", cursor: "pointer" }}
              ></i>
            </li>
            {!cookies.user_token ? (
              <>
                <li>
                  <Link to="/Register">Đăng Ký</Link>
                  <span className="vertical"></span>
                </li>
                <li>
                  <Link to="/Login">Đăng Nhập</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <ul id="img-name-user" className="d-flex">
                    <img src={user && user.avatar} alt="User Avatar" />
                    <li onMouseOver={handleIsInfo} style={{ color: "white" }}>
                      {user && user.name
                        ? user.name
                        : cookies.email_token
                        ? cookies.email_token.split("@")[0]
                        : ""}
                      ...
                    </li>
                  </ul>

                  {isInfor && (
                    <div>
                      <ul id="sub-menu" onMouseLeave={handleIsInfoDisplay}>
                        <NavLink to="/Profile">
                          <li>Tài khoản của tôi</li>
                        </NavLink>
                        <NavLink to="/CartOder">
                          <li>Đơn mua của tôi</li>
                        </NavLink>
                        <NavLink id="" href="/" onClick={(e) => logout(e)}>
                          <li>Đăng xuất</li>
                        </NavLink>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="logo-search-cart d-flex col-12">
        <div className="logo col-2 text-align">
          <img src={logo} alt="logo-shopee" />
        </div>
        <div className="search col-8">
          <form onSubmit={handleSubmit(searchProduct)}>
            <div className="input-search-icon d-sm-flex col-12">
              <input
                id="search-input"
                className="col-11"
                type="text"
                placeholder=" Tìm kiếm"
                {...register("search")}
              />

              <button style={{ outline: "none", border: "none" }}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <nav className="nav-three col-12">
            <ul className="d-flex">
              <li>
                <a href="">Iphone</a>
              </li>
              <li>
                <a href="">Đồ thể thao</a>
              </li>
              <li>
                <a href="">Điện Thoại</a>
              </li>
              <li>
                <a href="">Áo Khoác Nữ</a>
              </li>
              <li>
                <a href="">Dép</a>
              </li>
              <li>
                <a href="">Quần Âu</a>
              </li>
              <li>
                <a href="">Vợt Cầu Lông</a>
              </li>
              <li>
                <a href="">Set Đồ</a>
              </li>
              <li>
                <a href="">Áo thun</a>
              </li>
              <li>
                <a href="">Hoodie</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="cart col-2 text-align">
          <Link to="/Cart">
            <i className="fas fa-cart-plus"></i>
            <p style={{ color: "white" }} className="quantityCart">
              {length_cart || ""}
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ComponentHeader;
