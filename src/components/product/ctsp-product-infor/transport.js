import React, { useEffect, useState } from "react";
import FlyZoom from "../ctsp-product-img/fly-zoom";
import { VND, VND_currency } from "../../VND/vnd";
import { memo } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import ModelAddAddress from "../../../views/orderLoading/modelAddAddress";
function AddresTransport(props) {
  const [txtAddress, setTxtAddress] = useState("");
  const [address, setAddress] = useState("");
  const [showModelAddress, setShowModelAddress] = useState(false);
  function HendelChangeAdress() {
    if (txtAddress.length < 8) {
      alert("Địa chỉ phải có ít nhất 8 ký tự");
      return;
    }
    props.setAddress(txtAddress);

    // lưu vào sesion
    sessionStorage.setItem("address", txtAddress);

    props.toggleAddressVisibility();
  }
  function Close() {
    props.toggleAddressVisibility();
  }
  return (
    <div className="addres-transport">
      {/* <ModelAddAddress
        setAddress={setAddress}
        showModelAddress={showModelAddress}
        setShowModelAddress={setShowModelAddress}
      /> */}
      <div className="addres-transport-header d-flex">
        <p>Địa chỉ nhận hàng</p>
        <i
          style={{
            marginLeft: "25rem",
            fontSize: "2.5rem",
            color: "gray",
            cursor: "pointer",
          }}
          onClick={Close}
          className="fas fa-times"
        ></i>
      </div>
      <div className="addres-transport-content">
        <div className="d-flex mt-3 search-addres">
          <input
            className="input-search-addres"
            type="text"
            onChange={(e) => setTxtAddress(e.target.value)}
            placeholder="Tìm Thành phố, Quận/Huyện"
          />
          <p
            style={
              !txtAddress
                ? { cursor: "no-drop", backgroundColor: "#F3826C" }
                : { cursor: "pointer", backgroundColor: "#F7452E" }
            }
            onClick={HendelChangeAdress}
            className="Used"
          >
            Sử Dụng
          </p>
        </div>
        <div className="d-flex mt-2">
          <i className="fas fa-map-marker-alt"></i>
          <p>&nbsp; Sử dụng địa chỉ hiện tại</p>
        </div>
        {/* <p onClick={() => setShowModelAddress(true)}>Thêm địa chỉ</p> */}
        <div className="">
          <p style={{ marginLeft: "1rem" }}>Đia chỉ của tôi</p>
          <p>
            <span>Đăng nhập</span> chọn địa chỉ nhận hàng
          </p>
        </div>
      </div>
    </div>
  );
}
function TranSport() {
  const [address, setAddress] = useState("Phường Định Công , Quận Hoàng Mai ");
  const [transportFee, setTransportFee] = useState(0);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [shippingfees, setShippingfees] = useState([]);
  const [isshippingfees, setIsShippingfees] = useState(false);

  const [cookies] = useCookies([]);

  const getshipping = async () => {
    const res = await axios.get("http://localhost:5050/shippingfees", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.user_token}`,
      },
    });
    setShippingfees(res.data.data);
  };
  useEffect(() => {
    getshipping();
  }, [cookies]);

  useEffect(() => {
    setTransportFee(VND.format(transportFee * 1000));
  }, [transportFee]);

  const toggleAddressVisibility = () => {
    setIsAddressVisible(!isAddressVisible);
  };
  document.body.style.overflowY = isAddressVisible ? "hidden" : "auto";
  return (
    <section className="transport d-flex">
      <div className="transport-title col-2">
        <p>Vận Chuyển</p>
      </div>
      <div className="transport-text">
        <div>
          <i className="fas fa-shuttle-van"></i> Vận Chuyển Tới
          <span className="address-new">{address}</span> &nbsp;
          <i
            style={{ color: "black", cursor: "pointer" }}
            onClick={toggleAddressVisibility}
            className="fas fa-chevron-down"
          ></i>
        </div>
        <div className="phi-vc d-flex mt-3">
          <p>Phí Vận Chuyển</p>
          <p>
            <sup style={{ marginRight: "3px" }}>đ</sup>
            {transportFee}
            <span>
              &nbsp;{" "}
              <i
                onMouseOver={() => setIsShippingfees(true)}
                style={{ color: "black", cursor: "pointer" }}
                className="fas fa-chevron-down"
              ></i>
            </span>
          </p>
        </div>
        {isshippingfees && (
          <div
            onMouseLeave={() => setIsShippingfees(false)}
            className="shippingFee"
          >
            {shippingfees.length > 0
              ? shippingfees.map((shippingfee) => (
                  <div className="shippingfee">
                    <div className="shippingfee__type">{shippingfee.type}</div>
                    <div className="shippingfee__fee">
                      <p>Giảm tới : {VND_currency.format(shippingfee.fee)}</p>
                    </div>
                    <div className="shippingfee__content">
                      {shippingfee.description}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        )}

        {isAddressVisible && (
          <>
            <FlyZoom />
            <AddresTransport
              toggleAddressVisibility={toggleAddressVisibility}
              setAddress={setAddress}
            />
          </>
        )}
      </div>
    </section>
  );
}
export default memo(TranSport);
