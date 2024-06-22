import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLoginRegister from "../../components/headerLogin-Register/headerLogin-Register";
import "./scssDk/styleDk.scss";
import "./scssDn/styleDn.scss";
import bgImage from "..//..//assets/images/img/imgDn/banner-shop.png";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";

export function Register() {
  const [cursor, setCursor] = useState("no-drop");
  const [isCheckIcon, setIsCheckIcon] = useState(false);

  function validateSurveyForm(event) {
    event.preventDefault();
    // Reset error elements
    resetErrorElements();

    const errors = [];
    const validateNameInput = validateInput("surveyForm", "Phone", [
      { type: "email_or_sdt" },
      { type: "required" },
    ]);

    if (validateNameInput) {
      errors.push(validateNameInput);
    }

    // const validatePassInput = validateInput("surveyForm", "pass", [
    //   { type: "minLength", value: 10 },
    //   { type: "required" },
    // ]);

    // if (validatePassInput) {
    //   errors.push(validatePassInput);
    // }

    if (errors.length === 0) {
      console.log("Form is valid");
      setCursor("pointer");
      setIsCheckIcon(true);
      return true;
    } else {
      for (const error of errors) {
        setCursor("no-drop");
        setIsCheckIcon(false);
        document.getElementById("error_" + error.name).innerHTML =
          error.message;
      }
      document.forms["surveyForm"][errors[0].name].focus();
    }
    return false;
  }

  function validateInput(form, input, validations) {
    const formElement = document.forms[form];
    const inputElement = formElement[input];
    let error = null;

    for (const validation of validations) {
      switch (validation.type) {
        case "required":
          if (!inputElement.value.trim()) {
            error = {
              name: input,
              message: "Vui lòng điền vào mục này.",
            };
            inputElement.style.backgroundColor = "#FFF6F7";
            inputElement.style.border = "1px solid red";
          } else {
            inputElement.style.backgroundColor = "white";
          }
          break;
        case "minLength":
          if (inputElement.value.length < validation.value) {
            error = {
              name: input,
              message: " Không được ít hơn " + validation.value + " ký tự",
            };
          } else {
            inputElement.style.border = "1px solid green";
          }
          break;
        case "email_or_sdt":
          if (
            !inputElement.value.trim() ||
            (!inputElement.value.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) &&
              !inputElement.value.match(/^(\d{10,11})$/))
          ) {
            error = {
              name: input,
              message: "Email hoặc Số điện thoại không đúng định dạng !!!",
            };
          } else {
            inputElement.style.border = "1px solid green";
          }
          break;
      }
    }
    return error;
  }
  function resetErrorElements() {
    // Reset error messages
    const errorElements = document.querySelectorAll("[id^='error_']");
    for (const errorElement of errorElements) {
      errorElement.innerHTML = "";
    }
  }

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
          <form
            name="surveyForm"
            onSubmit={(event) => validateSurveyForm(event)}
            action=""
          >
            <div className="infor-login">
              <div className="infor-login-title d-flex">
                <p>Đăng Ký</p>
              </div>
              <div className="infor-login-input">
                <div className="Phone d-flex">
                  <label htmlFor="Phone">
                    <input
                      onInput={validateSurveyForm}
                      type="text"
                      id="Phone"
                      placeholder="Số điện thoại"
                    />
                  </label>
                  {isCheckIcon && <i class="fas fa-check"></i>}
                </div>
                <p
                  id="error_Phone"
                  style={{ position: "absolute", color: "red" }}
                ></p>
                <div className="login">
                  <label htmlFor="login">
                    <input
                      className={cursor}
                      type="submit"
                      id="login"
                      value="ĐĂNG KÝ"
                    />
                  </label>
                </div>
              </div>
              <div className="or-dk">
                <hr />
                <div className="or-dk-text">
                  <p>HOẶC</p>
                </div>
              </div>
              <div className="fb-gg">
                <button>
                  <i
                    className="fab fa-facebook"
                    style={{ color: "#0b5be5" }}
                  ></i>{" "}
                  Facebook
                </button>
                <button>
                  <i className="fab fa-google" style={{ color: "#c91d50" }}></i>{" "}
                  Google
                </button>
              </div>
              <div className="Angree">
                <p>Bằng việc đăng ký, bạn đã đồng ý với Shopee về</p>
                <p>
                  <a href="">Điều khoản dịch vụ</a> &{" "}
                  <a href="">Chính sách bảo mật</a>
                </p>
              </div>
              <div className="new-now-shopee d-flex">
                <p>Bạn mới biết đến Shopee?</p>
                <p>
                  <Link to="/Login">Đăng Nhập</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
