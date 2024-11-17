import React, { useEffect, useState } from "react";
import { VND_currency } from "../../components/VND/vnd";
import { useCookies } from "react-cookie";
import axios from "axios";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";

export default function NoteShippingFee({ total, handleNote }) {
  const [shippingfees, setShippingfees] = useState([]);
  const [isshippingfees, setIsShippingfees] = useState(true);

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
  return (
    <>
      {isshippingfees && (
        <>
          <FlyZoom />
          <div id="model_shippingfees">
            <div className="shippingfee__title">
              <p>Chọn phương thức vận chuyển</p>
            </div>
            {shippingfees.length > 0
              ? shippingfees.map((shippingfee) => (
                  <div className="shippingfee">
                    <div
                      style={
                        shippingfee.type === "Hỏa tốc"
                          ? { color: "#ee5118" }
                          : {}
                      }
                      className="shippingfee__type"
                    >
                      {shippingfee.type === "Hỏa tốc" ? (
                        <p>
                          <i class="fas fa-shipping-fast"></i>{" "}
                          {shippingfee.type}
                        </p>
                      ) : (
                        <p>{shippingfee.type}</p>
                      )}
                    </div>
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
        </>
      )}
      <div id="note-shippingfee">
        <div className="d-flex">
          <div className="note-shippingfe__note col-5">
            <div>
              <label htmlFor="noteOders">Lời nhắn :</label>
              <input
                type="text"
                onChange={(e) => handleNote(e)}
                placeholder="Nhập"
              />
            </div>
          </div>
          <div className="mt-4 note-shippingfe__shippingfe d-flex col-7">
            <div className="col-4">
              <p className="font-weight">Phương thức vận chuyển:</p>
            </div>
            <div className="col-7 mx-2 d-flex flex-column">
              <div className="d-flex justify-content-between ">
                <p className="font-weight">Nhanh</p>
                <p className="font-weight">Thay đổi</p>
                <p className="font-weight">28.000đ</p>
              </div>
              <div>
                <p>
                  <i class="fas fa-shipping-fast"></i>
                  Anh Tú dâng trào cảm xúc, tâm Our Song Việt Nam
                </p>
                <p>Anh Tú dâng trào cảm xúc, tâm Our Song Việt Nam</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <p>Tổng số tiền ( 1 sản phẩm) : </p>
          <p>{VND_currency.format(total)}</p>
        </div>
      </div>
    </>
  );
}
