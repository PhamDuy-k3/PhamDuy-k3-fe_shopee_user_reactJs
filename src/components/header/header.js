import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/img/logo.png";
import imgTb from "../../assets/images/img/tbao.jpg";
import avatarDefault from "../../assets/images/img/avatar_default.jpg";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { locales } from "../../i18n/i18n";

function ComponentHeader() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies();
  const [isInfor, setIsInfor] = useState(false);
  const [user, setUser] = useState();
  const [carts, setCarts] = useState([]);
  const { i18n } = useTranslation();
  const [isChangeLag, setIsChangeLag] = useState(false);
  const currentLanguage = locales[i18n.language];
  const { t } = useTranslation(["home"]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // lấy danh sách cart trog store
  const carts_store = useSelector((state) => state.cart.items);

  // thay đổi ngông ngữ
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsChangeLag(false);
  };
  const searchProduct = (data) => {
    localStorage.setItem("text_search", JSON.stringify(data.search));
    navigate(`/search?keyword=${data.search}`);
  };

  // lấy user qua phone
  useEffect(() => {
    if (!cookies.phone_user) {
      return;
    }
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
        setUser(res.data[0] || []);
      });
  }, [cookies.phone_user]);

  // đăng xuất
  const logout = (e) => {
    e.preventDefault();
    removeCookies("user_token");
    removeCookies("phone_user");
    window.location.to = "http://localhost:3000/#/login";
  };
  //handel info
  const handleIsInfo = () => {
    setIsInfor(true);
  };
  const handleIsInfoDisplay = () => {
    setIsInfor(false);
  };

  //
  const handelMultilingual = () => {
    setIsChangeLag(true);
  };
  const handelDisplayMultilingual = () => {
    setIsChangeLag(false);
  };
  return (
    <header className="col-12">
      <div className="infor d-flex">
        <nav className="nav-one col-6">
          <ul className="d-flex">
            <li>
              <Link to="">
                {t("aside header.Seller_channel")}
                <span className="vertical"></span>
              </Link>
            </li>
            <li>
              <Link to="">
                {t("aside header.Become_a_shopee_seller")}
                <span className="vertical"></span>
              </Link>
            </li>
            <li>
              <Link to="">
                {t("aside header.Download")} <span className="vertical"></span>{" "}
              </Link>
              <div style={{ position: "absolute" }} className="download">
                <img style={{ width: "10px" }} src="img/downlload.jpg" alt="" />
                <p>appStore</p>
                <p>fackbook</p>
              </div>
            </li>
            <li>
              <Link to=""> {t("aside header.Follow_us_on")}</Link>
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
              <Link to="">
                <p className="far fa-bell"></p>
                &nbsp; {t("aside header.Notifications")}
              </Link>
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
              <Link to="">
                <i className="far fa-question-circle"></i>{" "}
                {t("aside header.Help")}
              </Link>
            </li>
            <li onMouseOver={handelMultilingual} style={{ color: "white" }}>
              <i className="fas fa-globe"></i> {currentLanguage}
              <i
                className="fas fa-chevron-down"
                style={{ marginLeft: "3px", cursor: "pointer" }}
              ></i>
            </li>
            {isChangeLag && (
              <div onMouseLeave={handelDisplayMultilingual} id="multilingual">
                <li onClick={() => changeLanguage("vi")}>Tiếng Việt</li>
                <li onClick={() => changeLanguage("en")}>English</li>
              </div>
            )}

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
                    {user && user.avatar ? (
                      <img src={user && user.avatar} alt="User Avatar" />
                    ) : (
                      <img src={avatarDefault} alt="User Avatar" />
                    )}
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
                          <li>{t("aside header.my_account")}</li>
                        </NavLink>
                        <NavLink to="/CartOder">
                          <li>{t("aside header.my_purchase")}</li>
                        </NavLink>
                        <NavLink id="" to="/" onClick={(e) => logout(e)}>
                          <li>{t("aside header.logout")}</li>
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
                placeholder={t("aside header.Search")}
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
                <Link to="">{t("aside header.Men_shoes")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.sportswear")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.sandals")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.trousers")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.badminton_racket")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.outfit_set")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.t_shirt")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.hoodie")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.phone")}</Link>
              </li>
              <li>
                <Link to="">{t("aside header.women_jacket")}</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="cart col-2 text-align">
          <Link to="/Cart">
            <i className="fas fa-cart-plus"></i>
            <p style={{ color: "white" }} className="quantityCart">
              {carts_store?.length || ""}
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ComponentHeader;
