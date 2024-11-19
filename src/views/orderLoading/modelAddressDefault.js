import { Alert } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";

export const ModelAddressDefault = ({
  getAddress,
  setShowModelAddress,
  addressUpdated,
  modelAcceptDefault,
  setModelAcceptDefault,
  setShowModelUpdateAddress,
}) => {
  const [cookies] = useCookies();

  const handleClose = () => {
    setShowModelUpdateAddress(true);
    setModelAcceptDefault(false);
  };
  const handleShow = () => setModelAcceptDefault(true);

  // Hàm cập nhật một địa chỉ thành mặc định
  const updateOneAddressToTrue = async () => {
    try {
      if (!cookies.user_token) return;
      const response = await axios.put(
        `http://localhost:5050/address/updateOne/updateOneAddressToTrue/${addressUpdated._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Cập nhật địa chỉ không thành công", error);
      throw error;
    }
  };

  // Hàm cập nhật tất cả các địa chỉ thành không mặc định
  const updateAllDefaultAddressesToFalse = async () => {
    try {
      if (!cookies.user_token) return;
      const response = await axios.put(
        "http://localhost:5050/address/updateMany/updateAllDefaultAddressesToFalse",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.user_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Cập nhật các địa chỉ không thành công", error);
      throw error;
    }
  };

  // Hàm xác nhận và thực hiện các thao tác
  const handleConfirm = async () => {
    try {
      const [
        allDefaultFalseResponse,
        oneAddressTrueResponse,
      ] = await Promise.all([
        updateAllDefaultAddressesToFalse(),
        updateOneAddressToTrue(),
      ]);
      if (allDefaultFalseResponse || oneAddressTrueResponse) {
        alert("Cập nhật thành công:");
        getAddress();
        setShowModelAddress(true)
        setShowModelUpdateAddress(false);
        setModelAcceptDefault(false);
        addressUpdated.default = true;
        return;
      }
    } catch (error) {
      console.error("Xác nhận thay đổi thất bại", error);
    }
  };

  return (
    <Modal
      id="model-address-default"
      show={modelAcceptDefault}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật địa chỉ mặc định</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert message={`Địa chỉ : ${addressUpdated.address}`} banner />
        <Alert
          className="mt-2"
          message=" Bạn đã có địa chỉ mặc định trước đó rồi , bạn có muốn thay đổi không, nếu
        có ấn xác nhận"
          banner
        />
      </Modal.Body>
      <Modal.Footer>
        <p onClick={handleClose}>Hủy</p>
        <p onClick={handleConfirm}>Xác nhận</p>
      </Modal.Footer>
    </Modal>
  );
};
