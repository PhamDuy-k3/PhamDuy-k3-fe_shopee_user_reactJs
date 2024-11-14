import React, { useEffect, useState } from "react";
import "./style.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/img/logo.png";
export default function ComfirmCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [user, setUser] = useState(null);
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
    document.getElementById("input-0").focus();
  };

  const handleVerify = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form (submit)
    const codes = code.join("");
    if (codes.length === 4) {
      if (user && codes === user?.verificationCode) {
        updateUser();
      } else {
        toast.error("Mã xác nhận không đúng. Vui lòng thử lại!");
      }
    } else {
      toast.error("Vui lòng nhập đủ 4 ký tự mã xác nhận!");
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
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isVerified: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Xác nhận thành công!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  const HandlePrevRegister = () => {
    navigate("/register");
  };
  return (
    <div className="box_conf">
      <img src={logo} alt="logo" />
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

        <form className="form" onSubmit={handleVerify}>
          <i onClick={HandlePrevRegister} class="fas fa-arrow-left"></i>
          <div className="title">Xác thực OTP</div>
          <p className="message">
            Chúng tôi đã gửi mã xác minh đến email mà bạn đăng ký
          </p>
          <div className="inputs">
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
              className="action"
              type="button"
            >
              Xóa
            </button>
            <button type="submit" className="action">
              Xác thực
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
