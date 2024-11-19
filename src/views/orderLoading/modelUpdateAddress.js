import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { ModelAddressDefault } from "./modelAddressDefault";

const ModelUpdateAddress = ({
  addressUpdated,
  setShowModelUpdateAddress,
  showModelUpdateAddress,
  setShowModelAddress,
  getAddress,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [cookies] = useCookies();
  const [addressDefaultIsTrue, setAddressDefaultIsTrue] = useState([]);
  const [modelAcceptDefault, setModelAcceptDefault] = useState(false);
  const [addressDefault, setAddressDefault] = useState(true);
  useEffect(() => {
    getAddressDefaultIsTrue();
    setValue("name", addressUpdated.name);
    setValue("phone", addressUpdated.phone);
    setValue("address", addressUpdated.address);
    setAddressDefault(addressUpdated.default);
  }, [addressUpdated]);

  const handleClose = () => {
    setShowModelAddress(true);
    setShowModelUpdateAddress(false);
  };
  const handleCancelUpdateAddress = () => {
    setShowModelAddress(true);
    setShowModelUpdateAddress(false);
  };
  const getAddressDefaultIsTrue = async (data) => {
    if (!cookies.user_token) return;
    try {
      const response = await axios.get(
        "http://localhost:5050/address/getAddressDefaultIsTrue",
        {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      if (response.status === 200) {
        setAddressDefaultIsTrue(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error.message);
    }
  };
  const updateAddress = async (data) => {
    if (addressDefault === true) {
      if (addressDefaultIsTrue.length > 0) {
        setShowModelUpdateAddress(false);
        setModelAcceptDefault(true);
        return;
      }
    }
    data.default = addressDefault;
    const response = await axios.put(
      `http://localhost:5050/address/${addressUpdated._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cookies.user_token}`,
        },
      }
    );
    if (response.status === 200) {
      alert("Cập nhật thành công");
      getAddress();
      reset();
      setShowModelAddress(true);
      setShowModelUpdateAddress(false);
    }
  };
  const handleChangeAddressDefault = () => {
    setAddressDefault((prev) => !prev);
  };
  return (
    <>
      <Modal
        id="model-address"
        show={showModelUpdateAddress}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật địa chỉ của tôi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateAddress)}>
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

            <div className="d-flex address-default">
              <input
                id="address-default__value"
                type="checkbox"
                checked={addressDefault}
                onChange={handleChangeAddressDefault}
              />
              <label htmlFor="address-default__value">Địa chỉ mặc định</label>
            </div>
            <div className="d-flex action-address">
              <p onClick={handleCancelUpdateAddress}>Hủy</p>
              <button type="submit">Cập nhật</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ModelAddressDefault
        setShowModelAddress={setShowModelAddress}
        getAddress={getAddress}
        addressUpdated={addressUpdated}
        setShowModelUpdateAddress={setShowModelUpdateAddress}
        setModelAcceptDefault={setModelAcceptDefault}
        modelAcceptDefault={modelAcceptDefault}
      />
    </>
  );
};

export default ModelUpdateAddress;
