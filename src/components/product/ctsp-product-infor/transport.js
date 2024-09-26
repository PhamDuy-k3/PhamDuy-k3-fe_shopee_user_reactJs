import React, { useEffect, useState } from "react";
import FlyZoom from "../ctsp-product-img/fly-zoom";

function AddresTransport(props) {
  const [textInput, setTextInput] = useState("");
  const [cursor, setCusor] = useState("no-drop");
  function HendelChangeAdress() {
    if (textInput !== "") {
      setCusor("pointer-cursor");
      props.setAddress(textInput);
      props.toggleAddressVisibility();
    } else {
      setCusor("no-drop");
    }
  }
  function Close() {
    props.toggleAddressVisibility();
  }
  return (
    <div className="addres-transport">
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
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Tìm Thành phố, Quận/Huyện"
          />
          <p onClick={HendelChangeAdress} className={`Used ${cursor}`}>
            Sử Dụng
          </p>
        </div>
        <div className="d-flex mt-2">
          <i className="fas fa-map-marker-alt"></i>
          <p>&nbsp; Sử dụng địa chỉ hiện tại</p>
        </div>
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
  const [transportFee, setTransportFee] = useState(12);
  const [isAddressVisible, setIsAddressVisible] = useState(false);

  const VND = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  });

  
  useEffect(() => {
    setTransportFee(VND.format(transportFee * 1000));
  }, [transportFee, VND]);

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
            onClick={toggleAddressVisibility}
            className="fas fa-less-than fa-rotate-270 change-dress"
          ></i>
        </div>
        <div className="phi-vc d-flex mt-3">
          <p>Phí Vận Chuyển</p>
          <p>
            <sup>đ</sup>
            {transportFee}
            <span>
              &nbsp; <i className="fas fa-less-than fa-rotate-270"></i>
            </span>
          </p>
        </div>
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
export default TranSport;
