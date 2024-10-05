import axios from "axios";
import "./scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import { VND } from "../../components/VND/vnd";

const DiscountCode = (props) => {
  const [discountcodes, setDiscountcode] = useState([]);
  const [selectedDiscountCodes, setSelectedDiscountCodes] = useState([]);
  const [response, setRespone] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);

  // Hàm lấy dữ liệu mã giảm giá
  const fetchDataDiscountcode = async () => {
    try {
      const response = await axios.get("http://localhost:5050/discountcode");
      if (response.data.status_code == 200) {
        setDiscountcode(response.data.data);
      } else {
        setDiscountcode([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const fetchDataDiscountcodeChoese = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/discountcode?selectedDiscountCodes=${selectedDiscountCodes}`
      );
      setRespone(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataDiscountcode();
  }, []);
  const handelIsDisplay = () => {
    setIsDisplay(true);
  };
  console.log(response);
  const handleDiscountcode = (code) => {
    if (selectedDiscountCodes.includes(code)) {
      setSelectedDiscountCodes(
        selectedDiscountCodes.filter((item) => item !== code)
      );
    } else {
      setSelectedDiscountCodes([...selectedDiscountCodes, code]);
    }
  };

  const choeseDiscountcode = () => {
    fetchDataDiscountcodeChoese();
    setIsDisplay(false);
  };

  console.log(props.total);
  return (
    <>
      <div className="d-flex" id="discountCode">
        <p>Shopee Voucher</p>
        <p onClick={handelIsDisplay}>Chọn hoặc nhập mã</p>
      </div>
      <div>
        {response.length > 0 ? (
          response.map((item) => <p key={item._id}>{item.discountValue}</p>)
        ) : (
          <p>Không có discount</p>
        )}
      </div>
      {isDisplay && (
        <div id="DiscountCode">
          <h1>Phạm Duy Voucher</h1>
          <div id="items-discount-code">
            {discountcodes.length > 0 ? (
              discountcodes.map((discountcode, index) => (
                <div
                  onClick={() => {
                    if (VND.format(discountcode.minOrderValue) <= props.total) {
                      handleDiscountcode(discountcode.code);
                    }
                  }}
                  key={index}
                  className={`d-flex ${
                    VND.format(discountcode.minOrderValue) <= props.total
                      ? ""
                      : "disabled"
                  }`}
                >
                  <div className="info-shop col-4">
                    <img
                      src={discountcode.logoShop}
                      alt={`${discountcode.shopName} logo`}
                    />
                    <p>{discountcode.shopName}</p>
                  </div>
                  <div className="detail-code col-8">
                    <p>
                      Giá: {discountcode.discountValue}
                      <span>
                        {discountcode.discountType === "fixed" ? "k" : "%"}
                      </span>
                    </p>
                    <p>Đơn tối thiểu: {discountcode.minOrderValue}</p>
                    <div className="d-flex">
                      <p>Đã dùng: {discountcode.usedPercentage}%</p>
                      <p>
                        HSD:{" "}
                        {new Date(
                          discountcode.expirationDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="save">
                      <input
                        type="checkbox"
                        name="discount"
                        checked={selectedDiscountCodes.includes(
                          discountcode.code
                        )}
                        onChange={() => handleDiscountcode(discountcode.code)}
                      />
                    </p>
                    <p className="usageLimit">x{discountcode.usageLimit}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>
          <div id="action-discountcode">
            <button onClick={() => setIsDisplay(false)}>Trở lại</button>
            <button onClick={choeseDiscountcode}>Ok</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountCode;
