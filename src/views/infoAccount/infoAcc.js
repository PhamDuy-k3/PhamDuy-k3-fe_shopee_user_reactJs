import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComponentHeader from "../../components/header/header";
import File from "../../components/file/file";
import imgdf from "../../../src/assets/images/img/avatar_default.jpg";
const Profile = () => {
  const [cookies] = useCookies();
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState(null);
  const birthdayRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch, // Sử dụng watch để theo dõi giá trị của avatar
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

  const getProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5050/users/profile/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      const data = await response.json();

      if (data.data) {
        const userData = data.data;
        setUser(userData);
        setImageUrl(userData.avatar);
        setValue("name", userData.name);
        setValue("phone", userData.phone);
        setValue("email", userData.email);
        const formattedBirthday = new Date(userData.birthday)
          .toISOString()
          .split("T")[0];
        setValue("birthday", formattedBirthday);
        setValue("address", userData.address);
        setValue("gender", userData.gender === 1 ? "male" : "female");
      }
    } catch (error) {
      toast.error("Không thể tải dữ liệu người dùng.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cookies.user_token) {
      return;
    }
    getProfile();
  }, [cookies.user_token]);

  // Theo dõi thay đổi của avatar
  const avatarFile = watch("avatar");

  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const previewUrl = URL.createObjectURL(avatarFile[0]);
      setImageUrl(previewUrl);
    }
  }, [avatarFile]);

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
      formData.append("avatar", data.avatar[0]);
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
          // getProfile();
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
                <input
                  ref={birthdayRef}
                  type="date"
                  {...register("birthday")}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  // value={user.address}
                  type="text"
                  {...register("address")}
                />
              </div>
              <button style={{ backgroundColor: "#FA5230" }} type="submit">
                Lưu
              </button>
            </div>

            <div className="profile-image">
              <label htmlFor="file__image">
                <div className="icon-camara">
                  <i className="fa fa-camera"></i>
                </div>
                <img src={imageUrl ? imageUrl : imgdf} alt="Profile" />
              </label>
              <input
                style={{ opacity: "0" }}
                id="file__image"
                type="file"
                {...register("avatar")}
              />
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
