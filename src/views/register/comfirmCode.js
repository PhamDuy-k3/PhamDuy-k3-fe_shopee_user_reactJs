import React, { useEffect, useState } from "react";
import "./style.scss";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function ComfirmCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [user, setUser] = useState(null); // Khởi tạo là null để kiểm tra tình trạng tìm người dùng
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

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
    console.log(codes);
    console.log(user.verificationCode);

    if (codes.length === 4) {
      if (user && codes == user?.verificationCode) {
        updateUser(); // Cập nhật thông tin khi mã xác nhận đúng
      } else {
        alert("Mã xác nhận không đúng. Vui lòng thử lại!");
      }
    } else {
      alert("Vui lòng nhập đủ 4 ký tự mã xác nhận.");
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
        alert("Xác nhận thành công!");
        navigate("/login");
        console.log(res.data.status_code);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="ComfirmCode">
      <form className="form">
        <span className="close">X</span>

        <div className="info">
          <span className="title">Nhập mã xác nhận đăng ký</span>
          <p className="description">Chúng tôi đã gửi mã qua gmail của bạn</p>
        </div>
        <div className="input-fields">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>

        <div className="action-btns">
          <button type="button" className="clear" onClick={handleClear}>
            Xóa
          </button>
          <button type="button" className="verify" onClick={handleVerify}>
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
}
