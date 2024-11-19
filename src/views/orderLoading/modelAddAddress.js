import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import ModelUpdateAddress from "./modelUpdateAddress";
import { memo } from "react";
const ModelAddAddress = ({
  setAddress,
  showModelAddress,
  setShowModelAddress,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [cookies] = useCookies();

  const [listAddress, setListAddress] = useState([]);
  const [addressChoese, setddressChoese] = useState("");
  const [isAddAddress, setAddAddress] = useState(false);
  const [showModelUpdateAddress, setShowModelUpdateAddress] = useState(false);
  const [addressUpdated, setAddressUpdated] = useState({});
  const handleClose = () => {
    setShowModelAddress(false);
  };

  const handleShow = () => setShowModelAddress(true);

  // lấy dánh sach dia chỉ
  const getAddress = async () => {
    if (!cookies.user_token) return;
    try {
      const response = await axios.get("http://localhost:5050/address", {
        headers: {
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      const data = response.data.data;
      setListAddress(data);

      const addressDefault = data.find((address) => address.default === true);
      setAddress(addressDefault.address);
      setddressChoese(addressDefault.address);
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error.message);
    }
  };

  useEffect(() => {
    getAddress();
  }, [cookies.user_token]);

  // thêm địa chỉ
  const addAddress = async (data) => {
    if (!cookies.user_token) return;
    try {
      const response = await axios.post("http://localhost:5050/address", data, {
        headers: {
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      if (response.status === 200) {
        alert("Thêm thành công");
        getAddress();
        reset();
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error.message);
    }
  };

  // lưu
  const handleSave = () => {
    // Nếu không có địa chỉ được chọn và data không đủ dài
    if (addressChoese.length === 0) {
      return;
    }
    setShowModelAddress(false);
    sessionStorage.setItem("address", addressChoese);
    setAddress(addressChoese);
    return;
  };
  // sử lý sự kiện chọn address
  const handelChoeseAddress = (txtaddress) => {
    if (addressChoese.includes(txtaddress)) {
      setddressChoese([]);
    } else {
      setddressChoese([txtaddress]);
    }
  };
  // hủy
  const handleCancelAddAddress = () => {
    setAddAddress(false);
    reset();
  };
  const handleUpdateAddress = (address) => {
    setAddressUpdated(address);
    setShowModelUpdateAddress(true);
    setShowModelAddress(false);
  };

  return (
    <>
      <p onClick={handleShow}>Thay đổi</p>
      <Modal id="model-address" show={showModelAddress} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ của tôi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listAddress.length > 0
            ? listAddress.map((address) => {
                return (
                  <div
                    className="address-users"
                    onClick={() => handelChoeseAddress(address.address)}
                    key={address._id}
                  >
                    <input
                      type="radio"
                      checked={addressChoese.includes(address.address)}
                    />
                    <div className="address-users__text">
                      <div className="d-flex">
                        <p>{address.name}</p> <p>|</p> <p>{address.phone}</p>
                      </div>
                      <p className="address-users__address">
                        {address.address}
                      </p>
                      {address.default === true && (
                        <p className="address-users__default">Mặc định</p>
                      )}
                    </div>
                    <p
                      onClick={() => handleUpdateAddress(address)}
                      className="address-users__onchange"
                    >
                      Cập nhật
                    </p>
                  </div>
                );
              })
            : []}

          <div
            onClick={() => setAddAddress(true)}
            className="mt-2 d-flex add-address"
          >
            <div className="d-flex">
              <i class="fas fa-plus"></i>
              <p>Thêm địa chỉ</p>
            </div>
          </div>

          {isAddAddress && (
            <form onSubmit={handleSubmit(addAddress)}>
              <div className="d-flex name-phone-address">
                <div className="col-5 name-phone-address__name">
                  <input
                    type="text"
                    {...register("name", {
                      required: "Xin vui lòng nhập tên người nhận",
                      pattern: {
                        value: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẾỄỆỉịọỏốồổỗộớờởỡợỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$/,
                        message: "Tên không được chứa ký tự đặc biệt hoặc số",
                      },
                      validate: (value) =>
                        value.trim().split(" ").length >= 2 ||
                        "Tên phải có ít nhất 2 từ",
                    })}
                    placeholder="Họ và tên"
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}
                </div>

                <div className="col-5 name-phone-address__phone">
                  <input
                    type="text"
                    {...register("phone", {
                      required: "Xin vui lòng nhập số điện thoại",
                      pattern: {
                        value: /^(0|\+84)[3-9][0-9]{8}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    placeholder="Số điện thoại"
                  />
                  {errors.phone && (
                    <p style={{ color: "red" }}>{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <input
                disabled={!watch("name") || !watch("phone")}
                type="text"
                {...register("address", {
                  required: "Xin vui lòng nhập địa chỉ",
                  minLength: {
                    value: 8,
                    message: "Địa chỉ phải có ít nhất 8 ký tự",
                  },
                })}
                placeholder="Địa chỉ cụ thể"
              />

              {errors.address && watch("name") && watch("phone") && (
                <p style={{ color: "red" }}>{errors.address.message}</p>
              )}

              <div className="d-flex action-address">
                <p onClick={handleCancelAddAddress}>Hủy</p>
                <button type="submit">Thêm</button>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <p onClick={handleClose}>Hủy</p>
          <p onClick={handleSave}>Xác nhận</p>
        </Modal.Footer>
      </Modal>

      <ModelUpdateAddress
        getAddress={getAddress}
        addressUpdated={addressUpdated}
        setShowModelAddress={setShowModelAddress}
        setShowModelUpdateAddress={setShowModelUpdateAddress}
        showModelUpdateAddress={showModelUpdateAddress}
      />
    </>
  );
};

export default memo(ModelAddAddress);
