import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComponentHeader from "../../components/header/header";

const Profile = () => {
  const [cookies] = useCookies();

  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      level: "2",
      gender: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (!cookies.user_token) {
      return;
    }
    fetch(`http://localhost:5050/users/profile/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.user_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          const userData = res.data;
          setUser(userData);
          setValue("name", userData.name);
          setValue("phone", userData.phone);
          setValue("email", userData.email);
          setValue("gender", userData.gender === 1 ? "male" : "female");
        }
      })
      .catch((error) => {
        toast.error("Không thể tải dữ liệu người dùng.");
        console.error(error);
      });
  }, [cookies]);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const urlApiUpdateUser = `http://localhost:5050/users/update/user`;

  const CreatUpdateuser = (data, method, urlApi, success, error) => {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.gender) {
      formData.append("gender", data.gender === "male" ? 1 : 2);
    }
    if (data.birthday) formData.append("birthday", data.birthday);
    if (data.address) formData.append("address", data.address);

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]); // Phải kiểm tra nếu avatar được chọn
    }

    fetch(urlApi, {
      method: method,
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status_code === 200) {
          toast.success(success);
        } else {
          toast.error(error);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra khi cập nhật.");
      });
  };

  const updateUser = (data) => {
    if (cookies.user_token) {
      CreatUpdateuser(
        data,
        "PUT",
        urlApiUpdateUser,
        "Cập nhật thành công",
        "Cập nhật thất bại"
      );
    } else {
      toast.error("Không thể cập nhật người dùng.");
    }
  };

  const onSubmit = (data) => {
    updateUser(data);
  };

  return (
    <>
      <ComponentHeader />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
      />

      {user ? (
        <div className="profile-container">
          <form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <div style={{ width: "600px" }}>
              <h1>Hồ Sơ Của Tôi</h1>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                  type="text"
                  id="username"
                  {...register("name")}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input type="tel" id="phone" {...register("phone")} disabled />
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <div className="gender-options">
                  <input
                    type="radio"
                    id="male"
                    {...register("gender")}
                    value="male"
                  />
                  <label htmlFor="male">Nam</label>
                  <input
                    type="radio"
                    id="female"
                    {...register("gender")}
                    value="female"
                  />
                  <label htmlFor="female">Nữ</label>
                </div>
              </div>
              <div className="form-group">
                <label>Ngày sinh</label>
                <p>
                  {user.birthday ? formatDate(user.birthday) : "Chưa cập nhật"}
                </p>
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <p>{user.address || "Chưa cập nhật"}</p>
              </div>
              <button style={{ backgroundColor: "#FA5230" }} type="submit">
                Lưu
              </button>
            </div>

            <div className="profile-image">
              <img src={user.avatar} alt="Profile" />
              <input type="file" {...register("avatar")} />
              <p>Dung lượng file tối đa 1 MB</p>
              <p>Định dạng: .JPEG, .PNG</p>
            </div>
          </form>
        </div>
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </>
  );
};

export default Profile;
