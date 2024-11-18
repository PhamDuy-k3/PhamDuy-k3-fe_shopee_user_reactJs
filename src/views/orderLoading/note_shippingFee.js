import React, { useEffect, useState } from "react";
import { VND_currency } from "../../components/VND/vnd";
import { useCookies } from "react-cookie";
import axios from "axios";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";
import { memo } from "react";
const NoteShippingFee = ({
  total,
  handleNote,
  shippingfee,
  setShippingfee,
}) => {
  const [shippingfees, setShippingfees] = useState([]);
  const [isshippingfees, setIsShippingfees] = useState(false);
  const [shippingfeeChoese, setShippingfeeChoese] = useState("Nhanh");
  const [cookies] = useCookies([]);

  const getshipping = async () => {
    const res = await axios.get("http://localhost:5050/shippingfees", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.user_token}`,
      },
    });
    const shippingfees = res.data.data;
    setShippingfees(shippingfees);
    setShippingfee(
      shippingfees.find((shippingfee) => shippingfee.type === "Nhanh")
    );
  };
  useEffect(() => {
    getshipping();
  }, [cookies]);

  const handleChippingFee = () => {
    setShippingfee(shippingfeeChoese);
    setIsShippingfees(false);
  };
  return (
    <>
      {isshippingfees && (
        <>
          <FlyZoom />
          <div id="model_shippingfees">
            <div className="shippingfee__title">
              <p>Chọn phương thức vận chuyển</p>
            </div>
            {shippingfees.length > 0 ? (
              shippingfees.map((shippingfee) => (
                <div
                  onClick={() => setShippingfeeChoese(shippingfee)}
                  className="shippingfee"
                  key={shippingfee._id}
                  style={
                    shippingfee.type === shippingfeeChoese.type
                      ? { borderLeft: "5px solid red" }
                      : {}
                  }
                >
                  <div
                    style={
                      shippingfee.type === "Hỏa tốc" ? { color: "#ee5118" } : {}
                    }
                    className="shippingfee__type"
                  >
                    {shippingfee.type === "Hỏa tốc" ? (
                      <p>
                        <i class="fas fa-shipping-fast"></i> {shippingfee.type}
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
                  {shippingfee.type === shippingfeeChoese.type && (
                    <i class="fas fa-check"></i>
                  )}
                </div>
              ))
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
            <div className="d-flex shippingfee__footer">
              <p onClick={() => setIsShippingfees(false)}>TRỞ LẠI</p>
              <p onClick={handleChippingFee}>HOÀN THÀNH</p>
            </div>
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
                <p className="font-weight">{shippingfee.type}</p>
                <p
                  onClick={() => setIsShippingfees(true)}
                  className="font-weight onchange"
                >
                  Thay đổi
                </p>
                <p className="font-weight">{shippingfee.fee}</p>
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
};
export default memo(NoteShippingFee);
