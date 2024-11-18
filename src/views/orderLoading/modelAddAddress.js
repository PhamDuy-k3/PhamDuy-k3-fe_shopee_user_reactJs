import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

const ModelAddAddress = ({
  setAddress,
  showModelAddress,
  setShowModelAddress,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [cookies] = useCookies();

  const [listAddress, setListAddress] = useState([]);
  const [addressChoese, setddressChoese] = useState("");
  const [isAddAddress, setAddAddress] = useState(false);

  const handleClose = () => {
    setShowModelAddress(false);
  };

  const handleShow = () => setShowModelAddress(true);
  const getAddress = async () => {
    if (!cookies.user_token) return;
    try {
      const response = await axios.get("http://localhost:5050/address", {
        headers: {
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });
      setListAddress(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error.message);
    }
  };
  useEffect(() => {
    getAddress();
  }, [cookies.user_token]);

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
      }
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error.message);
    }
  };

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

  const handelChoeseAddress = (txtaddress) => {
    if (addressChoese.includes(txtaddress)) {
      setddressChoese([]);
    } else {
      setddressChoese([txtaddress]);
    }
  };
  const handleCancelAddAddress = () => {
    setAddAddress(false);
    reset();
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
                    className="list-address-users"
                    onClick={() => handelChoeseAddress(address.address)}
                    key={address._id}
                  >
                    <input
                      type="radio"
                      checked={addressChoese.includes(address.address)}
                    />
                    <p className="list-address-users__text">
                      {address.address}
                    </p>
                    <p className="list-address-users__onchange">Cập nhật</p>
                  </div>
                );
              })
            : []}

          <div
            onClick={() => setAddAddress(true)}
            className="d-flex add-address"
          >
            <div className="d-flex">
              <i class="fas fa-plus"></i>
              <p>Thêm địa chỉ</p>
            </div>
          </div>

          {isAddAddress && (
            <form onSubmit={handleSubmit(addAddress)}>
              <input
                type="text"
                {...register("address", {
                  required: "Xin vui lòng nhập địa chỉ",
                  minLength: {
                    value: 1,
                    message: "Địa chỉ phải có ít nhất 8 ký tự",
                  },
                })}
                placeholder="Nhập địa chỉ"
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address.message}</p>
              )}
              <div className="d-flex">
                <p onClick={() => handleCancelAddAddress()}>Hủy</p>
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
    </>
  );
};

export default ModelAddAddress;
