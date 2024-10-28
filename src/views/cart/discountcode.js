import "./scssCart/styleCart.scss";
import { useEffect, useState } from "react";
import FlyZoom from "../../components/product/ctsp-product-img/fly-zoom";
import axios from "axios";

const DiscountCode = (props) => {
  const [discountcodes, setDiscountcode] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);

  // Hàm lấy dữ liệu mã giảm giá
  const fetchDataDiscountcode = async () => {
    try {
      const response = await axios.get("http://localhost:5050/discountcode");
      if (response.data.status_code === 200) {
        setDiscountcode(response.data.data);
      } else {
        setDiscountcode([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateDiscount = () => {
    const selectedDiscountData = discountcodes.filter((item) =>
      props.selectedDiscountCodes.includes(item.code)
    );
    console.log(selectedDiscountData);
    const fixedValues = [];
    const percentageValues = [];

    selectedDiscountData.forEach((item) => {
      if (item.discountType === "fixed") {
        fixedValues.push(item.discountValue);
      } else {
        percentageValues.push(item.discountValue);
      }
    });

    // Tính tổng giảm giá
    const discountPercentage = percentageValues.reduce(
      (acc, curr) => acc + curr,
      0
    );
    const discountFixed = fixedValues.reduce((acc, curr) => acc + curr, 0);

    // Tính toán tổng tiền sau khi áp dụng mã giảm giá
    const totalDiscountPercentage = (props.total * discountPercentage) / 100;
    const totalDiscountFixed = discountFixed * 1000;

    let newTotal = props.total;

    if (percentageValues.length > 0 && fixedValues.length === 0) {
      newTotal -= totalDiscountPercentage;
    } else if (percentageValues.length === 0 && fixedValues.length > 0) {
      newTotal -= totalDiscountFixed;
    } else if (percentageValues.length > 0 && fixedValues.length > 0) {
      newTotal = newTotal - totalDiscountPercentage - totalDiscountFixed;
    }
    props.setTotalDiscountcode(newTotal);
  };

  useEffect(() => {
    fetchDataDiscountcode();
  }, []);

  const handelIsDisplay = () => {
    setIsDisplay(true);
  };

  document.body.style.overflowY = isDisplay ? "hidden" : "auto";

  const handleDiscountcode = (code) => {
    if (props.selectedDiscountCodes.includes(code)) {
      props.setSelectedDiscountCodes(
        props.selectedDiscountCodes.filter((item) => item !== code)
      );
    } else {
      props.setSelectedDiscountCodes([...props.selectedDiscountCodes, code]);
    }
  };

  const choeseDiscountcode = () => {
    calculateDiscount();
    setIsDisplay(false);
  };

  return (
    <>
      {isDisplay && <FlyZoom />}

      <div className="d-flex" id="discountCode">
        <p>Shopee Voucher</p>
        <p onClick={handelIsDisplay}>Chọn hoặc nhập mã</p>
      </div>

      {isDisplay && (
        <div id="DiscountCode">
          <p style={{ fontSize: "1.5rem" }}>Chọn Shopee Voucher</p>
          <div id="items-discount-code">
            {discountcodes.length > 0 ? (
              discountcodes.map((discountcode, index) => (
                <div
                  onClick={() => {
                    if (discountcode.minOrderValue <= props.total) {
                      handleDiscountcode(discountcode.code);
                    }
                  }}
                  key={index}
                  className={`d-flex ${
                    discountcode.minOrderValue <= props.total &&
                    new Date(discountcode.expirationDate) > new Date()
                      ? ""
                      : "disabled"
                  }`}
                >
                  <div className="info-shop col-4">
                    <div className="dots-dis">
                      {[...Array(11)].map((_, i) => (
                        <div className="dot-dis"></div>
                      ))}
                    </div>
                    <img
                      src={discountcode.logoShop}
                      alt={`${discountcode.shopName} logo`}
                    />
                    <p>{discountcode.shopName}</p>
                    <div id="triangle-left"></div>
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
                        checked={props.selectedDiscountCodes.includes(
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
            <p onClick={() => setIsDisplay(false)}>Trở lại</p>
            <p onClick={choeseDiscountcode}>Ok</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountCode;
