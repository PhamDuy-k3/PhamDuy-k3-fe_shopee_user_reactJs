import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import HeaderLoginRegister from "../../components/headerLogin-Register/headerLogin-Register";
import "./scssDk/styleDk.scss";
import "./scssDn/styleDn.scss";
import bgImage from "..//..//assets/images/img/imgDn/banner-shop.png";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";

export function Register() {
  const [gmail, setGmail] = useState("duylaptrinh03@gmail.com");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/auth/register",
        data
      );
      if (response.data.status_code == 200) {
        alert("Đăng kí thành công");
        setCookie("id_user_register", response.data.data, {
          path: "/",
          expires: moment().add(1, "months").toDate(),
        });
        navigate("/Register/confirmCode");
      }
    } catch (error) {
      console.error("Đăng ký thất bại", error);
    }
  };
  return (
    <>
      <AutoLoadPage />
      <div className="box_">
        <HeaderLoginRegister titleHeader="Đăng Ký" />
        <div
          className="context-login col-12 d-flex"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
          }}
        >
          <form name="registerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="infor-login">
              <div className="infor-login-title d-flex">
                <p>Đăng Ký</p>
              </div>

              <div className="infor-login-input">
                {/* Email */}
                <div className="Email d-flex">
                  <label htmlFor="Email">
                    <input
                      type="email"
                      id="Email"
                      placeholder="Email"
                      {...register("email", {
                        required: "Email không được bỏ trống",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                  </label>
                </div>
                {errors.email && (
                  <p style={{ position: "absolute", color: "red" }}>
                    {errors.email.message}
                  </p>
                )}
                {/* Phone */}
                <div className="Phone d-flex">
                  <label htmlFor="Phone">
                    <input
                      type="text"
                      id="Phone"
                      placeholder="Số điện thoại"
                      {...register("phone", {
                        required: "Số điện thoại không được bỏ trống",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Số điện thoại phải có 10 chữ số",
                        },
                      })}
                    />
                  </label>
                </div>
                {errors.phone && (
                  <p style={{ position: "absolute", color: "red" }}>
                    {errors.phone.message}
                  </p>
                )}

                {/* Name */}
                <div className="Name d-flex">
                  <label htmlFor="Name">
                    <input
                      type="text"
                      id="Name"
                      placeholder="Tên"
                      {...register("name", {
                        required: "Tên không được bỏ trống",
                        minLength: {
                          value: 3,
                          message: "Tên phải có ít nhất 3 ký tự",
                        },
                      })}
                    />
                  </label>
                </div>
                {errors.name && (
                  <p style={{ position: "absolute", color: "red" }}>
                    {errors.name.message}
                  </p>
                )}

                {/* Password */}
                <div className="Password d-flex">
                  <label htmlFor="Password">
                    <input
                      type="password"
                      id="Password"
                      placeholder="Mật khẩu"
                      {...register("password", {
                        required: "Mật khẩu không được bỏ trống",
                        minLength: {
                          value: 6,
                          message: "Mật khẩu phải có ít nhất 6 ký tự",
                        },
                      })}
                    />
                  </label>
                </div>
                {errors.password && (
                  <p style={{ position: "absolute", color: "red" }}>
                    {errors.password.message}
                  </p>
                )}
                {/* Submit */}
                <div className="login">
                  <label htmlFor="login">
                    <input type="submit" id="login" value="ĐĂNG KÝ" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
