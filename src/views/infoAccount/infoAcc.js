import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "antd/es/layout/layout";
import ComponentHeader from "../../components/header/header";

const Profile = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const [user, setUser] = useState();
  const [id_user, setIdUser] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    // giá trị mặc định cho data
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
        setUser(res.data[0]);
        setIdUser(res.data[0]._id);
        setValue("name", res.data[0].name);
        setValue("phone", res.data[0].phone);
        setValue("email", res.data[0].email);
        setValue("gender", res.data[0].gender === 1 ? "male" : "female");
      });
  }, [cookies.phone_user, setValue]);

  console.log(id_user);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const urlApiUpdateUser = `http://localhost:5050/users/${id_user}`;

  const CreatUpdateuser = (data, method, urlApi, success, error) => {
    const formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (data.gender) {
      data.gender = data.gender === "male" ? 1 : 2;
      formData.append("gender", data.gender);
    }
    if (data.birthday) {
      formData.append("birthday", data.birthday);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    // Chú ý: data.avatar là một mảng, chúng ta cần lấy phần tử đầu tiên
    console.log(formData);
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
          toast.success(() => <p style={{ paddingTop: "1rem" }}>{success}</p>);
        } else {
          toast.error(() => <p style={{ paddingTop: "1rem" }}>{error}</p>);
        }
      });
  };
  const updateUser = async (data) => {
    console.log(data);
    CreatUpdateuser(
      data,
      "PUT",
      urlApiUpdateUser,
      "Cập nhật thành công",
      "Cập nhật thất bại"
    );
  };
  const onSubmit = (data) => {
    updateUser(data);
  };

  return (
    <>
      <ComponentHeader />
      <ToastContainer
        position="top-right"
        autoClose={300}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px" }}
      />
      {user && (
        <div className="profile-container ">
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
                  {/* Trong đoạn mã này, giá trị của các radio button (gender) được quản lý bởi useForm mà không cần sử dụng thuộc tính checked. useForm sẽ tự động đồng bộ hóa các giá trị input khi chúng thay đổi. */}
                </div>
              </div>
              <div className="form-group">
                <label>Ngày sinh</label>
                <p>{formatDate(user.birthday)}</p>
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <p>{user.address}</p>
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
      )}
    </>
  );
};

export default Profile;
