import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Footer from "../../components/footer/footer";
import HeaderLoginRegister from "../../components/headerLogin-Register/headerLogin-Register";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import bgImage from "../../assets/images/img/imgDn/banner.jpg";
import qr from "../../assets/images/img/imgDn/qr.jpg";
import { useCookies } from "react-cookie";
import moment from "moment";
import LoginGg from "./loginGG";
import dayjs from "dayjs";

function Login() {
  const [cursor, setCursor] = useState("no-drop");
  // const [text, setText] = useState("");
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
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
  }, []);

  const login = (data) => {
    if (!data) {
      return;
    }
    fetch("http://localhost:5050/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        // Kiểm tra xác thực
        if (res.isVerified !== true) {
          alert("Tài khoản chưa xác thực!");
          return;
        }
        if (res.codeExpired) {
          // Kiểm tra xem mã hết hạn hay không
          if (dayjs().isAfter(res.codeExpired)) {
            alert("Mã xác thực đã hết hạn!");
            return;
          }
        }

        // Kiểm tra token người dùng và lưu cookie
        if (res.user_token) {
          setCookie("user_token", res.user_token, {
            path: "/",
            expires: moment().add(1, "months").toDate(),
          });
          setCookie("phone_user", res.phone_user, {
            path: "/",
            expires: moment().add(1, "months").toDate(),
          });
          setCookie("id_user", res.id_user, {
            path: "/",
            expires: moment().add(1, "months").toDate(),
          });
          navigate("/"); // Chuyển hướng về trang chủ
        }
      });
  };

  const nameValue = watch("name");
  const passValue = watch("password");

  useEffect(() => {
    const nameElement = document.querySelector("#name");
    const passElement = document.querySelector("#pass");

    if (
      nameValue &&
      nameValue.trim() !== "" &&
      passValue &&
      passValue.trim() !== ""
    ) {
      setCursor("pointer");
      nameElement.style.backgroundColor = "white";
      passElement.style.backgroundColor = "white";
    } else {
      setCursor("no-drop");
      nameElement.style.backgroundColor = "#FFF6F7";
      passElement.style.backgroundColor = "#FFF6F7";
    }
  }, [nameValue, passValue]);

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
              <img src={qr} alt="" />
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
                    type="password"
                    id="pass"
                    placeholder="Mật khẩu"
                    {...register("password", {
                      required: "Vui lòng điền giá trị!!!",
                    })}
                  />
                </label>
                <div className="eye">
                  <i className="fas fa-eye-slash"></i>
                  <i className="far fa-eye"></i>
                </div>
              </div>
              {errors.password && (
                <p id="error_pass">{errors.password.message}</p>
              )}
              <div className="login">
                <label htmlFor="login">
                  <input
                    className={cursor}
                    type="submit"
                    id="login"
                    value="ĐĂNG NHẬP"
                  />
                </label>
              </div>
            </div>
            <div className="infor-login-forget d-flex">
              <p>
                <a href="">Quên mật khẩu</a>
              </p>
              <p>
                <a href="">Đăng nhập với SMS</a>
              </p>
            </div>
            <hr />
            <div className="or-dn">
              <p>HOẶC</p>
            </div>
            <div className="fb-gg">
              <button>
                <i
                  className="fab fa-facebook"
                  style={{ color: " #0b5be5" }}
                ></i>{" "}
                Facebook
              </button>
              <LoginGg />
            </div>
            <div className="new-now-shopee d-flex">
              <p>Bặn mới biết đến Shopee?</p>
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
