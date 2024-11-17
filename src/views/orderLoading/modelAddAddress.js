import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModelAddAddress({ setAddress }) {
  const [show, setShow] = useState(false);
  const [addressText, setAddressText] = useState("");
  const handleClose = () => {
    setAddressText("");
    if (addressText !== "") {
      setAddress(addressText);
    }
    sessionStorage.setItem("address", addressText);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <p onClick={handleShow}>Thay đổi</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ của tôi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            onChange={(e) => setAddressText(e.target.value)}
            placeholder="Nhập địa chỉ"
          />
        </Modal.Body>
        <Modal.Footer>
          <p onClick={handleClose}>Hủy</p>
          <p onClick={handleClose}>Xác nhận</p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelAddAddress;
