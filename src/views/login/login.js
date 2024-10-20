import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import moment from "moment";
import dayjs from "dayjs";

import Footer from "../../components/footer/footer";
import HeaderLoginRegister from "../../components/headerLogin-Register/headerLogin-Register";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import bgImage from "../../assets/images/img/imgDn/banner.jpg";
import qr from "../../assets/images/img/imgDn/qr.jpg";
import LoginGg from "./loginGG";

function Login() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (cookies.user_token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const login = async (data) => {
    if (!data) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();

      if (res.error) {
        alert(`${res.error.message}`);
        return;
      }

      if (!res.isVerified) {
        alert("Tài khoản chưa xác thực!");
        return;
      }

      if (res.codeExpired && dayjs().isAfter(res.codeExpired)) {
        alert("Mã xác thực đã hết hạn!");
        return;
      }

      if (res.user_token) {
        setCookie("user_token", res.user_token, {
          path: "/",
          expires: moment().add(1, "months").toDate(),
        });
        setCookie("user_refreshToken", res.refresh_token, {
          path: "/",
          expires: moment().add(1, "months").toDate(),
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      alert("Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const nameValue = watch("phone");
  const passValue = watch("password");

  return (
    <div className="box_">
      <AutoLoadPage />
      <HeaderLoginRegister titleHeader="Đăng Nhập" />
      <div
        className="context-login col-12 d-flex"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      >
        <form name="surveyForm" onSubmit={handleSubmit(login)}>
          <div className="infor-login">
            <div className="infor-login-title d-flex">
              <p>Đăng Nhập</p>
              <div className="login-with-qr">
                <p>Đăng nhập với mã Qr</p>
              </div>
              <div id="triangle-right"></div>
              <img src={qr} alt="QR Code" />
            </div>
            <div className="infor-login-input">
              <div className="name">
                <label htmlFor="name">
                  <input
                    type="text"
                    id="name"
                    placeholder="Email/Số điện thoại/Tên đăng nhập.."
                    {...register("phone", {
                      required: "Vui lòng điền giá trị !!!",
                      minLength: {
                        value: 10,
                        message: "Không được dưới 10 kí tự",
                      },
                    })}
                  />
                </label>

                {errors.phone && <p id="error_name">{errors.phone.message}</p>}
              </div>
              <div className="pass d-flex">
                <label htmlFor="pass">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="pass"
                    placeholder="Mật khẩu"
                    {...register("password", {
                      required: "Vui lòng điền giá trị!!!",
                    })}
                  />
                </label>
                <div className="eye">
                  <i
                    onClick={togglePasswordVisibility}
                    className={
                      isPasswordVisible ? "far fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </div>
              </div>
              {errors.password && (
                <p id="error_pass">{errors.password.message}</p>
              )}
              <div className="login">
                <label htmlFor="login">
                  <input
                    style={
                      !nameValue || !passValue ? { cursor: "no-drop" } : {}
                    }
                    type="submit"
                    id="login"
                    value="ĐĂNG NHẬP"
                  />
                </label>
              </div>
            </div>
            <div className="infor-login-forget d-flex">
              <p>
                <Link to="">Quên mật khẩu</Link>
              </p>
              <p>
                <Link to="">Đăng nhập với SMS</Link>
              </p>
            </div>
            <hr />
            <div className="or-dn">
              <p>HOẶC</p>
            </div>
            <div className="fb-gg">
              <button>
                <i className="fab fa-facebook" style={{ color: "#0b5be5" }}></i>{" "}
                Facebook
              </button>
              <LoginGg />
            </div>
            <div className="new-now-shopee d-flex">
              <p>Bạn mới biết đến Shopee?</p>
              <p>
                <Link to="/Register">Đăng Ký</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
