import React, { useEffect, useState } from "react";
import "./style.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ComfirmCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [user, setUser] = useState(null); // Khởi tạo là null để kiểm tra tình trạng tìm người dùng
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    searchUser();
  }, [cookies.id_user_register]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;

    if (value && index < code.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }

    setCode(newCode);
  };

  const handleClear = () => {
    setCode(["", "", "", ""]);
    document.getElementById("input-0").focus(); // Focus về input đầu tiên
  };

  const handleVerify = () => {
    const codes = code.join("");
    if (codes.length === 4) {
      if (user && codes == user?.verificationCode) {
        updateUser(); // Cập nhật thông tin khi mã xác nhận đúng
      } else {
        toast.error(() => (
          <p style={{ paddingTop: "1rem" }}>
            Mã xác nhận không đúng. Vui lòng thử lại!
          </p>
        ));
      }
    } else {
      toast.error(() => (
        <p style={{ paddingTop: "1rem" }}>
          Vui lòng nhập đủ 4 ký tự mã xác nhận!
        </p>
      ));
    }
  };

  const searchUser = () => {
    if (!cookies.id_user_register) {
      return;
    }
    fetch(
      `http://localhost:5050/auth/searchRegister/${cookies.id_user_register}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUser(res.data);
        } else {
          alert("Không tìm thấy người dùng!");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const updateUser = () => {
    fetch(`http://localhost:5050/auth/verify/${cookies.id_user_register}`, {
      method: "PUT", // PUT hoặc PATCH để cập nhật thông tin người dùng
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isVerified: true, // Cập nhật trạng thái xác nhận
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(() => (
          <p style={{ paddingTop: "1rem" }}>"Xác nhận thành công!</p>
        ));
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="ComfirmCode">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "350px" }}
      />
      <form class="form">
        <div class="title">Xác thực OTP</div>
        <p class="message">
          Chúng tôi đã gửi mã xác minh đến email mà bạn đăng ký
        </p>
        <div class="inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="d-flex" style={{ marginLeft: "4rem" }}>
          <button
            style={{ backgroundColor: "gray" }}
            onClick={handleClear}
            class="action"
          >
            Xóa
          </button>
          <button onClick={handleVerify} class="action">
            Xác thực
          </button>
        </div>
      </form>
    </div>
  );
}
